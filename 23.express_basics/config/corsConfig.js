const cors = require('cors');


const confugureCors = () => {
  return cors({
    origin: (origin , callback) => {
      // Allowed origin
      const allowedOrigin = [
        'http://localhost:3000', // local dev
        'https://your-client-app.com' //prduction domain
      ];


      if(!origin || allowedOrigin.indexOf(origin) !== -1) {
        callback(null, true)  //giving permission
      } else {
        callback(new Error('Not allowed by CORS'), false)
      }
    },
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : [
      'Content-Type',
      'Authorization',
      'Accept-Version'
    ],
    exposedHeaders : ['Content-Range', 'X-Content-Range'],
    credentials : true ,//enable support for cookie
    preflightContinue : false,
    maxAge : 600, // cache preflight reponse for 10min(600 seconds)
    optionsSuccessStatus: 204,
  });
}

module.exports = confugureCors;