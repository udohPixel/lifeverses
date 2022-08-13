const helperService = {
  // check if user isEditor
  isEditor: (role) => {
    return role === "Editor";
  },

  // check if user isMerchant
  isMerchant: (role) => {
    return role === "Merchant";
  },

  // check if user is isAdmin
  isAdmin: (role) => {
    return role === "Admin";
  },

  // check if user is isSuperAdmin
  isSuperAdmin: (role) => {
    return role === "SuperAdmin";
  },

  isAdminOrSuperAdmin: (role) => {
    return role === "Admin" || role === "SuperAdmin";
  },

  isMerchantOrAdminOrSuperAdmin: (role) => {
    return role === "Merchant" || role === "Admin" || role === "SuperAdmin";
  },

  isEditorOrMerchantOrAdminOrSuperAdmin: (role) => {
    return (
      role === "Editor" ||
      role === "Merchant" ||
      role === "Admin" ||
      role === "SuperAdmin"
    );
  },
};

// export helper
module.exports = helperService;
