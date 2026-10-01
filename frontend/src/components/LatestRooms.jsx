import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import RoomCard from "./RoomCard";

function LatestRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestRooms = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/rooms/latest"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load latest rooms"
          );
        }

        const data = await response.json();

        /*
          Supports common backend response formats:
          { rooms: [] }
          { data: [] }
          []
        */

        const latestRooms =
          data?.rooms ||
          data?.data ||
          data ||
          [];

        setRooms(
          Array.isArray(latestRooms)
            ? latestRooms.slice(0, 6)
            : []
        );
      } catch (error) {
        console.error(
          "Latest rooms error:",
          error
        );

        setError(
          "Unable to load study rooms right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRooms();
  }, []);

  return (
    <section className="bg-[#eef2f6] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================
            SECTION HEADER
        ====================================== */}

        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {/* Small Label */}

            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              <Sparkles size={15} />

              Explore
            </div>

            {/* Heading */}

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Latest Study Rooms
            </h2>

            {/* Description */}

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover our newest study spaces and
              choose the one that fits your learning
              needs.
            </p>
          </div>

          {/* View All */}

          <Link
            to="/rooms"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            View all rooms

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =====================================
            LOADING
        ====================================== */}

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Image Skeleton */}

                  <div className="h-56 animate-pulse bg-slate-200" />

                  {/* Content Skeleton */}

                  <div className="space-y-4 p-5">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />

                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                    <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* =====================================
            ERROR
        ====================================== */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center shadow-sm">
            <p className="font-semibold text-slate-800">
              {error}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Please try again later.
            </p>
          </div>
        )}

        {/* =====================================
            ROOMS GRID
        ====================================== */}

        {!loading &&
          !error &&
          rooms.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                />
              ))}
            </div>
          )}

        {/* =====================================
            EMPTY STATE
        ====================================== */}

        {!loading &&
          !error &&
          rooms.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Sparkles size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No study rooms yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                New study spaces will appear here
                once they are added to StudyNook.
              </p>

              <Link
                to="/rooms"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Explore Rooms

                <ArrowRight size={17} />
              </Link>
            </div>
          )}
      </div>
    </section>
  );
}

export default LatestRooms;