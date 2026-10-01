import express from "express";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ==========================================
// GET ALL ROOMS
// Public
// Search + Amenities + Rate + Floor Filter
// ==========================================
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      amenities,
      minRate,
      maxRate,
      floor,
    } = req.query;

    const query = {};

    // ------------------------------------------
    // Search by room name
    // MongoDB: $regex
    // ------------------------------------------
    if (search.trim()) {
      query.roomName = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // ------------------------------------------
    // Amenities filter
    // MongoDB: $in
    // ------------------------------------------
    if (amenities) {
      const amenityList = (
        Array.isArray(amenities)
          ? amenities
          : amenities.split(",")
      )
        .map((item) => item.trim())
        .filter(Boolean);

      if (amenityList.length > 0) {
        query.amenities = {
          $in: amenityList,
        };
      }
    }

    // ------------------------------------------
    // Hourly rate filter
    // MongoDB: $gte / $lte
    // ------------------------------------------
    if (minRate || maxRate) {
      query.hourlyRate = {};

      if (minRate !== undefined && minRate !== "") {
        const minimum = Number(minRate);

        if (!Number.isNaN(minimum)) {
          query.hourlyRate.$gte = minimum;
        }
      }

      if (maxRate !== undefined && maxRate !== "") {
        const maximum = Number(maxRate);

        if (!Number.isNaN(maximum)) {
          query.hourlyRate.$lte = maximum;
        }
      }

      // Remove empty rate object
      if (
        Object.keys(query.hourlyRate).length === 0
      ) {
        delete query.hourlyRate;
      }
    }

    // ------------------------------------------
    // Floor filter
    // ------------------------------------------
    if (floor && floor !== "all") {
      query.floor = {
        $regex: floor.trim(),
        $options: "i",
      };
    }

    // ------------------------------------------
    // Fetch rooms
    // ------------------------------------------
    const rooms = await Room.find(query).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    console.error("Get rooms error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
    });
  }
});

// ==========================================
// GET LATEST 6 ROOMS
// Public
// ==========================================
router.get("/latest", async (req, res) => {
  try {
    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error(
      "Get latest rooms error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch latest rooms",
    });
  }
});

// ==========================================
// GET MY LISTINGS
// Private
// ==========================================
router.get(
  "/my-listings",
  authMiddleware,
  async (req, res) => {
    try {
      const rooms = await Room.find({
        ownerId: req.user.id,
      }).sort({
        createdAt: -1,
      });

      return res.status(200).json({
        success: true,
        rooms,
      });
    } catch (error) {
      console.error(
        "Get my listings error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch your listings",
      });
    }
  }
);

// ==========================================
// GET SINGLE ROOM
// Public
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    console.error("Get room error:", error);

    // Invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch room",
    });
  }
});

// ==========================================
// CREATE ROOM
// Private
// ==========================================
router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        roomName,
        description,
        image,
        floor,
        capacity,
        hourlyRate,
        amenities,
      } = req.body;

      // ------------------------------------------
      // Required fields validation
      // ------------------------------------------
      if (
        !roomName?.trim() ||
        !description?.trim() ||
        !image?.trim() ||
        !floor?.trim() ||
        capacity === undefined ||
        hourlyRate === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All required fields must be provided",
        });
      }

      // ------------------------------------------
      // Number validation
      // ------------------------------------------
      const roomCapacity = Number(capacity);
      const roomHourlyRate = Number(hourlyRate);

      if (
        !Number.isFinite(roomCapacity) ||
        roomCapacity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Capacity must be at least 1",
        });
      }

      if (
        !Number.isFinite(roomHourlyRate) ||
        roomHourlyRate < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Hourly rate must be a valid positive number",
        });
      }

      // ------------------------------------------
      // Amenities validation
      // ------------------------------------------
      const allowedAmenities = [
        "Whiteboard",
        "Projector",
        "Wi-Fi",
        "Power Outlets",
        "Quiet Zone",
        "Air Conditioning",
      ];

      const roomAmenities = Array.isArray(
        amenities
      )
        ? amenities.filter((item) =>
            allowedAmenities.includes(item)
          )
        : [];

      // ------------------------------------------
      // Create room
      // ------------------------------------------
      const room = await Room.create({
        roomName: roomName.trim(),
        description: description.trim(),
        image: image.trim(),
        floor: floor.trim(),
        capacity: roomCapacity,
        hourlyRate: roomHourlyRate,
        amenities: roomAmenities,
        ownerId: req.user.id,
      });

      return res.status(201).json({
        success: true,
        message: "Room added successfully",
        room,
      });
    } catch (error) {
      console.error(
        "Create room error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to create room",
      });
    }
  }
);

// ==========================================
// UPDATE ROOM
// Private + Owner Only
// ==========================================
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const room = await Room.findById(
        req.params.id
      );

      if (!room) {
        return res.status(404).json({
          success: false,
          message: "Room not found",
        });
      }

      // ------------------------------------------
      // Owner verification
      // ------------------------------------------
      if (room.ownerId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message:
            "You can only edit your own room",
        });
      }

      const {
        roomName,
        description,
        image,
        floor,
        capacity,
        hourlyRate,
        amenities,
      } = req.body;

      // ------------------------------------------
      // Update text fields
      // ------------------------------------------
      if (roomName !== undefined) {
        room.roomName =
          roomName.trim();
      }

      if (description !== undefined) {
        room.description =
          description.trim();
      }

      if (image !== undefined) {
        room.image =
          image.trim();
      }

      if (floor !== undefined) {
        room.floor =
          floor.trim();
      }

      // ------------------------------------------
      // Update capacity
      // ------------------------------------------
      if (capacity !== undefined) {
        const updatedCapacity =
          Number(capacity);

        if (
          !Number.isFinite(
            updatedCapacity
          ) ||
          updatedCapacity < 1
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Capacity must be at least 1",
          });
        }

        room.capacity =
          updatedCapacity;
      }

      // ------------------------------------------
      // Update hourly rate
      // ------------------------------------------
      if (hourlyRate !== undefined) {
        const updatedRate =
          Number(hourlyRate);

        if (
          !Number.isFinite(
            updatedRate
          ) ||
          updatedRate < 0
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Hourly rate must be a valid number",
          });
        }

        room.hourlyRate =
          updatedRate;
      }

      // ------------------------------------------
      // Update amenities
      // ------------------------------------------
      if (amenities !== undefined) {
        const allowedAmenities = [
          "Whiteboard",
          "Projector",
          "Wi-Fi",
          "Power Outlets",
          "Quiet Zone",
          "Air Conditioning",
        ];

        room.amenities = Array.isArray(
          amenities
        )
          ? amenities.filter((item) =>
              allowedAmenities.includes(
                item
              )
            )
          : [];
      }

      await room.save();

      return res.status(200).json({
        success: true,
        message: "Room updated successfully",
        room,
      });
    } catch (error) {
      console.error(
        "Update room error:",
        error
      );

      if (error.name === "CastError") {
        return res.status(404).json({
          success: false,
          message: "Room not found",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to update room",
      });
    }
  }
);

// ==========================================
// DELETE ROOM
// Private + Owner Only
// ==========================================
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const room = await Room.findById(
        req.params.id
      );

      if (!room) {
        return res.status(404).json({
          success: false,
          message: "Room not found",
        });
      }

      // ------------------------------------------
      // Owner verification
      // ------------------------------------------
      if (room.ownerId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message:
            "You can only delete your own room",
        });
      }

      // ------------------------------------------
      // Remove every booking that belongs to this
      // room so no orphan bookings are left behind
      // ------------------------------------------
      await Booking.deleteMany({
        roomId: room._id,
      });

      // ------------------------------------------
      // Delete the room
      // ------------------------------------------
      await Room.findByIdAndDelete(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Room deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete room error:",
        error
      );

      if (error.name === "CastError") {
        return res.status(404).json({
          success: false,
          message: "Room not found",
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete room",
      });
    }
  }
);

export default router;