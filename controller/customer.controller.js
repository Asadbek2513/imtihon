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
                message: "first_name is required"
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
            message: "Customer created successfully",
            data: newCustomer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.find();

        return res.status(200).json({
            success: true,
            message: "Customers retrieved successfully",
            data: customer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer retrieved successfully",
            data: customer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: deletedCustomer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Search query is required"
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
        });

        return res.status(200).json({
            success: true,
            message: "Customers searched successfully",
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
    postCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    searchCustomer
};