import {
  LuLayoutDashboard,
  LuClipboardList,
  LuUserSearch,
  LuUsers,
} from "react-icons/lu";
import {
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { PiHexagonBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import type { ReactNode } from "react";
import { MdBlock } from "react-icons/md";

export interface ISidebarLink {
  path?: string;
  label: string;
  icon?: ReactNode;
  children?: ISidebarLink[];
}

export const sidebarLinks: ISidebarLink[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: <LuLayoutDashboard size={22} />,
  },
  {
    path: "/order-request",
    label: "Order Request",
    icon: <LuClipboardList size={22} />,
  },
  {
    path: "/completed-order",
    label: "Completed Order",
    icon: <HiOutlineCheckCircle size={22} />,
  },
  {
    path: "/canceled-order",
    label: "Canceled Order",
    icon: <MdBlock size={22} />, // Represents the blocked/canceled icon
  },
  {
    path: "/user-management",
    label: "User Management",
    icon: <HiOutlineUser size={22} />,
  },
  {
    path: "/new-supplier-request",
    label: "New Supplier Request",
    icon: <LuUserSearch size={22} />,
  },
  {
    path: "/supplier-management",
    label: "Supplier Management",
    icon: <LuUsers size={22} />,
  },
  {
    path: "/admin-management",
    label: "Admin Management",
    icon: <HiOutlineUserCircle size={22} />,
  },
  {
    label: "Settings",
    icon: <PiHexagonBold size={22} />, // Matching the hexagonal settings icon
    children: [
      {
        path: "/support-help",
        label: "Support & Help",
        icon: <GoDotFill size={14} className="text-gray-400" />,
      },
      {
        path: "/terms-conditions",
        label: "Terms & Conditions",
        icon: <GoDotFill size={14} className="text-gray-400" />,
      },
      {
        path: "/privacy-policy",
        label: "Privacy & Policy",
        icon: <GoDotFill size={14} className="text-gray-400" />,
      },
    ],
  },
];
