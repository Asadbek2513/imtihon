const { DeliveryMethod } = require('../model/deliveryMethodSchema');

const postDeliveryMethod = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const newDeliveryMethod = new DeliveryMethod({ name });

        await newDeliveryMethod.save();

        return res.status(201).json({
            success: true,
            message: "Yetkazib berish usuli ma'lumotlari muvaffaqiyatli kiritildi",
            data: newDeliveryMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getDeliveryMethods = async (req, res) => {
    try {
        const deliveryMethods = await DeliveryMethod.find();

        return res.status(200).json({
            success: true,
            message: "Yetkazib berish usullari ro'yxati qaytarildi",
            data: deliveryMethods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getDeliveryMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        const deliveryMethod = await DeliveryMethod.findById(id);

        if (!deliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Bu yetkazib berish usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Yetkazib berish usuli muvaffaqiyatli topildi",
            data: deliveryMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateDeliveryMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedDeliveryMethod = await DeliveryMethod.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!updatedDeliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Bu yetkazib berish usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Yetkazib berish usuli yangilandi",
            data: updatedDeliveryMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteDeliveryMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDeliveryMethod = await DeliveryMethod.findByIdAndDelete(id);
        if (!deletedDeliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Bu yetkazib berish usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Yetkazib berish usuli ma'lumotlari o'chirildi",
            data: deletedDeliveryMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchDeliveryMethod = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await DeliveryMethod.find({
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
            message: "Bu yetkazib berish usullari ma'lumotlari topildi",
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
    postDeliveryMethod,
    getDeliveryMethods,
    getDeliveryMethodById,
    updateDeliveryMethod,
    deleteDeliveryMethod,
    searchDeliveryMethod
};