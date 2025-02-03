const mongoose = require('mongoose');

// Definição do schema do Cliente
const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String, required: true }
});

// Criação do modelo de Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
