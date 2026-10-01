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
import toast from "react-hot-toast";

function ProfileAvatar({ user, size = "small" }) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = user?.image || user?.photoURL || "";

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  const sizeClass =
    size === "large"
      ? "h-11 w-11 text-sm"
      : "h-9 w-9 text-sm";

  if (!imageUrl || imageError) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-slate-900 font-semibold text-white ${sizeClass}`}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={user?.name || "User"}
      className={`${sizeClass} shrink-0 rounded-full object-cover`}
      onError={() => setImageError(true)}
    />
  );
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // STATE
  // ==========================================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const profileRef = useRef(null);

  // ==========================================
  // LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  // ==========================================

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // ==========================================
  // CLOSE MOBILE MENU WITH ESC KEY
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ==========================================
  // GET CURRENT USER
  // ==========================================

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data?.user || null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Failed to get current user:",
          error
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [location.pathname]);

  // ==========================================
  // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        console.error(
          "Logout API failed:",
          data
        );

        toast.error(
          data?.message || "Logout failed",
          {
            id: "logout-error",
          }
        );

        return;
      }

      // Clear frontend state
      setUser(null);
      setProfileOpen(false);
      setMobileOpen(false);

      toast.success(
        "Logged out successfully",
        {
          id: "logout-success",
        }
      );

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      toast.error(
        "Something went wrong during logout.",
        {
          id: "logout-error",
        }
      );
    }
  };

  // ==========================================
  // ACTIVE NAVIGATION
  // ==========================================

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) => {
    const active = isActive(path);

    return [
      "flex items-center gap-2.5 rounded-xl px-4 py-2.5",
      "text-sm font-semibold transition-all duration-200",
      active
        ? "bg-blue-50 text-blue-600 shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
    ].join(" ");
  };

  // ==========================================
  // NAVBAR
  // ==========================================

  return (
    <>
      {/* ======================================
          DESKTOP / MAIN NAVBAR
      ====================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-19 items-center justify-between">

            {/* LOGO */}

            <Link
              to="/"
              className="flex shrink-0 items-center"
              onClick={() => {
                setMobileOpen(false);
                setProfileOpen(false);
              }}
            >
              <img
                src="/assets/studyNook.png"
                alt="StudyNook"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* ==================================
                DESKTOP NAVIGATION
            ================================== */}

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

              {/* Private Navigation */}

              {!loading && user && (
                <>
                  {/* Add Room */}

                  <Link
                    to="/add-room"
                    className={navLinkClass(
                      "/add-room"
                    )}
                  >
                    <PlusCircle size={17} />
                    Add Room
                  </Link>

                  {/* My Listings */}

                  <Link
                    to="/my-listings"
                    className={navLinkClass(
                      "/my-listings"
                    )}
                  >
                    <ClipboardList size={17} />
                    My Listings
                  </Link>

                  {/* My Bookings */}

                  <Link
                    to="/my-bookings"
                    className={navLinkClass(
                      "/my-bookings"
                    )}
                  >
                    <CalendarDays size={17} />
                    My Bookings
                  </Link>
                </>
              )}
            </nav>

            {/* ==================================
                DESKTOP AUTH / PROFILE
            ================================== */}

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
                      setProfileOpen(
                        (previous) => !previous
                      )
                    }
                    className={[
                      "flex items-center gap-2 rounded-xl border px-2.5 py-1.5",
                      "transition-all duration-200",
                      profileOpen
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <ProfileAvatar user={user} />

                    <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                      {user.name || "User"}
                    </span>

                    <ChevronDown
                      size={16}
                      className={[
                        "text-slate-500 transition-transform duration-200",
                        profileOpen
                          ? "rotate-180"
                          : "",
                      ].join(" ")}
                    />
                  </button>

                  {/* Profile Dropdown */}

                  {profileOpen && (
                    <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                      {/* User Info */}

                      <div className="border-b border-slate-100 px-4 py-4">
                        <div className="flex items-center gap-3">
                          <ProfileAvatar
                            user={user}
                            size="large"
                          />

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

                        {/* My Listings */}

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

                        {/* My Bookings */}

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

                        {/* Logout */}

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

            {/* ==================================
                MOBILE MENU BUTTON
            ================================== */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ======================================
          MOBILE MENU
      ====================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">

          {/* Mobile Header */}

          <div className="flex h-19 items-center justify-between border-b border-slate-200 px-4 sm:px-6">

            <Link
              to="/"
              onClick={() =>
                setMobileOpen(false)
              }
              className="flex items-center"
            >
              <img
                src="/assets/studyNook.png"
                alt="StudyNook"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Close */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen(false)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile Navigation */}

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <nav className="flex flex-col gap-2">

              {/* Home */}

              <Link
                to="/"
                onClick={() =>
                  setMobileOpen(false)
                }
                className={navLinkClass("/")}
              >
                <HomeIcon size={20} />
                Home
              </Link>

              {/* Rooms */}

              <Link
                to="/rooms"
                onClick={() =>
                  setMobileOpen(false)
                }
                className={navLinkClass("/rooms")}
              >
                <DoorOpen size={20} />
                Rooms
              </Link>

              {/* About */}

              <Link
                to="/about"
                onClick={() =>
                  setMobileOpen(false)
                }
                className={navLinkClass("/about")}
              >
                <Info size={20} />
                About
              </Link>

              {/* Logged In */}

              {!loading && user ? (
                <>
                  {/* Add Room */}

                  <Link
                    to="/add-room"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={navLinkClass(
                      "/add-room"
                    )}
                  >
                    <PlusCircle size={20} />
                    Add Room
                  </Link>

                  {/* My Listings */}

                  <Link
                    to="/my-listings"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={navLinkClass(
                      "/my-listings"
                    )}
                  >
                    <ClipboardList size={20} />
                    My Listings
                  </Link>

                  {/* My Bookings */}

                  <Link
                    to="/my-bookings"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={navLinkClass(
                      "/my-bookings"
                    )}
                  >
                    <CalendarDays size={20} />
                    My Bookings
                  </Link>

                  {/* Mobile User */}

                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <div className="flex items-center gap-3 px-2">
                      <ProfileAvatar
                        user={user}
                        size="large"
                      />

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
                      className="mt-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                /* Mobile Login / Register */

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6">

                  {/* Login */}

                  <Link
                    to="/login"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="w-full rounded-xl border border-slate-200 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Login
                  </Link>

                  {/* Register */}

                  <Link
                    to="/register"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="w-full rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;