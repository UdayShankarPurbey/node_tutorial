const { configDotenv } = require('dotenv');
const express = require('express');
const connectToDB = require('./database/db');
const userRouter = require('./routes/user.routes');
const homeRouter = require('./routes/home.routes');
const adminRouter = require('./routes/admin.routes');
const uploadRouter = require('./routes/image.routes');

configDotenv('./.env');

connectToDB();

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/home', homeRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', uploadRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
