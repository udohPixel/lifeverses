// import required modules
const apiResponse = require("../../common/ApiResponse");
const getProductBySlugService = require("../services/getProductBySlug.service");

// get product controller
const getProductBySlugCtrl = async (req, res) => {
  try {
    let theSlug = req.params.slug;

    // get product service
    const product = await getProductBySlugService(theSlug);

    return apiResponse.success(res, "Product found successfully", product);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_product_by_slug");
  }
};

// export controller
module.exports = getProductBySlugCtrl;
