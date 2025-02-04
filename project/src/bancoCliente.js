const mongoose = require('mongoose'); // Importa o mongoose manipulação do Banco de Dados


// Definição do esquema (método Schema()) para a coleção Cliente no MongoDB, definindo a estrutura como cliente será armazenado no Banco de Dados.
const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String, required: true }
});

// Cria um modelo de Cliente de acordo com o esquema definido, permitindo manipulá-lo diretamente na collection Clientes do Banco
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente; // Exporta o modelo para ser usado no projeto 
