const express = require('express');
const customerAddressRouter = express.Router();
const { customerAddressValidation } = require('../validation/customer_address.validation');

const {
    postCustomerAddress,
    getCustomerAddresses,
    getCustomerAddressById,
    updateCustomerAddress,
    deleteCustomerAddress,
    searchCustomerAddress
} = require('../controller/customer_address.controller');

const validateCustomerAddress = (schema) => {
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
 *   name: Customer addresses
 *   description: Customer addresses uchun API endpointlari
 */

/**
 * @swagger
 * /api/customer-addresses/postCustomerAddress/:
 *   post:
 *     summary: Yangi customer addresses yaratish
 *     tags: [Customer addresses]
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
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat:
 *                 type: string
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Customer addresses yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
customerAddressRouter.post('/postCustomerAddress', validateCustomerAddress(customerAddressValidation), postCustomerAddress);

/**
 * @swagger
 * /api/customer-addresses/getCustomerAddresses/:
 *   get:
 *     summary: Customer addresses ro‘yxatini olish
 *     tags: [Customer addresses]
 *     responses:
 *       '200':
 *         description: Customer addresses ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
customerAddressRouter.get('/getCustomerAddresses', getCustomerAddresses);

/**
 * @swagger
 * /api/customer-addresses/getCustomerAddressById/{id}/:
 *   get:
 *     summary: Customer addresses elementini ID bo‘yicha olish
 *     tags: [Customer addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer addresses topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
customerAddressRouter.get('/getCustomerAddressById/:id', getCustomerAddressById);

/**
 * @swagger
 * /api/customer-addresses/updateCustomerAddress/{id}/:
 *   put:
 *     summary: Customer addresses elementini yangilash
 *     tags: [Customer addresses]
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
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat:
 *                 type: string
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer addresses yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
customerAddressRouter.put('/updateCustomerAddress/:id', validateCustomerAddress(customerAddressValidation), updateCustomerAddress);

/**
 * @swagger
 * /api/customer-addresses/searchCustomerAddress/:
 *   get:
 *     summary: Customer addresses bo‘yicha qidirish
 *     tags: [Customer addresses]
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
customerAddressRouter.get('/searchCustomerAddress', searchCustomerAddress);

/**
 * @swagger
 * /api/customer-addresses/deleteCustomerAddress/{id}/:
 *   delete:
 *     summary: Customer addresses elementini o‘chirish
 *     tags: [Customer addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer addresses o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
customerAddressRouter.delete('/deleteCustomerAddress/:id', deleteCustomerAddress);

module.exports = customerAddressRouter;