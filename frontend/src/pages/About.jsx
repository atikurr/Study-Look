import {
  BookOpen,
  CalendarCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

function About() {
  const features = [
    {
      icon: BookOpen,
      title: "Find the Right Space",
      description:
        "Browse study rooms and choose a space based on capacity, floor, hourly rate, and available amenities.",
    },
    {
      icon: CalendarCheck,
      title: "Simple Booking",
      description:
        "Select your preferred date and time slot and reserve a study room with a straightforward booking process.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Reservations",
      description:
        "StudyNook checks booking time conflicts to help prevent double-booking of the same room.",
    },
    {
      icon: Users,
      title: "Built for Learners",
      description:
        "Create a comfortable and organized study experience for students and other library users.",
    },
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            About StudyNook
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            A better space for focused learning
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            StudyNook is a study room booking platform designed to make it
            easier to discover, manage, and reserve comfortable study spaces.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Our Purpose
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Making study spaces easier to access
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Finding an appropriate place to study can sometimes be
                difficult. StudyNook brings available study rooms into one
                platform so users can explore their options and make a
                reservation based on their needs.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                Room owners can also create and manage their listings, while
                users can keep track of their bookings from their personal
                dashboard.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
              <p className="text-sm font-medium text-slate-400">
                StudyNook
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Focus. Learn. Achieve.
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                A simple platform connecting people with study spaces that
                fit their schedule and learning needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Everything you need for a better study session
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;