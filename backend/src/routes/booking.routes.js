import express from "express";
import mongoose from "mongoose";

import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ==========================================
// TIME HELPERS
// ==========================================

// HH:MM 24-hour format
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

// Convert HH:MM -> minutes
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Check hourly slot
// Valid examples: 08:00, 09:00, 10:00 ... 20:00
const isHourlySlot = (time) => {
  return (
    typeof time === "string" &&
    TIME_PATTERN.test(time) &&
    timeToMinutes(time) % 60 === 0
  );
};

// ==========================================
// CREATE BOOKING
// Private
// ==========================================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      roomId,
      bookingDate,
      startTime,
      endTime,
      note,
    } = req.body;

    // ------------------------------------------
    // Required fields
    // ------------------------------------------
    if (
      !roomId ||
      !bookingDate ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Room, date, start time and end time are required.",
      });
    }

    // ------------------------------------------
    // Validate room ID
    // ------------------------------------------
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID.",
      });
    }

    // ------------------------------------------
    // Find room
    // ------------------------------------------
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // ------------------------------------------
    // Date validation
    // ------------------------------------------
    const selectedDate = new Date(
      `${bookingDate}T00:00:00`
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking date.",
      });
    }

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message:
          "Booking date cannot be in the past.",
      });
    }

    // ------------------------------------------
    // Time format validation
    // ------------------------------------------
    if (
      typeof startTime !== "string" ||
      typeof endTime !== "string" ||
      !TIME_PATTERN.test(startTime) ||
      !TIME_PATTERN.test(endTime)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking time.",
      });
    }

    // ------------------------------------------
    // Hourly slot validation
    // Assignment:
    // 08:00, 09:00 ... 20:00
    // ------------------------------------------
    if (
      !isHourlySlot(startTime) ||
      !isHourlySlot(endTime)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking time must use hourly slots.",
      });
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // ------------------------------------------
    // Booking hours: 08:00 - 20:00
    // ------------------------------------------
    if (
      startMinutes < 8 * 60 ||
      endMinutes > 20 * 60
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking time must be between 08:00 and 20:00.",
      });
    }

    // ------------------------------------------
    // End must be after start
    // ------------------------------------------
    if (endMinutes <= startMinutes) {
      return res.status(400).json({
        success: false,
        message:
          "End time must be after start time.",
      });
    }

    // ------------------------------------------
    // Minimum 1 hour
    // ------------------------------------------
    const durationMinutes =
      endMinutes - startMinutes;

    if (durationMinutes < 60) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum booking duration is 1 hour.",
      });
    }

    // ------------------------------------------
    // Conflict check
    // ------------------------------------------
    const conflictingBooking =
      await Booking.findOne({
        roomId,
        bookingDate,
        status: "confirmed",

        // Existing booking starts before
        // requested booking ends
        startTime: {
          $lt: endTime,
        },

        // Existing booking ends after
        // requested booking starts
        endTime: {
          $gt: startTime,
        },
      });

    if (conflictingBooking) {
      return res.status(409).json({
        success: false,
        message:
          "This room is already booked for the selected time.",
      });
    }

    // ------------------------------------------
    // Calculate total cost
    // ------------------------------------------
    const durationHours =
      durationMinutes / 60;

    const totalCost =
      durationHours * room.hourlyRate;

    // ------------------------------------------
    // Create booking
    // ------------------------------------------
    const booking = await Booking.create({
      roomId,
      userId: req.user.id,
      bookingDate,
      startTime,
      endTime,
      totalCost,
      note: note?.trim() || "",
      status: "confirmed",
    });

    // ------------------------------------------
    // Increase room booking count
    // ------------------------------------------
    await Room.findByIdAndUpdate(roomId, {
      $inc: {
        bookingCount: 1,
      },
    });

    return res.status(201).json({
      success: true,
      message:
        "Room booked successfully.",
      booking,
    });
  } catch (error) {
    console.error(
      "Create booking error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create booking.",
    });
  }
});

// ==========================================
// GET MY BOOKINGS
// Private
// ==========================================
router.get(
  "/my-bookings",
  authMiddleware,
  async (req, res) => {
    try {
      const bookings =
        await Booking.find({
          userId: req.user.id,
        })
          .populate(
            "roomId",
            "roomName image floor capacity hourlyRate"
          )
          .sort({
            bookingDate: 1,
            startTime: 1,
          });

      return res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      console.error(
        "Get my bookings error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch your bookings.",
      });
    }
  }
);

// ==========================================
// GET ROOM BOOKINGS
// Public
// ==========================================
router.get(
  "/room/:roomId",
  async (req, res) => {
    try {
      const { roomId } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          roomId
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid room ID.",
        });
      }

      const bookings =
        await Booking.find({
          roomId,
          status: "confirmed",
        }).select(
          "bookingDate startTime endTime status"
        );

      return res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      console.error(
        "Get room bookings error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch room bookings.",
      });
    }
  }
);

// ==========================================
// CANCEL BOOKING
// Private
// ==========================================
router.patch(
  "/:id/cancel",
  authMiddleware,
  async (req, res) => {
    try {
      // ------------------------------------------
      // Validate booking ID
      // ------------------------------------------
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid booking ID.",
        });
      }

      // ------------------------------------------
      // Find booking
      // ------------------------------------------
      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found.",
        });
      }

      // ------------------------------------------
      // IMPORTANT:
      // ObjectId vs string comparison fix
      // ------------------------------------------
      if (
        booking.userId.toString() !==
        req.user.id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You can only cancel your own booking.",
        });
      }

      // ------------------------------------------
      // Already cancelled
      // ------------------------------------------
      if (
        booking.status === "cancelled"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Booking is already cancelled.",
        });
      }

      // ------------------------------------------
      // Only confirmed bookings can be cancelled
      // ------------------------------------------
      if (
        booking.status !== "confirmed"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Only confirmed bookings can be cancelled.",
        });
      }

      // ------------------------------------------
      // Date validation
      // ------------------------------------------
      const bookingDate = new Date(
        `${booking.bookingDate}T00:00:00`
      );

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (bookingDate < today) {
        return res.status(400).json({
          success: false,
          message:
            "Past bookings cannot be cancelled.",
        });
      }

      // ------------------------------------------
      // Cancel booking
      // ------------------------------------------
      booking.status = "cancelled";

      await booking.save();

      // ------------------------------------------
      // Decrease room booking count
      // ------------------------------------------
      await Room.findByIdAndUpdate(
        booking.roomId,
        {
          $inc: {
            bookingCount: -1,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message:
          "Booking cancelled successfully.",
        booking,
      });
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to cancel booking.",
      });
    }
  }
);

export default router;