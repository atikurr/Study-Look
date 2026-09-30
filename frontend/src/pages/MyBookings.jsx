import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock3, MapPin, X } from "lucide-react";
import toast from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load bookings.");
        }

        setBookings(data.bookings);
      } catch (error) {
        console.error("My bookings error:", error);
        toast.error(error.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(bookingId);

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Failed to cancel booking.");
        return;
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully.");
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error("Something went wrong.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your study room bookings.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-slate-500">
              You haven't booked any study rooms yet.
            </p>

            <Link
              to="/rooms"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Rooms
            </Link>
          </div>
        ) : (
          /* Booking List */
          <div className="space-y-5">
            {bookings.map((booking) => {
              const room = booking.roomId;

              return (
                <div
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="h-56 md:h-auto md:w-64">
                      {room?.image ? (
                        <img
                          src={room.image}
                          alt={room.roomName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900">
                            {room?.roomName || "Room unavailable"}
                          </h2>

                          <div className="mt-3 space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <CalendarDays size={17} />
                              {booking.bookingDate}
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock3 size={17} />
                              {booking.startTime} - {booking.endTime}
                            </div>

                            {room?.floor && (
                              <div className="flex items-center gap-2">
                                <MapPin size={17} />
                                {room.floor}
                              </div>
                            )}
                          </div>
                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {/* Cost */}
                      <div className="mt-6 border-t border-slate-200 pt-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-slate-500">
                              Total Cost
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-900">
                              ${Number(booking.totalCost).toFixed(2)}
                            </p>
                          </div>

                          {booking.note && (
                            <div className="max-w-md">
                              <p className="text-sm text-slate-500">
                                Note
                              </p>

                              <p className="mt-1 text-sm text-slate-700">
                                {booking.note}
                              </p>
                            </div>
                          )}

                          {booking.status === "confirmed" && (
                            <button
                              type="button"
                              onClick={() => handleCancel(booking._id)}
                              disabled={cancellingId === booking._id}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <X size={17} />

                              {cancellingId === booking._id
                                ? "Cancelling..."
                                : "Cancel Booking"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyBookings;