const { Lang } = require('../model/langSchema');

const postLang = async (req, res) => {
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

        const existingLang = await Lang.findOne({
            name
        });

        if (existingLang) {
            return res.status(400).json({
                success: false,
                message: "Bu til allaqachon mavjud"
            });
        }

        const newLang = new Lang({
            name
        });
        
        await newLang.save();

        return res.status(201).json({
            success: true,
            message: "Language created successfully",
            data: newLang
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getLangs = async (req, res) => {
    try {
        const langs = await Lang.find();

        return res.status(200).json({
            success: true,
            message: "Languages retrieved successfully",
            data: langs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const lang = await Lang.findById(id);

        if (!lang) {
            return res.status(404).json({
                success: false,
                message: "Language not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Language retrieved successfully",
            data: lang
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateLang = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name
        } = req.body;

        const updatedLang = await Lang.findByIdAndUpdate(
            id,
            {
                name
            },
            { new: true, runValidators: true }
        );

        if (!updatedLang) {
            return res.status(404).json({
                success: false,
                message: "Language not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Language updated successfully",
            data: updatedLang
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteLang = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLang = await Lang.findByIdAndDelete(id);

        if (!deletedLang) {
            return res.status(404).json({
                success: false,
                message: "Language not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Language deleted successfully",
            data: deletedLang
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchLang = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await Lang.find({
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
            message: "Languages searched successfully",
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
    postLang,
    getLangs,
    getLangById,
    updateLang,
    deleteLang,
    searchLang
};