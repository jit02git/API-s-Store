const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/apistore");
        console.log("Database Connected Successfully");
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default dbConnect;