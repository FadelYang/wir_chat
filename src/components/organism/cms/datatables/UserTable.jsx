import { useEffect, useState } from "react";
import {
  changeActiveStatus,
  deleteUser,
  getUsers,
} from "../../../../firebase/userService";
import BaseTable from "./BaseTable";
import { useUsers } from "../../../../context/UserContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from '../../../../context/AuthContext';

const UserTable = (props) => {
  const { isSubmitting } = props
  const { users, setUsers } = useUsers();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  const fetchUsers = async () => {
    const data = await getUsers();
    const fileteredData = data.filter(data => data.email !== user.email)
    setUsers(fileteredData);
  };

  const changeUserActiveStatus = async (userEmail, userId, isActiveStatus) => {
    const isConfirm = confirm("Are you sure?");
    if (!isConfirm) return;
    setIsLoading(true);
    setSelectedRow(userId);

    if (userId === user.uid) {
      alert(`You can't disable your own account`);
      return;
    }

    try {
      const updateUrl = `${
        process.env.REACT_APP_BACKEND_URL
      }/update-user/${userEmail}?disabled=${isActiveStatus}`;
      const response = await fetch(updateUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        console.log("Failed");
        throw new Error("Failed to update data");
      }

      await changeActiveStatus(userId, isActiveStatus);

      alert(
        `Success: User status changed to ${
          !isActiveStatus ? "Active" : "Non-Active"
        }`
      );
      setIsLoading(false);
      setSelectedRow("");
    } catch (error) {
      console.error("Error updating user:", error.message);

      await changeActiveStatus(userId, !isActiveStatus);

      alert("Failed to change user active status. Changes reverted.");

      setIsLoading(false);
      setSelectedRow("");
    }
  };

  const handleDeleteUser = async (userId) => {
    const isConfirm = confirm("Are you sure?");
    if (!isConfirm) return;
    setIsLoading(true);
    setSelectedRow(userId);

    if (userId === user.uid) {
      alert(`You can't delete your own account`);
      return;
    }

    try {
      const deleteUrl = `${process.env.REACT_APP_BACKEND_URL}/delete-user/${userId}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      alert("User deleted successfully!");

      await deleteUser(userId);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      setIsLoading(false);
      setSelectedRow("");
    } catch (error) {
      alert(error);
      console.error(error);

      setIsLoading(false);
      setSelectedRow("");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [isLoading, isSubmitting]);

  const userTableDefinition = [
    {
      header: "Index",
      id: "index",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Is Acttive",
      cell: ({ row }) => (
        <>
          {isLoading && selectedRow === row.original.id ? (
            <div className="w-24 bg-gray-300 rounded-xl animate-pulse h-6"></div>
          ) : (
            <div
              className={`w-24 ${
                row.original.is_active ? "bg-green-500" : "bg-red-500"
              } rounded-xl`}
            >
              <p className="text-center text-sm text-white">
                {row.original.is_active ? "Active" : "Non Active"}
              </p>
            </div>
          )}
        </>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <Menu>
          <MenuButton className={"bg-black text-white py-2 px-4 rounded"}>
            Menu
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className={"bg-white shadow py-2 px-4 rounded flex flex-col gap-2"}
          >
            <MenuItem>
              <button
                className="block data-[focus]:bg-blue-100"
                onClick={() => handleDeleteUser(row.original.id)}
              >
                Delete
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="block data-[focus]:bg-blue-100"
                onClick={() =>
                  changeUserActiveStatus(
                    row.original.email,
                    row.original.id,
                    row.original.is_active
                  )
                }
              >
                {row.original.is_active ? 'Disable' : 'Enable'}
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      ),
    },
  ];

  return (
    <>
      <BaseTable data={users} columns={userTableDefinition} />
    </>
  );
};

export default UserTable;
