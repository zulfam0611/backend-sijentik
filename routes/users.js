const express = require('express');
const admin = require('../firebase-config'); // Ambil dari firebase-config.js
const router = express.Router();

const db = admin.firestore();

router.get('/', async (req, res) => {
  const { rt, role } = req.query;

  try {
    let query = db.collection('users');

    if (rt && rt !== 'Semua') {
      query = query.where('rt', '==', rt);
    }

    if (role && role !== 'Semua') {
      query = query.where('role', '==', role);
    }

    const snapshot = await query.get();
    if (snapshot.empty) {
      return res.status(404).send('Tidak ada data pengguna ditemukan');
    }

    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal memuat data pengguna');
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await db.collection('users').doc(userId).delete();
    res.send('Pengguna berhasil dihapus');
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal menghapus pengguna');
  }
});

module.exports = router;
