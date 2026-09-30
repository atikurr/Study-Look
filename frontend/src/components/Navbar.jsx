import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Menu,
  X,
  Home as HomeIcon,
  DoorOpen,
  PlusCircle,
  ClipboardList,
  CalendarDays,
  Info,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const profileRef = useRef(null);

  // Get current logged-in user
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to get current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [location.pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      const response = await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.error("Logout failed");
        return;
      }

      setUser(null);
      setProfileOpen(false);
      setMobileOpen(false);

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
    }
  };

  // Check active route
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  // Navigation link styles
  const navLinkClass = (path) => {
    const active = isActive(path);

    return `
      flex items-center gap-2 rounded-xl px-3.5 py-2.5
      text-sm font-semibold transition-all duration-200
      ${
        active
          ? "bg-blue-50 text-blue-600 shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }
    `;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-[76px] items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/assets/studyNook.png"
              alt="StudyNook"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">

            {/* Home */}
            <Link
              to="/"
              className={navLinkClass("/")}
            >
              <HomeIcon size={17} />
              Home
            </Link>

            {/* Rooms */}
            <Link
              to="/rooms"
              className={navLinkClass("/rooms")}
            >
              <DoorOpen size={17} />
              Rooms
            </Link>

            {/* About */}
            <Link
              to="/about"
              className={navLinkClass("/about")}
            >
              <Info size={17} />
              About
            </Link>

            {/* Private Navigation */}
            {!loading && user && (
              <>
                {/* Add Room */}
                <Link
                  to="/add-room"
                  className={navLinkClass("/add-room")}
                >
                  <PlusCircle size={17} />
                  Add Room
                </Link>

                {/* My Listings */}
                <Link
                  to="/my-listings"
                  className={navLinkClass("/my-listings")}
                >
                  <ClipboardList size={17} />
                  My Listings
                </Link>

                {/* My Bookings */}
                <Link
                  to="/my-bookings"
                  className={navLinkClass("/my-bookings")}
                >
                  <CalendarDays size={17} />
                  My Bookings
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-3 md:flex">

            {!loading && user ? (
              <div
                ref={profileRef}
                className="relative"
              >

                {/* Profile Button */}
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((previous) => !previous)
                  }
                  className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition ${
                    profileOpen
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {user.image || user.photoURL ? (
                    <img
                      src={user.image || user.photoURL}
                      alt={user.name || "User"}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}

                  <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                    {user.name || "User"}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                    {/* User Info */}
                    <div className="border-b border-slate-100 px-4 py-4">
                      <div className="flex items-center gap-3">

                        {user.image || user.photoURL ? (
                          <img
                            src={
                              user.image || user.photoURL
                            }
                            alt={user.name || "User"}
                            className="h-11 w-11 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {user.name || "User"}
                          </p>

                          <p className="truncate text-sm text-slate-500">
                            {user.email}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Dropdown Links */}
                    <div className="p-2">

                      <Link
                        to="/my-listings"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <ClipboardList size={17} />
                        My Listings
                      </Link>

                      <Link
                        to="/my-bookings"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <CalendarDays size={17} />
                        My Bookings
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>

                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  to="/register"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() =>
              setMobileOpen((previous) => !previous)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <nav className="flex flex-col gap-1">

              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={navLinkClass("/")}
              >
                <HomeIcon size={18} />
                Home
              </Link>

              {/* Rooms */}
              <Link
                to="/rooms"
                onClick={() => setMobileOpen(false)}
                className={navLinkClass("/rooms")}
              >
                <DoorOpen size={18} />
                Rooms
              </Link>

              {/* About */}
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={navLinkClass("/about")}
              >
                <Info size={18} />
                About
              </Link>

              {!loading && user ? (
                <>
                  {/* Add Room */}
                  <Link
                    to="/add-room"
                    onClick={() => setMobileOpen(false)}
                    className={navLinkClass("/add-room")}
                  >
                    <PlusCircle size={18} />
                    Add Room
                  </Link>

                  {/* My Listings */}
                  <Link
                    to="/my-listings"
                    onClick={() => setMobileOpen(false)}
                    className={navLinkClass("/my-listings")}
                  >
                    <ClipboardList size={18} />
                    My Listings
                  </Link>

                  {/* My Bookings */}
                  <Link
                    to="/my-bookings"
                    onClick={() => setMobileOpen(false)}
                    className={navLinkClass("/my-bookings")}
                  >
                    <CalendarDays size={18} />
                    My Bookings
                  </Link>

                  {/* Mobile User */}
                  <div className="mt-3 border-t border-slate-200 pt-4">

                    <div className="flex items-center gap-3 px-3">
                      {user.image || user.photoURL ? (
                        <img
                          src={
                            user.image || user.photoURL
                          }
                          alt={user.name || "User"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {user.name || "User"}
                        </p>

                        <p className="truncate text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                </>
              ) : (
                /* Guest Mobile Actions */
                <div className="mt-3 flex gap-3 border-t border-slate-200 pt-4">

                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    Register
                  </Link>

                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;