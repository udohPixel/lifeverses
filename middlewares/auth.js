// import required libraries
const passport = require("passport");

// isLoggedIn middleware
const isLoggedIn = passport.authenticate("jwt", { session: false });

// isEditor middleware
const isEditor = async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole == "Editor") {
    await next();
  } else {
    res.status(403).json({
      UnauthorisedUserError: "User is not authorised",
    });
  }
};

// isAdmin middleware
const isAdmin = async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole == "Admin") {
    await next();
  } else {
    res.status(403).json({
      UnauthorisedUserError: "User is not authorised",
    });
  }
};

// isSuperAdmin middleware
const isSuperAdmin = async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole == "SuperAdmin") {
    await next();
  } else {
    res.status(403).json({
      UnauthorisedUserError: "User is not authorised",
    });
  }
};

// export middlewares
module.exports = { isLoggedIn, isEditor, isAdmin, isSuperAdmin };
