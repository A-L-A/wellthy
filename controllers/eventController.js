const Event = require("../models/event");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error getting events", error });
  }
};

const createEvent = async (req, res) => {
  const { title, date, time, category, description } = req.body;

  try {
    const newEvent = new Event({ title, date, time, category, description });
    await newEvent.save();
    res.json({ message: "Event created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, date, time, category, description } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, date, time, category, description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.json({ message: "Event updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
