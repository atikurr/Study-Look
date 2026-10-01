import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-blue-500 bg-[#020617] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img
                src="/assets/studyNook.png"
                alt="StudyNook"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="max-w-xs text-sm leading-6 text-slate-400">
              A simple and reliable platform for finding
              and booking comfortable study spaces.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition hover:border-pink-500 hover:bg-pink-600 hover:text-white"
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
                  <circle cx="12" cy="12" r="4" />
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-400 transition hover:border-slate-400 hover:bg-slate-700 hover:text-white"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/"
                  className="transition hover:text-blue-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/rooms"
                  className="transition hover:text-blue-400"
                >
                  Rooms
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="transition hover:text-blue-400"
                >
                  Login
                </a>
              </li>

              <li>
                <a
                  href="/register"
                  className="transition hover:text-blue-400"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/rooms"
                  className="transition hover:text-blue-400"
                >
                  Browse Rooms
                </a>
              </li>

              <li>
                <a
                  href="/add-room"
                  className="transition hover:text-blue-400"
                >
                  List a Room
                </a>
              </li>

              <li>
                <a
                  href="/my-bookings"
                  className="transition hover:text-blue-400"
                >
                  My Bookings
                </a>
              </li>

              <li>
                <a
                  href="/my-listings"
                  className="transition hover:text-blue-400"
                >
                  My Listings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <span>
                  Gazipur,Dhaka, Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <a
                  href="mailto:hello@studynook.com"
                  className="transition hover:text-blue-400"
                >
                  info@studynook.com
                </a>
              </li>

              <li className="flex items-center gap-3">
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
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-5 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © 2026 StudyNook. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-blue-500 hover:text-blue-400"
              aria-label="Back to top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
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