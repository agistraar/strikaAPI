require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const routerPelanggan = require('./routes/pelanggan.js');
const routerOrder = require('./routes/order.js');
const routerMitra = require('./routes/mitra.js');
const middlewareLogRequest = require('./middleware/logs.js');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/pelanggan', routerPelanggan);
app.use('/order', routerOrder);
app.use('/mitra', routerMitra);

app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});
