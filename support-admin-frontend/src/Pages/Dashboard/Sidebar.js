
import React from "react";
import { Home, CalendarDays, Plane, LifeBuoy, Settings, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoLarge from "../../Assets/Images/logo.png";

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: <Home />, label: "Dashboard", path: "/dashboard" },
    { icon: <CalendarDays />, label: "Bookings", path: "/bookings" },
    { icon: <Plane />, label: "Flights", path: "/flights" },
    { icon: <LifeBuoy />, label: "Support", path: "/support" },
    { icon: <Settings />, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-full bg-white text-black shadow-lg transition-all duration-300 z-50 
        ${isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"}`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-center h-20 border-b border-gray-200 px-4 relative">
          {isSidebarOpen ? (
            <img src={logoLarge} alt="Company Logo" className="h-10 w-auto" />
          ) : (
            <button
              className="md:hidden text-gray-600 absolute right-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="mt-6 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link to={item.path} key={index} className="block">
                <div
                  className={`flex items-center px-6 py-3 rounded-md mx-2 
                  transition-all duration-200 cursor-pointer 
                  ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                >
                  {/* Slightly smaller icon in collapsed state */}
                  <div className="flex-shrink-0">
                    {React.cloneElement(item.icon, { size: isSidebarOpen ? 18 : 22 })}
                  </div>
                  {isSidebarOpen && <span className="ml-4">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
