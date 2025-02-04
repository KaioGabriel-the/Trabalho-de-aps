const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('./bancoCliente');  // Importando o modelo de Cliente
const Pedido = require('./bancoPedido');    // Importando o modelo de Pedido

const app = express();
const cors = require('cors');

app.use(cors()); // Permite requisições HTTP entre o front-end e o back-end
app.use(express.json());
app.use(express.static("src")); // Servir arquivos estáticos (HTML, CSS, JS)

const port = 3000;

// variável de controle para armazenar o último cliente cadastrado
let idUltimoClient;

// Conexão com o MongoDB Atlas
mongoose.connect('mongodb+srv://EnzoMello:198407Safado@pizzaria-cluster.2vrae.mongodb.net/pizzaria?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota para cadastrar cliente diretamente no MongoDB
app.post('/cadastrar_cliente', async (req, res) => {
    const { nome, endereco, telefone, bairro } = req.body;

    try {
        const novoCliente = new Cliente({
            nome,
            endereco,
            numero: telefone,
            bairro
        });

        await novoCliente.save();
        idUltimoClient = novoCliente._id;

        res.status(201).json({ message: 'Cliente cadastrado com sucesso!', clienteId: novoCliente._id });
    } catch (err) {
        console.error('Erro ao salvar cliente:', err);
        res.status(500).json({ message: 'Erro ao salvar cliente', error: err });
    }
});

// Rota para cadastrar pedido diretamente no MongoDB
app.post('/cadastrar_pedido', async (req, res) => {
    const { sabor_pizza, tamanho_pizza, com_borda } = req.body;

    try {
        const clienteExistente = await Cliente.findById(idUltimoClient);
        if (!clienteExistente) {
            return res.status(400).json({ message: 'Cliente não encontrado' });
        }

        console.log("ENCONTREI O ID DO ÚLTIMO CLIENTE: " + clienteExistente._id);

        const novoPedido = new Pedido({
            sabor_pizza,
            tamanho_pizza,
            com_borda: com_borda === 'com_borda' ? true : false,
            cliente: clienteExistente._id
        });

        await novoPedido.save();

        res.status(201).json({ message: 'Pedido registrado com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar pedido:', err);
        res.status(500).json({ message: 'Erro ao salvar pedido', error: err });
    }
});

// Rota para buscar todos os clientes no banco com a função criada em Clientes
app.get("/clientes", async (req, res) => {
    try {
        const clientes = await Cliente.find();  // Busca todos os clientes no MongoDB
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes", error });
    }
});


// Rota para Listar Pedidos e Clientes Associados
app.get("/pedidos", async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate("cliente"); // Trazendo o cliente associado ao pedido
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedidos", error });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
