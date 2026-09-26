const express = require('express');
const HumanCategoryRouter = express.Router();
const { humanCategoryValidation } = require('../validation/human_category.validation');

const {
    postHumanCategory,
    getHumanCategories,
    getHumanCategoryById,
    updateHumanCategory,
    deleteHumanCategory,
    searchHumanCategory
} = require('../controller/human_category.controller');

const validateHumanCategory = (schema) => {
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
 *   name: Human categories
 *   description: Human categories uchun API endpointlari
 */

/**
 * @swagger
 * /api/human-categories/postHumanCategory/:
 *   post:
 *     summary: Yangi human categories yaratish
 *     tags: [Human categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: number
 *               finish_age:
 *                 type: number
 *               gender:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Human categories yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
HumanCategoryRouter.post('/postHumanCategory', validateHumanCategory(humanCategoryValidation), postHumanCategory);

/**
 * @swagger
 * /api/human-categories/getHumanCategories/:
 *   get:
 *     summary: Human categories ro‘yxatini olish
 *     tags: [Human categories]
 *     responses:
 *       '200':
 *         description: Human categories ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
HumanCategoryRouter.get('/getHumanCategories', getHumanCategories);

/**
 * @swagger
 * /api/human-categories/getHumanCategoryById/{id}:
 *   get:
 *     summary: Human categories elementini ID bo‘yicha olish
 *     tags: [Human categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Human categories topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
HumanCategoryRouter.get('/getHumanCategoryById/:id', getHumanCategoryById);

/**
 * @swagger
 * /api/human-categories/updateHumanCategory/{id}:
 *   put:
 *     summary: Human categories elementini yangilash
 *     tags: [Human categories]
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
 *               start_age:
 *                 type: number
 *               finish_age:
 *                 type: number
 *               gender:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Human categories yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
HumanCategoryRouter.put('/updateHumanCategory/:id', validateHumanCategory(humanCategoryValidation), updateHumanCategory);

/**
 * @swagger
 * /api/human-categories/searchHumanCategory/:
 *   get:
 *     summary: Human categories bo‘yicha qidirish
 *     tags: [Human categories]
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
HumanCategoryRouter.get('/searchHumanCategory', searchHumanCategory);

/**
 * @swagger
 * /api/human-categories/deleteHumanCategory/{id}:
 *   delete:
 *     summary: Human categories elementini o‘chirish
 *     tags: [Human categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Human categories o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
HumanCategoryRouter.delete('/deleteHumanCategory/:id', deleteHumanCategory);

module.exports = HumanCategoryRouter;