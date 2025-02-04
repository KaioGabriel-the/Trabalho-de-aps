const mongoose = require('mongoose'); // Importa o mongoose manipulação do Banco de Dados


// Definição do esquema (método Schema()) para a coleção Pedios no MongoDB, definindo a estrutura de pedido será armazenada no Banco de Dados.
const pedidoSchema = new mongoose.Schema({
    sabor_pizza: { type: String, required: true },
    tamanho_pizza: { type: String, required: true },
    com_borda: { type: Boolean, required: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }
});

// Cria um modelo de Pedido de acordo com o esquema definido, permitindo manipulá-lo diretamente na collection Pedidos do Banco
const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido; // Exporta o modelo para ser usado no projeto 
