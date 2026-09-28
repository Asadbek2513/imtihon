const { CustomerAddress } = require('../model/customerAddressSchema');

const postCustomerAddress = async (req, res) => {
    try {
        const {
            customer_id,
            name,
            region_id,
            district_id,
            street,
            house,
            flat,
            location,
            post_index,
            info
        } = req.body;

        if (!customer_id) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const newCustomerAddress = new CustomerAddress({
            customer_id,
            name,
            region_id,
            district_id,
            street,
            house,
            flat,
            location,
            post_index,
            info
        });

        await newCustomerAddress.save();

        return res.status(201).json({
            success: true,
            message: "Mijoz manzili ma'lumotlari muvaffaqiyatli kiritildi",
            data: newCustomerAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCustomerAddresses = async (req, res) => {
    try {
        const customerAddresses = await CustomerAddress.find()
            .populate(
                { 
                    path: 'customer_id', 
                    select: 'first_name last_name phone email' 
                }
            )
            .populate('region_id')
            .populate('district_id');

        return res.status(200).json({
            success: true,
            message: "Mijoz manzillari ro'yxati qaytarildi",
            data: customerAddresses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getCustomerAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const customerAddress = await CustomerAddress.findById(id)
            .populate(
                { 
                    path: 'customer_id', 
                    select: 'first_name last_name phone email' 
                }
            )
            .populate('region_id')
            .populate('district_id');

        if (!customerAddress) {
            return res.status(404).json({
                success: false,
                message: "Bu mijoz manzili topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz manzili muvaffaqiyatli topildi",
            data: customerAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateCustomerAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            customer_id,
            name,
            region_id,
            district_id,
            street,
            house,
            flat,
            location,
            post_index,
            info
        } = req.body;

        const updatedCustomerAddress = await CustomerAddress.findByIdAndUpdate(
            id,
            {
                customer_id,
                name,
                region_id,
                district_id,
                street,
                house,
                flat,
                location,
                post_index,
                info
            },
            { new: true, runValidators: true }
        );

        if (!updatedCustomerAddress) {
            return res.status(404).json({
                success: false,
                message: "Bu mijoz manzili topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mijoz manzili yangilandi",
            data: updatedCustomerAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteCustomerAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomerAddress = await CustomerAddress.findByIdAndDelete(id);

        if (!deletedCustomerAddress) {
            return res.status(404).json({
                success: false,
                message: 'Bu mijoz manzili topilmadi'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Mijoz manzili ma\'lumotlari o\'chirildi',
            data: deletedCustomerAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Ichki server xatosi',
            error: error.message
        });
    }
};

const searchCustomerAddress = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Kerakli ma'lumotlar to'liq kiritilmadi"
            });
        }

        const result = await CustomerAddress.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    street: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    house: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        })
            .populate(
                { 
                    path: 'customer_id', 
                    select: 'first_name last_name phone email' 
                }
            )
            .populate('region_id')
            .populate('district_id');
        return res.status(200).json({
            success: true,
            message: "Bu mijoz manzillari ma'lumotlari topildi",
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
    postCustomerAddress,
    getCustomerAddresses,
    getCustomerAddressById,
    updateCustomerAddress,
    deleteCustomerAddress,
    searchCustomerAddress
};