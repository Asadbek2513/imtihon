const express = require('express');
const typeRouter = express.Router();
const { typeValidation } = require('../validation/types.validation');

const {
    postType,
    getTypes,
    getTypeById,
    updateType,
    deleteType,
    searchType
} = require('../controller/types.controller');

const validateType = (schema) => {
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
 *   name: Types
 *   description: Types uchun API endpointlari
 */

/**
 * @swagger
 * /api/types/postType/:
 *   post:
 *     summary: Yangi types yaratish
 *     tags: [Types]
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
 *         description: Types yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
typeRouter.post('/postType', validateType(typeValidation), postType);

/**
 * @swagger
 * /api/types/getTypes/:
 *   get:
 *     summary: Types ro‘yxatini olish
 *     tags: [Types]
 *     responses:
 *       '200':
 *         description: Types ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
typeRouter.get('/getTypes', getTypes);

/**
 * @swagger
 * /api/types/getTypeById/{id}:
 *   get:
 *     summary: Types elementini ID bo‘yicha olish
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Types topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
typeRouter.get('/getTypeById/:id', getTypeById);

/**
 * @swagger
 * /api/types/updateType/{id}:
 *   put:
 *     summary: Types elementini yangilash
 *     tags: [Types]
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
 *         description: Types yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
typeRouter.put('/updateType/:id', validateType(typeValidation), updateType);

/**
 * @swagger
 * /api/types/searchType/:
 *   get:
 *     summary: Types bo‘yicha qidirish
 *     tags: [Types]
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
typeRouter.get('/searchType', searchType);

/**
 * @swagger
 * /api/types/deleteType/{id}:
 *   delete:
 *     summary: Types elementini o‘chirish
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Types o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
typeRouter.delete('/deleteType/:id', deleteType);

module.exports = typeRouter;