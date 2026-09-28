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
                message: "venueId and typeId are required"
            });
        }

        const existingVenueType = await VenueType.findOne({
            venueId,
            typeId
        });

        if (existingVenueType) {
            return res.status(400).json({
                success: false,
                message: "Bu venue type allaqachon mavjud"
            });
        }

        const newVenueType = new VenueType({
            venueId,
            typeId
        });
        
        await newVenueType.save();

        return res.status(201).json({
            success: true,
            message: "Venue type created successfully",
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
            message: "Venue types retrieved successfully",
            data: venueTypes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Venue type not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Venue type retrieved successfully",
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
                message: "Venue type not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Venue type updated successfully",
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
                message: "Venue type not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Venue type deleted successfully",
            data: deletedVenueType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Search query is required"
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
            message: "Venue types searched successfully",
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
    postVenueType,
    getVenueTypes,
    getVenueTypeById,
    updateVenueType,
    deleteVenueType,
    searchVenueType
};