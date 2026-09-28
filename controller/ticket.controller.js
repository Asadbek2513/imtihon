const { Ticket } = require('../model/ticketSchema');

const postTicket = async (req, res) => {
    try {
        const {
            event_id,
            seat_id,
            price,
            service_fee,
            status_id,
            ticket_type
        } = req.body;

        if (!event_id || !seat_id || price === undefined || price === null || service_fee === undefined || service_fee === null || !status_id || !ticket_type) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const existingTicket = await Ticket.findOne({
            event_id,
            seat_id
        });

        if (existingTicket) {
            return res.status(400).json({
                success: false,
                message: "Bu chipta allaqachon mavjud"
            });
        }

        const newTicket = new Ticket({
            event_id,
            seat_id,
            price,
            service_fee,
            status_id,
            ticket_type
        });
        
        await newTicket.save();

        return res.status(201).json({
            success: true,
            message: "Chipta ma'lumotlari muvaffaqiyatli kiritildi",
            data: newTicket
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate('event_id')
            .populate('seat_id')
            .populate('status_id');

        return res.status(200).json({
            success: true,
            message: "Chiptalar ro'yxati qaytarildi",
            data: tickets
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id)
            .populate('event_id')
            .populate('seat_id')
            .populate('status_id');

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Bu chipta topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Chipta muvaffaqiyatli topildi",
            data: ticket
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            event_id,
            seat_id,
            price,
            service_fee,
            status_id,
            ticket_type
        } = req.body;
        
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            {
                event_id,
                seat_id,
                price,
                service_fee,
                status_id,
                ticket_type
            },
            { new: true, runValidators: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({
                success: false,
                message: "Bu chipta topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Chipta yangilandi",
            data: updatedTicket
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (!deletedTicket) {
            return res.status(404).json({
                success: false,
                message: "Bu chipta topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Chipta ma'lumotlari o'chirildi",
            data: deletedTicket
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchTicket = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await Ticket.find({
            $or: [
                {
                    ticket_type: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        })
            .populate('event_id')
            .populate('seat_id')
            .populate('status_id');
        return res.status(200).json({
            success: true,
            message: "Bu chiptalar ma'lumotlari topildi",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

module.exports = {
    postTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    searchTicket
};