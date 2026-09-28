const { TicketStatus } = require('../model/ticketStatusSchema');

const postTicketStatus = async (req, res) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
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
            message: "Chipta holati ma'lumotlari muvaffaqiyatli kiritildi",
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
            message: "Chipta holatlari ro'yxati qaytarildi",
            data: ticketStatuses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Bu chipta holati topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Chipta holati muvaffaqiyatli topildi",
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
                message: "Bu chipta holati topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Chipta holati yangilandi",
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
                message: "Bu chipta holati topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Chipta holati ma'lumotlari o'chirildi",
            data: deletedTicketStatus
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
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
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
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
            message: "Bu chipta holatlari ma'lumotlari topildi",
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
    postTicketStatus,
    getTicketStatuses,
    getTicketStatusById,
    updateTicketStatus,
    deleteTicketStatus,
    searchTicketStatus
};