const permit = (...permittedRoles) => {
  return (req, res, next) => {
    const { user } = req;
    console.log("user:", user)
    if (user && permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      res.status(403).json({ message: "Forbidden" }); // user is forbidden
    }
  };
};

module.exports = { permit };
