const express = require('express');
const PaymentMethodRouter = express.Router();
const { paymentMethodValidation } = require('../validation/payment_method.validation');

const {
    postPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod,
    searchPaymentMethod
} = require('../controller/payment_method.controller');

const validatePaymentMethod = (schema) => {
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
 *   name: Payment methods
 *   description: Payment methods uchun API endpointlari
 */

/**
 * @swagger
 * /api/payment-methods/postPaymentMethod/:
 *   post:
 *     summary: Yangi payment methods yaratish
 *     tags: [Payment methods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Payment methods yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
PaymentMethodRouter.post('/postPaymentMethod', validatePaymentMethod(paymentMethodValidation), postPaymentMethod);

/**
 * @swagger
 * /api/payment-methods/getPaymentMethods/:
 *   get:
 *     summary: Payment methods ro‘yxatini olish
 *     tags: [Payment methods]
 *     responses:
 *       '200':
 *         description: Payment methods ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
PaymentMethodRouter.get('/getPaymentMethods', getPaymentMethods);

/**
 * @swagger
 * /api/payment-methods/getPaymentMethodById/{id}:
 *   get:
 *     summary: Payment methods elementini ID bo‘yicha olish
 *     tags: [Payment methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment methods topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
PaymentMethodRouter.get('/getPaymentMethodById/:id', getPaymentMethodById);

/**
 * @swagger
 * /api/payment-methods/updatePaymentMethod/{id}:
 *   put:
 *     summary: Payment methods elementini yangilash
 *     tags: [Payment methods]
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
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Payment methods yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
PaymentMethodRouter.put('/updatePaymentMethod/:id', validatePaymentMethod(paymentMethodValidation), updatePaymentMethod);

/**
 * @swagger
 * /api/payment-methods/searchPaymentMethod/:
 *   get:
 *     summary: Payment methods bo‘yicha qidirish
 *     tags: [Payment methods]
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
PaymentMethodRouter.get('/searchPaymentMethod', searchPaymentMethod);

/**
 * @swagger
 * /api/payment-methods/deletePaymentMethod/{id}:
 *   delete:
 *     summary: Payment methods elementini o‘chirish
 *     tags: [Payment methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment methods o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
PaymentMethodRouter.delete('/deletePaymentMethod/:id', deletePaymentMethod);

module.exports = PaymentMethodRouter;