const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const admin = require('./firebase-config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import routes
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

// Mount routes dengan path base yang konsisten
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/users', usersRoutes);

// Redirect gambar Google Drive (optional)
app.get('/image/:fileId', (req, res) => {
  const { fileId } = req.params;
  const imageUrl = `https://drive.google.com/uc?id=${fileId}`;
  return res.redirect(imageUrl);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
