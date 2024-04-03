const STATUS = require("./status.constant");

module.exports = {
  ROUTE_NOT_FOUND: {
    message:
      "We regret to inform you that the requested page is currently unavailable. Our team is diligently working to address this issue. Please accept our apologies for any inconvenience caused.",
    status: STATUS.HTTP_404_NOT_FOUND,
  },
  INVALID_ID: {
    message:
      "We apologize for the inconvenience, but it seems that the provided ID is not recognized. Kindly ensure that you are using a valid numeric ID format and try again. Thank you for your understanding.",
    status: STATUS.HTTP_400_BAD_REQUEST,
  },
  ERROR_500: {
    message:
      "We apologize for the inconvenience. Our servers are experiencing unexpected difficulties. Our technical team has been notified and is actively working to resolve this issue. Thank you for your patience and understanding.",
    status: STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
  },
  UNAUTHORIZED: {
    message: 'Access to the requested resource is restricted. Please ensure you are logged in with proper credentials to proceed.',
    status: STATUS.HTTP_401_UNAUTHORIZED
  },
  VALIDATION: {
    message: "An error occurred during validation. Please review your input and try again.",
    status: STATUS.HTTP_400_BAD_REQUEST
  },
  
  USER_EXISTS: {
    message: "🙄 A user already exists with the specified email",
    status: STATUS.HTTP_409_CONFLICT,
  },
  
  USER_NOT_FOUND: {
    message: "User not found",
    status: STATUS.HTTP_404_NOT_FOUND,
  },
  USER_NOT_FOUND: {
    message: "Invalid Credentials",
    status: STATUS.HTTP_400_BAD_REQUEST,
  },
  ERROR_500: {
    message:
      "Internal Server Error: Looks like our servers took a detour to explore the Bermuda Triangle. We're sending a search party, but in the meantime, try refreshing. If that doesn't work, blame it on cosmic interference",
    status: STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
  },
  CREATED: {
    message: "Creation successful",
    status: STATUS.HTTP_201_CREATED,
  },
  UPDATED: {
    message: "Updated successfully",
    status: STATUS.HTTP_200_OK,
  },
  DELETED: {
    message: "Deleted successfully",
    status: STATUS.HTTP_200_OK,
  },
  UNAUTHORIZED: {
    message: 'Unauthorized, You need to login to access these resources',
    status: STATUS.HTTP_401_UNAUTHORIZED
  },
  VALIDATION: {
    message: "validation Error",
    status: STATUS.HTTP_400_BAD_REQUEST
  }
};
