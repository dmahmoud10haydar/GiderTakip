const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Gider Takip Uygulaması Başladı!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

const mongoose = require('mongoose');
mongoose
  .connect('mongodb+srv://dmahmoud10haydar:pCmIUhpmgMqEQL14@cluster0.0x96cqp.mongodb.net/giderTakipDB')
  .then(() => console.log('MongoDB Atlas bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

  
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

