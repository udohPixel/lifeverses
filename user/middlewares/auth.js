// import required libraries
const passport = require("passport");
const apiResponse = require("../../common/ApiResponse");
const ApplicationException = require("../../common/ApplicationException");
const {
  isEditor,
  isAdmin,
  isSuperAdmin,
  isAdminOrSuperAdmin,
  isMerchantOrAdminOrSuperAdmin,
  isEditorOrMerchantOrAdminOrSuperAdmin,
} = require("../../common/helpers");

// isLoggedIn middleware
const isLoggedIn = passport.authenticate("jwt", { session: false });

// isTheEditor middleware
const isTheEditor = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isEditor(userRole)) {
      next();
    } else {
      throw new ApplicationException("Unauthorised", 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, "auth");
  }
};

// isTheMerchant middleware
const isTheMerchant = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isMerchant(userRole)) {
      next();
    } else {
      throw new ApplicationException("Unauthorised", 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, "auth");
  }
};

// isTheAdmin middleware
const isTheAdmin = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isAdmin(userRole)) {
      next();
    } else {
      throw new ApplicationException("Unauthorised", 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, "auth");
  }
};

// isTheSuperAdmin middleware
const isTheSuperAdmin = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isSuperAdmin(userRole)) {
      next();
    } else {
      throw new ApplicationException("Unauthorised", 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, "auth");
  }
};

// isTheAdminOrSuperAdmin middleware
const isTheAdminOrSuperAdmin = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isAdminOrSuperAdmin(userRole)) {
      next();
    } else {
      throw new ApplicationException("Unauthorised", 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, "auth");
  }
};

// isTheMerchantOrAdminOrSuperAdmin middleware
const isTheMerchantOrAdminOrSuperAdmin = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isMerchantOrAdminOrSuperAdmin(userRole)) {
      next();
    } else {
      throw new ApplicationException("Unauthorised", 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, "auth");
  }
};

// isTheEditorOrMerchantOrAdminOrSuperAdmin middleware
const isTheEditorOrMerchantOrAdminOrSuperAdmin = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isEditorOrMerchantOrAdminOrSuperAdmin(userRole)) {
      next();
    } else {
      throw new ApplicationException("Unauthorised", 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, "auth");
  }
};

// export middlewares
module.exports = {
  isLoggedIn,
  isTheEditor,
  isTheMerchant,
  isTheAdmin,
  isTheSuperAdmin,
  isTheAdminOrSuperAdmin,
  isTheMerchantOrAdminOrSuperAdmin,
  isTheEditorOrMerchantOrAdminOrSuperAdmin,
};
