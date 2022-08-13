// import required modules
const Product = require("../models/Product");

// change item state service
const changeItemStateService = async (req) => {
  // fetch current item state
  let itemState = await Product.findOne({ _id: req.params.id }).exec();

  if (itemState.isActive === false) {
    let active = true;

    let itemStateValue = { isActive: active };

    itemState = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: itemStateValue },
      { new: true }
    );

    return itemState;
  } else {
    let active = false;

    let itemStateValue = { isActive: active };

    itemState = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: itemStateValue },
      { new: true }
    );

    return itemState;
  }
};

// export service
module.exports = changeItemStateService;
