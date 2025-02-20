import React, { useEffect, useState } from "react";
import HeaderMenu from "../../organism/cms/HeaderMenu";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";
import UserTable from "../../organism/cms/datatables/UserTable";
import BaseModal from "../../molecules/BaseModal";
import { createUser } from "../../../firebase/userService";
import { useUsers } from "../../../context/UserContext";

const UserMenu = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckPasswordPass, setIsCheckPasswordPass] = useState(true);
  const { addUser } = useUsers();
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    password: "",
    checkPassword: "",
  });
  const breadcrumbPath = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/dashboard/users" },
  ];

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsCheckPasswordPass(formData.password === formData.checkPassword);
  }, [formData.password, formData.checkPassword])

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.checkPassword) {
      alert("Please fill in all required fielnds");
      return;
    }

    const isConfirm = window.confirm(
      "Are you sure? Please check the input again before submitting"
    );

    if (!isConfirm) return;

    try {
      setIsSubmitting(true);

      const createUserFormData = new FormData();
      createUserFormData.append("email", formData.email);
      createUserFormData.append("password", formData.password);

      const response = await createUser(email, password);

      if ((!response, ok)) {
        throw new Error(`error ${response.status}, failed create a new user`);
      }

      alert("Success, create a new user");

      setFormData({
        email: "",
        password: "",
        checkPassword: "",
      });
      setIsCreateUserModalOpen(false);
      addUser({ email: formData.email, role: formData.role });
    } catch (error) {}
  };

  return (
    <DashboardTemplate>
      <HeaderMenu name={"Users"} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm text-white bg-gray-900 rounded hover:bg-gray-950"
            onClick={() => setIsCreateUserModalOpen(true)}
          >
            Create new user
          </button>
        </div>
        <div className="mt-5">
          <UserTable />
        </div>
      </div>

      {isCreateUserModalOpen && (
        <BaseModal>
          <div>
            <div className="flex justify-between mb-5 font-bold text-md">
              <h1>Add new collection</h1>
              <button onClick={() => setIsCreateUserModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  type="password"
                  placeholder="password"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="checkPassword"
                >
                  Enter password again
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="checkPassword"
                  name="checkPassword"
                  value={formData.checkPassword}
                  onChange={handleFormChange}
                  type="password"
                  placeholder="Enter password again"
                  required
                />
                {!isCheckPasswordPass && (
                  <p className='mt-1 text-red-500 text-xs'>Password not match</p>
                )}
              </div>
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
                    value={formData.role}
                    onChange={handleFormChange}
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
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding new user..." : "Add new user"}
                </button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}
    </DashboardTemplate>
  );
};

export default UserMenu;
