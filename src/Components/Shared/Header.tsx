/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { FiLogOut, FiUser, FiBell } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BiCaretDown } from "react-icons/bi";
import SignoutModal from "../Dialog/SignoutModal";

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  Cookies.remove("accessToken");
  if (typeof window !== "undefined") {
    // Note: window.location.reload() might prevent the redirect from finishing
    // depending on browser timing. Usually, one is enough.
    window.location.href = "/login";
  }
};

function Header() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const user = {
    name: "User Name",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
    role: "Admin",
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="flex h-20 px-8 rounded-xl items-center bg-background ">
      <div className="ml-auto flex items-center space-x-6">
        <div
          onClick={() => navigate("/notification")}
          className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FiBell className="h-6 w-6 text-foreground" />
        </div>

        <div className="relative flex items-center" ref={profileRef}>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-base font-bold text-foreground tracking-wide">
                {user?.name}
              </span>
              <div className="mt-0.5 text-core-primary  text-sm  font-medium">
                {"ADMIN"}
              </div>
            </div>

            <button
              onClick={toggleProfile}
              className="ml-2 bg-white px-1 py-0.5 rounded-lg focus:outline-none transition-transform active:scale-95 cursor-pointer"
            >
              <BiCaretDown
                className={`h-6 w-6 text- transition-transform duration-200 ${
                  isProfileOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-foreground">
                  {user?.name}
                </p>
                <p className="text-xs text-muted truncate">ab@example.com</p>
              </div>
              <Link
                to="/profile-setting"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                <FiUser className="mr-3 h-5 w-5 text-muted" />
                <span>My Profile</span>
              </Link>
              <div className="border-t border-gray-100"></div>

              {/* 3. Update "Sign out" button to open modal */}
              <button
                onClick={() => {
                  setIsProfileOpen(false); // Close dropdown
                  setIsLogoutModalOpen(true); // Open modal
                }}
                className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 cursor-pointer duration-300 flex items-center"
              >
                <FiLogOut className="mr-3 h-5 w-5 text-danger" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Add the LogoutModal component here */}
      <SignoutModal
        isModalOpen={isLogoutModalOpen}
        setIsModalOpen={setIsLogoutModalOpen}
        onLogout={handleLogout}
      />
    </header>
  );
}

export default Header;
