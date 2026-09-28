const { VenuePhoto } = require('../model/venuePhotoSchema');

const postVenuePhoto = async (req, res) => {
    try {
        const venue_id = req.body.venue_id || req.body.venueId;
        const { url } = req.body;

        if (!venue_id || !url) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const existingVenuePhoto = await VenuePhoto.findOne({
            venue_id,
            url
        });

        if (existingVenuePhoto) {
            return res.status(400).json({
                success: false,
                message: "Bu maskan surati allaqachon mavjud"
            });
        }

        const newVenuePhoto = new VenuePhoto({
            venue_id,
            url
        });
        
        await newVenuePhoto.save();

        return res.status(201).json({
            success: true,
            message: "Maskan surati ma'lumotlari muvaffaqiyatli kiritildi",
            data: newVenuePhoto
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getVenuePhotos = async (req, res) => {
    try {
        const venuePhotos = await VenuePhoto.find()
            .populate('venue_id');

        return res.status(200).json({
            success: true,
            message: "Maskan suratlari ro'yxati qaytarildi",
            data: venuePhotos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getVenuePhotoById = async (req, res) => {
    try {
        const { id } = req.params;
        const venuePhoto = await VenuePhoto.findById(id)
            .populate('venue_id');

        if (!venuePhoto) {
            return res.status(404).json({
                success: false,
                message: "Bu maskan surati topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Maskan surati muvaffaqiyatli topildi",
            data: venuePhoto
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateVenuePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const venue_id = req.body.venue_id || req.body.venueId;
        const { url } = req.body;

        const updatedVenuePhoto = await VenuePhoto.findByIdAndUpdate(
            id,
            {
                venue_id,
                url
            },
            { new: true, runValidators: true }
        );

        if (!updatedVenuePhoto) {
            return res.status(404).json({
                success: false,
                message: "Bu maskan surati topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Maskan surati yangilandi",
            data: updatedVenuePhoto
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteVenuePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVenuePhoto = await VenuePhoto.findByIdAndDelete(id);

        if (!deletedVenuePhoto) {
            return res.status(404).json({
                success: false,
                message: "Bu maskan surati topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Maskan surati ma'lumotlari o'chirildi",
            data: deletedVenuePhoto
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchVenuePhoto = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await VenuePhoto.find({
            $or: [
                {
                    url: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        }).populate('venue_id');

        return res.status(200).json({
            success: true,
            message: "Bu maskan suratlari ma'lumotlari topildi",
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
    postVenuePhoto,
    getVenuePhotos,
    getVenuePhotoById,
    updateVenuePhoto,
    deleteVenuePhoto,
    searchVenuePhoto
};