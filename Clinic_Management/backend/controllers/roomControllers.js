import Room from "../models/roomModal.js";
import Doctor from "../models/doctorModal.js";
import User from "../models/userModal.js";

// Create Room
export const createRoom = async (req, res) => {
  try {
    const { type, roomId, doctorId, patientId, schedule, status } = req.body;

    const room = new Room({ type, roomId, doctorId, patientId, schedule, status });
    await room.save();

    res.status(201).json({ message: "Room created successfully", data: room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });

    res.json({ message: "Rooms fetched", data: rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Room
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Room.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Room not found" });

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
