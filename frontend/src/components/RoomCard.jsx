import { Link } from "react-router-dom";
import {
  MapPin,
  Users,
  ArrowUpRight,
  Wifi,
  Zap,
  Wind,
  Presentation,
  Check,
} from "lucide-react";

const amenityIcons = {
  "Wi-Fi": Wifi,
  "Power Outlets": Zap,
  "Air Conditioning": Wind,
  Projector: Presentation,
};

function RoomCard({ room }) {
  const visibleAmenities = room.amenities?.slice(0, 3) || [];
  const extraAmenities =
    Math.max((room.amenities?.length || 0) - 3, 0);

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={room.image}
          alt={room.roomName}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Image Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/50
            via-transparent
            to-transparent
          "
        />

        {/* Price */}
        <div
          className="
            absolute
            right-4
            top-4
            rounded-full
            bg-white
            px-3.5
            py-2
            text-sm
            font-bold
            text-slate-900
            shadow-lg
          "
        >
          ${room.hourlyRate}/hr
        </div>

        {/* Floor */}
        <div
          className="
            absolute
            bottom-4
            left-4
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-white/20
            bg-slate-950/60
            px-3
            py-1.5
            text-xs
            font-medium
            text-white
            backdrop-blur-md
          "
        >
          <MapPin size={13} />
          {room.floor}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3
            className="
              line-clamp-1
              text-xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {room.roomName}
          </h3>

          <ArrowUpRight
            size={20}
            className="
              shrink-0
              text-slate-400
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-blue-600
            "
          />
        </div>

        {/* Description */}
        <p
          className="
            mb-4
            line-clamp-2
            min-h-[40px]
            text-sm
            leading-5
            text-slate-500
          "
        >
          {room.description}
        </p>

        {/* Capacity */}
        <div
          className="
            mb-4
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-slate-100
              text-slate-700
            "
          >
            <Users size={16} />
          </div>

          <span>
            Up to {room.capacity} people
          </span>
        </div>

        {/* Amenities */}
        <div className="mb-5 flex min-h-[30px] flex-wrap gap-2">
          {visibleAmenities.map((amenity) => {
            const Icon = amenityIcons[amenity];

            return (
              <span
                key={amenity}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-slate-100
                  px-2.5
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-600
                "
              >
                {Icon ? (
                  <Icon size={12} />
                ) : (
                  <Check size={12} />
                )}

                {amenity}
              </span>
            );
          })}

          {extraAmenities > 0 && (
            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-blue-50
                px-2.5
                py-1.5
                text-xs
                font-semibold
                text-blue-600
              "
            >
              +{extraAmenities} more
            </span>
          )}
        </div>

        {/* Button */}
        <Link
          to={`/rooms/${room._id}`}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-blue-600
          "
        >
          View Details

          <ArrowUpRight
            size={17}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </article>
  );
}

export default RoomCard;