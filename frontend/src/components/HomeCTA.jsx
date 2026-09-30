import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function HomeCTA() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 px-6 py-14 text-center sm:px-10 md:px-16">
          {/* Background Decoration */}
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-slate-700/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-slate-700/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
              <BookOpen size={26} />
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              Ready to find your study space?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              Browse available rooms and book a comfortable place for your
              next focused study session.
            </p>

            {/* CTA Button */}
            <Link
              to="/rooms"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Explore Rooms
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCTA;