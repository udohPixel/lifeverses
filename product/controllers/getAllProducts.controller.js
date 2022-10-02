// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllProductsService = require("../services/getAllProducts.service");

// get all products controller
const getAllProductsCtrl = async (req, res) => {
  try {
    let queryStr = req.query;

    // get all products service
    const products = await getAllProductsService(queryStr);

    return apiResponse.success(res, "Products found successfully", products);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_all_products");
  }
};

// export controller
module.exports = getAllProductsCtrl;
