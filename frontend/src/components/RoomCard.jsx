import { Link } from "react-router-dom";
import { Users, MapPin } from "lucide-react";

function RoomCard({ room }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={room.image}
          alt={room.roomName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-slate-800 shadow">
          ${room.hourlyRate}/hr
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
          {room.roomName}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {room.description}
        </p>

        {/* Room Info */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin size={17} />
            <span>{room.floor}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={17} />
            <span>{room.capacity} people</span>
          </div>
        </div>

        {/* Amenities */}
        {room.amenities?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {amenity}
              </span>
            ))}

            {room.amenities.length > 3 && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action */}
        <Link
          to={`/rooms/${room._id}`}
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;