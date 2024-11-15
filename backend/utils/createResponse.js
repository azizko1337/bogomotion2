function createResponse(data = null, error = false, errorMessage = "") {
  return {
    error,
    errorMessage,
    data,
  };
}

export default createResponse;
