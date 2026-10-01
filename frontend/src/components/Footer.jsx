import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* ==========================================
          TOP ACCENT
      ========================================== */}

      <div className="h-1 w-full bg-blue-600" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==========================================
            MAIN FOOTER
        ========================================== */}

        <div className="grid gap-12 border-b border-white/10 py-14 text-center sm:py-16 md:grid-cols-2 md:text-left lg:grid-cols-4 lg:gap-10">
          {/* ========================================
              BRAND
          ======================================== */}

          <div className="md:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold shadow-lg shadow-blue-600/20">
                S
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                Study<span className="text-blue-500">Nook</span>
              </span>
            </Link>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-400 md:mx-0">
              A simple and reliable platform for
              finding and booking comfortable study
              spaces.
            </p>

            {/* Social Links */}

            <div className="mt-6 flex justify-center gap-2.5 md:justify-start">
              {/* Facebook */}

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              {/* Instagram */}

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-tight text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                IG
              </a>

              {/* LinkedIn */}

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                in
              </a>

              {/* X */}

              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                X
              </a>
            </div>
          </div>

          {/* ========================================
              QUICK LINKS
          ======================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/rooms"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* ========================================
              RESOURCES
          ======================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/rooms"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Browse Rooms
                </Link>
              </li>

              <li>
                <Link
                  to="/add-room"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  List a Room
                </Link>
              </li>

              <li>
                <Link
                  to="/my-bookings"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  to="/my-listings"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  My Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* ========================================
              CONTACT
          ======================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">
              {/* Location */}

              <div className="flex flex-col items-center gap-2 md:flex-row md:items-start">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <p className="text-sm leading-6 text-slate-400">
                  Dhaka, Bangladesh
                </p>
              </div>

              {/* Email */}

              <div className="flex flex-col items-center gap-2 md:flex-row">
                <Mail
                  size={17}
                  className="shrink-0 text-blue-500"
                />

                <a
                  href="mailto:hello@studynook.com"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  hello@studynook.com
                </a>
              </div>

              {/* Phone */}

              <div className="flex flex-col items-center gap-2 md:flex-row">
                <Phone
                  size={17}
                  className="shrink-0 text-blue-500"
                />

                <a
                  href="tel:+8801000000000"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  +880 1000-000000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            BOTTOM FOOTER
        ========================================== */}

        <div className="flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} StudyNook.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Terms of Service
            </a>

            <Link
              to="/"
              aria-label="Back to home"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-200 hover:bg-white hover:text-slate-950"
            >
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;