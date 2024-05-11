const apiResponse = (error, message, data, token) => {
  return {
    error,
    message,
    data,
    token
  }
}

export default apiResponse