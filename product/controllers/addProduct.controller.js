// import required modules
const apiResponse = require("../../common/ApiResponse");
const addProductService = require("../services/addProduct.service");

// add product controller
const addProductCtrl = async (req, res) => {
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
    let userId = req.user.id;

    // add product service
    const product = await addProductService(userId, productInfo);

    return apiResponse.success(res, "Product added successfully", product, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null);
  }
};

// export controller
module.exports = addProductCtrl;
