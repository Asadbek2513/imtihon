const { Venue } = require('../model/venueSchema');

const postVenue = async (req, res) => {
    try {
        const {
            name,
            address,
            location,
            site,
            phone,
            schema,
            regionId,
            districtId
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name and address are required"
            });
        }

        const existingVenue = await Venue.findOne({
            name,
            address
        });

        if (existingVenue) {
            return res.status(400).json({
                success: false,
                message: "Bu venue allaqachon mavjud"
            });
        }

        const newVenue = new Venue({
            name,
            address,
            location,
            site,
            phone,
            schema,
            regionId,
            districtId
        });
        
        await newVenue.save();

        return res.status(201).json({
            success: true,
            message: "Venue created successfully",
            data: newVenue
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find();

        return res.status(200).json({
            success: true,
            message: "Venues retrieved successfully",
            data: venues
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getVenueById = async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findById(id);

        if (!venue) {
            return res.status(404).json({
                success: false,
                message: "Venue not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Venue retrieved successfully",
            data: venue
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            address,
            location,
            site,
            phone,
            schema,
            regionId,
            districtId
        } = req.body;

        const updatedVenue = await Venue.findByIdAndUpdate(
            id,
            {
                name,
                address,
                location,
                site,
                phone,
                schema,
                regionId,
                districtId
            },
            { new: true, runValidators: true }
        );

        if (!updatedVenue) {
            return res.status(404).json({
                success: false,
                message: "Venue not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Venue updated successfully",
            data: updatedVenue
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVenue = await Venue.findByIdAndDelete(id);

        if (!deletedVenue) {
            return res.status(404).json({
                success: false,
                message: "Venue not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Venue deleted successfully",
            data: deletedVenue
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchVenue = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await Venue.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    address: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    phone: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Venues searched successfully",
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
    postVenue,
    getVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
    searchVenue
};