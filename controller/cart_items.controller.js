const { Types } = require('mongoose');
const { CartItems } = require('../model/cartItemsSchema');

const postCartItem = async (req, res) => {
    try {
        const {
            ticket_id,
            cart_id
        } = req.body;

        const existingCartItem = await CartItems.findOne({
            ticket_id,
            cart_id
        });

        if (existingCartItem) {
            return res.status(400).json({
                success: false,
                message: ""
            });
        }

        const newCartItem = new CartItems({
            ticket_id,
            cart_id
        });
        
        await newCartItem.save();

        return res.status(201).json({
            success: true,
            message: "",
            data: newCartItem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItems.find()
            .populate('ticket_id')
            .populate('cart_id');

        return res.status(200).json({
            success: true,
            message: "",
            data: cartItems
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "",
            error: error.message
        });
    }
};

const getCartItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItems.findById(id)
            .populate('ticket_id')
            .populate('cart_id');

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: ""
            });
        }

        return res.status(200).json({
            success: true,
            message: "",
            data: cartItem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            ticket_id,
            cart_id
        } = req.body;

        const updatedCartItem = await CartItems.findByIdAndUpdate(
            id,
            {
                ticket_id,
                cart_id
            },
            { new: true, runValidators: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({
                success: false,
                message: ""
            });
        }

        return res.status(200).json({
            success: true,
            message: "",
            data: updatedCartItem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCartItem = await CartItems.findByIdAndDelete(id);

        if (!deletedCartItem) {
            return res.status(404).json({
                success: false,
                message: ""
            });
        }

        return res.status(200).json({
            success: true,
            message: "",
            data: deletedCartItem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "",
            error: error.message
        });
    }
};

const searchCartItem = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: ""
            });
        }

        const result = Types.ObjectId.isValid(query)
            ? await CartItems.find({ $or: [{ ticket_id: query }, { cart_id: query }] })
                .populate('ticket_id')
                .populate('cart_id')
            : [];

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
    postCartItem,
    getCartItems,
    getCartItemById,
    updateCartItem,
    deleteCartItem,
    searchCartItem
};