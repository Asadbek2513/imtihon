const { Region } = require('../model/regionSchema');

const postRegion = async (req, res) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required"
            });
        }

        const existingRegion = await Region.findOne({
            name
        });

        if (existingRegion) {
            return res.status(400).json({
                success: false,
                message: "Bu region allaqachon mavjud"
            });
        }

        const newRegion = new Region({
            name
        });
        
        await newRegion.save();

        return res.status(201).json({
            success: true,
            message: "Region created successfully",
            data: newRegion
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getRegions = async (req, res) => {
    try {
        const regions = await Region.find();

        return res.status(200).json({
            success: true,
            message: "Regions retrieved successfully",
            data: regions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        const region = await Region.findById(id);

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Region retrieved successfully",
            data: region
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateRegion = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name
        } = req.body;

        const updatedRegion = await Region.findByIdAndUpdate(
            id,
            {
                name
            },
            { new: true, runValidators: true }
        );

        if (!updatedRegion) {
            return res.status(404).json({
                success: false,
                message: "Region not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Region updated successfully",
            data: updatedRegion
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteRegion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRegion = await Region.findByIdAndDelete(id);

        if (!deletedRegion) {
            return res.status(404).json({
                success: false,
                message: "Region not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Region deleted successfully",
            data: deletedRegion
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchRegion = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await Region.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Regions searched successfully",
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
    postRegion,
    getRegions,
    getRegionById,
    updateRegion,
    deleteRegion,
    searchRegion
};