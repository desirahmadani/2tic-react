import { BiErrorAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { MdFastfood } from "react-icons/md";


export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${
          isActive
            ? "text-hijau bg-green-200 font-extrabold"
            : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins-extrabold text-[48px] text-gray-900"
        >
          Sedap{" "}
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <MdDashboard className="mr-4 text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <AiOutlineBars className="mr-4 text-xl" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="customers" className={menuClass}>
              <FaUsers className="mr-4 text-xl" />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-4" to="users" className={menuClass}>
              <FaUsers className="mr-4 text-xl" />
              <span>Users</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink id="menu-4" to="List Menu" className={menuClass}>
              <FaUsers className="mr-4 text-xl" />
              <span>List Menu</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/error/400" className={menuClass}>
              <BiErrorAlt className="mr-4 text-xl" />
              Error 400
            </NavLink>
          </li>
          <li>
            <NavLink to="/error/401" className={menuClass}>
              <BiErrorAlt className="mr-4 text-xl" />
              Error 401
            </NavLink>
          </li>
          <li>
            <NavLink to="/error/403" className={menuClass}>
              <BiErrorAlt className="mr-4 text-xl" />
              Error 403
            </NavLink>
          </li>
        </ul>
      </div>
      <li>
        <NavLink id="menu-4" to="/products" className={menuClass}>
          <MdFastfood className="mr-4 text-xl" />
          Products
        </NavLink>
      </li>
      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-text" className="text-white text-sm">
            <span>Please organize your menus through button below!</span>
            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2"
            >
              <span className="text-gray-600 flex items-center">Add Menus</span>
            </div>
          </div>
          <img
            id="footer-avatar"
            className="w-20 rounded-full"
            src="https://avatar.iran.liara.run/public/28"
          />
        </div>
        <span id="footer-brand" className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>
        <p id="footer-copyright" className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
