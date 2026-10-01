import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  DoorOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import RoomCard from "../components/RoomCard";

const AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const FLOOR_OPTIONS = [
  { value: "all", label: "All Floors" },
  { value: "1st", label: "1st Floor" },
  { value: "2nd", label: "2nd Floor" },
  { value: "3rd", label: "3rd Floor" },
  { value: "4th", label: "4th Floor" },
  { value: "5th", label: "5th Floor" },
];

const ROOMS_PER_PAGE = 6;

/* =====================================================
   FILTER CONTENT
===================================================== */

function FilterContent({
  selectedAmenities,
  handleAmenityChange,
  setSelectedAmenities,
  floor,
  setFloor,
  minRate,
  setMinRate,
  maxRate,
  setMaxRate,
  filterCount,
  clearFilters,
}) {
  return (
    <div className="space-y-7">
      {/* Amenities */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Amenities
          </h3>

          {selectedAmenities.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedAmenities([])}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-1">
          {AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() =>
                  handleAmenityChange(amenity)
                }
                className="h-4 w-4 cursor-pointer accent-blue-600"
              />

              <span className="text-sm text-slate-600">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* Floor */}
      <div>
        <label
          htmlFor="floor"
          className="mb-3 block text-sm font-bold text-slate-900"
        >
          Floor
        </label>

        <div className="relative">
          <select
            id="floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          >
            {FLOOR_OPTIONS.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* Hourly Rate */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Hourly Rate
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Minimum */}
          <div>
            <label
              htmlFor="minRate"
              className="mb-1.5 block text-xs font-medium text-slate-500"
            >
              Minimum
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                $
              </span>

              <input
                id="minRate"
                type="number"
                min="0"
                value={minRate}
                onChange={(e) =>
                  setMinRate(e.target.value)
                }
                placeholder="0"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 pl-7 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          {/* Maximum */}
          <div>
            <label
              htmlFor="maxRate"
              className="mb-1.5 block text-xs font-medium text-slate-500"
            >
              Maximum
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                $
              </span>

              <input
                id="maxRate"
                type="number"
                min="0"
                value={maxRate}
                onChange={(e) =>
                  setMaxRate(e.target.value)
                }
                placeholder="100"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 pl-7 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {filterCount > 0 && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <RotateCcw size={16} />
          Clear all filters
        </button>
      )}
    </div>
  );
}

/* =====================================================
   ROOMS PAGE
===================================================== */

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] =
    useState([]);
  const [floor, setFloor] = useState("all");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* =====================================================
     FETCH ROOMS
  ===================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (selectedAmenities.length > 0) {
          params.set(
            "amenities",
            selectedAmenities.join(",")
          );
        }

        if (floor !== "all") {
          params.set("floor", floor);
        }

        if (minRate !== "") {
          params.set("minRate", minRate);
        }

        if (maxRate !== "") {
          params.set("maxRate", maxRate);
        }

        const queryString = params.toString();

        const url = queryString
          ? `http://localhost:5000/api/rooms?${queryString}`
          : "http://localhost:5000/api/rooms";

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch rooms"
          );
        }

        const data = await response.json();

        if (data.success) {
          setRooms(
            Array.isArray(data.rooms)
              ? data.rooms
              : []
          );
        } else {
          setRooms([]);
          setError(
            data.message ||
              "Failed to load rooms"
          );
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(
          "Rooms fetch error:",
          error
        );

        setError(
          "Unable to load study rooms right now."
        );

        setRooms([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [
    search,
    selectedAmenities,
    floor,
    minRate,
    maxRate,
  ]);

  /* =====================================================
     AMENITY TOGGLE
  ===================================================== */

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((previous) => {
      if (previous.includes(amenity)) {
        return previous.filter(
          (item) => item !== amenity
        );
      }

      return [...previous, amenity];
    });
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
    setFloor("all");
    setMinRate("");
    setMaxRate("");
    setCurrentPage(1);
  };

  /* =====================================================
     FILTER COUNT
  ===================================================== */

  const filterCount = useMemo(() => {
    let count = 0;

    if (search.trim()) {
      count += 1;
    }

    count += selectedAmenities.length;

    if (floor !== "all") {
      count += 1;
    }

    if (minRate !== "") {
      count += 1;
    }

    if (maxRate !== "") {
      count += 1;
    }

    return count;
  }, [
    search,
    selectedAmenities,
    floor,
    minRate,
    maxRate,
  ]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.ceil(
    rooms.length / ROOMS_PER_PAGE
  );

  const activePage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const startIndex =
    (activePage - 1) * ROOMS_PER_PAGE;

  const endIndex =
    startIndex + ROOMS_PER_PAGE;

  const currentRooms = rooms.slice(
    startIndex,
    endIndex
  );

  const showingStart =
    rooms.length === 0
      ? 0
      : startIndex + 1;

  const showingEnd = Math.min(
    endIndex,
    rooms.length
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              <DoorOpen size={15} />
              StudyNook Rooms
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Find your perfect
              <span className="text-blue-600">
                {" "}
                study space
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Search and filter comfortable study
              rooms based on your preferred
              amenities, floor, and hourly budget.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by room name..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Mobile Filters */}

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(true)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 lg:hidden"
            >
              <SlidersHorizontal size={18} />

              Filters

              {filterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-bold text-white">
                  {filterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* DESKTOP FILTER SIDEBAR */}

          <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={18}
                  className="text-blue-600"
                />

                <h2 className="font-bold text-slate-900">
                  Filters
                </h2>
              </div>

              {filterCount > 0 && (
                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                  {filterCount}
                </span>
              )}
            </div>

            <FilterContent
              selectedAmenities={
                selectedAmenities
              }
              handleAmenityChange={
                handleAmenityChange
              }
              setSelectedAmenities={
                setSelectedAmenities
              }
              floor={floor}
              setFloor={setFloor}
              minRate={minRate}
              setMinRate={setMinRate}
              maxRate={maxRate}
              setMaxRate={setMaxRate}
              filterCount={filterCount}
              clearFilters={clearFilters}
            />
          </aside>

          {/* RESULTS */}

          <div className="min-w-0">
            {/* Results Header */}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                {loading
                  ? "Finding rooms..."
                  : rooms.length > 0
                  ? `Showing ${showingStart}-${showingEnd} of ${rooms.length} rooms`
                  : "0 rooms found"}
              </p>

              {filterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="hidden items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
                >
                  <RotateCcw size={15} />
                  Clear filters
                </button>
              )}
            </div>

            {/* LOADING */}

            {loading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <div className="h-56 animate-pulse bg-slate-200" />

                      <div className="space-y-4 p-5">
                        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />

                        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

                        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div className="rounded-2xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">
                  Something went wrong
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* ROOMS */}

            {!loading &&
              !error &&
              currentRooms.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {currentRooms.map((room) => (
                      <RoomCard
                        key={room._id}
                        room={room}
                      />
                    ))}
                  </div>

                  {/* PAGINATION */}

                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      {/* Previous */}

                      <button
                        type="button"
                        onClick={() =>
                          goToPage(activePage - 1)
                        }
                        disabled={activePage === 1}
                        aria-label="Previous page"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      {/* Page Numbers */}

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            goToPage(page)
                          }
                          className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold transition ${
                            activePage === page
                              ? "bg-blue-600 text-white shadow-sm"
                              : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      {/* Next */}

                      <button
                        type="button"
                        onClick={() =>
                          goToPage(activePage + 1)
                        }
                        disabled={
                          activePage === totalPages
                        }
                        aria-label="Next page"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </>
              )}

            {/* EMPTY */}

            {!loading &&
              !error &&
              rooms.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <Search size={25} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    No rooms found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    We couldn't find any study
                    rooms matching your current
                    search and filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    <RotateCcw size={16} />
                    Reset Search
                  </button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}

      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-[150] bg-slate-950/50 backdrop-blur-sm lg:hidden"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
          />

          <aside className="fixed bottom-0 left-0 right-0 z-[200] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl lg:hidden">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Filters
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Refine your room search
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <X size={20} />
              </button>
            </div>

            <FilterContent
              selectedAmenities={
                selectedAmenities
              }
              handleAmenityChange={
                handleAmenityChange
              }
              setSelectedAmenities={
                setSelectedAmenities
              }
              floor={floor}
              setFloor={setFloor}
              minRate={minRate}
              setMinRate={setMinRate}
              maxRate={maxRate}
              setMaxRate={setMaxRate}
              filterCount={filterCount}
              clearFilters={clearFilters}
            />

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(false)
              }
              className="mt-6 w-full rounded-xl bg-slate-950 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Show {rooms.length}{" "}
              {rooms.length === 1
                ? "Room"
                : "Rooms"}
            </button>
          </aside>
        </>
      )}
    </main>
  );
}

export default Rooms;