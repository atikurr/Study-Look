import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-slate-700/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-slate-700/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <div>
          {/* Small Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <BookOpen size={16} />
            Smart study spaces for focused learning
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Find the perfect place to
            <span className="block text-slate-300">
              study, focus & grow.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            StudyNook makes it easy to discover comfortable study rooms,
            check availability, and book your ideal study space in just a few
            clicks.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Explore Rooms
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Get Started
            </Link>
          </div>

          {/* Features */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              Secure booking
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              Flexible hours
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} />
              Multiple capacities
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hidden lg:block">
          <div className="relative mx-auto max-w-lg">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
                alt="Modern study workspace"
                className="h-[430px] w-full rounded-2xl object-cover"
              />

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-slate-950/85 p-5 backdrop-blur">
                <p className="text-sm text-slate-400">
                  Your next productive session
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold">
                    Focus. Learn. Achieve.
                  </h3>

                  <BookOpen size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;