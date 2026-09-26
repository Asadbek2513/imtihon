const express = require('express');
const adminRouter = express.Router();
const { adminValidation } = require('../validation/admin.validation');

const {
    postAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    searchAdmin
} = require('../controller/admin.controller');

const validateAdmin = (schema) => {
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
 *   name: Admins
 *   description: Admins uchun API endpointlari
 */

/**
 * @swagger
 * /api/admins/postAdmin/:
 *   post:
 *     summary: Yangi admins yaratish
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Admins yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
adminRouter.post('/postAdmin', validateAdmin(adminValidation), postAdmin);

/**
 * @swagger
 * /api/admins/getAdmins/:
 *   get:
 *     summary: Admins ro‘yxatini olish
 *     tags: [Admins]
 *     responses:
 *       '200':
 *         description: Admins ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
adminRouter.get('/getAdmins', getAdmins);

/**
 * @swagger
 * /api/admins/getAdminById/{id}/:
 *   get:
 *     summary: Admins elementini ID bo‘yicha olish
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admins topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
adminRouter.get('/getAdminById/:id', getAdminById);

/**
 * @swagger
 * /api/admins/updateAdmin/{id}/:
 *   put:
 *     summary: Admins elementini yangilash
 *     tags: [Admins]
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
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Admins yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
adminRouter.put('/updateAdmin/:id', validateAdmin(adminValidation), updateAdmin);

/**
 * @swagger
 * /api/admins/searchAdmin/:
 *   get:
 *     summary: Admins bo‘yicha qidirish
 *     tags: [Admins]
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
adminRouter.get('/searchAdmin', searchAdmin);

/**
 * @swagger
 * /api/admins/deleteAdmin/{id}/:
 *   delete:
 *     summary: Admins elementini o‘chirish
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admins o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
adminRouter.delete('/deleteAdmin/:id', deleteAdmin);

module.exports = adminRouter;