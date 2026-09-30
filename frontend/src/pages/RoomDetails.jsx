import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MapPin,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function RoomDetails() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/rooms/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.message || "Room not found");
          return;
        }

        setRoom(data.room);
      } catch (error) {
        console.error("Failed to fetch room:", error);
        setError("Failed to load room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Room Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            {error || "The room you are looking for does not exist."}
          </p>

          <Link
            to="/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/rooms"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Rooms
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Image */}
          <div className="h-72 w-full overflow-hidden md:h-105">
            <img
              src={room.image}
              alt={room.roomName}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Study Room
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                  {room.roomName}
                </h1>

                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  {room.description}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-slate-900 px-6 py-4 text-center text-white">
                <p className="text-2xl font-bold">
                  ${room.hourlyRate}
                </p>
                <p className="text-sm text-slate-300">per hour</p>
              </div>
            </div>

            {/* Room Info */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <MapPin className="text-slate-700" size={22} />

                <p className="mt-3 text-sm text-slate-500">Floor</p>

                <p className="mt-1 font-semibold text-slate-900">
                  {room.floor}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <Users className="text-slate-700" size={22} />

                <p className="mt-3 text-sm text-slate-500">Capacity</p>

                <p className="mt-1 font-semibold text-slate-900">
                  {room.capacity} people
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <Clock3 className="text-slate-700" size={22} />

                <p className="mt-3 text-sm text-slate-500">Rate</p>

                <p className="mt-1 font-semibold text-slate-900">
                  ${room.hourlyRate} / hour
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Amenities
              </h2>

              {room.amenities?.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
                    >
                      <CheckCircle2
                        size={20}
                        className="shrink-0 text-slate-700"
                      />

                      <span className="font-medium text-slate-700">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-slate-500">
                  No amenities listed for this room.
                </p>
              )}
            </div>

            {/* Booking */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Ready to book this room?
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose your date and time slot to reserve this study
                    space.
                  </p>
                </div>

                <Link
                  to={`/rooms/${room._id}/book`}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  Book This Room
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RoomDetails;