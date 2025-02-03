const mongoose = require('mongoose');

// Definição do schema do Pedido
const pedidoSchema = new mongoose.Schema({
    sabor_pizza: { type: String, required: true },
    tamanho_pizza: { type: String, required: true },
    com_borda: { type: Boolean, required: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }
});

// Criação do modelo de Pedido
const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
