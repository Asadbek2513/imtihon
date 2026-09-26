const express = require('express');
const TicketStatusRouter = express.Router();
const { ticketStatusValidation } = require('../validation/ticket_status.validation');

const {
    postTicketStatus,
    getTicketStatuses,
    getTicketStatusById,
    updateTicketStatus,
    deleteTicketStatus,
    searchTicketStatus
} = require('../controller/ticket_status.controller');

const validateTicketStatus = (schema) => {
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
 *   name: Ticket statuses
 *   description: Ticket statuses uchun API endpointlari
 */

/**
 * @swagger
 * /api/ticket-statuses/postTicketStatus/:
 *   post:
 *     summary: Yangi ticket statuses yaratish
 *     tags: [Ticket statuses]
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
 *         description: Ticket statuses yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
TicketStatusRouter.post('/postTicketStatus', validateTicketStatus(ticketStatusValidation), postTicketStatus);

/**
 * @swagger
 * /api/ticket-statuses/getTicketStatuses/:
 *   get:
 *     summary: Ticket statuses ro‘yxatini olish
 *     tags: [Ticket statuses]
 *     responses:
 *       '200':
 *         description: Ticket statuses ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
TicketStatusRouter.get('/getTicketStatuses', getTicketStatuses);

/**
 * @swagger
 * /api/ticket-statuses/getTicketStatusById/{id}:
 *   get:
 *     summary: Ticket statuses elementini ID bo‘yicha olish
 *     tags: [Ticket statuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket statuses topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
TicketStatusRouter.get('/getTicketStatusById/:id', getTicketStatusById);

/**
 * @swagger
 * /api/ticket-statuses/updateTicketStatus/{id}:
 *   put:
 *     summary: Ticket statuses elementini yangilash
 *     tags: [Ticket statuses]
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
 *         description: Ticket statuses yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
TicketStatusRouter.put('/updateTicketStatus/:id', validateTicketStatus(ticketStatusValidation), updateTicketStatus);

/**
 * @swagger
 * /api/ticket-statuses/searchTicketStatus/:
 *   get:
 *     summary: Ticket statuses bo‘yicha qidirish
 *     tags: [Ticket statuses]
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
TicketStatusRouter.get('/searchTicketStatus', searchTicketStatus);

/**
 * @swagger
 * /api/ticket-statuses/deleteTicketStatus/{id}:
 *   delete:
 *     summary: Ticket statuses elementini o‘chirish
 *     tags: [Ticket statuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket statuses o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
TicketStatusRouter.delete('/deleteTicketStatus/:id', deleteTicketStatus);

module.exports = TicketStatusRouter;