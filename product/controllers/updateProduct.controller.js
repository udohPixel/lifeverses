// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateProductService = require("../services/updateProduct.service");

// update product controller
const updateProductCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const productInfo = ({
      title,
      aboutAuthor,
      authors,
      pages,
      publicationDate,
      isbn,
      category,
      overview,
      description,
      price,
      discount,
      coverPic,
      previewPages,
      stock,
    } = req.body);

    // get other data
    let theRole = req.user.role;
    let theUserId = req.user.id;
    let productId = req.params.id;

    // update product service
    const product = await updateProductService(
      theRole,
      theUserId,
      productId,
      productInfo
    );

    return apiResponse.success(res, "Product updated successfully", product);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "update_product");
  }
};

// export controller
module.exports = updateProductCtrl;
