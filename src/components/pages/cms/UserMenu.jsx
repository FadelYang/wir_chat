import React, { useEffect, useState } from "react";
import HeaderMenu from "../../organism/cms/HeaderMenu";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";
import UserTable from "../../organism/cms/datatables/UserTable";
import BaseModal from "../../molecules/BaseModal";
import { db } from "../../../firebase/firebase";
import { registerUser } from "../../../firebase/userService";
import { useUsers } from "../../../context/UserContext";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckPasswordPass, setIsCheckPasswordPass] = useState(true);
  const [isAdminConfirmationModalOpen, setIsAdminConfirmationModalOpen] =
    useState(false);
  const { addUser, setUsers } = useUsers();
  const [formData, setFormData] = useState({
    email: "",
    role: "superadmin",
    password: "",
    checkPassword: "",
    adminPassword: "",
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
  }, [formData.password, formData.checkPassword]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = async () => {
    console.log({
      "submitted data": formData,
    });

    if (
      !formData.email ||
      !formData.password ||
      !formData.checkPassword ||
      !formData.role ||
      !formData.adminPassword
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.adminPassword) {
      alert("Please enter your admin password");
      return;
    }

    const isConfirm = window.confirm(
      "Are you sure? Please check the input again before submitting"
    );
    if (!isConfirm) return;

    setIsSubmitting(true);

    try {
      const response = await registerUser(
        formData.email,
        formData.password,
        formData.role,
        formData.adminPassword
      );

      alert("Success! User created.");
      addUser({ email: formData.email, role: formData.role });

      setFormData({
        email: "",
        password: "",
        checkPassword: "",
        adminPassword: "",
      });

      setIsCreateUserModalOpen(false);
    } catch (error) {
      alert("Failed to add new user: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminConfirm = async (event) => {
    event.preventDefault();

    await handleFormSubmit();
    setIsAdminConfirmationModalOpen(false);
  };

  return (
    <DashboardTemplate>
      <HeaderMenu name={"Users"} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm text-white bg-gray-900 rounded hover:bg-gray-950"
            onClick={() => {
              setIsCreateUserModalOpen(true);
              setFormData({
                email: "",
                password: "",
                checkPassword: "",
                adminPassword: "",
                role: "superadmin",
              });
            }}
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsAdminConfirmationModalOpen(true);
                setIsCreateUserModalOpen(false);
              }}
              encType="multipart/form-data"
            >
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
                  <p className="mt-1 text-red-500 text-xs">
                    Password not match
                  </p>
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
                  type="submit"
                >
                  Add new user
                </button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}

      {isAdminConfirmationModalOpen && (
        <BaseModal>
          <div>
            <div className="flex justify-between mb-5 font-bold text-md">
              <h1>Credential check</h1>
              <button
                onClick={() => {
                  setIsAdminConfirmationModalOpen(false);
                  setIsCreateUserModalOpen(true);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleAdminConfirm} encType="multipart/form-data">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="adminPassword"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="adminPassword"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleFormChange}
                  type="password"
                  placeholder="Enter your account password"
                  required
                />
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
