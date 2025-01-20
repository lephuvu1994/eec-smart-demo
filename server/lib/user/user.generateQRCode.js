const jwt = require('jsonwebtoken');


const QR_CODE_VALIDITY = 10 * 60; // QR code is valid 10 minutes

async function generateQRCode(userId, jwtSecret) {
  const qrCode = jwt.sign({ user_id: userId }, jwtSecret, {
    algorithm: 'HS256',
    audience: 'user',
    issuer: 'gladys',
    expiresIn: QR_CODE_VALIDITY,
  });
  return qrCode;
}

module.exports = {
  generateQRCode,
};
