const { Types } = require('mongoose');
const { Booking } = require('../model/bookingSchema');

const postBooking = async (req, res) => {
    try {
        const {
            card_id,
            createdAt,
            finished,
            payment_methood_id,
            delivery_method_id,
            discount_coupon_id,
            status_id,
        } = req.body;

        const newBooking = new Booking({
            card_id,
            createdAt,
            finished,
            payment_methood_id,
            delivery_method_id,
            discount_coupon_id,
            status_id
        });

        await newBooking.save();

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: newBooking
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({ path: 'card_id', select: 'customer_id name phone year month is_active is_main', populate: { path: 'customer_id', select: 'first_name last_name phone email' } })
            .populate('payment_methood_id')
            .populate('delivery_method_id');
        return res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: bookings
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate({ path: 'card_id', select: 'customer_id name phone year month is_active is_main', populate: { path: 'customer_id', select: 'first_name last_name phone email' } })
            .populate('payment_methood_id')
            .populate('delivery_method_id');
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Booking retrieved successfully',
            data: booking
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            card_id,
            createdAt,
            finished,
            payment_methood_id,
            delivery_method_id,
            discount_coupon_id,
            status_id,
        } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            {
                card_id,
                createdAt,
                finished,
                payment_methood_id,
                delivery_method_id,
                discount_coupon_id,
                status_id,
            },
            { new: true, runValidators: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
            data: deletedBooking
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const searchBooking = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = Types.ObjectId.isValid(query)
            ? await Booking.find({ card_id: query })
                .populate({ path: 'card_id', select: 'customer_id name phone year month is_active is_main', populate: { path: 'customer_id', select: 'first_name last_name phone email' } })
                .populate('payment_methood_id')
                .populate('delivery_method_id')
            : [];

        return res.status(200).json({
            success: true,
            message: "Bookings searched successfully",
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
    postBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    searchBooking
};