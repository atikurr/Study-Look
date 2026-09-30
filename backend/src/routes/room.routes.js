import express from "express";
import Room from "../models/Room.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ==========================================
// GET ALL ROOMS
// Public
// Search + Amenities + Rate + Floor Filter
// ==========================================
router.get("/", async (req, res) => {
  try {
    const { search, amenities, minRate, maxRate, floor } = req.query;

    const query = {};

    // Search by room name
    if (search) {
      query.roomName = {
        $regex: search,
        $options: "i",
      };
    }

    // Amenities filter
    if (amenities) {
      const amenityList = amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (amenityList.length > 0) {
        query.amenities = {
          $in: amenityList,
        };
      }
    }

    // Hourly rate filter
    if (minRate || maxRate) {
      query.hourlyRate = {};

      if (minRate) {
        query.hourlyRate.$gte = Number(minRate);
      }

      if (maxRate) {
        query.hourlyRate.$lte = Number(maxRate);
      }
    }

    // Floor filter
    if (floor) {
      query.floor = floor;
    }

    const rooms = await Room.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    console.error("Get rooms error:", error);

    res.status(500).json({
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

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error("Get latest rooms error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch latest rooms",
    });
  }
});

// ==========================================
// GET MY LISTINGS
// Private
// ==========================================
router.get("/my-listings", authMiddleware, async (req, res) => {
  try {
    const rooms = await Room.find({
      ownerId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error("Get my listings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch your listings",
    });
  }
});

// ==========================================
// GET SINGLE ROOM
// Public
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    console.error("Get room error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch room",
    });
  }
});

// ==========================================
// CREATE ROOM
// Private
// ==========================================
router.post("/", authMiddleware, async (req, res) => {
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

    // Required field validation
    if (
      !roomName ||
      !description ||
      !image ||
      !floor ||
      capacity === undefined ||
      hourlyRate === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const room = await Room.create({
      roomName: roomName.trim(),
      description: description.trim(),
      image: image.trim(),
      floor: floor.trim(),
      capacity: Number(capacity),
      hourlyRate: Number(hourlyRate),
      amenities: amenities || [],
      ownerId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room,
    });
  } catch (error) {
    console.error("Create room error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create room",
    });
  }
});

// ==========================================
// UPDATE ROOM
// Private + Owner Only
// ==========================================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Owner verification
    if (room.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own room",
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

    room.roomName = roomName ?? room.roomName;
    room.description = description ?? room.description;
    room.image = image ?? room.image;
    room.floor = floor ?? room.floor;
    room.capacity = capacity ?? room.capacity;
    room.hourlyRate = hourlyRate ?? room.hourlyRate;
    room.amenities = amenities ?? room.amenities;

    await room.save();

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    console.error("Update room error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update room",
    });
  }
});

// ==========================================
// DELETE ROOM
// Private + Owner Only
// ==========================================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Owner verification
    if (room.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own room",
      });
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error("Delete room error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete room",
    });
  }
});

export default router;