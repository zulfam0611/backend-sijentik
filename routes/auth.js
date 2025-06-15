const express = require('express');
const admin = require('../firebase-config');
const router = express.Router();

router.post('/login', async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const userRecord = await admin.auth().getUser(uid);

    if (userRecord.customClaims && userRecord.customClaims.role === 'admin') {
      return res.status(200).json({ role: 'admin' });
    } else {
      return res.status(403).json({ message: 'Akses ditolak: Role tidak sesuai' });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Token tidak valid' });
  }
});

module.exports = router;
