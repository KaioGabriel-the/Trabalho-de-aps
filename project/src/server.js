const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('./bancoCliente');  // Importando o modelo de Cliente
const Pedido = require('./bancoPedido');    // Importando o modelo de Pedido

const app = express();
const cors = require('cors');
app.use(cors()); // Permite requisições HTTP entre o front-end e back-end
const port = 3000;

app.use(express.json());

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
        // Criando um novo cliente no banco
        const novoCliente = new Cliente({
            nome,
            endereco,
            numero: telefone,
            bairro
        });

        // Salvando o cliente no banco
        await novoCliente.save();

        res.status(201).json({ message: 'Cliente cadastrado com sucesso!', clienteId: novoCliente._id });
    } catch (err) {
        console.error('Erro ao salvar cliente:', err);
        res.status(500).json({ message: 'Erro ao salvar cliente', error: err });
    }
});

// Rota para cadastrar pedido diretamente no MongoDB
app.post('/cadastrar_pedido', async (req, res) => {
    const { sabor_pizza, tamanho_pizza, com_borda, clienteId } = req.body;

    try {
        // Verificando se o cliente existe
        const clienteExistente = await Cliente.findById(clienteId);
        if (!clienteExistente) {
            return res.status(400).json({ message: 'Cliente não encontrado' });
        }

        // Criando um novo pedido associado ao cliente
        const novoPedido = new Pedido({
            sabor_pizza,
            tamanho_pizza,
            com_borda: com_borda === 'com_borda' ? true : false,
            cliente: clienteId  // Relacionando o pedido com o cliente
        });

        // Salvando o pedido no banco
        await novoPedido.save();

        res.status(201).json({ message: 'Pedido registrado com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar pedido:', err);
        res.status(500).json({ message: 'Erro ao salvar pedido', error: err });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
