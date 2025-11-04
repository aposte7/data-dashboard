import clsx from "clsx";
import { BarChart2, DownloadCloud, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: <BarChart2 className="h-5 w-5" />,
    end: true,
  },
  {
    to: "/scrap",
    label: "Scrap Data",
    icon: <DownloadCloud className="h-5 w-5" />,
  },
  {
    to: "/products",
    label: "Products",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
];

function SidebarNav({ onNavigate, toggleId }) {
  return (
    <nav className="space-y-2.5 p-2">
      {navItems.map((n) => {
        const link = (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                isActive
                  ? "bg-primary-600 text-white"
                  : "text-gray-700 hover:bg-gray-100",
              )
            }
          >
            <span className="text-base">{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        );
        return toggleId ? (
          <label key={n.to} htmlFor={toggleId} className="block">
            {link}
          </label>
        ) : (
          link
        );
      })}
    </nav>
  );
}

export default SidebarNav;
