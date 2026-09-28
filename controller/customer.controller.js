const { Customer } = require('../model/customerSchema');

const postCustomer = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            phone,
            hashed_password,
            email,
            birth_date,
            gender,
            lang_id,
            hashed_refresh_token
        } = req.body;

        if (!first_name) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const newCustomer = new Customer({
            first_name,
            last_name,
            phone,
            hashed_password,
            email,
            birth_date,
            gender,
            lang_id,
            hashed_refresh_token
        });

        await newCustomer.save();

        return res.status(201).json({
            success: true,
            message: "Mijoz ma'lumotlari muvaffaqiyatli kiritildi",
            data: newCustomer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.find()
            .populate('lang_id');

        return res.status(200).json({
            success: true,
            message: "Mijozlar ro'yxati qaytarildi",
            data: customer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id)
            .populate('lang_id');

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Bu mijoz topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz muvaffaqiyatli topildi",
            data: customer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            first_name,
            last_name,
            phone,
            hashed_password,
            email,
            birth_date,
            gender,
            lang_id,
            hashed_refresh_token
        } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            {
                first_name,
                last_name,
                phone,
                hashed_password,
                email,
                birth_date,
                gender,
                lang_id,
                hashed_refresh_token
            },
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                message: "Bu mijoz topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz yangilandi",
            data: updatedCustomer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({
                success: false,
                message: "Bu mijoz topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz ma'lumotlari o'chirildi",
            data: deletedCustomer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchCustomer = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await Customer.find({
            $or: [
                {
                    first_name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    last_name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    email: {
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
        }).populate('lang_id');

        return res.status(200).json({
            success: true,
            message: "Bu mijozlar ma'lumotlari topildi",
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
    postCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    searchCustomer
};