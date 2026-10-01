import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  CalendarDays,
  Sparkles,
  ChevronDown,
} from "lucide-react";

function HomeHero() {
  return (
    <section className="relative min-h-[680px] overflow-hidden">

      {/* ========================================
          BACKGROUND IMAGE
      ======================================== */}
      <img
        src="/assets/hero-banner.png"
        alt="Modern StudyNook study space"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-center
        "
      />

      {/* ========================================
          LIGHTER GRADIENT OVERLAY
      ======================================== */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-slate-950/65
          via-slate-950/30
          to-transparent
        "
      />

      {/* Small overall overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Bottom fade */}
      <div
        className="
          absolute inset-x-0 bottom-0
          h-32
          bg-gradient-to-t
          from-slate-950/35
          to-transparent
        "
      />

      {/* ========================================
          CONTENT
      ======================================== */}
      <div
        className="
          relative z-10
          mx-auto
          flex min-h-[680px]
          max-w-7xl
          items-center
          px-4 py-20
          sm:px-6
          lg:px-8
        "
      >
        <div className="max-w-3xl text-white">

          {/* ========================================
              BADGE
          ======================================== */}
          <div
            className="
              mb-6
              inline-flex items-center gap-2
              rounded-full
              border border-white/25
              bg-slate-950/20
              px-4 py-2
              text-sm font-medium
              text-white
              shadow-lg
              backdrop-blur-md
            "
          >
            <Sparkles
              size={16}
              className="text-blue-300"
            />

            <span>
              SMART STUDY
            </span>

            <span className="text-white/50">
              •
            </span>

            <span className="text-blue-200">
              BETTER FOCUS
            </span>
          </div>

          {/* ========================================
              HEADING
          ======================================== */}
          <h1
            className="
              text-5xl
              font-extrabold
              leading-[1.05]
              tracking-tight
              drop-shadow-lg
              sm:text-6xl
              lg:text-7xl
            "
          >
            Your Perfect Space to

            <span className="mt-2 block">

              <span className="text-blue-400">
                Study,
              </span>

              {" "}

              <span className="text-emerald-400">
                Focus
              </span>

              {" "}

              <span className="text-orange-300">
                & Create.
              </span>

            </span>
          </h1>

          {/* ========================================
              DESCRIPTION
          ======================================== */}
          <p
            className="
              mt-7
              max-w-2xl
              text-base
              leading-7
              text-white/90
              drop-shadow-md
              sm:text-lg
            "
          >
            Discover comfortable study rooms designed for
            focused learning, productive work, and meaningful
            collaboration. Find a space that fits your schedule
            and book it in just a few clicks.
          </p>

          {/* ========================================
              CTA BUTTONS
          ======================================== */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            {/* Explore Rooms */}
            <Link
              to="/rooms"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-6 py-3.5
                text-sm font-bold
                text-white
                shadow-xl
                shadow-blue-900/30
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-blue-500
                hover:shadow-2xl
              "
            >
              <Search size={18} />

              <span>
                Explore Rooms
              </span>

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* List Your Room */}
            <Link
              to="/add-room"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border border-white/35
                bg-slate-950/20
                px-6 py-3.5
                text-sm font-bold
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-white/15
                hover:shadow-xl
              "
            >
              <span>
                List Your Room
              </span>

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

          </div>

          {/* ========================================
              FEATURE HIGHLIGHTS
          ======================================== */}
          <div className="mt-12 flex flex-wrap gap-y-5">

            {/* Feature 1 */}
            <div className="flex items-center gap-3 pr-7 sm:pr-8">

              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-white/20
                  bg-slate-950/20
                  backdrop-blur-md
                "
              >
                <CalendarDays
                  size={19}
                  className="text-blue-300"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Flexible
                </p>

                <p className="text-xs text-white/75">
                  Booking Slots
                </p>
              </div>

            </div>

            {/* Divider */}
            <div className="hidden h-10 w-px bg-white/20 sm:block" />

            {/* Feature 2 */}
            <div className="flex items-center gap-3 px-0 sm:px-8">

              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-white/20
                  bg-slate-950/20
                  backdrop-blur-md
                "
              >
                <ShieldCheck
                  size={19}
                  className="text-emerald-300"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Safe & Secure
                </p>

                <p className="text-xs text-white/75">
                  Booking System
                </p>
              </div>

            </div>

            {/* Divider */}
            <div className="hidden h-10 w-px bg-white/20 sm:block" />

            {/* Feature 3 */}
            <div className="flex items-center gap-3 pl-0 sm:pl-8">

              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-white/20
                  bg-slate-950/20
                  backdrop-blur-md
                "
              >
                <Sparkles
                  size={19}
                  className="text-orange-300"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Comfortable
                </p>

                <p className="text-xs text-white/75">
                  Study Spaces
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================
          SCROLL INDICATOR
      ======================================== */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          text-white/80
          sm:flex
        "
      >
        <span className="mb-1 text-xs font-medium tracking-wide">
          Scroll to explore
        </span>

        <ChevronDown
          size={20}
          className="animate-bounce"
        />
      </div>

    </section>
  );
}

export default HomeHero;