const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('Error de conexión', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDb on', mongoose.connection.host);
});

mongoose.connect('mongodb://127.0.0.1/cursonode')

module.exports = mongoose.connection;