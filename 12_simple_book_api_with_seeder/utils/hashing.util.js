const bcrypt = require("bcrypt");

const doHash = (value, saltValue) => {
  return bcrypt.hash(value, saltValue);
};

const doHashValidation = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  doHash,
  doHashValidation,
};