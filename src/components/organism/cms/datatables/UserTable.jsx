import { useEffect, useState } from "react";
import { changeActiveStatus, getUsers } from "../../../../firebase/userService";
import BaseTable from "./BaseTable";
import { useUsers } from "../../../../context/UserContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const UserTable = () => {
  const { users, setUsers } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const changeUserActiveStatus = async (userEmail, userId, isActiveStatus) => {
    const isConfirm = confirm("Are you sure?");
    if (!isConfirm) return;
    setIsLoading(true);
    setSelectedRow(userId);

    try {
      const updateUrl = `${
        process.env.REACT_APP_BACKEND_URL
      }/update-user/${userEmail}/${!isActiveStatus}`;
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
      setSelectedRow("false");
    } catch (error) {
      console.error("Error updating user:", error.message);

      await changeActiveStatus(userId, !isActiveStatus);

      alert("Failed to change user active status. Changes reverted.");

      setIsLoading(false);
      setSelectedRow("false");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
            className={"bg-white z-10 py-2 px-4 rounded flex flex-col gap-2"}
          >
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/settings">
                Delete
              </a>
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
                Disable
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
