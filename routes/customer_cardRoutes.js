const express = require('express');
const customer_cardRouter = express.Router();
const { customerCardValidation } = require('../validation/customer_card.validation');

const {
    postCustomerCard,
    getCustomerCards,
    getCustomerCardById,
    updateCustomerCard,
    deleteCustomerCard,
    searchCustomerCard
} = require('../controller/customer_card.controller');

const validateCustomerCard = (schema) => {
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
 *   name: Customer cards
 *   description: Customer cards uchun API endpointlari
 */

/**
 * @swagger
 * /api/customer-cards/postCustomerCard/:
 *   post:
 *     summary: Yangi customer cards yaratish
 *     tags: [Customer cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: number
 *               month:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Customer cards yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
customer_cardRouter.post("/postCustomerCard", validateCustomerCard(customerCardValidation), postCustomerCard);

/**
 * @swagger
 * /api/customer-cards/getCustomerCards/:
 *   get:
 *     summary: Customer cards ro‘yxatini olish
 *     tags: [Customer cards]
 *     responses:
 *       '200':
 *         description: Customer cards ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
customer_cardRouter.get('/getCustomerCards', getCustomerCards);

/**
 * @swagger
 * /api/customer-cards/getCustomerCardById/{id}:
 *   get:
 *     summary: Customer cards elementini ID bo‘yicha olish
 *     tags: [Customer cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer cards topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
customer_cardRouter.get('/getCustomerCardById/:id', getCustomerCardById);

/**
 * @swagger
 * /api/customer-cards/updateCustomerCard/{id}:
 *   put:
 *     summary: Customer cards elementini yangilash
 *     tags: [Customer cards]
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
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: number
 *               month:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Customer cards yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
customer_cardRouter.put('/updateCustomerCard/:id', validateCustomerCard(customerCardValidation), updateCustomerCard);

/**
 * @swagger
 * /api/customer-cards/searchCustomerCard:
 *   get:
 *     summary: Customer cards bo‘yicha qidirish
 *     tags: [Customer cards]
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
customer_cardRouter.get('/searchCustomerCard', searchCustomerCard);

/**
 * @swagger
 * /api/customer-cards/deleteCustomerCard/{id}:
 *   delete:
 *     summary: Customer cards elementini o‘chirish
 *     tags: [Customer cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer cards o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
customer_cardRouter.delete('/deleteCustomerCard/:id', deleteCustomerCard);

module.exports = customer_cardRouter;