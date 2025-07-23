const User = require('../Model/AuthModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash: hashed });

        res.status(201).json({
            message: "User Created Successfully", user
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    register
};
