import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

function AddRoom() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((previous) => {
      const exists = previous.amenities.includes(amenity);

      return {
        ...previous,
        amenities: exists
          ? previous.amenities.filter((item) => item !== amenity)
          : [...previous.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.roomName.trim() ||
      !formData.description.trim() ||
      !formData.image.trim() ||
      !formData.floor.trim() ||
      !formData.capacity ||
      !formData.hourlyRate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/rooms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            roomName: formData.roomName.trim(),
            description: formData.description.trim(),
            image: formData.image.trim(),
            floor: formData.floor.trim(),
            capacity: Number(formData.capacity),
            hourlyRate: Number(formData.hourlyRate),
            amenities: formData.amenities,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Failed to add room.");
        return;
      }

      toast.success("Room added successfully!");

      navigate("/my-listings");
    } catch (error) {
      console.error("Add room error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            StudyNook
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Add a Study Room
          </h1>

          <p className="mt-3 text-slate-500">
            Create a comfortable study space for students and library users.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          {/* Room Name */}
          <div>
            <label
              htmlFor="roomName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Room Name
            </label>

            <input
              id="roomName"
              name="roomName"
              type="text"
              value={formData.roomName}
              onChange={handleChange}
              placeholder="e.g. Quiet Study Room A"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the room..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mt-6">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Image URL
            </label>

            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/room.jpg"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          {/* Floor + Capacity */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="floor"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Floor
              </label>

              <input
                id="floor"
                name="floor"
                type="text"
                value={formData.floor}
                onChange={handleChange}
                placeholder="e.g. 2nd Floor"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="capacity"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Capacity
              </label>

              <input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="mt-6">
            <label
              htmlFor="hourlyRate"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Hourly Rate ($)
            </label>

            <input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              min="0"
              step="0.01"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="e.g. 10"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Amenities
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="h-4 w-4"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Room..." : "Add Room"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddRoom;