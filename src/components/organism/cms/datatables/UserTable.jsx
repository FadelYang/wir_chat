import { useEffect } from "react";
import { getUsers } from "../../../../firebase/userService";
import BaseTable from "./BaseTable";
import { useUsers } from "../../../../context/UserContext";

const UserTable = () => {
  const {users, setUsers} = useUsers();

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  });

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
      header: "Action",
      cell: <button>Dummy action</button>,
    },
  ];

  return (
    <>
      <BaseTable data={users} columns={userTableDefinition} />
    </>
  );
};

export default UserTable;
