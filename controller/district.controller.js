const { District } = require('../model/districtSchema');

const postDistrict = async (req, res) => {
    try {
        const { 
            name,
            region_id
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required"
            });
        }

        const newDistrict = new District({ 
            name,
            region_id
        });

        await newDistrict.save();

        return res.status(201).json({
            success: true,
            message: "District created successfully",
            data: newDistrict
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getDistricts = async (req, res) => {
    try {
        const districts = await District.find();

        return res.status(200).json({
            success: true,
            message: "Districts retrieved successfully",
            data: districts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getDistrictById = async (req, res) => {
    try {
        const { id } = req.params;
        const district = await District.findById(id);

        if (!district) {
            return res.status(404).json({
                success: false,
                message: "District not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "District retrieved successfully",
            data: district
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const updateDistrict = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name,
            region_id
        } = req.body;

        const updatedDistrict = await District.findByIdAndUpdate(
            id,
            { 
                name,
                region_id
            },
            { new: true, runValidators: true }
        );

        if (!updatedDistrict) {
            return res.status(404).json({
                success: false,
                message: "District not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "District updated successfully",
            data: updatedDistrict
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteDistrict = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDistrict = await District.findByIdAndDelete(id);

        if (!deletedDistrict) {
            return res.status(404).json({
                success: false,
                message: "District not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "District deleted successfully",
            data: deletedDistrict
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchDistrict = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await District.find({
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
            message: "Districts searched successfully",
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
    postDistrict,
    getDistricts,
    getDistrictById,
    updateDistrict,
    deleteDistrict,
    searchDistrict
};