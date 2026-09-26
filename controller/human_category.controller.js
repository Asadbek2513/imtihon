const { HumanCategory } = require('../model/humanCategorySchema');

const postHumanCategory = async (req, res) => {
    try {
        const {
            name,
            start_age,
            finish_age,
            gender
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required"
            });
        }

        const existingHumanCategory = await HumanCategory.findOne({
            name
        });

        if (existingHumanCategory) {
            return res.status(400).json({
                success: false,
                message: "Bu human category allaqachon mavjud"
            });
        }

        const newHumanCategory = new HumanCategory({
            name,
            start_age,
            finish_age,
            gender
        });
        
        await newHumanCategory.save();

        return res.status(201).json({
            success: true,
            message: "Human category created successfully",
            data: newHumanCategory
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getHumanCategories = async (req, res) => {
    try {
        const humanCategories = await HumanCategory.find();

        return res.status(200).json({
            success: true,
            message: "Human categories retrieved successfully",
            data: humanCategories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getHumanCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const humanCategory = await HumanCategory.findById(id);

        if (!humanCategory) {
            return res.status(404).json({
                success: false,
                message: "Human category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Human category retrieved successfully",
            data: humanCategory
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateHumanCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            start_age,
            finish_age,
            gender
        } = req.body;

        const updatedHumanCategory = await HumanCategory.findByIdAndUpdate(
            id,
            {
                name,
                start_age,
                finish_age,
                gender
            },
            { new: true, runValidators: true }
        );

        if (!updatedHumanCategory) {
            return res.status(404).json({
                success: false,
                message: "Human category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Human category updated successfully",
            data: updatedHumanCategory
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteHumanCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHumanCategory = await HumanCategory.findByIdAndDelete(id);

        if (!deletedHumanCategory) {
            return res.status(404).json({
                success: false,
                message: "Human category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Human category deleted successfully",
            data: deletedHumanCategory
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchHumanCategory = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await HumanCategory.find({
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
            message: "Human categories searched successfully",
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
    postHumanCategory,
    getHumanCategories,
    getHumanCategoryById,
    updateHumanCategory,
    deleteHumanCategory,
    searchHumanCategory
};