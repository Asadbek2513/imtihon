const { CustomerCard } = require('../model/customerCardSchema');

const postCustomerCard = async (req, res) => {
    try {
        const {
            customer_id,
            name,
            phone,
            number,
            year,
            month,
            is_active,
            is_main
        } = req.body;

        if (!customer_id) {
            return res.status(400).json({
                success: false,
                message: "customer_id is required"
            });
        }

        const newCustomerCard = new CustomerCard({
            customer_id,
            name,
            phone,
            number,
            year,
            month,
            is_active,
            is_main
        });

        await newCustomerCard.save();

        return res.status(201).json({
            success: true,
            message: "Customer card created successfully",
            data: newCustomerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getCustomerCards = async (req, res) => {
    try {
        const customerCards = await CustomerCard.find();

        return res.status(200).json({
            success: true,
            message: "Customer cards retrieved successfully",
            data: customerCards
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getCustomerCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const customerCard = await CustomerCard.findById(id);

        if (!customerCard) {
            return res.status(404).json({
                success: false,
                message: "Customer card not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer card retrieved successfully",
            data: customerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const updateCustomerCard = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            customer_id,
            name,
            phone,
            number,
            year,
            month,
            is_active,
            is_main
        } = req.body;

        const updatedCustomerCard = await CustomerCard.findByIdAndUpdate(
            id,
            {
                customer_id,
                name,
                phone,
                number,
                year,
                month,
                is_active,
                is_main
            },
            { new: true, runValidators: true }
        );

        if (!updatedCustomerCard) {
            return res.status(404).json({
                success: false,
                message: "Customer card not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer card updated successfully",
            data: updatedCustomerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteCustomerCard = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomerCard = await CustomerCard.findByIdAndDelete(id);

        if (!deletedCustomerCard) {
            return res.status(404).json({
                success: false,
                message: "Customer card not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer card deleted successfully",
            data: deletedCustomerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchCustomerCard = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await CustomerCard.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    number: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    phone: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Customer cards searched successfully",
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
    postCustomerCard,
    getCustomerCards,
    getCustomerCardById,
    updateCustomerCard,
    deleteCustomerCard,
    searchCustomerCard
};