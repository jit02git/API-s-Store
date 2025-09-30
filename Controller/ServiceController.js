const Service = require('../models/ServiceModel');

exports.createService = async (req, res) => {
    try {
        const { name, description, price, duration } = req.body;
        if (!name || !description || !price || !duration) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newService = new Service({
            name,
            description,
            price,
            duration
        });

        await newService.save();
        return res.status(201).json(newService);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};