const { Type } = require('../model/typesSchema');

const postType = async (req, res) => {
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

        const existingType = await Type.findOne({
            name
        });

        if (existingType) {
            return res.status(400).json({
                success: false,
                message: "Bu tur allaqachon mavjud"
            });
        }

        const newType = new Type({
            name
        });
        
        await newType.save();

        return res.status(201).json({
            success: true,
            message: "Tur ma'lumotlari muvaffaqiyatli kiritildi",
            data: newType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getTypes = async (req, res) => {
    try {
        const types = await Type.find();

        return res.status(200).json({
            success: true,
            message: "Turlar ro'yxati qaytarildi",
            data: types
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const type = await Type.findById(id);

        if (!type) {
            return res.status(404).json({
                success: false,
                message: "Bu tur topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tur muvaffaqiyatli topildi",
            data: type
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name
        } = req.body;

        const updatedType = await Type.findByIdAndUpdate(
            id,
            {
                name
            },
            { new: true, runValidators: true }
        );

        if (!updatedType) {
            return res.status(404).json({
                success: false,
                message: "Bu tur topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tur yangilandi",
            data: updatedType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedType = await Type.findByIdAndDelete(id);

        if (!deletedType) {
            return res.status(404).json({
                success: false,
                message: "Bu tur topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tur ma'lumotlari o'chirildi",
            data: deletedType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchType = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await Type.find({
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
            message: "Bu turlar ma'lumotlari topildi",
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
    postType,
    getTypes,
    getTypeById,
    updateType,
    deleteType,
    searchType
};