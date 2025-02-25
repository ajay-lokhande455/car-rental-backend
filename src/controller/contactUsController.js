const ContactUs = require('../models/contactUsModel');

// Create ContactUs Entry
const createContactUs = async (req, res) => {
    try {
        const contactUs = new ContactUs(req.body);
        await contactUs.save();
        res.status(201).json(contactUs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All ContactUs Entries
const getAllContactUs = async (req, res) => {
    try {
        const contactUsEntries = await ContactUs.find();
        res.status(200).json(contactUsEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get ContactUs Entry by ID
const getContactUsById = async (req, res) => {
    try {
        const contactUs = await ContactUs.findById(req.params.id);
        if (!contactUs) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json(contactUs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete ContactUs Entry
const deleteContactUs = async (req, res) => {
    try {
        const contactUs = await ContactUs.findByIdAndDelete(req.params.id);
        if (!contactUs) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createContactUs,
    getAllContactUs,
    getContactUsById,
    deleteContactUs,
};