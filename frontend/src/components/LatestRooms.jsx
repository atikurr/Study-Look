import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import RoomCard from "./RoomCard";

function LatestRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestRooms = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/rooms/latest"
        );

        const data = await response.json();

        if (data.success) {
          setRooms(data.rooms);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error("Failed to load latest rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    loadLatestRooms();
  }, []);

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Latest Study Rooms
            </h2>

            <p className="mt-3 max-w-2xl text-slate-500">
              Discover our newest study spaces and choose the one that fits
              your learning needs.
            </p>
          </div>

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 font-semibold text-slate-900 transition hover:text-slate-600"
          >
            View all rooms
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          </div>
        )}

        {/* Empty State */}
        {!loading && rooms.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              No rooms available yet
            </h3>

            <p className="mt-2 text-slate-500">
              Study rooms will appear here once they are added.
            </p>

            <Link
              to="/rooms"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Browse Rooms
            </Link>
          </div>
        )}

        {/* Room Grid */}
        {!loading && rooms.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default LatestRooms;