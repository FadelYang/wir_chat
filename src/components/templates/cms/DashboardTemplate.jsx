import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainFullLogo from "../../atoms/MainFullLogo";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import gearIcon from "/gear-solid.svg";
import { getLoggedUserRole } from "../../../firebase/userService";
import { useAuth } from "../../../context/AuthContext";

const DashboardTemplate = ({ children }) => {
  const [isProfilDropdownOpen, setIsProfilDropdownOpen] = useState(false);
  const { currentUserRole, setCurrentUserRole } = useAuth();
  const [openSidebarMenu, setOpenSidebarMenu] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("openSidebarMenu")) || ["dashboardMenu"]
    );
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const loggedUserRole = await getLoggedUserRole();
        setCurrentUserRole(loggedUserRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirm = confirm("Are you sure?");

    if (isConfirm) {
      signOut(auth)
        .then(() => {
          navigate("/");
          alert("Success Logout");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pathName = window.location.pathname;
    setSelectedRoute(pathName);
  }, []);

  const toggleDropdown = () => {
    setIsProfilDropdownOpen(!isProfilDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShowSidebarMenu = (menuKey) => {
    setOpenSidebarMenu((prevMenus) => {
      const updatedMenus = prevMenus.includes(menuKey)
        ? prevMenus.filter((key) => key !== menuKey)
        : [...prevMenus, menuKey];

      localStorage.setItem("openSidebarMenu", JSON.stringify(updatedMenus));
      return updatedMenus;
    });
  };

  return (
    <div className="relative flex min-h-screen">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          w-64 bg-white shadow-md
          ${
            isMobile
              ? `fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : `relative ${!isSidebarOpen ? "hidden" : ""}`
          }
        `}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-center h-16 md:h-24">
            <MainFullLogo className="h-20" />
          </div>
        </div>
        <nav>
          <ul className="mt-2 mb-2 space-y-1 ps-0">
            <li className="w-full">
              <Link
                to={`/dashboard`}
                className={`block px-8 py-2 ${
                  selectedRoute === "/dashboard"
                    ? "text-black"
                    : "text-gray-700"
                } transition-colors rounded hover:bg-gray-200`}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col gap- 0 px-4">
          <nav className="">
            <button
              className="text-white bg-[#333A48] w-full py-2 rounded flex justify-between px-5 items-center"
              onClick={() => handleShowSidebarMenu("dashboardMenu")}
            >
              <span>Main Menu</span>
              <i
                className={`fa-solid fa-chevron-up transition-transform duration-200 ${
                  openSidebarMenu.indexOf("dashboardMenu") !== -1
                    ? "rotate-180"
                    : "rotate-0"
                }`}
              />
            </button>
            <div>
              <ul
                className={`mt-2 ps-0 space-y-1 transition-all duration-200 list-none ${
                  openSidebarMenu.indexOf("dashboardMenu") !== -1
                    ? "max-h-48"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                <li className="w-full">
                  <Link
                    to={`/dashboard/languages`}
                    className={`block px-4 py-2 ${
                      selectedRoute === "/dashboard/languages"
                        ? "text-black"
                        : "text-gray-700"
                    } transition-colors rounded hover:bg-gray-200`}
                  >
                    Languages
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to={`/dashboard/collections`}
                    className={`block px-4 py-2 ${
                      selectedRoute === "/dashboard/collections"
                        ? "text-black"
                        : "text-gray-700"
                    } transition-colors rounded hover:bg-gray-200`}
                  >
                    Collections
                  </Link>
                </li>
                {/* <li className="w-full">
                <Link
                  to={`/dashboard/databases`}
                  className={`block px-4 py-2 ${
                    selectedRoute === "/dashboard/databases"
                      ? "text-black"
                      : "text-gray-700"
                  } transition-colors rounded hover:bg-gray-200`}
                >
                  DB Locations
                </Link>
              </li> */}
              </ul>
            </div>
          </nav>
          {currentUserRole === "superadmin" && (
            <nav className="">
              <button
                className="text-white bg-[#333A48] w-full py-2 rounded flex justify-between px-5 items-center"
                onClick={() => handleShowSidebarMenu("userManagementMenu")}
              >
                <span>Users Management</span>
                <i
                  className={`fa-solid fa-chevron-up transition-transform duration-200 ${
                    openSidebarMenu.indexOf("userManagementMenu") !== -1
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                />
              </button>
              <div>
                <ul
                  className={`mt-2 ps-0 space-y-1 transition-all duration-200 list-none ${
                    openSidebarMenu.indexOf("userManagementMenu") !== -1
                      ? "max-h-48"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  <li className="w-full">
                    <Link
                      to={`/dashboard/users`}
                      className={`block px-4 py-2 ${
                        selectedRoute === "/dashboard/users"
                          ? "text-black"
                          : "text-gray-700"
                      } transition-colors rounded hover:bg-gray-200`}
                    >
                      Users
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white shadow-md md:px-6">
          <div>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <i
                className={`fa-solid fa-arrow-right transition-transform ${
                  isSidebarOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          <div className="relative">
            <div
              className={`flex justify-end hover:cursor-pointer`}
              onClick={toggleDropdown}
            >
              <img
                src={gearIcon}
                alt=""
                className={`w-5 h-5 transition-transform duration-300 ${
                  isProfilDropdownOpen ? "rotate-45" : "-rotate-45"
                }`}
              />
            </div>
            {isProfilDropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg">
                <ul className="py-1 list-none ps-0">
                <li
                    className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 hover:cursor-pointer"
                  >
                    <Link to={`/dashboard/users/${user.uid}`}>Profil</Link>
                  </li>
                  <li
                    className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => handleLogout()}
                  >
                    <button>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 bg-gray-50 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardTemplate;
