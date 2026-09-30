import {
  Clock3,
  ShieldCheck,
  Wifi,
} from "lucide-react";

function WhyStudyNook() {
  const features = [
    {
      icon: Clock3,
      title: "Flexible Booking",
      description:
        "Choose a date and hourly time slot that works best for your study schedule.",
    },
    {
      icon: Wifi,
      title: "Useful Amenities",
      description:
        "Find rooms with Wi-Fi, projectors, whiteboards, power outlets, and other useful facilities.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Reservations",
      description:
        "Our booking system checks time conflicts so the same room cannot be double-booked.",
    },
  ];

  return (
    <section className="border-y border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Why StudyNook
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Built for better study sessions
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Everything you need to find a comfortable and reliable space for
            focused learning.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyStudyNook;