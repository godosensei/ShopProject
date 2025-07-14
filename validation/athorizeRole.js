function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.currentUser || req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }

    next();
  };
}

module.exports = authorizeRole;
