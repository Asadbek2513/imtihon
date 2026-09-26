const express = require('express');
const cartItemRouter = express.Router();
const { cartItemsValidation } = require('../validation/cart_items.validation');

const {
    postCartItem,
    getCartItems,
    getCartItemById,
    updateCartItem,
    deleteCartItem,
    searchCartItem
} = require('../controller/cart_items.controller');

const validateCartItems = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Xatolik yuz berdi",
                error: error.message
            });
        }
        next();
    };
};

/**
 * @swagger
 * tags:
 *   name: Cart items
 *   description: Cart items uchun API endpointlari
*/

/**
 * @swagger
 * /api/cart-items/postCartItem/:
 *   post:
 *     summary: Yangi cart items yaratish
 *     tags: [Cart items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: string
 *               cart_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Cart items yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
*/
cartItemRouter.post('/postCartItem', validateCartItems(cartItemsValidation), postCartItem);

/**
 * @swagger
 * /api/cart-items/getCartItems/:
 *   get:
 *     summary: Cart items ro‘yxatini olish
 *     tags: [Cart items]
 *     responses:
 *       '200':
 *         description: Cart items ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
*/
cartItemRouter.get('/getCartItems', getCartItems);

/**
 * @swagger
 * /api/cart-items/getCartItemById/{id}/:
 *   get:
 *     summary: Cart items elementini ID bo‘yicha olish
 *     tags: [Cart items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart items topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
cartItemRouter.get('/getCartItemById/:id', getCartItemById);

/**
 * @swagger
 * /api/cart-items/updateCartItem/{id}/:
 *   put:
 *     summary: Cart items elementini yangilash
 *     tags: [Cart items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: string
 *               cart_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Cart items yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
cartItemRouter.put('/updateCartItem/:id', validateCartItems(cartItemsValidation), updateCartItem);

/**
 * @swagger
 * /api/cart-items/searchCartItem/:
 *   get:
 *     summary: Cart items bo‘yicha qidirish
 *     tags: [Cart-items]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijasi
 *       '400':
 *         description: Qidiruv so‘rovi noto‘g‘ri
 */
cartItemRouter.get('/searchCartItem', searchCartItem);

/**
 * @swagger
 * /api/cart-items/deleteCartItem/{id}/:
 *   delete:
 *     summary: Cart items elementini o‘chirish
 *     tags: [Cart-items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart items o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
cartItemRouter.delete('/deleteCartItem/:id', deleteCartItem);

module.exports = cartItemRouter;
