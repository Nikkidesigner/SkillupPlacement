// Utility for creating error responses
export const createError = (message, statusCode = 500, stack = null) => {
    const errorResponse = {
        status: "error",
        statusCode,
        message,
    };

    if (process.env.NODE_ENV === "development" && stack) {
        errorResponse.stack = stack;  // Include stack trace in development
    }

    return errorResponse;
};

// Utility for creating success responses
export const createSuccess = (data, message = "Operation successful", statusCode = 200) => {
    return {
        status: "success",
        statusCode,
        message,
        data
    };
};

// Utility for creating result, handling both success and error
export const createResult = (error, data, successMessage = "Operation successful") => {
    if (error) {
        return createError(error.message || error, error.statusCode || 500, error.stack);
    } else {
        return createSuccess(data, successMessage);
    }
};
