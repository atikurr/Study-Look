import {
  Clock3,
  ShieldCheck,
  Wifi,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function WhyStudyNook() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10"
        >
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Why Choose StudyNook
          </span>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            A better way to find your{" "}
            <span className="text-blue-600">
              perfect study space
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Everything you need to find a comfortable,
            reliable, and suitable space for focused
            learning.
          </p>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid gap-4 md:grid-cols-3"
        >
          {/* ========================================
              CARD 1
          ======================================== */}

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.25,
              },
            }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-shadow duration-300 hover:shadow-md sm:p-7"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm">
              <Clock3
                size={19}
                strokeWidth={1.7}
              />
            </div>

            <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-950">
              Flexible Booking
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Choose a date and hourly time slot
              that works best for your study
              schedule.
            </p>
          </motion.div>

          {/* ========================================
              CARD 2
          ======================================== */}

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.25,
              },
            }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-shadow duration-300 hover:shadow-md sm:p-7"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm">
              <Wifi
                size={19}
                strokeWidth={1.7}
              />
            </div>

            <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-950">
              Useful Amenities
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Find rooms with Wi-Fi, projectors,
              whiteboards, power outlets and
              other useful facilities.
            </p>
          </motion.div>

          {/* ========================================
              FEATURED CARD
          ======================================== */}

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.25,
              },
            }}
            className="row-span-2 flex flex-col rounded-2xl bg-slate-950 p-7 text-white shadow-sm sm:p-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <ShieldCheck
                size={19}
                strokeWidth={1.7}
                className="text-blue-400"
              />
            </div>

            <h3 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
              Reliable Reservations
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              StudyNook checks booking time
              conflicts before confirming a
              reservation, helping prevent the
              same room from being booked twice.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Choose your preferred room and
              schedule with confidence, knowing
              that your selected time is protected
              from overlapping bookings.
            </p>

            <div className="mt-auto pt-8">
              <Link
                to="/rooms"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-blue-500"
              >
                Explore Rooms

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>

          {/* ========================================
              BOTTOM WIDE CARD
          ======================================== */}

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.25,
              },
            }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-shadow duration-300 hover:shadow-md sm:p-7 md:col-span-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm">
              <Clock3
                size={19}
                strokeWidth={1.7}
              />
            </div>

            <h3 className="mt-7 text-xl font-semibold tracking-tight text-slate-950">
              Designed for Focused Learning
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Whether you need a quiet space for
              individual study, a room for group
              work, or access to useful facilities,
              StudyNook makes it easier to find a
              space that fits your learning needs.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyStudyNook;