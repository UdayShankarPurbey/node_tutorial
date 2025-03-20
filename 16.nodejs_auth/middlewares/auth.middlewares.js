const jwt = require('jsonwebtoken');

const authMiddleware = (req , res , next) => {
  const authToken = req.headers?.authorization?.replaceAll('Bearer ','')
  if (!authToken) {
    return res.status(401).json({ success : false , message: 'Missing or invalid authentication token' });
  }

  try {
    const decodedToken = jwt.verify(authToken , process.env.JWT_SECRET_KEY );
    req.user = decodedToken;
    next();    
  } catch (error) {
    console.error("Error: " + error);
    return res.status(401).json({ success : false , message: 'Missing or invalid authentication token' });

  }
};

module.exports = authMiddleware;