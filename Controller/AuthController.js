const User = require('../Model/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: "Login successfully",
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

const getCurrentUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.user.userId).select('username email');
        console.log("Fetching current user", user);
        
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = {
    register,
    login,
    getCurrentUser
};
