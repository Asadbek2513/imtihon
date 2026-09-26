const express = require('express');
const venueTypeRouter = express.Router();
const { venueTypeValidation } = require('../validation/venue_type.validation');

const {
    postVenueType,
    getVenueTypes,
    getVenueTypeById,
    updateVenueType,
    deleteVenueType,
    searchVenueType
} = require('../controller/venue_type.controller');

const validateVenueType = (schema) => {
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
 *   name: Venue types
 *   description: Venue types uchun API endpointlari
 */

/**
 * @swagger
 * /api/venue-types/postVenueType/:
 *   post:
 *     summary: Yangi venue types yaratish
 *     tags: [Venue types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: string
 *               typeId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venue types yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
venueTypeRouter.post('/postVenueType', validateVenueType(venueTypeValidation), postVenueType);

/**
 * @swagger
 * /api/venue-types/getVenueTypes/:
 *   get:
 *     summary: Venue types ro‘yxatini olish
 *     tags: [Venue types]
 *     responses:
 *       '200':
 *         description: Venue types ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
venueTypeRouter.get('/getVenueTypes', getVenueTypes);

/**
 * @swagger
 * /api/venue-types/getVenueTypeById/{id}:
 *   get:
 *     summary: Venue types elementini ID bo‘yicha olish
 *     tags: [Venue types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue types topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
venueTypeRouter.get('/getVenueTypeById/:id', getVenueTypeById);

/**
 * @swagger
 * /api/venue-types/updateVenueType/{id}:
 *   put:
 *     summary: Venue types elementini yangilash
 *     tags: [Venue types]
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
 *               venueId:
 *                 type: string
 *               typeId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venue types yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
venueTypeRouter.put('/updateVenueType/:id', validateVenueType(venueTypeValidation), updateVenueType);

/**
 * @swagger
 * /api/venue-types/searchVenueType/:
 *   get:
 *     summary: Venue types bo‘yicha qidirish
 *     tags: [Venue types]
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
venueTypeRouter.get('/searchVenueType', searchVenueType);

/**
 * @swagger
 * /api/venue-types/deleteVenueType/{id}:
 *   delete:
 *     summary: Venue types elementini o‘chirish
 *     tags: [Venue types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue types o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
venueTypeRouter.delete('/deleteVenueType/:id', deleteVenueType);

module.exports = venueTypeRouter;