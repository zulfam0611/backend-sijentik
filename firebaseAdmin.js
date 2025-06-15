const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json'); // pastikan file ini ada

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
