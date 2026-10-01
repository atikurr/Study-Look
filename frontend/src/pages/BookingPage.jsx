import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DoorOpen,
  FileText,
  MapPin,
  Users,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

function BookingPage() {
  useTitle("Book Room");

  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // TODAY DATE
  // ==========================================

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ==========================================
  // AVAILABLE HOURLY SLOTS
  // 08:00 - 20:00
  // ==========================================

  const timeSlots = useMemo(() => {
    const slots = [];

    for (let hour = 8; hour <= 20; hour++) {
      const formattedHour = String(hour).padStart(
        2,
        "0"
      );

      slots.push(`${formattedHour}:00`);
    }

    return slots;
  }, []);

  // ==========================================
  // FETCH ROOM
  // ==========================================

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/rooms/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch room"
          );
        }

        setRoom(data.room);

        // Default booking date = today
        setBookingDate(getTodayDate());
      } catch (error) {
        console.error(
          "Booking room fetch error:",
          error
        );

        setError(
          error.message ||
            "Failed to load room"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // ==========================================
  // CALCULATE HOURS
  // ==========================================

  const totalHours = useMemo(() => {
    if (!startTime || !endTime) {
      return 0;
    }

    const start = Number(
      startTime.split(":")[0]
    );

    const end = Number(
      endTime.split(":")[0]
    );

    return Math.max(end - start, 0);
  }, [startTime, endTime]);

  // ==========================================
  // TOTAL COST
  // ==========================================

  const totalCost = useMemo(() => {
    if (!room || totalHours <= 0) {
      return 0;
    }

    return totalHours * Number(room.hourlyRate);
  }, [room, totalHours]);

  // ==========================================
  // END TIME OPTIONS
  // Must be after start time
  // ==========================================

  const endTimeOptions = useMemo(() => {
    if (!startTime) {
      return timeSlots.slice(1);
    }

    const startHour = Number(
      startTime.split(":")[0]
    );

    return timeSlots.filter((time) => {
      const hour = Number(
        time.split(":")[0]
      );

      return hour > startHour;
    });
  }, [startTime, timeSlots]);

  // ==========================================
  // START TIME CHANGE
  // ==========================================

  const handleStartTimeChange = (value) => {
    setStartTime(value);

    const startHour = Number(
      value.split(":")[0]
    );

    const currentEndHour = Number(
      endTime.split(":")[0]
    );

    // Automatically move end time
    // if it is not after start time
    if (currentEndHour <= startHour) {
      const nextHour = startHour + 1;

      if (nextHour <= 20) {
        setEndTime(
          `${String(nextHour).padStart(
            2,
            "0"
          )}:00`
        );
      }
    }
  };

  // ==========================================
  // SUBMIT BOOKING
  // ==========================================

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingDate) {
      toast.error("Please select a booking date.");
      return;
    }

    if (!startTime || !endTime) {
      toast.error(
        "Please select start and end time."
      );
      return;
    }

    if (totalHours < 1) {
      toast.error(
        "Booking must be at least 1 hour."
      );
      return;
    }

    if (totalHours > 12) {
      toast.error(
        "You cannot book more than 12 hours at once."
      );
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch(
        "/api/bookings",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: room._id,
            bookingDate,
            startTime,
            endTime,
            note: note.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Booking failed. Please try again."
        );

        return;
      }

      toast.success(
        "Room booked successfully!"
      );

      navigate("/my-bookings");
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="rounded-3xl bg-white p-7">
              <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />

              <div className="mt-5 h-5 w-full animate-pulse rounded bg-slate-100" />

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
              </div>
            </div>

            <div className="h-[520px] animate-pulse rounded-3xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !room) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <DoorOpen
              size={28}
              className="text-slate-500"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Unable to book this room
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error ||
              "The requested room could not be found."}
          </p>

          <Link
            to="/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Rooms
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // MAIN
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ========================================
          HEADER
      ======================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to={`/rooms/${room._id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to room
          </Link>
        </div>
      </section>

      {/* ========================================
          CONTENT
      ======================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* ====================================
              LEFT INFO
          ==================================== */}

          <div>
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Reserve your space
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Book {room.roomName}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Choose a date and hourly time
                slot that works best for your
                study session.
              </p>
            </div>

            {/* Room Card */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="h-64 w-full object-cover sm:h-80"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80";
                  }}
                />

                <div className="absolute right-4 top-4 rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur">
                  <span className="text-lg font-extrabold text-slate-950">
                    ${room.hourlyRate}
                  </span>

                  <span className="text-xs text-slate-500">
                    /hr
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-950">
                  {room.roomName}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  {room.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <MapPin
                      size={18}
                      className="text-blue-600"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Floor
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {room.floor}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <Users
                      size={18}
                      className="text-emerald-600"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Capacity
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {room.capacity} people
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <Clock3
                      size={18}
                      className="text-orange-600"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Available
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      08:00–20:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Rules */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-950">
                Booking information
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm leading-6 text-slate-600">
                    Booking is available for
                    today and future dates.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm leading-6 text-slate-600">
                    Available booking hours are
                    from 08:00 AM to 08:00 PM.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm leading-6 text-slate-600">
                    Minimum booking duration is
                    one hour.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm leading-6 text-slate-600">
                    The system automatically
                    prevents overlapping bookings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================
              BOOKING FORM
          ==================================== */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <form
              onSubmit={handleBooking}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5"
            >
              {/* Form Header */}
              <div className="border-b border-slate-100 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Booking details
                    </h2>

                    <p className="text-xs text-slate-500">
                      Select your preferred slot
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6">
                {/* Date */}
                <div>
                  <label
                    htmlFor="bookingDate"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Booking date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="bookingDate"
                      type="date"
                      min={getTodayDate()}
                      value={bookingDate}
                      onChange={(e) =>
                        setBookingDate(
                          e.target.value
                        )
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Time slot
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Start */}
                    <div>
                      <label
                        htmlFor="startTime"
                        className="mb-1.5 block text-xs font-medium text-slate-500"
                      >
                        Start time
                      </label>

                      <select
                        id="startTime"
                        value={startTime}
                        onChange={(e) =>
                          handleStartTimeChange(
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                      >
                        {timeSlots
                          .slice(0, -1)
                          .map((time) => (
                            <option
                              key={time}
                              value={time}
                            >
                              {time}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* End */}
                    <div>
                      <label
                        htmlFor="endTime"
                        className="mb-1.5 block text-xs font-medium text-slate-500"
                      >
                        End time
                      </label>

                      <select
                        id="endTime"
                        value={endTime}
                        onChange={(e) =>
                          setEndTime(
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                      >
                        {endTimeOptions.map(
                          (time) => (
                            <option
                              key={time}
                              value={time}
                            >
                              {time}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label
                    htmlFor="note"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Special note
                    <span className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <FileText
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-4 text-slate-400"
                    />

                    <textarea
                      id="note"
                      value={note}
                      onChange={(e) =>
                        setNote(e.target.value)
                      }
                      rows={4}
                      maxLength={300}
                      placeholder="Add a note for your booking..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <p className="mt-1.5 text-right text-xs text-slate-400">
                    {note.length}/300
                  </p>
                </div>

                {/* Price Summary */}
                <div className="rounded-2xl bg-slate-950 p-5 text-white">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      Hourly rate
                    </span>

                    <span>
                      ${room.hourlyRate}/hr
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      Duration
                    </span>

                    <span>
                      {totalHours}{" "}
                      {totalHours === 1
                        ? "hour"
                        : "hours"}
                    </span>
                  </div>

                  <div className="my-4 h-px bg-white/10" />

                  <div className="flex items-end justify-between">
                    <span className="text-sm font-medium text-slate-300">
                      Total cost
                    </span>

                    <span className="text-3xl font-extrabold">
                      ${totalCost}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={
                    bookingLoading ||
                    totalHours < 1
                  }
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bookingLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Confirming...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Your booking will be confirmed
                  only if the selected time slot
                  is available.
                </p>
              </div>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default BookingPage;