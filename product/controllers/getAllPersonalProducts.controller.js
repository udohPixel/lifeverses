// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllPersonalProductsService = require("../services/getAllPersonalProducts.service");

// get all products controller
const getAllPersonalProductsCtrl = async (req, res) => {
  try {
    let theUsername = req.params.username;
    let queryStr = req.query;

    // get all products service
    const products = await getAllPersonalProductsService(theUsername, queryStr);

    return apiResponse.success(res, "Products found successfully", products);
  } catch (error) {
    return apiResponse.errorObject(
      res,
      error,
      null,
      "get_all_personal_products"
    );
  }
};

// export controller
module.exports = getAllPersonalProductsCtrl;
