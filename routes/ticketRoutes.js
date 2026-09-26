const express = require('express');
const TicketRouter = express.Router();
const { ticketValidation } = require('../validation/ticket.validation');

const {
    postTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    searchTicket
} = require('../controller/ticket.controller');

const validateTicket = (schema) => {
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
 *   name: Tickets
 *   description: Tickets uchun API endpointlari
 */

/**
 * @swagger
 * /api/tickets/postTicket/:
 *   post:
 *     summary: Yangi tickets yaratish
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Tickets yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
TicketRouter.post('/postTicket', validateTicket(ticketValidation), postTicket);

/**
 * @swagger
 * /api/tickets/getTickets/:
 *   get:
 *     summary: Tickets ro‘yxatini olish
 *     tags: [Tickets]
 *     responses:
 *       '200':
 *         description: Tickets ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
TicketRouter.get('/getTickets', getTickets);

/**
 * @swagger
 * /api/tickets/getTicketById/{id}:
 *   get:
 *     summary: Tickets elementini ID bo‘yicha olish
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tickets topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
TicketRouter.get('/getTicketById/:id', getTicketById);

/**
 * @swagger
 * /api/tickets/updateTicket/{id}:
 *   put:
 *     summary: Tickets elementini yangilash
 *     tags: [Tickets]
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
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Tickets yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
TicketRouter.put('/updateTicket/:id', validateTicket(ticketValidation), updateTicket);

/**
 * @swagger
 * /api/tickets/searchTicket/:
 *   get:
 *     summary: Tickets bo‘yicha qidirish
 *     tags: [Tickets]
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
TicketRouter.get('/searchTicket', searchTicket);

/**
 * @swagger
 * /api/tickets/deleteTicket/{id}:
 *   delete:
 *     summary: Tickets elementini o‘chirish
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tickets o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
TicketRouter.delete('/deleteTicket/:id', deleteTicket);

module.exports = TicketRouter;