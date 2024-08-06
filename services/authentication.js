const JWT = require("jsonwebtoken");

const secret = "$Pret@m#123";

function createTokenForUser(user) {
  const { _id, email, profileImageURL, role, fullName } = user;
  const payload = { _id, email, profileImageURL, role, fullName };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
