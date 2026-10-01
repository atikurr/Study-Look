import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-blue-500 bg-[#020617] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-4 lg:gap-10">

          {/* ================= BRAND ================= */}
          <div className="col-span-2 text-center lg:col-span-1 lg:text-left">

            <div className="mb-4 flex justify-center lg:mb-5 lg:justify-start">
              <img
                src="/assets/studyNook.png"
                alt="StudyNook"
                className="h-10 w-auto object-contain sm:h-12"
              />
            </div>

            <p className="mx-auto max-w-sm text-xs leading-6 text-slate-400 sm:text-sm lg:mx-0 lg:max-w-xs">
              A simple and reliable platform for finding and booking
              comfortable study spaces.
            </p>

            {/* ================= SOCIAL ICONS ================= */}
            <div className="mt-5 flex items-center justify-center gap-2.5 lg:mt-6 lg:justify-start">

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-bold text-slate-400 transition duration-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition duration-200 hover:border-pink-500 hover:bg-pink-600 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-none stroke-current"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    className="fill-current stroke-none"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition duration-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M6.5 8.2A1.7 1.7 0 1 0 6.5 4.8a1.7 1.7 0 0 0 0 3.4ZM5 9.5h3v9H5v-9Zm5 0h2.9v1.2h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.6v4.8h-3v-4.3c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v4.4H10v-9Z" />
                </svg>
              </a>

              {/* X */}
              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-400 transition duration-200 hover:border-slate-400 hover:bg-slate-700 hover:text-white"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            <h3 className="mb-4 text-sm font-semibold text-white sm:mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-xs sm:space-y-4 sm:text-sm">

              <li>
                <Link
                  to="/"
                  className="transition hover:text-blue-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/rooms"
                  className="transition hover:text-blue-400"
                >
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-blue-400"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition hover:text-blue-400"
                >
                  Register
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= RESOURCES ================= */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            <h3 className="mb-4 text-sm font-semibold text-white sm:mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-xs sm:space-y-4 sm:text-sm">

              <li>
                <Link
                  to="/rooms"
                  className="transition hover:text-blue-400"
                >
                  Browse Rooms
                </Link>
              </li>

              <li>
                <Link
                  to="/add-room"
                  className="transition hover:text-blue-400"
                >
                  List a Room
                </Link>
              </li>

              <li>
                <Link
                  to="/my-bookings"
                  className="transition hover:text-blue-400"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  to="/my-listings"
                  className="transition hover:text-blue-400"
                >
                  My Listings
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          {/* ================= CONTACT ================= */}
<div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">

  <h3 className="mb-4 text-sm font-semibold text-white sm:mb-5">
    Contact Us
  </h3>

  <ul className="space-y-4 text-xs sm:space-y-5 sm:text-sm">

    {/* Phone */}
    <li className="flex items-center justify-center gap-2.5 sm:gap-3 lg:justify-start">
      <Phone
        size={18}
        className="shrink-0 text-blue-500"
      />

      <a
        href="tel:01560017344"
        className="transition hover:text-blue-400"
      >
        01560017344
      </a>
    </li>

    {/* Email */}
    <li className="flex items-center justify-center gap-2.5 sm:gap-3 lg:justify-start">
      <Mail
        size={18}
        className="shrink-0 text-blue-500"
      />

      <a
        href="mailto:info@studynook.com"
        className="transition hover:text-blue-400"
      >
        info@studynook.com
      </a>
    </li>

    {/* Address */}
    <li className="flex items-center justify-center gap-2.5 sm:gap-3 lg:justify-start">
      <MapPin
        size={18}
        className="shrink-0 text-blue-500"
      />

      <span>
        Gazipur, Dhaka, Bangladesh
      </span>
    </li>

  </ul>
</div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:mt-10 sm:pt-7 lg:flex-row lg:items-center lg:justify-between">

          <p className="text-center text-[11px] text-slate-500 sm:text-xs lg:text-left">
            © 2026 StudyNook. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 lg:justify-end">

            <a
              href="#"
              className="text-[11px] text-slate-500 transition hover:text-slate-300 sm:text-xs"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-[11px] text-slate-500 transition hover:text-slate-300 sm:text-xs"
            >
              Terms of Service
            </a>

            {/* Back To Top */}
            <a
              href="#"
              aria-label="Back to top"
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition duration-200 hover:border-blue-500 hover:text-blue-400"
            >
              <ArrowUpRight size={15} />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;