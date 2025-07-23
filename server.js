const express = require('express');
const dbConnect = require('./Config/dbConnect');
const AuthRoutes = require('./Route/AuthRoute');

const app = express();
const port = 3000;

dbConnect();

app.use(express.json());
app.use('/api/auth', AuthRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

