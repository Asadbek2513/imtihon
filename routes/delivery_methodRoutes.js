const express = require('express');
const delivery_methodRouter = express.Router();
const { deliveryMethodValidation } = require('../validation/delivery_method.validation');

const {
    postDeliveryMethod,
    getDeliveryMethods,
    getDeliveryMethodById,
    updateDeliveryMethod,
    deleteDeliveryMethod,
    searchDeliveryMethod
} = require('../controller/delivery_method.controller');

const validateDeliveryMethod = (schema) => {
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
 *   name: Delivery methods
 *   description: Delivery methods uchun API endpointlari
 */

/**
 * @swagger
 * /api/delivery-methods/postDeliveryMethod/:
 *   post:
 *     summary: Yangi delivery methods yaratish
 *     tags: [Delivery methods]
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
 *         description: Delivery methods yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
delivery_methodRouter.post('/postDeliveryMethod', validateDeliveryMethod(deliveryMethodValidation), postDeliveryMethod);

/**
 * @swagger
 * /api/delivery-methods/getDeliveryMethods/:
 *   get:
 *     summary: Delivery methods ro‘yxatini olish
 *     tags: [Delivery methods]
 *     responses:
 *       '200':
 *         description: Delivery methods ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
delivery_methodRouter.get('/getDeliveryMethods', getDeliveryMethods);

/**
 * @swagger
 * /api/delivery-methods/getDeliveryMethodById/{id}:
 *   get:
 *     summary: Delivery methods elementini ID bo‘yicha olish
 *     tags: [Delivery methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Delivery methods topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
delivery_methodRouter.get('/getDeliveryMethodById/:id', getDeliveryMethodById);

/**
 * @swagger
 * /api/delivery-methods/updateDeliveryMethod/{id}:
 *   put:
 *     summary: Delivery methods elementini yangilash
 *     tags: [Delivery methods]
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
 *         description: Delivery methods yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
delivery_methodRouter.put('/updateDeliveryMethod/:id', validateDeliveryMethod(deliveryMethodValidation), updateDeliveryMethod);

/**
 * @swagger
 * /api/delivery-methods/searchDeliveryMethod/:
 *   get:
 *     summary: Delivery methods bo‘yicha qidirish
 *     tags: [Delivery methods]
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
delivery_methodRouter.get('/searchDeliveryMethod', searchDeliveryMethod);

/**
 * @swagger
 * /api/delivery-methods/deleteDeliveryMethod/{id}:
 *   delete:
 *     summary: Delivery methods elementini o‘chirish
 *     tags: [Delivery methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Delivery methods o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
delivery_methodRouter.delete('/deleteDeliveryMethod/:id', deleteDeliveryMethod);

module.exports = delivery_methodRouter;