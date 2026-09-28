const { Seat } = require('../model/seatSchema');
require('../model/seatTypeShema');

const postSeat = async (req, res) => {
    try {
        const {
            sector,
            row_number,
            number,
            venue_id,
            seat_type_id,
            location_in_schema
        } = req.body;

        if (!sector) {
            return res.status(400).json({
                success: false,
                message: "sector are required"
            });
        }

        const existingSeat = await Seat.findOne({
            sector,
            row_number,
            number,
            venue_id
        });

        if (existingSeat) {
            return res.status(400).json({
                success: false,
                message: "Bu o'rindiq allaqachon mavjud"
            });
        }

        const newSeat = new Seat({
            sector,
            row_number,
            number,
            venue_id,
            seat_type_id,
            location_in_schema
        });
        
        await newSeat.save();

        return res.status(201).json({
            success: true,
            message: "Seat created successfully",
            data: newSeat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getSeats = async (req, res) => {
    try {
        const seats = await Seat.find()
            .populate('venue_id')
            .populate('seat_type_id');

        return res.status(200).json({
            success: true,
            message: "Seats retrieved successfully",
            data: seats
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getSeatById = async (req, res) => {
    try {
        const { id } = req.params;
        const seat = await Seat.findById(id)
            .populate('venue_id')
            .populate('seat_type_id');

        if (!seat) {
            return res.status(404).json({
                success: false,
                message: "Seat not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Seat retrieved successfully",
            data: seat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateSeat = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            sector,
            row_number,
            number,
            venue_id,
            seat_type_id,
            location_in_schema
        } = req.body;

        const updatedSeat = await Seat.findByIdAndUpdate(
            id,
            {
                sector,
                row_number,
                number,
                venue_id,
                seat_type_id,
                location_in_schema
            },
            { new: true, runValidators: true }
        );

        if (!updatedSeat) {
            return res.status(404).json({
                success: false,
                message: "Seat not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Seat updated successfully",
            data: updatedSeat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteSeat = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSeat = await Seat.findByIdAndDelete(id);

        if (!deletedSeat) {
            return res.status(404).json({
                success: false,
                message: "Seat not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Seat deleted successfully",
            data: deletedSeat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchSeat = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await Seat.find({
            $or: [
                {
                    sector: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        })
            .populate('venue_id')
            .populate('seat_type_id');

        return res.status(200).json({
            success: true,
            message: "Seats searched successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    postSeat,
    getSeats,
    getSeatById,
    updateSeat,
    deleteSeat,
    searchSeat
};