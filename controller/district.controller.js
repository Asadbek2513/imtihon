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
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const newDistrict = new District({ 
            name,
            region_id
        });

        await newDistrict.save();

        return res.status(201).json({
            success: true,
            message: "Tuman ma'lumotlari muvaffaqiyatli kiritildi",
            data: newDistrict
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getDistricts = async (req, res) => {
    try {
        const districts = await District.find()
            .populate('region_id');

        return res.status(200).json({
            success: true,
            message: "Tumanlar ro'yxati qaytarildi",
            data: districts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getDistrictById = async (req, res) => {
    try {
        const { id } = req.params;
        const district = await District.findById(id)
            .populate('region_id');

        if (!district) {
            return res.status(404).json({
                success: false,
                message: "Bu tuman topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tuman muvaffaqiyatli topildi",
            data: district
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Bu tuman topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tuman yangilandi",
            data: updatedDistrict
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Bu tuman topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tuman ma'lumotlari o'chirildi",
            data: deletedDistrict
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
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
        }).populate('region_id');

        return res.status(200).json({
            success: true,
            message: "Bu tumanlar ma'lumotlari topildi",
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
    postDistrict,
    getDistricts,
    getDistrictById,
    updateDistrict,
    deleteDistrict,
    searchDistrict
};