const express = require('express');
const dbConnect = require('./Config/dbConnect');
const AuthRoutes = require('./Route/AuthRoute');
const StudentRoutes = require('./Route/StudentRoute');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.use(express.json());

// Routes
app.use('/api/students', StudentRoutes);
app.use('/api/auth', AuthRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

