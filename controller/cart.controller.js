const { Types } = require('mongoose');
const { Cart } = require('../model/cartSchema');

const postCart = async (req, res) => {
    try {
        const {
            customer_id,
            createdAt,
            finishedAt,
            status_id
        } = req.body;

        const existingCart = await Cart.findOne({
            customer_id,
            createdAt,
            finishedAt,
            status_id
        });

        if (existingCart) {
            return res.status(400).json({
                success: false,
                message: ""
            });
        }

        const newCart = new Cart({
            customer_id,
            createdAt,
            finishedAt,
            status_id
        });
        
        await newCart.save();

        return res.status(201).json({
            success: true,
            message: "",
            data: newCart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.find()
            .populate(
                { 
                    path: 'customer_id', 
                    select: 'first_name last_name phone email' 
                }
            );
        return res.status(200).json({
            success: true,
            message: "",
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "",
            error: error.message
        });
    }
};

const getCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id)
            .populate(
                { 
                    path: 'customer_id',
                    select: 'first_name last_name phone email' 
                }
            );
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: ""
            });
        }

        return res.status(200).json({
            success: true,
            message: "",
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            customer_id,
            createdAt,
            finishedAt,
            status_id
        } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            {
                customer_id,
                createdAt,
                finishedAt,
                status_id
            },
            { new: true, runValidators: true }
        );

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: ""
            });
        }

        return res.status(200).json({
            success: true,
            message: "",
            data: updatedCart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({
                success: false,
                message: ""
            });
        }

        return res.status(200).json({
            success: true,
            message: "",
            data: deletedCart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "",
            error: error.message
        });
    }
};

const searchCart = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: ""
            });
        }

        const filters = [{ status_id: { $regex: query, $options: "i" } }];
        if (Types.ObjectId.isValid(query)) filters.push({ customer_id: query });
        const result = await Cart.find({ $or: filters })
            .populate(
                { 
                    path: 'customer_id', 
                    select: 'first_name last_name phone email' 
                }
            );
        return res.status(200).json({
            success: true,
            message: "",
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
    postCart,
    getCart,
    getCartById,
    updateCart,
    deleteCart,
    searchCart
};