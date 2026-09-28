const { PaymentMethod } = require('../model/paymentMethodSchema');

const postPaymentMethod = async (req, res) => {
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

        const existingPaymentMethod = await PaymentMethod.findOne({
            name
        });

        if (existingPaymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Bu to'lov usuli allaqachon mavjud"
            });
        }

        const newPaymentMethod = new PaymentMethod({
            name
        });
        
        await newPaymentMethod.save();

        return res.status(201).json({
            success: true,
            message: "To'lov usuli ma'lumotlari muvaffaqiyatli kiritildi",
            data: newPaymentMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();

        return res.status(200).json({
            success: true,
            message: "To'lov usullari ro'yxati qaytarildi",
            data: paymentMethods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getPaymentMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentMethod = await PaymentMethod.findById(id);

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Bu to'lov usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "To'lov usuli muvaffaqiyatli topildi",
            data: paymentMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updatePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name
        } = req.body;

        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
            id,
            {
                name
            },
            { new: true, runValidators: true }
        );

        if (!updatedPaymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Bu to'lov usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "To'lov usuli yangilandi",
            data: updatedPaymentMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deletePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(id);

        if (!deletedPaymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Bu to'lov usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "To'lov usuli ma'lumotlari o'chirildi",
            data: deletedPaymentMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchPaymentMethod = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await PaymentMethod.find({
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
            message: "Bu to'lov usullari ma'lumotlari topildi",
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
    postPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod,
    searchPaymentMethod
};