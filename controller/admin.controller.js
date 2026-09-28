const { Admin } = require('../model/adminSchema');

const postAdmin = async (req, res) => {
    try {
        const {
            name,
            login,
            hashed_password,
            is_active,
            is_creator,
            hashed_refresh_token
        } = req.body;

        const existingAdmin = await Admin.findOne({
            login
        });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Bu nomdagi admin allaqachon mavjud"
            });
        }

        const newAdmin = new Admin({
            name,
            login,
            hashed_password,
            is_active,
            is_creator,
            hashed_refresh_token
        });

        await newAdmin.save();

        return res.status(201).json({
            success: true,
            message: "Admin ma'lumotlari muvaffaqiyat kiritildi",
            data: newAdmin
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json({
            success: true,
            message: "Admin ma'lumotlari yaratildi",
            data: admins
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Bu nomdagi admin topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Admin muvaffaqiyatli topildi",
            data: admin
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            login,
            hashed_password,
            is_active,
            is_creator,
            hashed_refresh_token
        } = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            {
                name,
                login,
                hashed_password,
                is_active,
                is_creator,
                hashed_refresh_token
            },
            { new: true, runValidators: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Bu nomdagi admin topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Admin yangilandi",
            data: updatedAdmin
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Bu nomdagi admin topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Admin ma'lumotlari o'chirildi",
            data: deletedAdmin
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchAdmin = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Bu nomdagi admin topilmadi"
            });
        }

        const result = await Admin.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    login: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Bu nomdagi admin ma'lumotlari topildi",
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
    postAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    searchAdmin
};