const express = require('express');
const dbConnect = require('./Config/dbConnect');

const app = express();
const port = 3000;
dbConnect();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

