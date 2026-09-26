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
                message: "event_id, seat_id, price, service_fee, status_id, and ticket_type are required"
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
            message: "Ticket created successfully",
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
        const tickets = await Ticket.find();

        return res.status(200).json({
            success: true,
            message: "Tickets retrieved successfully",
            data: tickets
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket retrieved successfully",
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
                message: "Ticket not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
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
                message: "Ticket not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket deleted successfully",
            data: deletedTicket
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
                message: "Search query is required"
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
        });

        return res.status(200).json({
            success: true,
            message: "Tickets searched successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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