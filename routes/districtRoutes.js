const express = require('express');
const districtRouter = express.Router();
const { districtValidation } = require('../validation/district.validation');

const {
    postDistrict,
    getDistricts,
    getDistrictById,
    updateDistrict,
    deleteDistrict,
    searchDistrict
} = require('../controller/district.controller');

const validateDistrict = (schema) => {
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
 *   name: Districts
 *   description: Districts uchun API endpointlari
 */

/**
 * @swagger
 * /api/districts/postDistrict/:
 *   post:
 *     summary: Yangi districts yaratish
 *     tags: [Districts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Districts yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
districtRouter.post('/postDistrict', validateDistrict(districtValidation), postDistrict);

/**
 * @swagger
 * /api/districts/getDistricts/:
 *   get:
 *     summary: Districts ro‘yxatini olish
 *     tags: [Districts]
 *     responses:
 *       '200':
 *         description: Districts ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
districtRouter.get('/getDistricts', getDistricts);

/**
 * @swagger
 * /api/districts/getDistrictById/{id}:
 *   get:
 *     summary: Districts elementini ID bo‘yicha olish
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Districts topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
districtRouter.get('/getDistrictById/:id', getDistrictById);

/**
 * @swagger
 * /api/districts/updateDistrict/{id}:
 *   put:
 *     summary: Districts elementini yangilash
 *     tags: [Districts]
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
 *               region_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Districts yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
districtRouter.put('/updateDistrict/:id', validateDistrict(districtValidation), updateDistrict);

/**
 * @swagger
 * /api/districts/searchDistrict/:
 *   get:
 *     summary: Districts bo‘yicha qidirish
 *     tags: [Districts]
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
districtRouter.get('/searchDistrict', searchDistrict);

/**
 * @swagger
 * /api/districts/deleteDistrict/{id}:
 *   delete:
 *     summary: Districts elementini o‘chirish
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Districts o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
districtRouter.delete('/deleteDistrict/:id', deleteDistrict);

module.exports = districtRouter;