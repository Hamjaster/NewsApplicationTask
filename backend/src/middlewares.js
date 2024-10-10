const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Some unexpected error occured!");
};

module.exports = {
  handleError,
};
