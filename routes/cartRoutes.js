const express = require('express');
const cartRouter = express.Router();
const { cartValidation } = require('../validation/cart.validation');

const {
    postCart,
    getCart,
    getCartById,
    updateCart,
    deleteCart,
    searchCart
} = require('../controller/cart.controller');

const validateCart = (schema) => {
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
 *   name: Carts
 *   description: Carts uchun API endpointlari
 */

/**
 * @swagger
 * /api/carts/postCart/:
 *   post:
 *     summary: Yangi carts yaratish
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               finishedAt:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Carts yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
cartRouter.post('/postCart', validateCart(cartValidation), postCart);

/**
 * @swagger
 * /api/carts/getCart/:
 *   get:
 *     summary: Carts ro‘yxatini olish
 *     tags: [Carts]
 *     responses:
 *       '200':
 *         description: Carts ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
cartRouter.get('/getCart', getCart);

/**
 * @swagger
 * /api/carts/getCartById/{id}/:
 *   get:
 *     summary: Carts elementini ID bo‘yicha olish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Carts topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
cartRouter.get('/getCartById/:id', getCartById);

/**
 * @swagger
 * /api/carts/updateCart/{id}/:
 *   put:
 *     summary: Carts elementini yangilash
 *     tags: [Carts]
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
 *               customer_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               finishedAt:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Carts yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
cartRouter.put('/updateCart/:id', validateCart(cartValidation), updateCart);

/**
 * @swagger
 * /api/carts/searchCart/:
 *   get:
 *     summary: Carts bo‘yicha qidirish
 *     tags: [Carts]
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
cartRouter.get('/searchCart', searchCart);

/**
 * @swagger
 * /api/carts/deleteCart/{id}/:
 *   delete:
 *     summary: Carts elementini o‘chirish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Carts o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
cartRouter.delete('/deleteCart/:id', deleteCart);

module.exports = cartRouter;