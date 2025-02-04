const Cliente = require("../bancoCliente"); // Importando modelo do banco

class ClienteService {
    // Método para listar todos os clientes do banco
    static async listarClientes() {
        try {
            return await Cliente.find(); // Retorna todos os clientes cadastrados
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            return [];
        }
    }
}

module.exports = ClienteService;
