import React, {useState} from "react";
import MainFullLogo from "../components/atoms/MainFullLogo";

const Dashboard = () => {
  const [isProfilDropdownOpen, setIsProfilDropdownOpen] = useState(false);
  const [openSidebarMenu, setOpenSidebarMenu] = useState("dashboardMenu");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDropdown = () => {
    setIsProfilDropdownOpen(!isProfilDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShowSidebarMenu = (key) => {
    if (openSidebarMenu === key) {
      setOpenSidebarMenu(null);
    } else {
      setOpenSidebarMenu(key);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="p-4 border-b">
          <MainFullLogo className="h-24" />
        </div>
        <nav className="p-4">
          <button
            className="text-white bg-[#333A48] w-full py-2 rounded flex justify-between px-5 items-center"
            onClick={() => handleShowSidebarMenu("dashboardMenu")}
          >
            Dashboard
            <i
              className={`fa-solid fa-chevron-up ${
                openSidebarMenu === "dashboardMenu"
                  ? "fa-rotate-180"
                  : "fa-rotate-0"
              }`}
            ></i>
          </button>
          <div key="dashboardMenu">
            <ul
              className={`list-none ${
                openSidebarMenu === "dashboardMenu" ? "block" : "hidden"
              }`}
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Languages
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  DB Locations
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <div>
            <button
              className="flex justify-end w-full"
              onClick={() => toggleSidebar()}
            >
              <i
                className={`fa-solid fa-arrow-right ${
                  isSidebarOpen ? "fa-rotate-180" : ""
                }`}
              ></i>
            </button>
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 text-white rounded bg-slate-800 hover:bg-slate-950"
              onClick={toggleDropdown}
            >
              Menu
            </button>
            {isProfilDropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg">
                <ul className="py-1 list-none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 p-6">
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white rounded shadow-md">Card 1</div>
            <div className="p-4 bg-white rounded shadow-md">Card 2</div>
            <div className="p-4 bg-white rounded shadow-md">Card 3</div>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
