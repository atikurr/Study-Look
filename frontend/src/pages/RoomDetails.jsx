import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MapPin,
  Clock3,
  CheckCircle2,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  CalendarCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

function RoomDetails() {
  useTitle("Room Details");

  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const [error, setError] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // =====================================================
  // FETCH ROOM
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/rooms/${id}`
        );

        const data = await response
          .json()
          .catch(() => null);

        if (!response.ok || !data?.success) {
          if (!cancelled) {
            setError(
              data?.message ||
                "Room not found."
            );
            setRoom(null);
          }

          return;
        }

        if (!cancelled) {
          setRoom(data.room);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load room:",
          error
        );

        setError(
          "Failed to load room details."
        );

        setRoom(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchRoom();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =====================================================
  // FETCH CURRENT USER
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const fetchCurrentUser = async () => {
      try {
        setUserLoading(true);

        const response = await fetch(
          "/api/auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          if (!cancelled) {
            setUser(null);
          }

          return;
        }

        const data = await response
          .json()
          .catch(() => null);

        if (!cancelled) {
          if (
            data?.success &&
            data?.user
          ) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error(
          "Failed to get current user:",
          error
        );

        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setUserLoading(false);
        }
      }
    };

    fetchCurrentUser();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // OWNER CHECK
  // =====================================================

  const userId =
    user?._id || user?.id;

  const ownerId =
    typeof room?.ownerId === "object"
      ? room?.ownerId?._id ||
        room?.ownerId?.id
      : room?.ownerId;

  const isOwner =
    Boolean(userId) &&
    Boolean(ownerId) &&
    String(userId) ===
      String(ownerId);

  // =====================================================
  // DELETE ROOM
  // =====================================================

  const handleDeleteRoom = async () => {
    if (!room?._id || deleting) {
      return;
    }

    try {
      setDeleting(true);

      const loadingToast =
        toast.loading(
          "Deleting room..."
        );

      const response = await fetch(
        `/api/rooms/${room._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      toast.dismiss(loadingToast);

      if (
        !response.ok ||
        !data?.success
      ) {
        toast.error(
          data?.message ||
            "Failed to delete room."
        );

        return;
      }

      setDeleteOpen(false);

      toast.success(
        "Room deleted successfully."
      );

      navigate("/my-listings", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Delete room error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !room) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-900">
            Room Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            {error ||
              "The room you are looking for does not exist."}
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

        {/* ==========================================
            BACK
        ========================================== */}

        <Link
          to="/rooms"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Rooms
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* ==========================================
              IMAGE
          ========================================== */}

          <div className="h-72 w-full overflow-hidden bg-slate-100 md:h-[420px]">

            {room.image ? (
              <img
                src={room.image}
                alt={
                  room.roomName ||
                  "Study room"
                }
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No image available
              </div>
            )}
          </div>

          {/* ==========================================
              CONTENT
          ========================================== */}

          <div className="p-6 md:p-10">

            {/* HEADER */}

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Study Room
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                  {room.roomName}
                </h1>

                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  {room.description ||
                    "No description available."}
                </p>
              </div>

              {/* PRICE */}

              <div className="shrink-0 rounded-2xl bg-slate-900 px-6 py-4 text-center text-white">

                <p className="text-2xl font-bold">
                  ${room.hourlyRate}
                </p>

                <p className="text-sm text-slate-300">
                  per hour
                </p>
              </div>
            </div>

            {/* ==========================================
                OWNER ACTIONS
            ========================================== */}

            {isOwner && (
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="font-semibold text-slate-900">
                    You own this room
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    You can edit or delete this listing.
                  </p>
                </div>

                <div className="flex gap-3">

                  {/* EDIT */}

                  <Link
                    to={`/rooms/${room._id}/edit`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteOpen(true)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* ==========================================
                ROOM INFO
            ========================================== */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">

              {/* FLOOR */}

              <div className="rounded-2xl bg-slate-50 p-5">

                <MapPin
                  className="text-slate-700"
                  size={22}
                />

                <p className="mt-3 text-sm text-slate-500">
                  Floor
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {room.floor ||
                    "N/A"}
                </p>
              </div>

              {/* CAPACITY */}

              <div className="rounded-2xl bg-slate-50 p-5">

                <Users
                  className="text-slate-700"
                  size={22}
                />

                <p className="mt-3 text-sm text-slate-500">
                  Capacity
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {room.capacity ||
                    0}{" "}
                  people
                </p>
              </div>

              {/* RATE */}

              <div className="rounded-2xl bg-slate-50 p-5">

                <Clock3
                  className="text-slate-700"
                  size={22}
                />

                <p className="mt-3 text-sm text-slate-500">
                  Rate
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  $
                  {room.hourlyRate ||
                    0}{" "}
                  / hour
                </p>
              </div>

              {/* BOOKING COUNT */}

              <div className="rounded-2xl bg-slate-50 p-5">

                <CalendarCheck
                  className="text-slate-700"
                  size={22}
                />

                <p className="mt-3 text-sm text-slate-500">
                  Bookings
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {room.bookingCount ||
                    0}
                </p>
              </div>
            </div>

            {/* ==========================================
                AMENITIES
            ========================================== */}

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-slate-900">
                Amenities
              </h2>

              {Array.isArray(
                room.amenities
              ) &&
              room.amenities.length >
                0 ? (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

                  {room.amenities.map(
                    (
                      amenity,
                      index
                    ) => (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
                      >
                        <CheckCircle2
                          size={20}
                          className="shrink-0 text-blue-600"
                        />

                        <span className="font-medium text-slate-700">
                          {amenity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-4 text-slate-500">
                  No amenities listed for this room.
                </p>
              )}
            </div>

            {/* ==========================================
                BOOKING
            ========================================== */}

            <div className="mt-10 border-t border-slate-200 pt-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Ready to book this room?
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose your date and time slot to reserve this study space.
                  </p>
                </div>

                {userLoading ? (
                  <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200" />
                ) : user ? (
                  <Link
                    to={`/rooms/${room._id}/book`}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                  >
                    Book Now
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    state={{
                      from: `/rooms/${room._id}/book`,
                    }}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                  >
                    Login to Book
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      {deleteOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle
                    size={22}
                  />
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
                  setDeleteOpen(false)
                }
                disabled={deleting}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close delete modal"
              >
                <X size={19} />
              </button>
            </div>

            {/* ROOM NAME */}

            <div className="mt-6 rounded-xl bg-slate-50 p-4">

              <p className="text-sm text-slate-500">
                You are about to delete:
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {room.roomName}
              </p>
            </div>

            {/* ACTIONS */}

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setDeleteOpen(false)
                }
                disabled={deleting}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleDeleteRoom
                }
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomDetails;