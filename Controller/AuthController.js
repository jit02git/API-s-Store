const { default: generateToken } = require('../../../MERN Projects/Apna-Market/backend/utils/generateToken');
const User = require('../Model/AuthModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const existingUser = await User.find({email});
        if(existingUser) return res.status(400).json({ message: "User Already exist"});

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, passwordHash: hashed});

        res.status(201).json({token:generateToken(User._id)});
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
     
}