import { useEffect, useState } from "react";
import {
  changeActiveStatus,
  deleteUser,
  getUsers,
  updateUserRole,
} from "../../../../firebase/userService";
import BaseTable from "./BaseTable";
import { useUsers } from "../../../../context/UserContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "../../../../context/AuthContext";
import BaseModal from "../../../molecules/BaseModal";

const UserTable = (props) => {
  const { isSubmitting } = props;
  const { users, setUsers } = useUsers();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedRowRole, setSelectedRowRole] = useState("");
  const [isUpdateRoleModalOpen, setIsUpdateRoleModalOpen] = useState("");
  const [selectedUpdateRole, setSelectedUpdaterole] = useState("");

  const fetchUsers = async () => {
    const data = await getUsers();
    const fileteredData = data.filter((data) => data.email !== user.email);
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
      const updateUrl = `${process.env.REACT_APP_BACKEND_URL}/update-user/${userEmail}?disabled=${isActiveStatus}`;
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

  const handleUpateUserRole = async (userId, selectedRole) => {
    const isConfirm = confirm("Are you sure?")
    setIsLoading(true);
    setSelectedRow(userId);

    if (!isConfirm) {
      return;
    }

    const updatedUser = await updateUserRole(userId, selectedRole);
    setIsLoading(false);
    setSelectedRow("");
    setIsUpdateRoleModalOpen(false)
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
      cell: ({ row }) => (
        <>
          {isLoading && selectedRow === row.original.id ? (
            <div className="w-24 bg-gray-300 rounded-xl animate-pulse h-6"></div>
          ) : (
            <div
              className={`w-28 ${
                row.original.role === "superadmin" ? "bg-purple-500" : "bg-blue-500"
              } rounded-xl`}
            >
              <p className="text-center text-sm text-white">
                {row.original.role}
              </p>
            </div>
          )}
        </>
      ),
    },
    {
      header: "Is Active",
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
          <MenuButton className="bg-black text-white py-2 px-4 rounded">
            Menu
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="bg-white shadow-lg py-2 px-4 rounded flex flex-col gap-2"
          >
            <MenuItem>
              <a
                className="block w-full text-left data-[focus]:bg-blue-100 px-2 py-1 hover:cursor-pointer"
                onClick={() => {
                  setIsUpdateRoleModalOpen(true);
                  setSelectedRow(row.original.id);
                  setSelectedRowRole(row.original.role);
                }}
              >
                Update Role
              </a>
            </MenuItem>
            <MenuItem>
              <button
                className="block w-full text-left data-[focus]:bg-blue-100 px-2 py-1"
                onClick={() => handleDeleteUser(row.original.id)}
              >
                Delete
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="block w-full text-left data-[focus]:bg-blue-100 px-2 py-1"
                onClick={() =>
                  changeUserActiveStatus(
                    row.original.email,
                    row.original.id,
                    row.original.is_active
                  )
                }
              >
                {row.original.is_active ? "Disable" : "Enable"}
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
      {isUpdateRoleModalOpen && (
        <BaseModal>
          <div className='w-72'>
            <div className="flex justify-between mb-5 font-bold text-md">
              <h1>Update User Role</h1>
              <button onClick={() => setIsUpdateRoleModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form
              // onSubmit={}
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="role"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="role"
                    name="role"
                    value={selectedUpdateRole !== "" ? selectedUpdateRole : selectedRowRole}
                    onChange={(event) => setSelectedUpdaterole(event.target.value)}
                    defaultValue="superadmin"
                  >
                    <option value="superadmin">Superadmin</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded hover:bg-gray-950 focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                  type="button"
                  onClick={() => handleUpateUserRole(selectedRow, selectedUpdateRole)}
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}
    </>
  );
};

export default UserTable;
