import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom"; // Fixed import
import { FiChevronDown } from "react-icons/fi";
import { sidebarLinks } from "./SidebarLink";

const Sidebar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Auto-open submenu if a child path is active
  useEffect(() => {
    sidebarLinks.forEach((item) => {
      if (item.children?.some((child) => location.pathname === child.path)) {
        setOpenSubmenu(item.label);
      }
    });
  }, [location.pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div className="px-4 pb-10 flex flex-col gap-2 sidebar pt-4">
      {sidebarLinks.map((item) => {
        const hasChildren = item.children && item.children.length > 0;

        if (!hasChildren) {
          return (
            <NavLink
              key={item.label}
              to={item.path || "#"}
              className={({ isActive }) =>
                `flex items-center gap-4 h-14 px-5 rounded-lg font-bold transition-all ${
                  isActive
                    ? "bg-primary text-foreground" // Active blue color from your design
                    : "bg-transparent text-foreground hover:bg-primary/50"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base">{item.label}</span>
            </NavLink>
          );
        }

        // Accordion for items with children (Settings)
        const isSubmenuOpen = openSubmenu === item.label;

        return (
          <div key={item.label} className="flex flex-col">
            <button
              onClick={() => toggleSubmenu(item.label)}
              className={`flex items-center justify-between h-14 px-5 rounded-sm font-bold transition-all cursor-pointer ${
                isSubmenuOpen
                  ? "bg-primary text-foreground"
                  : "bg-white text-foreground"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </div>
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  isSubmenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Submenu Items */}
            <div
              className={`overflow-hidden transition-all duration-300 flex flex-col bg-white rounded-b-sm `}
              style={{
                maxHeight: isSubmenuOpen
                  ? `${item.children!.length * 60}px`
                  : "0",
              }}
            >
              {item.children?.map((child) => {
                const isChildActive = location.pathname === child.path;
                return (
                  <NavLink
                    key={child.label}
                    to={child.path || "#"}
                    className={`flex items-center justify-center h-12 text-md font-semibold transition-all border-t border-gray-50 hover:bg-primary/50 ${
                      isChildActive
                        ? "bg-primary/50 text-foreground" // Active state for sub-item
                        : "text-foreground hover:bg-gray-50"
                    }`}
                  >
                    {child.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
