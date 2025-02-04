const Cliente = require("../bancoCliente"); // Importando modelo do banco

/**
 * Método para listar todos os clientes cadastrados na collection Clientes do banco por meio do método find() do mongoose, que retorna todos os documentos de uma collection.
 *  @returns {Promise<Array>} Retorna um array contendo todos os clientes cadastrados.
 */
class ClienteService {
    static async listarClientes() {
        try {
            return await Cliente.find(); // Retorna todos os clientes cadastrados.
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            return []; // Em caso de erro, retorna uma lista vazia
        }
    }
}

module.exports = ClienteService; // Exporta a classe para ser usada em outras partes da aplicação
