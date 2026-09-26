const express = require('express');
const eventTypeRouter = express.Router();
const { eventTypeValidation } = require('../validation/event_type.validation');

const {
    postEventType,
    getEventTypes,
    getEventTypeById,
    updateEventType,
    deleteEventType,
    searchEventType
} = require('../controller/event_type.controller');

const validateEventType = (schema) => {
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
 *   name: Event types
 *   description: Event types uchun API endpointlari
 */

/**
 * @swagger
 * /api/event-types/postEventType/:
 *   post:
 *     summary: Yangi event types yaratish
 *     tags: [Event types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Event types yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
eventTypeRouter.post('/postEventType', validateEventType(eventTypeValidation), postEventType);

/**
 * @swagger
 * /api/event-types/getEventTypes/:
 *   get:
 *     summary: Event types ro‘yxatini olish
 *     tags: [Event types]
 *     responses:
 *       '200':
 *         description: Event types ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
eventTypeRouter.get('/getEventTypes', getEventTypes);

/**
 * @swagger
 * /api/event-types/getEventTypeById/{id}:
 *   get:
 *     summary: Event types elementini ID bo‘yicha olish
 *     tags: [Event types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event types topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
eventTypeRouter.get('/getEventTypeById/:id', getEventTypeById);

/**
 * @swagger
 * /api/event-types/updateEventType/{id}:
 *   put:
 *     summary: Event types elementini yangilash
 *     tags: [Event types]
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
 *               parent_event_type_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Event types yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
eventTypeRouter.put('/updateEventType/:id', validateEventType(eventTypeValidation), updateEventType);

/**
 * @swagger
 * /api/event-types/searchEventType/:
 *   get:
 *     summary: Event types bo‘yicha qidirish
 *     tags: [Event types]
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
eventTypeRouter.get('/searchEventType', searchEventType);

/**
 * @swagger
 * /api/event-types/deleteEventType/{id}:
 *   delete:
 *     summary: Event types elementini o‘chirish
 *     tags: [Event types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event types o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
eventTypeRouter.delete('/deleteEventType/:id', deleteEventType);

module.exports = eventTypeRouter;