const mongoose = require('mongoose');

// URL de conexão com o MongoDB Atlas
const uri = 'mongodb+srv://EnzoMello:198407Safado@pizzaria-Cluster.2vrae.mongodb.net/pizzaria?retryWrites=true&w=majority';

// Conectar ao MongoDB Atlas
mongoose.connect(uri)
.then(() => {
  console.log('Conectado ao MongoDB Atlas!');
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
