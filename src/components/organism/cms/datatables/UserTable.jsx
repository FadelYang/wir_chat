import { useEffect } from "react";
import { getUsers } from "../../../../firebase/userService";
import BaseTable from "./BaseTable";
import { useUsers } from "../../../../context/UserContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const UserTable = () => {
  const { users, setUsers } = useUsers();

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
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
          <div className={`w-24 ${!row.original.is_status ? "bg-green-500 rounded-xl" : "bg-red-500"}`}>
            <p className='text-center text-sm text-white'>{!row.original.is_status ? "Active" : "Non Active"}</p>
          </div>
        </>
      ),
    },
    {
      header: "Action",
      cell: (
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
              <a className="block data-[focus]:bg-blue-100" href="/support">
                Disable
              </a>
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
