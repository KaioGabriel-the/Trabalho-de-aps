const Pedido = require("./bancoPedido"); // Importando modelo do banco

/**
 * Método para listar todos os clientes cadastrados na collection Clientes do banco por meio do método find() e populate() do mongoose, 
 * que retorna todos os documentos de uma collection e permite especificar o atributo da collection para ser buscado, respectivamente.
 *  @returns {Promise<Array>} Retorna um array contendo todos os pedidos de cada cliente cadastrado.
 */
class PedidoService {
    // Método para listar todos os pedidos e seus clientes associados
    static async listarPedidos() {
        try {
            return await Pedido.find().populate("clienteId"); // Populando os dados do cliente
        } catch (error) {
            console.error("Erro ao listar pedidos:", error);
            return [];
        }
    }
}

module.exports = PedidoService; // Exporta a classe para ser usada em outras partes da aplicação
