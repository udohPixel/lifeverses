// import required modules
const logger = require("../logger");
const ApplicationException = require("./ApplicationException");

// declare api response class
class ApiResponse {
  // success response
  success(res, message, data, code) {
    return this.send(res, code || 200, true, message, data);
  }

  // error response
  error(res, message, data, code) {
    return this.send(res, code || 500, false, message, data);
  }

  // error response
  errorObject(res, error, code, meta) {
    let message;

    if (error instanceof ApplicationException) {
      message = error.message;
      code = error.code;
    } else if (code === 404) {
      message = "Not found";
    } else {
      logger.error(error.message, { ...error, meta });
      message = "Unexpected error occurred while processing your request";
      code = 500;
    }

    return this.send(res, code, false, message);
  }

  send(res, code, success, message, data) {
    const responseData = {
      success,
      message,
      data,
    };
    return res.status(code).json(responseData);
  }
}

const apiResponse = new ApiResponse();

// export
module.exports = apiResponse;
