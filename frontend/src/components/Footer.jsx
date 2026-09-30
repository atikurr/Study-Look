import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              StudyNook
            </Link>

            <p className="mt-4 max-w-sm leading-7 text-slate-500">
              A simple and reliable platform for finding and booking
              comfortable study spaces.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:bg-slate-900 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:bg-slate-900 hover:text-white"
              >
                ig
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:bg-slate-900 hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:bg-slate-900 hover:text-white"
              >
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/rooms"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-slate-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/rooms"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  Browse Rooms
                </Link>
              </li>

              <li>
                <Link
                  to="/add-room"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  List a Room
                </Link>
              </li>

              <li>
                <Link
                  to="/my-bookings"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  to="/my-listings"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  My Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-slate-600"
                />

                <p className="leading-6 text-slate-500">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={19}
                  className="shrink-0 text-slate-600"
                />

                <a
                  href="mailto:hello@studynook.com"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  hello@studynook.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={19}
                  className="shrink-0 text-slate-600"
                />

                <a
                  href="tel:+8801000000000"
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  +880 1000-000000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition hover:text-slate-900"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-slate-900"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;