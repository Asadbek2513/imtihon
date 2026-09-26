const express = require('express');
const bookingRouter = express.Router();
const { bookingValidation } = require('../validation/booking.validation');

const {
    postBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    searchBooking
} = require('../controller/booking.controller');

const validateBooking = (schema) => {
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
 *   name: Bookings
 *   description: Bookings uchun API endpointlari
 */

/**
 * @swagger
 * /api/bookings/postBooking/:
 *   post:
 *     summary: Yangi bookings yaratish
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               finished:
 *                 type: boolean
 *               payment_methood_id:
 *                 type: string
 *               delivery_method_id:
 *                 type: string
 *               discount_coupon_id:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Bookings yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
bookingRouter.post('/postBooking', validateBooking(bookingValidation), postBooking);

/**
 * @swagger
 * /api/bookings/getBookings/:
 *   get:
 *     summary: Bookings ro‘yxatini olish
 *     tags: [Bookings]
 *     responses:
 *       '200':
 *         description: Bookings ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
bookingRouter.get('/getBookings', getBookings);

/**
 * @swagger
 * /api/bookings/getBookingById/{id}/:
 *   get:
 *     summary: Bookings elementini ID bo‘yicha olish
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Bookings topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
bookingRouter.get('/getBookingById/:id', getBookingById);

/**
 * @swagger
 * /api/bookings/updateBooking/{id}/:
 *   put:
 *     summary: Bookings elementini yangilash
 *     tags: [Bookings]
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
 *               card_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               finished:
 *                 type: boolean
 *               payment_methood_id:
 *                 type: string
 *               delivery_method_id:
 *                 type: string
 *               discount_coupon_id:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Bookings yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
bookingRouter.put('/updateBooking/:id', validateBooking(bookingValidation), updateBooking);

/**
 * @swagger
 * /api/bookings/searchBooking/:
 *   get:
 *     summary: Bookings bo‘yicha qidirish
 *     tags: [Bookings]
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
bookingRouter.get('/searchBooking', searchBooking);


/**
 * @swagger
 * /api/bookings/deleteBooking/{id}/:
 *   delete:
 *     summary: Bookings elementini o‘chirish
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Bookings o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
bookingRouter.delete('/deleteBooking/:id', deleteBooking);

module.exports = bookingRouter;