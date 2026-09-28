const { Region } = require('../model/regionSchema');

const postRegion = async (req, res) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const existingRegion = await Region.findOne({
            name
        });

        if (existingRegion) {
            return res.status(400).json({
                success: false,
                message: "Bu hudud allaqachon mavjud"
            });
        }

        const newRegion = new Region({
            name
        });
        
        await newRegion.save();

        return res.status(201).json({
            success: true,
            message: "Hudud ma'lumotlari muvaffaqiyatli kiritildi",
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
            message: "Hududlar ro'yxati qaytarildi",
            data: regions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Bu hudud topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hudud muvaffaqiyatli topildi",
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
                message: "Bu hudud topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hudud yangilandi",
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
                message: "Bu hudud topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hudud ma'lumotlari o'chirildi",
            data: deletedRegion
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
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
            message: "Bu hududlar ma'lumotlari topildi",
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
    postRegion,
    getRegions,
    getRegionById,
    updateRegion,
    deleteRegion,
    searchRegion
};