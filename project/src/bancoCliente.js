const mongoose = require('mongoose'); // Importa o mongoose manipulação do Banco de Dados


// Definição do esquema (método Schema()) para a coleção Cliente no MongoDB, definindo a estrutura como cliente será armazenado no Banco de Dados.
const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    numero: { type: String, required: true },
    senha: { type: String, required: true}, 
    cep: { type: String, required: true }, 
});

// Cria um modelo de Cliente de acordo com o esquema definido, permitindo manipulá-lo diretamente na collection Clientes do Banco
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente; // Exporta o modelo para ser usado no projeto 
