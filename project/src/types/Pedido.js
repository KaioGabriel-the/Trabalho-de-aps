const Pedido = require("./bancoPedido"); // Importando modelo do banco

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

module.exports = PedidoService;
