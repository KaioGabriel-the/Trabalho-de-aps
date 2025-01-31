const express = require('express');
const fs = require('fs');
const path = require('path');

// Cria o servidor com o framework Express()
const app = express();
const cors = require('cors');
app.use(cors()); // cors() permite requisições http, inciando a comuniação entre back e front end
const port = 3000;

// Permite que o Express enterda requisições  com o corpo JSON
app.use(express.json());

// Cria a rota '/cadastrar_cliente' usada pelo index.js no front end
app.post('/cadastrar_cliente', (req, res) => {
    const { nome, endereco, telefone, bairro } = req.body;

    // Formatação dos dados para o arquivo .txt
    const clienteData = `Nome: ${nome}\nEndereço: ${endereco}\nTelefone: ${telefone}\nBairro: ${bairro}\n\n`;

    // Caminho do arquivo onde os dados serão salvos
    const filePath = path.join(__dirname, 'clientes.txt');

    // Cria o arquivo se ele não existir e escreve os dados no arquivo
    fs.appendFile(filePath, clienteData, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao salvar cliente', error: err });
        }
        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    });
});

// Cria a rota '/cadastrar_pedido' usada pelo order.js no front end
app.post('/cadastrar_pedido', (req, res) => {
    const { sabor_pizza, tamanho_pizza } = req.body;

    const pedidoData = `Sabor: ${sabor_pizza}\nTamanho: ${tamanho_pizza}\n\n`;
    const filePath = path.join(__dirname, 'pedidos.txt');

    fs.appendFile(filePath, pedidoData, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao salvar pedido', error: err });
        }
        res.status(201).json({ message: 'Pedido registrado com sucesso!' });
    });
})

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
