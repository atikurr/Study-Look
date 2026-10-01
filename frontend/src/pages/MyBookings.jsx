import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  XCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  DoorOpen,
} from "lucide-react";
import toast from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  // ==============================
  // FETCH BOOKINGS
  // ==============================

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch bookings"
        );
      }

      setBookings(
        Array.isArray(data.bookings) ? data.bookings : []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to load your bookings."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // ==============================
  // FORMAT DATE
  // ==============================

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ==============================
  // FORMAT TIME
  // ==============================

  const formatTime = (time) => {
    if (!time) return "";

    const [hourString, minute] = time.split(":");

    const hour = Number(hourString);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minute} ${suffix}`;
  };

  // ==============================
  // CHECK IF BOOKING CAN BE CANCELLED
  // ==============================

  const canCancelBooking = (booking) => {
    if (booking.status !== "confirmed") {
      return false;
    }

    if (!booking.bookingDate) {
      return false;
    }

    // Today's date in local timezone
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(
      `${booking.bookingDate}T00:00:00`
    );
    bookingDate.setHours(0, 0, 0, 0);

    return bookingDate >= today;
  };

  // ==============================
  // CANCEL BOOKING
  // ==============================

  const handleCancel = async () => {
    if (!cancelBookingId) return;

    try {
      setCancelLoading(true);

      const loadingToast = toast.loading(
        "Cancelling booking..."
      );

      const response = await fetch(
        `http://localhost:5000/api/bookings/${cancelBookingId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      toast.dismiss(loadingToast);

      if (!response.ok || !data.success) {
        toast.error(
          data.message || "Failed to cancel booking"
        );
        return;
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === cancelBookingId
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking
        )
      );

      toast.success("Booking cancelled successfully");

      setCancelBookingId(null);
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setCancelLoading(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-0"
              >
                <div className="h-16 w-20 animate-pulse rounded-xl bg-slate-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-64 animate-pulse rounded bg-slate-100" />
                </div>

                <div className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ==============================
          HEADER
      ============================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                Dashboard
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                My Bookings
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your study room reservations.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Book a Room
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================
          CONTENT
      ============================== */}

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ERROR */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
            <XCircle className="mx-auto text-red-500" />

            <h2 className="mt-3 font-semibold text-slate-900">
              Unable to load bookings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {error}
            </p>

            <button
              onClick={fetchBookings}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY */}

        {!error && bookings.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <CalendarDays
                size={22}
                className="text-slate-500"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No bookings yet
            </h2>

            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              Find a study room and make your first
              reservation.
            </p>

            <Link
              to="/rooms"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Explore Rooms
              <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* ==============================
            BOOKING LIST
        ============================== */}

        {!error && bookings.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Desktop Header */}

            <div className="hidden border-b border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid md:grid-cols-[2fr_1.4fr_1.2fr_100px_130px] md:items-center md:gap-5">
              <span>Room</span>
              <span>Date & Time</span>
              <span>Location</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>

            {bookings.map((booking) => {
              const room = booking.roomId;
              const isCancelled =
                booking.status === "cancelled";
              const canCancel = canCancelBooking(booking);

              return (
                <div
                  key={booking._id}
                  className="border-b border-slate-100 last:border-0"
                >
                  {/* ==========================
                      DESKTOP ROW
                  ========================== */}

                  <div className="hidden px-5 py-4 transition hover:bg-slate-50 md:grid md:grid-cols-[2fr_1.4fr_1.2fr_100px_130px] md:items-center md:gap-5">
                    {/* ROOM */}

                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {room?.image ? (
                          <img
                            src={room.image}
                            alt={
                              room.roomName ||
                              "Study room"
                            }
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <DoorOpen
                              size={20}
                              className="text-slate-400"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <Link
                          to={
                            room?._id
                              ? `/rooms/${room._id}`
                              : "#"
                          }
                          className="block truncate text-sm font-semibold text-slate-900 hover:text-blue-600"
                        >
                          {room?.roomName ||
                            "Study Room"}
                        </Link>

                        <p className="mt-0.5 truncate text-xs text-slate-400">
                          {room?.capacity || 0} seats
                          {" · "}
                          ${room?.hourlyRate || 0}
                          /hr
                        </p>
                      </div>
                    </div>

                    {/* DATE / TIME */}

                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <CalendarDays
                          size={14}
                          className="text-blue-500"
                        />

                        {formatDate(
                          booking.bookingDate
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock3 size={13} />

                        {formatTime(
                          booking.startTime
                        )}{" "}
                        -{" "}
                        {formatTime(
                          booking.endTime
                        )}
                      </div>
                    </div>

                    {/* LOCATION */}

                    <div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <MapPin
                          size={14}
                          className="text-slate-400"
                        />

                        {room?.floor || "N/A"}
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <Users size={13} />
                        {room?.capacity || 0} people
                      </div>
                    </div>

                    {/* STATUS */}

                    <div>
                      {isCancelled ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                          <XCircle size={12} />
                          Cancelled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 size={12} />
                          Confirmed
                        </span>
                      )}
                    </div>

                    {/* ACTION */}

                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        ${booking.totalCost}
                      </span>

                      {canCancel && (
                        <button
                          onClick={() =>
                            setCancelBookingId(
                              booking._id
                            )
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Cancel booking"
                        >
                          <XCircle size={17} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ==========================
                      MOBILE ROW
                  ========================== */}

                  <div className="p-4 md:hidden">
                    <div className="flex gap-3">
                      {/* IMAGE */}

                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {room?.image ? (
                          <img
                            src={room.image}
                            alt={
                              room.roomName ||
                              "Study room"
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <DoorOpen
                              size={20}
                              className="text-slate-400"
                            />
                          </div>
                        )}
                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={
                              room?._id
                                ? `/rooms/${room._id}`
                                : "#"
                            }
                            className="truncate text-sm font-semibold text-slate-900"
                          >
                            {room?.roomName ||
                              "Study Room"}
                          </Link>

                          {isCancelled ? (
                            <span className="shrink-0 rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600">
                              Cancelled
                            </span>
                          ) : (
                            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                              Confirmed
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          {room?.floor || "N/A"}
                          {" · "}
                          {room?.capacity || 0} seats
                        </p>
                      </div>
                    </div>

                    {/* MOBILE DETAILS */}

                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                          Date
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-slate-700">
                          {formatDate(
                            booking.bookingDate
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                          Time
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-slate-700">
                          {formatTime(
                            booking.startTime
                          )}{" "}
                          -{" "}
                          {formatTime(
                            booking.endTime
                          )}
                        </p>
                      </div>
                    </div>

                    {/* MOBILE FOOTER */}

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-sm font-bold text-slate-900">
                        ${booking.totalCost}
                      </span>

                      {canCancel ? (
                        <button
                          onClick={() =>
                            setCancelBookingId(
                              booking._id
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <XCircle size={14} />
                          Cancel
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No actions available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ==============================
          CONFIRMATION MODAL
      ============================== */}

      {cancelBookingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={21} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Cancel booking?
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              This booking will be marked as
              cancelled. Do you want to continue?
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                disabled={cancelLoading}
                onClick={() =>
                  setCancelBookingId(null)
                }
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Keep
              </button>

              <button
                type="button"
                disabled={cancelLoading}
                onClick={handleCancel}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {cancelLoading ? (
                  <>
                    <RefreshCw
                      size={14}
                      className="animate-spin"
                    />
                    Cancelling
                  </>
                ) : (
                  <>
                    <XCircle size={14} />
                    Cancel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyBookings;