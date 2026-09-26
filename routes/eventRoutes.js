const express = require('express');
const eventRouter = express.Router();
const { eventValidation } = require('../validation/event.validation');

const {
    postEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    searchEvent
} = require('../controller/event.controller');

const validateEvent = (schema) => {
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
 *   name: Events
 *   description: Events uchun API endpointlari
 */

/**
 * @swagger
 * /api/events/postEvent/:
 *   post:
 *     summary: Yangi events yaratish
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Events yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
eventRouter.post('/postEvent', validateEvent(eventValidation), postEvent);

/**
 * @swagger
 * /api/events/getEvents/:
 *   get:
 *     summary: Events ro‘yxatini olish
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Events ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
eventRouter.get('/getEvents', getEvents);

/**
 * @swagger
 * /api/events/getEventById/{id}:
 *   get:
 *     summary: Events elementini ID bo‘yicha olish
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Events topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
eventRouter.get('/getEventById/:id', getEventById);

/**
 * @swagger
 * /api/events/updateEvent/{id}:
 *   put:
 *     summary: Events elementini yangilash
 *     tags: [Events]
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
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Events yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
eventRouter.put('/updateEvent/:id', validateEvent(eventValidation), updateEvent);

/**
 * @swagger
 * /api/events/searchEvent/:
 *   get:
 *     summary: Events bo‘yicha qidirish
 *     tags: [Events]
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
eventRouter.get('/searchEvent', searchEvent);

/**
 * @swagger
 * /api/events/deleteEvent/{id}:
 *   delete:
 *     summary: Events elementini o‘chirish
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Events o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
eventRouter.delete('/deleteEvent/:id', deleteEvent);

module.exports = eventRouter;