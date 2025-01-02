import React, { useState, useEffect } from "react";
import MainFullLogo from '../../components/atoms/MainFullLogo';

const Dashboard = ({children}) => {
  const [isProfilDropdownOpen, setIsProfilDropdownOpen] = useState(false);
  const [openSidebarMenu, setOpenSidebarMenu] = useState("dashboardMenu");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="relative flex min-h-screen bg-gray-100">
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
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : `relative ${!isSidebarOpen ? 'hidden' : ''}`
          }
        `}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-center h-16 md:h-24">
          <MainFullLogo className='h-20'/>
          </div>
        </div>
        <nav className="p-4">
          <button
            className="text-white bg-[#333A48] w-full py-2 rounded flex justify-between px-5 items-center"
            onClick={() => handleShowSidebarMenu("dashboardMenu")}
          >
            <span>Dashboard</span>
            <i
              className={`fa-solid fa-chevron-up transition-transform duration-200 ${
                openSidebarMenu === "dashboardMenu" ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <div>
            <ul
              className={`mt-2 ps-0 space-y-1 transition-all duration-200 list-none ${
                openSidebarMenu === "dashboardMenu" ? "max-h-48" : "max-h-0 overflow-hidden"
              }`}
            >
              {["Languages", "Collections", "DB Locations"].map((item) => (
                <li key={item} className='w-full'>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
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
            <button
              className="px-4 py-2 text-white transition-colors rounded bg-slate-800 hover:bg-slate-950"
              onClick={toggleDropdown}
            >
              Menu
            </button>
            {isProfilDropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg">
                <ul className="py-1 list-none ps-0">
                  {["Profile", "Settings", "Logout"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;