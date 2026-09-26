const { TicketStatus } = require('../model/ticketStatusSchema');

const postTicketStatus = async (req, res) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required"
            });
        }

        const existingTicketStatus = await TicketStatus.findOne({
            name
        });

        if (existingTicketStatus) {
            return res.status(400).json({
                success: false,
                message: "Bu chipta holati allaqachon mavjud"
            });
        }

        const newTicketStatus = new TicketStatus({
            name
        });
        
        await newTicketStatus.save();

        return res.status(201).json({
            success: true,
            message: "Ticket status created successfully",
            data: newTicketStatus
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getTicketStatuses = async (req, res) => {
    try {
        const ticketStatuses = await TicketStatus.find();

        return res.status(200).json({
            success: true,
            message: "Ticket statuses retrieved successfully",
            data: ticketStatuses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getTicketStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticketStatus = await TicketStatus.findById(id);

        if (!ticketStatus) {
            return res.status(404).json({
                success: false,
                message: "Ticket status not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket status retrieved successfully",
            data: ticketStatus
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name
        } = req.body;

        const updatedTicketStatus = await TicketStatus.findByIdAndUpdate(
            id,
            {
                name
            },
            { new: true, runValidators: true }
        );

        if (!updatedTicketStatus) {
            return res.status(404).json({
                success: false,
                message: "Ticket status not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket status updated successfully",
            data: updatedTicketStatus
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicketStatus = await TicketStatus.findByIdAndDelete(id);

        if (!deletedTicketStatus) {
            return res.status(404).json({
                success: false,
                message: "Ticket status not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket status deleted successfully",
            data: deletedTicketStatus
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchTicketStatus = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await TicketStatus.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Ticket statuses searched successfully",
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
    postTicketStatus,
    getTicketStatuses,
    getTicketStatusById,
    updateTicketStatus,
    deleteTicketStatus,
    searchTicketStatus
};