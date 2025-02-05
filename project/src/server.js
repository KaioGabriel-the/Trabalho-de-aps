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

// variável global para armazenar id do último cliente cadastrado
let idUltimoClient;

// Conexão com o MongoDB Atlas
mongoose.connect('mongodb+srv://EnzoMello:198407Safado@pizzaria-cluster.2vrae.mongodb.net/pizzaria?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

/**
 * @route POST /cadastrar_cliente
 * @desc Cadastra um novo cliente na collection Cliente do MongoDB
 * @param {string} nome - Nome do cliente
 * @param {string} endereco - Endereço do cliente
 * @param {string} telefone - Número de telefone do cliente
 * @param {string} bairro - Bairro onde o cliente reside
 * @param {string} senha - Senha escolhida pelo cliente
 * @returns {object} JSON contendo a mensagem de sucesso e o ID do cliente cadastrado
*/
app.post('/cadastrar_cliente', async (req, res) => {
    const { nome, cpf, telefone, senha, cep } = req.body;

    try {
        // Verificar se já existe um cliente com o mesmo nome
        const clienteExistente = await Cliente.findOne({ cpf });
        if (clienteExistente) {
            return res.status(400).json({ message: 'Erro: Já existe um cliente cadastrado com esse cpf.' });
        }

        const novoCliente = new Cliente({
            nome,
            cpf,
            numero: telefone,
            senha, 
            cep
        }); 

        await novoCliente.save();
        idUltimoClient = novoCliente._id;

        res.status(201).json({ message: 'Cliente cadastrado com sucesso!', clienteId: novoCliente._id });
    } catch (err) {
        console.error('Erro ao salvar cliente:', err);
        res.status(500).json({ message: 'Erro ao salvar cliente', error: err });
    }
});

/**  
 * @route POST /cadastrar_pedido
 * @desc Cadastra um novo pedido no MongoDB
 * @param {string} sabor_pizza - Sabor da pizza escolhida pelo cliente
 * @param {string} tamanho_pizza - Tamanho da pizza escolhida pelo cliente (P, M e G)
 * @param {boolean} com_borda - Presença ou não da borda escolhida pelo cliente
 * @returns {object} JSON contendo a mensagem de sucesso ou erro
*/
app.post('/cadastrar_pedido', async (req, res) => {
    const { sabor_pizza, tamanho_pizza, com_borda, cpf_cliente } = req.body;

    try {
        const novoPedido = new Pedido({
            sabor_pizza,
            tamanho_pizza,
            com_borda: com_borda === 'com_borda' ? true : false,
            clienteCpf: cpf_cliente // Apenas usa o CPF fornecido pelo usuário
        });

        await novoPedido.save();

        res.status(201).json({ message: 'Pedido registrado com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar pedido:', err);
        res.status(500).json({ message: 'Erro ao salvar pedido', error: err });
    }
});


/** 
 * @route GET /clientes
 * @desc Retorna todos os clientes cadastrados no banco de dados
 * @returns {Array} Lista de clientes em formato JSON
 * */
app.get("/clientes", async (req, res) => {
    try {
        const clientes = await Cliente.find(); // Busca todos os clientes no banco

        // Contar pedidos de cada cliente
        const clientesComPedidos = await Promise.all(clientes.map(async (cliente) => {
            const quantidadePedidos = await Pedido.countDocuments({ clienteCpf: cliente.cpf });
            return { 
                nome: cliente.nome,
                cep: cliente.cep,
                numero: cliente.numero,
                cpf: cliente.cpf,
                quantidadePedidos
            };
        }));

        res.json(clientesComPedidos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes", error });
    }
});



/** 
 * @route GET /pedidos
 * @desc Retorna todos os pedidos cadastrados no banco de dados, incluindo os dados do cliente associado
 * @returns {Array} Lista de pedidos com os detalhes do cliente em formato JSON
*/
app.get("/pedidos", async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate("cliente"); // Trazendo o cliente associado ao pedido
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedidos", error });
    }
});

app.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;

    try {
        const cliente = await Cliente.findOne({ cpf });

        if (!cliente) {
            return res.status(400).json({ message: "CPF não encontrado! Faça o cadastro primeiro." });
        }

        if (cliente.senha !== senha) {
            return res.status(400).json({ message: "Senha incorreta!" });
        }

        res.status(200).json({ 
            message: "Login bem-sucedido!", 
            cliente: {
                nome: cliente.nome,
                cpf: cliente.cpf
            } 
        });
    } catch (err) {
        console.error("Erro ao realizar login:", err);
        res.status(500).json({ message: "Erro no servidor", error: err });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
