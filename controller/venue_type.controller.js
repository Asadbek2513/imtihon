const { Types } = require('mongoose');
const { VenueType } = require('../model/venueTypeSchema');

const postVenueType = async (req, res) => {
    try {
        const {
            venueId,
            typeId
        } = req.body;

        if (!venueId) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const existingVenueType = await VenueType.findOne({
            venueId,
            typeId
        });

        if (existingVenueType) {
            return res.status(400).json({
                success: false,
                message: "Bu maskan turi allaqachon mavjud"
            });
        }

        const newVenueType = new VenueType({
            venueId,
            typeId
        });
        
        await newVenueType.save();

        return res.status(201).json({
            success: true,
            message: "Maskan turi ma'lumotlari muvaffaqiyatli kiritildi",
            data: newVenueType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueType.find()
            .populate('venueId')
            .populate('typeId');

        return res.status(200).json({
            success: true,
            message: "Maskan turlari ro'yxati qaytarildi",
            data: venueTypes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getVenueTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const venueType = await VenueType.findById(id)
            .populate('venueId')
            .populate('typeId');

        if (!venueType) {
            return res.status(404).json({
                success: false,
                message: "Bu maskan turi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Maskan turi muvaffaqiyatli topildi",
            data: venueType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateVenueType = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            venueId,
            typeId
        } = req.body;

        const updatedVenueType = await VenueType.findByIdAndUpdate(
            id,
            {
                venueId,
                typeId
            },
            { new: true, runValidators: true }
        );
        if (!updatedVenueType) {
            return res.status(404).json({
                success: false,
                message: "Bu maskan turi topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Maskan turi yangilandi",
            data: updatedVenueType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteVenueType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVenueType = await VenueType.findByIdAndDelete(id);
        if (!deletedVenueType) {
            return res.status(404).json({
                success: false,
                message: "Bu maskan turi topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Maskan turi ma'lumotlari o'chirildi",
            data: deletedVenueType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchVenueType = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = Types.ObjectId.isValid(query)
            ? await VenueType.find(
                { 
                    $or: [
                        { 
                            venueId: query 
                        }, 
                        { 
                            typeId: query 
                        }
                    ] 
                }
            )
                .populate('venueId')
                .populate('typeId')
            : [];

        return res.status(200).json({
            success: true,
            message: "Bu maskan turlari ma'lumotlari topildi",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

module.exports = {
    postVenueType,
    getVenueTypes,
    getVenueTypeById,
    updateVenueType,
    deleteVenueType,
    searchVenueType
};