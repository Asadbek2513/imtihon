const { PaymentMethod } = require('../model/paymentMethodSchema');

const postPaymentMethod = async (req, res) => {
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

        const existingPaymentMethod = await PaymentMethod.findOne({
            name
        });

        if (existingPaymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Bu to'lov turi allaqachon mavjud"
            });
        }

        const newPaymentMethod = new PaymentMethod({
            name
        });
        
        await newPaymentMethod.save();

        return res.status(201).json({
            success: true,
            message: "Payment method created successfully",
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
            message: "Payment methods retrieved successfully",
            data: paymentMethods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Payment method not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment method retrieved successfully",
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
                message: "Payment method not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment method updated successfully",
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
                message: "Payment method not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment method deleted successfully",
            data: deletedPaymentMethod
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Search query is required"
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
            message: "Payment methods searched successfully",
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
    postPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod,
    searchPaymentMethod
};