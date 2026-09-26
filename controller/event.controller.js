const { Event } = require('../model/eventSchema');

const postEvent = async (req, res) => {
    try {
        const {
            name,
            photo,
            start_date,
            start_time,
            finish_date,
            finish_time,
            info,
            event_type_id,
            human_category_id,
            venue_id,
            lang_id,
            release_date
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required"
            });
        }

        const newEvent = new Event({
            name,
            photo,
            start_date,
            start_time,
            finish_date,
            finish_time,
            info,
            event_type_id,
            human_category_id,
            venue_id,
            lang_id,
            release_date
        });

        await newEvent.save();

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();

        return res.status(200).json({
            success: true,
            message: "Events retrieved successfully",
            data: events
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event retrieved successfully",
            data: event
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            photo,
            start_date,
            start_time,
            finish_date,
            finish_time,
            info,
            event_type_id,
            human_category_id,
            venue_id,
            lang_id,
            release_date
        } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {
                name,
                photo,
                start_date,
                start_time,
                finish_date,
                finish_time,
                info,
                event_type_id,
                human_category_id,
                venue_id,
                lang_id,
                release_date
            },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
            data: deletedEvent
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const searchEvent = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const result = await Event.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    info: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Events searched successfully",
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
    postEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    searchEvent
};