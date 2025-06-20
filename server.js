const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.static('public'));

app.use(express.json());

mongoose
  .connect('mongodb+srv://dmahmoud10haydar:pCmIUhpmgMqEQL14@cluster0.0x96cqp.mongodb.net/giderTakipDB')
  .then(() => console.log('MongoDB Atlas bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Gider Takip Uygulaması Başladı!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
