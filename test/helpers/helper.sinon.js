// import required libraries
const sinon = require("sinon");
const Cart = require("../../cart/models/Cart");
const Order = require("../../order/models/Order");
const Product = require("../../product/models/Product");
const Situation = require("../../situation/models/Situation");
const Scripture = require("../../scripture/models/Scripture");
const User = require("../../user/models/User");
const PasswordReset = require("../../user/models/PasswordReset");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

// cart helpers
const sinonHelperService = {
    // stubbing the update method (user query)
    stubCreateHash: (foundData) => {
        const foundDataExec = {
            update: function () {
                return this;
            },
            digest: function () {
                return foundData;
            }
        };

        return sinon.stub(crypto, "createHash").returns(foundDataExec);
    },

    // stubbing the nodemailer method (user query)
    stubCreateTransport: (foundData) => {
        const foundDataExec = {
            sendMail: function () {
                return foundData;
            }
        };

        return sinon.stub(nodeMailer, "createTransport").returns(foundDataExec);
    },

    // // stubbing the nodemailer method (user query)
    // stubCreateResetInfo: (foundData) => {
    //     const foundDataExec = {
    //         exec: function () {
    //             return foundData;
    //         }
    //     };

    //     return sinon.stub(PasswordReset, "create").returns(foundDataExec);
    // },

    // stubbing the findOne method (situation)
    stubFindOneSituation: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Situation, "findOne").returns(foundDataExec);
    },

    // stubbing the findOne method (scripture)
    stubFindOneScripture: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Scripture, "findOne").returns(foundDataExec);
    },

    // stubbing the findOne method (product)
    stubFindOneProduct: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Product, "findOne").returns(foundDataExec);
    },

    // stubbing the findOne method (cart)
    stubFindOneCart: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Cart, "findOne").returns(foundDataExec);
    },

    // stubbing the findOne method (user)
    stubFindOneResetToken: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(PasswordReset, "findOne").returns(foundDataExec);
    },

    // stubbing the findOne method (user)
    stubFindOneUser: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "findOne").returns(foundDataExec);
    },

    // stubbing the find method (user)
    stubFindUser: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "find").returns(foundDataExec);
    },

    // stubbing the findById method (user)
    stubFindByIdUser: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "findById").returns(foundDataExec);
    },

    // stubbing the findOne method (user query)
    stubFindOneUserQuery: (foundData) => {
        const foundDataExec = {
            where: function () {
                return this;
            },
            ne: function () {
                return this;
            },
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "findOne").returns(foundDataExec);
    },

    // stubbing the findOne method (user query2)
    stubFindOneUserQuery2: (foundData) => {
        const foundDataExec = {
            where: function () {
                return this;
            },
            ne: function () {
                return this;
            },
            select: function () {
                return this;
            },
            select: function () {
                return this;
            },
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "findOne").returns(foundDataExec);
    },

    // stubbing the find method (user query)
    stubFindUserQuery: (foundData) => {
        const foundDataExec = {
            where: function () {
                return this;
            },
            ne: function () {
                return this;
            },
            select: function () {
                return this;
            },
            select: function () {
                return this;
            },
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "find").returns(foundDataExec);
    },

    // stubbing the findOne method (user query3)
    stubFindOneUserQuery3: (foundData) => {
        const foundDataExec = {
            select: function () {
                return this;
            },
            select: function () {
                return this;
            },
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "findOne").returns(foundDataExec);
    },

    // stubbing the findOne method (order)
    stubFindOneOrder: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Order, "findOne").returns(foundDataExec);
    },

    // stubbing the find method (cart)
    stubFindAllCarts: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Cart, "find").returns(foundDataExec);
    },

    // stubbing the find method (product)
    stubFindAllProducts: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Product, "find").returns(foundDataExec);
    },

    // stubbing the find method (scripture)
    stubFindAllScriptures: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Scripture, "find").returns(foundDataExec);
    },

    // stubbing the find method (user)
    stubFindAllUsers: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "find").returns(foundDataExec);
    },

    // stubbing the update method (user)
    stubUpdateUser: (foundData) => {
        const updateDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "findOneAndUpdate").returns(updateDataExec);
    },

    // stubbing the update method (user)
    stubByIdUpdateUser: (foundData) => {
        const updateDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(User, "findByIdAndUpdate").returns(updateDataExec);
    },

    // stubbing the update method (product)
    stubUpdateProduct: (foundData) => {
        const updateDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Product, "findOneAndUpdate").returns(updateDataExec);
    },

    // stubbing the find method (personal product)
    stubFindAllPersonalProducts: (foundData) => {
        const foundDataExec = {
            where: function () {
                return this;
            },
            equals: function () {
                return this;
            },
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Product, "find").returns(foundDataExec);
    },

    // stubbing the find method (personal scripture)
    stubFindAllPersonalScriptures: (foundData) => {
        const foundDataExec = {
            where: function () {
                return this;
            },
            equals: function () {
                return this;
            },
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Scripture, "find").returns(foundDataExec);
    },

    // stubbing the find method (order)
    stubFindAllOrders: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Order, "find").returns(foundDataExec);
    },

    // stubbing the find method (personal order)
    stubFindAllPersonalOrders: (foundData) => {
        const foundDataExec = {
            where: function () {
                return this;
            },
            equals: function () {
                return this;
            },
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Order, "find").returns(foundDataExec);
    },

    // stubbing the find method (situation)
    stubFindAllSituations: (foundData) => {
        const foundDataExec = {
            exec: function () {
                return foundData;
            }
        };

        return sinon.stub(Situation, "find").returns(foundDataExec);
    },
};

// export helper
module.exports = sinonHelperService;
