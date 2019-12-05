const getMessageResponse = response => {
  let message = 'Unknown error';
  if (response) {
    if (response.data) {
      if (response.data.message) return response.data.message;
    }

    if (response.response) {
      if (response.response.message) return response.response.message;
      if (response.response.data) return response.response.data.message;
    }

    if (response.message) return response.message;
  }
  return message;
};

export { getMessageResponse };
