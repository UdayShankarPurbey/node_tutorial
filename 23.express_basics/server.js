const { configDotenv } = require("dotenv");

configDotenv({path : './.env'});


const express = require('express');
const confugureCors = require("./config/corsConfig");
const { requestLogger, addTimeStamps } = require("./middlewares/customMiddlewares");
const { globalErrorHandler } = require("./middlewares/errorHandler");
const { urlVersioning } = require("./middlewares/apiVersioning");
const createBasicRateLimiter = require("./middlewares/rateLimitting");
const itemRoutes = require('./routes/item.routes');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(addTimeStamps);

app.use(confugureCors()); //configuring cors
app.use(createBasicRateLimiter(15,1*60*1000)); // 15 request in 1 minutes
app.use(express.json());

app.use( urlVersioning("v1"));
app.use('/api/v1', itemRoutes);


app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});