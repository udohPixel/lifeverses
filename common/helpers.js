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
    return ["Admin", "SuperAdmin"].includes(role);
  },

  isMerchantOrAdminOrSuperAdmin: (role) => {
    return ["Merchant", "Admin", "SuperAdmin"].includes(role);
  },

  isEditorOrMerchantOrAdminOrSuperAdmin: (role) => {
    return ["Editor", "Merchant", "Admin", "SuperAdmin"].includes(role);
  },

  // convert title to slug
  titleToSlug: (title) => {
    return title.replace(/\s+/g, "-").toLowerCase();
  },
};

// export helper
module.exports = helperService;
