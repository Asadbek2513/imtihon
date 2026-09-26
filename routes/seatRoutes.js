const express = require('express');
const SeatRouter = express.Router();
const { seatValidation } = require('../validation/seat.validation');

const {
    postSeat,
    getSeats,
    getSeatById,
    updateSeat,
    deleteSeat,
    searchSeat
} = require('../controller/seat.controller');

const validateSeat = (schema) => {
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
 *   name: Seats
 *   description: Seats uchun API endpointlari
 */

/**
 * @swagger
 * /api/seats/postSeat/:
 *   post:
 *     summary: Yangi seats yaratish
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: string
 *               row_number:
 *                 type: number
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Seats yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
SeatRouter.post('/postSeat', validateSeat(seatValidation), postSeat);

/**
 * @swagger
 * /api/seats/getSeats/:
 *   get:
 *     summary: Seats ro‘yxatini olish
 *     tags: [Seats]
 *     responses:
 *       '200':
 *         description: Seats ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
SeatRouter.get('/getSeats', getSeats);

/**
 * @swagger
 * /api/seats/getSeatById/{id}:
 *   get:
 *     summary: Seats elementini ID bo‘yicha olish
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seats topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
SeatRouter.get('/getSeatById/:id', getSeatById);

/**
 * @swagger
 * /api/seats/updateSeat/{id}:
 *   put:
 *     summary: Seats elementini yangilash
 *     tags: [Seats]
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
 *               sector:
 *                 type: string
 *               row_number:
 *                 type: number
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Seats yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
SeatRouter.put('/updateSeat/:id', validateSeat(seatValidation), updateSeat);

/**
 * @swagger
 * /api/seats/searchSeat/:
 *   get:
 *     summary: Seats bo‘yicha qidirish
 *     tags: [Seats]
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
SeatRouter.get('/searchSeat', searchSeat);

/**
 * @swagger
 * /api/seats/deleteSeat/{id}:
 *   delete:
 *     summary: Seats elementini o‘chirish
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seats o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
SeatRouter.delete('/deleteSeat/:id', deleteSeat);

module.exports = SeatRouter;