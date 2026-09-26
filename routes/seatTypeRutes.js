const express = require('express');
const SeatTypeRouter = express.Router();
const { SeatTypeValidation } = require('../validation/');

const {
    postSeatType,
    getSeatTypes,
    getSeatTypeById,
    updateSeatType,
    deleteSeatType,
    searchSeatType
} = require('../controller/seat_type.controller');

const validateSeatType = (schema) => {
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
 *   name: SeatTypes
 *   description: SeatTypes uchun API endpointlari
 */

/**
 * @swagger
 * /api/seatTypes/postSeatType/:
 *   post:
 *     summary: Yangi SeatTypes yaratish
 *     tags: [SeatTypes]
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
 *         description: SeatTypes yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
SeatTypeRouter.post('/postSeatType', validateSeatType(SeatTypeValidation), postSeatType);

/**
 * @swagger
 * /api/seatTypes/getSeatTypes/:
 *   get:
 *     summary: SeatTypes ro‘yxatini olish
 *     tags: [SeatTypes]
 *     responses:
 *       '200':
 *         description: SeatTypes ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
SeatTypeRouter.get('/getSeatTypes', getSeatTypes);

/**
 * @swagger
 * /api/seatTypes/getSeatTypeById/{id}:
 *   get:
 *     summary: SeatTypes elementini ID bo‘yicha olish
 *     tags: [SeatTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: SeatTypes topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
SeatTypeRouter.get('/getSeatTypeById/:id', getSeatTypeById);

/**
 * @swagger
 * /api/seatTypes/updateSeatType/{id}:
 *   put:
 *     summary: SeatTypes elementini yangilash
 *     tags: [SeatTypes]
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
 *         description: SeatTypes yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
SeatTypeRouter.put('/updateSeatType/:id', validateSeatType(SeatTypeValidation), updateSeatType);

/**
 * @swagger
 * /api/seatTypes/searchSeatType/:
 *   get:
 *     summary: SeatTypes bo‘yicha qidirish
 *     tags: [SeatTypes]
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
SeatTypeRouter.get('/searchSeatType', searchSeatType);

/**
 * @swagger
 * /api/seatTypes/deleteSeatType/{id}:
 *   delete:
 *     summary: SeatTypes elementini o‘chirish
 *     tags: [SeatTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: SeatTypes o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
SeatTypeRouter.delete('/deleteSeatType/:id', deleteSeatType);

module.exports = SeatTypeRouter;