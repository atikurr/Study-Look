import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import toast from "react-hot-toast";

const START_HOUR = 8;
const END_HOUR = 20;

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  const [existingBookings, setExistingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/rooms/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          toast.error(data.message || "Room not found.");
          navigate("/rooms");
          return;
        }

        setRoom(data.room);
      } catch (error) {
        console.error("Load room error:", error);
        toast.error("Failed to load room.");
        navigate("/rooms");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id, navigate]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/room/${id}`
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setExistingBookings(data.bookings);
        }
      } catch (error) {
        console.error("Load bookings error:", error);
      }
    };

    loadBookings();
  }, [id]);

  const timeToMinutes = (time) => {
    if (!time) return 0;

    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  };

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;

    const duration =
      timeToMinutes(endTime) - timeToMinutes(startTime);

    return duration > 0 ? duration / 60 : 0;
  };

  const totalCost = room
    ? calculateDuration() * room.hourlyRate
    : 0;

  const hasLocalConflict = () => {
    if (!bookingDate || !startTime || !endTime) {
      return false;
    }

    const selectedStart = timeToMinutes(startTime);
    const selectedEnd = timeToMinutes(endTime);

    return existingBookings.some((item) => {
      if (item.bookingDate !== bookingDate) {
        return false;
      }

      const existingStart = timeToMinutes(item.startTime);
      const existingEnd = timeToMinutes(item.endTime);

      return (
        selectedStart < existingEnd &&
        selectedEnd > existingStart
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please select date and time.");
      return;
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (startMinutes < START_HOUR * 60) {
      toast.error("Booking starts from 08:00.");
      return;
    }

    if (endMinutes > END_HOUR * 60) {
      toast.error("Booking ends at 20:00.");
      return;
    }

    if (endMinutes <= startMinutes) {
      toast.error("End time must be after start time.");
      return;
    }

    if (endMinutes - startMinutes < 60) {
      toast.error("Minimum booking duration is 1 hour.");
      return;
    }

    if (hasLocalConflict()) {
      toast.error("This time slot is already booked.");
      return;
    }

    try {
      setBooking(true);

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            roomId: id,
            bookingDate,
            startTime,
            endTime,
            note: note.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Booking failed.");
        return;
      }

      toast.success("Room booked successfully!");

      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      </main>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to={`/rooms/${id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Room
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Room Header */}
          <div className="flex flex-col gap-5 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Book a Study Room
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {room.roomName}
              </h1>

              <p className="mt-2 text-slate-500">
                ${room.hourlyRate} per hour
              </p>
            </div>

            <img
              src={room.image}
              alt={room.roomName}
              className="h-24 w-32 rounded-xl object-cover"
            />
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Date */}
              <div>
                <label
                  htmlFor="bookingDate"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Booking Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="bookingDate"
                    type="date"
                    min={getToday()}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Start Time */}
              <div>
                <label
                  htmlFor="startTime"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Start Time
                </label>

                <div className="relative">
                  <Clock3
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="startTime"
                    type="time"
                    min="08:00"
                    max="19:00"
                    step="3600"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    required
                  />
                </div>
              </div>

              {/* End Time */}
              <div>
                <label
                  htmlFor="endTime"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  End Time
                </label>

                <div className="relative">
                  <Clock3
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="endTime"
                    type="time"
                    min="09:00"
                    max="20:00"
                    step="3600"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label
                  htmlFor="note"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Note <span className="font-normal text-slate-400">(Optional)</span>
                </label>

                <input
                  id="note"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special note..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            {/* Cost */}
            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  Duration
                </span>

                <span className="font-semibold text-slate-900">
                  {calculateDuration() > 0
                    ? `${calculateDuration()} hour${
                        calculateDuration() !== 1 ? "s" : ""
                      }`
                    : "—"}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-semibold text-slate-700">
                  Total Cost
                </span>

                <span className="text-2xl font-bold text-slate-900">
                  ${totalCost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Conflict Warning */}
            {hasLocalConflict() && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                This room is already booked for the selected time.
                Please choose another time slot.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={booking || hasLocalConflict()}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {booking ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default BookingPage;