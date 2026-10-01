import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomeCTA() {
  return (
    <section className="bg-[#e5eaf0] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[26px] border border-slate-300/80 bg-[#f3f7f5] shadow-sm"
      >
        {/* ==========================================
            BASE
        ========================================== */}

        <div className="absolute inset-0 bg-gradient-to-br from-[#edf5f8] via-[#f8faf9] to-[#eef7f1]" />

        {/* ==========================================
            GRID
        ========================================== */}

        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(100,116,139,0.11) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(100,116,139,0.11) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "52px 52px",
          }}
        />

        {/* ==========================================
            SOFT BLUE GLOW
        ========================================== */}

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"
        />

        {/* ==========================================
            SOFT GREEN GLOW
        ========================================== */}

        <motion.div
          animate={{
            x: [0, -18, 0],
            y: [0, 12, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-28 -top-24 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl"
        />

        {/* ==========================================
            BOTTOM GLOW
        ========================================== */}

        <motion.div
          animate={{
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl"
        />

        {/* ==========================================
            TOP RIGHT SHAPE
        ========================================== */}

        <motion.div
          animate={{
            rotate: [0, 6, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[24px] border-white/75"
        />

        {/* ==========================================
            BOTTOM LEFT SHAPE
        ========================================== */}

        <motion.div
          animate={{
            rotate: [0, -6, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-14 -left-12 h-44 w-44 rounded-full border-[23px] border-white/70"
        />

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="relative z-10 flex min-h-[390px] items-center justify-center px-6 py-16 sm:min-h-[430px] sm:px-10">
          <div className="mx-auto max-w-3xl text-center">

            {/* Label */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.5,
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm backdrop-blur-sm"
            >
              <BookOpen
                size={12}
                className="text-blue-600"
              />

              StudyNook
            </motion.div>

            {/* Heading */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[52px]"
            >
              Ready to find your
              <br />
              <span className="text-blue-600">
                perfect study space?
              </span>
            </motion.h2>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.55,
              }}
              className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base"
            >
              Browse available rooms and choose a
              comfortable space for your next focused
              study session.
            </motion.p>

            {/* Button */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.48,
                duration: 0.5,
              }}
              className="mt-7"
            >
              <Link
                to="/rooms"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/20"
              >
                Explore Rooms

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HomeCTA;