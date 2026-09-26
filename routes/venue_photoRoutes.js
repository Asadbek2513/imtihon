const express = require('express');
const venuePhotoRouter = express.Router();
const { venuePhotoValidation } = require('../validation/venue_photo.validation');

const {
    postVenuePhoto,
    getVenuePhotos,
    getVenuePhotoById,
    updateVenuePhoto,
    deleteVenuePhoto,
    searchVenuePhoto
} = require('../controller/venue_photo.controller');

const validateVenuePhoto = (schema) => {
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
 *   name: Venue photos
 *   description: Venue photos uchun API endpointlari
 */

/**
 * @swagger
 * /api/venue-photos/postVenuePhoto/:
 *   post:
 *     summary: Yangi venue photos yaratish
 *     tags: [Venue photos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venue_id:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venue photos yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
venuePhotoRouter.post('/postVenuePhoto', validateVenuePhoto(venuePhotoValidation), postVenuePhoto);

/**
 * @swagger
 * /api/venue-photos/getVenuePhotos/:
 *   get:
 *     summary: Venue photos ro‘yxatini olish
 *     tags: [Venue photos]
 *     responses:
 *       '200':
 *         description: Venue photos ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
venuePhotoRouter.get('/getVenuePhotos', getVenuePhotos);

/**
 * @swagger
 * /api/venue-photos/getVenuePhotoById/{id}:
 *   get:
 *     summary: Venue photos elementini ID bo‘yicha olish
 *     tags: [Venue photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue photos topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
venuePhotoRouter.get('/getVenuePhotoById/:id', getVenuePhotoById);

/**
 * @swagger
 * /api/venue-photos/updateVenuePhoto/{id}:
 *   put:
 *     summary: Venue photos elementini yangilash
 *     tags: [Venue photos]
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
 *               venue_id:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venue photos yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
venuePhotoRouter.put('/updateVenuePhoto/:id', validateVenuePhoto(venuePhotoValidation), updateVenuePhoto);

/**
 * @swagger
 * /api/venue-photos/searchVenuePhoto/:
 *   get:
 *     summary: Venue photos bo‘yicha qidirish
 *     tags: [Venue photos]
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
venuePhotoRouter.get('/searchVenuePhoto', searchVenuePhoto);

/**
 * @swagger
 * /api/venue-photos/deleteVenuePhoto/{id}:
 *   delete:
 *     summary: Venue photos elementini o‘chirish
 *     tags: [Venue photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue photos o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
venuePhotoRouter.delete('/deleteVenuePhoto/:id', deleteVenuePhoto);

module.exports = venuePhotoRouter;