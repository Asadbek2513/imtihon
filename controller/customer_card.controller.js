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
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
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
            message: "Mijoz kartasi ma'lumotlari muvaffaqiyatli kiritildi",
            data: newCustomerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCustomerCards = async (req, res) => {
    try {
        const customerCards = await CustomerCard.find()
            .populate(
                { 
                    path: 'customer_id', 
                    select: 'first_name last_name phone email' 
                }
            );
        return res.status(200).json({
            success: true,
            message: "Mijoz kartalari ro'yxati qaytarildi",
            data: customerCards
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCustomerCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const customerCard = await CustomerCard.findById(id)
            .populate({ path: 'customer_id', select: 'first_name last_name phone email' });

        if (!customerCard) {
            return res.status(404).json({
                success: false,
                message: "Bu mijoz kartasi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz kartasi muvaffaqiyatli topildi",
            data: customerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Bu mijoz kartasi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz kartasi yangilandi",
            data: updatedCustomerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Bu mijoz kartasi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz kartasi ma'lumotlari o'chirildi",
            data: deletedCustomerCard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
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
        }).populate({ path: 'customer_id', select: 'first_name last_name phone email' });

        return res.status(200).json({
            success: true,
            message: "Bu mijoz kartalari ma'lumotlari topildi",
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
    postCustomerCard,
    getCustomerCards,
    getCustomerCardById,
    updateCustomerCard,
    deleteCustomerCard,
    searchCustomerCard
};