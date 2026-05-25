/*
  Format Decimal Numbers
*/

const formatDecimal = (value) => {
  return Number(value).toFixed(4);
};

/*
  Validate CSV File
*/

const validateCSV = (file) => {
  if (!file) {
    return {
      success: false,
      message: "No file uploaded"
    };
  }

  const allowedTypes = [
    "text/csv",
    "application/vnd.ms-excel"
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return {
      success: false,
      message: "Only CSV files are allowed"
    };
  }

  return {
    success: true
  };
};

/*
  Generate File Name
*/

const generateFileName = (originalName) => {
  const timestamp = Date.now();

  return `${timestamp}-${originalName}`;
};

/*
  Success Response
*/

const successResponse = (
  res,
  message,
  data = null
) => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};

/*
  Error Response
*/

const errorResponse = (
  res,
  message,
  status = 500
) => {
  return res.status(status).json({
    success: false,
    message
  });
};

module.exports = {
  formatDecimal,
  validateCSV,
  generateFileName,
  successResponse,
  errorResponse
};