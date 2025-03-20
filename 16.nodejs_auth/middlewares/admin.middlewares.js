const isAdminUser = (req, res, next) => {
  // Check if user is admin
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success : false,
      message : "Authorized By Admin Only"
     });
  }
}

module.exports = isAdminUser;