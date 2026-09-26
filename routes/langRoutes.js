const express = require('express');
const LangRouter = express.Router();
const { langValidation } = require('../validation/lang.validation');

const {
    postLang,
    getLangs,
    getLangById,
    updateLang,
    deleteLang,
    searchLang
} = require('../controller/lang.controller');


const validateLang = (schema) => {
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
 *   name: Languages
 *   description: Languages uchun API endpointlari
 */

/**
 * @swagger
 * /api/langs/postLang/:
 *   post:
 *     summary: Yangi languages yaratish
 *     tags: [Languages]
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
 *         description: Languages yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
LangRouter.post('/postLang', validateLang(langValidation), postLang);

/**
 * @swagger
 * /api/langs/getLangs/:
 *   get:
 *     summary: Languages ro‘yxatini olish
 *     tags: [Languages]
 *     responses:
 *       '200':
 *         description: Languages ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
LangRouter.get('/getLangs', getLangs);

/**
 * @swagger
 * /api/langs/getLangById/{id}:
 *   get:
 *     summary: Languages elementini ID bo‘yicha olish
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Languages topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
LangRouter.get('/getLangById/:id', getLangById);

/**
 * @swagger
 * /api/langs/updateLang/{id}:
 *   put:
 *     summary: Languages elementini yangilash
 *     tags: [Languages]
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
 *         description: Languages yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
LangRouter.put('/updateLang/:id', validateLang(langValidation), updateLang);

/**
 * @swagger
 * /api/langs/searchLang/:
 *   get:
 *     summary: Languages bo‘yicha qidirish
 *     tags: [Languages]
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
LangRouter.get('/searchLang', searchLang);

/**
 * @swagger
 * /api/langs/deleteLang/{id}:
 *   delete:
 *     summary: Languages elementini o‘chirish
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Languages o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
LangRouter.delete('/deleteLang/:id', deleteLang);

module.exports = LangRouter;