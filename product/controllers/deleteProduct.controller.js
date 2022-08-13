// import required modules
const apiResponse = require("../../common/ApiResponse");
const deleteProductService = require("../services/deleteProduct.service");

// delete product controller
const deleteProductCtrl = async (req, res) => {
  try {
    // get other data
    let theRole = req.user.role;
    let theUserId = req.user.id;
    let productId = req.params.product_id;

    // delete product service
    const product = await deleteProductService(theRole, theUserId, productId);

    return apiResponse.success(res, "Product deleted successfully", product);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "delete_product");
  }
};

// export controller
module.exports = deleteProductCtrl;
