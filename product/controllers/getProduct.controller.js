// import required modules
const apiResponse = require("../../common/ApiResponse");
const getProductService = require("../services/getProduct.service");

// get product controller
const getProductCtrl = async (req, res) => {
  try {
    let productId = req.params.id;

    // get product service
    const product = await getProductService(productId);

    return apiResponse.success(res, "Product found successfully", product);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get-product");
  }
};

// export controller
module.exports = getProductCtrl;
