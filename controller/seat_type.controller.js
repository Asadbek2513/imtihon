const { SeatType } = require('../model/seatTypeSchema');

const postSeatType = async (req, res) => {
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

        const existingSeatType = await SeatType.findOne({
            name
        });

        if (existingSeatType) {
            return res.status(400).json({
                success: false,
                message: "Bu o'rindiq turi allaqachon mavjud"
            });
        }

        const newSeatType = new SeatType({
            name
        });
        
        await new SeatType.save();

        return res.status(201).json({
            success: true,
            message:  "O'rindiq turi ma'lumotlari muvaffaqiyatli kiritildi",
            data: SeatType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getSeatTypes = async (req, res) => {
    try {
        const SeatTypes = await SeatType.find();

        return res.status(200).json({
            success: true,
            message:  "O'rindiq turlari ro'yxati qaytarildi",
            data: SeatTypes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getSeatTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const SeatType = await SeatType.findById(id);

        if ( SeatType) {
            return res.status(404).json({
                success: false,
                message:  "Bu o'rindiq turi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message:  "O'rindiq turi muvaffaqiyatli topildi",
            data: SeatType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateSeatType = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name
        } = req.body;

        const updatedSeatType = await SeatType.findByIdAndUpdate(
            id,
            {
                name
            },
            { new: true, runValidators: true }
        );

        if (!updatedSeatType) {
            return res.status(404).json({
                success: false,
                message:  "Bu o'rindiq turi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message:  "O'rindiq turi yangilandi",
            data: updatedSeatType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteSeatType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSeatType = await SeatType.findByIdAndDelete(id);

        if (!deletedSeatType) {
            return res.status(404).json({
                success: false,
                message:  "Bu o'rindiq turi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message:  "O'rindiq turi ma'lumotlari o'chirildi",
            data: deletedSeatType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchSeatType = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await SeatType.find({
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
            message:  "Bu o'rindiq turlari ma'lumotlari topildi",
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
    postSeatType,
    getSeatTypes,
    getSeatTypeById,
    updateSeatType,
    deleteSeatType,
    searchSeatType
};