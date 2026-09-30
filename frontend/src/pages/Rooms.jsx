import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import RoomCard from "../components/RoomCard";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load rooms when page opens
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/rooms"
        );

        const data = await response.json();

        if (data.success) {
          setRooms(data.rooms);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // Search rooms
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      const response = await fetch(
        `http://localhost:5000/api/rooms?${params.toString()}`
      );

      const data = await response.json();

      if (data.success) {
        setRooms(data.rooms);
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              StudyNook Rooms
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Find Your Perfect Study Space
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-500">
              Browse comfortable study rooms and find a space that matches
              your needs.
            </p>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-2xl gap-3"
          >
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rooms..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Rooms */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No rooms found
            </h2>

            <p className="mt-2 text-slate-500">
              Try a different search or check back later for available rooms.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Available Rooms
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {rooms.length} room{rooms.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Rooms;