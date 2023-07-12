const success = (req, res, message, status) => {
  res.status(status ?? 200).json({
    error: '',
    body: message,
  });
};

const error = (req, res, message, status) => {
  res.status(status ?? 500).json({
    error: message ?? 'An issue occurred while processing the image.',
    body: '',
  });
};

export default {
  error,
  success,
};
