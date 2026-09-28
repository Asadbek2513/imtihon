const { EventType } = require('../model/eventTypeSchema');

const postEventType = async (req, res) => {
    try {
        const {
            name,
            parent_event_type_id
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required"
            });
        }

        const newEventType = new EventType({
            name,
            parent_event_type_id
        });

        await newEventType.save();

        return res.status(201).json({
            success: true,
            message: "Event type created successfully",
            data: newEventType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getEventTypes = async (req, res) => {
    try {
        const eventTypes = await EventType.find()
            .populate('parent_event_type_id');

        return res.status(200).json({
            success: true,
            message: "Event types retrieved successfully",
            data: eventTypes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getEventTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const eventType = await EventType.findById(id)
            .populate('parent_event_type_id');

        if (!eventType) {
            return res.status(404).json({
                success: false,
                message: "Event type not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event type retrieved successfully",
            data: eventType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const updateEventType = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            parent_event_type_id
        } = req.body;

        const updatedEventType = await EventType.findByIdAndUpdate(
            id,
            {
                name,
                parent_event_type_id
            },
            { new: true, runValidators: true }
        );

        if (!updatedEventType) {
            return res.status(404).json({
                success: false,
                message: "Event type not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event type updated successfully",
            data: updatedEventType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteEventType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEventType = await EventType.findByIdAndDelete(id);

        if (!deletedEventType) {
            return res.status(404).json({
                success: false,
                message: "Event type not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event type deleted successfully",
            data: deletedEventType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchEventType = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await EventType.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        }).populate('parent_event_type_id');

        return res.status(200).json({
            success: true,
            message: "Event types searched successfully",
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
    postEventType,
    getEventTypes,
    getEventTypeById,
    updateEventType,
    deleteEventType,
    searchEventType
};