import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Users, MapPin } from "lucide-react";
import toast from "react-hot-toast";

function MyListings() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/rooms/my-listings",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load your listings.");
        }

        setRooms(data.rooms);
      } catch (error) {
        console.error("My listings error:", error);
        toast.error(error.message || "Failed to load your listings.");
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  const handleDelete = async (roomId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(roomId);

      const response = await fetch(
        `http://localhost:5000/api/rooms/${roomId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Failed to delete room.");
        return;
      }

      setRooms((previous) =>
        previous.filter((room) => room._id !== roomId)
      );

      toast.success("Room deleted successfully.");
    } catch (error) {
      console.error("Delete room error:", error);
      toast.error("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              My Listings
            </h1>

            <p className="mt-2 text-slate-500">
              Manage the study rooms you have added.
            </p>
          </div>

          <Link
            to="/add-room"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus size={19} />
            Add Room
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          </div>
        ) : rooms.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No listings yet
            </h2>

            <p className="mt-2 text-slate-500">
              You haven't added any study rooms yet.
            </p>

            <Link
              to="/add-room"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={18} />
              Add Your First Room
            </Link>
          </div>
        ) : (
          /* Listings */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.roomName}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {room.roomName}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {room.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={17} />
                      {room.floor}
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={17} />
                      {room.capacity} people
                    </div>
                  </div>

                  <div className="mt-4 text-lg font-bold text-slate-900">
                    ${room.hourlyRate}
                    <span className="text-sm font-normal text-slate-500">
                      {" "}
                      / hour
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-3">
                    <Link
                      to={`/rooms/${room._id}/edit`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(room._id)}
                      disabled={deletingId === room._id}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 size={16} />

                      {deletingId === room._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyListings;