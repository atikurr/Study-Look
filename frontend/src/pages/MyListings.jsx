import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Users,
  MapPin,
  X,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

function MyListings() {
  useTitle("My Listings");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);
  const [deleteRoom, setDeleteRoom] = useState(null);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const response = await fetch(
          "/api/rooms/my-listings",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load your listings."
          );
        }

        setRooms(
          Array.isArray(data.rooms) ? data.rooms : []
        );
      } catch (error) {
        console.error("My listings error:", error);

        toast.error(
          error.message || "Failed to load your listings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  /* =====================================================
     OPEN DELETE MODAL
  ===================================================== */

  const handleDeleteClick = (room) => {
    setDeleteRoom(room);
  };

  /* =====================================================
     CONFIRM DELETE
  ===================================================== */

  const handleConfirmDelete = async () => {
    if (!deleteRoom) {
      return;
    }

    const roomId = deleteRoom._id;

    try {
      setDeletingId(roomId);

      const response = await fetch(
        `/api/rooms/${roomId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message || "Failed to delete room."
        );
        return;
      }

      setRooms((previous) =>
        previous.filter(
          (room) => room._id !== roomId
        )
      );

      setDeleteRoom(null);

      toast.success("Room deleted successfully.");
    } catch (error) {
      console.error("Delete room error:", error);

      toast.error("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto flex min-h-60 max-w-7xl items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

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

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {rooms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Plus size={25} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
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
          /* =================================================
             LISTINGS
          ================================================= */

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden bg-slate-100">
                  <img
                    src={room.image}
                    alt={room.roomName}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
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

                  {/* Room Info */}
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={17}
                        className="text-slate-400"
                      />
                      {room.floor}
                    </div>

                    <div className="flex items-center gap-2">
                      <Users
                        size={17}
                        className="text-slate-400"
                      />
                      {room.capacity} people
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-4 text-lg font-bold text-slate-900">
                    ${room.hourlyRate}
                    <span className="text-sm font-normal text-slate-500">
                      {" "}
                      / hour
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-3">
                    {/* Edit */}
                    <Link
                      to={`/rooms/${room._id}/edit`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteClick(room)
                      }
                      disabled={
                        deletingId === room._id
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 size={16} />

                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =================================================
          DELETE CONFIRMATION MODAL
      ================================================= */}

      {deleteRoom && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Delete Room?
                  </h2>

                  <p className="text-sm text-slate-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteRoom(null)
                }
                disabled={deletingId !== null}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>

            {/* Room Info */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                You are about to delete:
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {deleteRoom.roomName}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteRoom(null)
                }
                disabled={deletingId !== null}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deletingId !== null}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId !== null
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyListings;