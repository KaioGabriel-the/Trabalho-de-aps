/**
 * Função para obter valores dos campos de entrada em index.html
 * @returns {Object} Objeto contendo os valores dos campos: nome, cpf, telefone, senha e cep
 */
function obterValores() {
    const nomeCadastro = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const cep = document.getElementById('cep').value;

    // Obtém a referência da div onde as mensagens de erro ou sucesso serão exibidas
    const mensagemDiv = document.getElementById("mensagem");

    return { nomeCadastro, cpf, telefone, senha, cep, mensagemDiv };
}

// Aguarda a página ser carregada completamente antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o botão de cadastro na página
    const button = document.querySelector('.bt-submit');

    // Verifica se o botão foi encontrado para evitar erros
    if (!button) {
        console.log("Botão de cadastro não encontrado.");
        return;
    }

    /**
     * Adiciona um evento de clique ao botão de cadastro.
     * Quando o botão é pressionado, os valores dos campos são coletados e enviados ao servidor.
     */
    button.addEventListener('click', async (event) => {
        event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

        // Obtém os valores dos campos preenchidos pelo usuário
        const { nomeCadastro, cpf, telefone, senha, cep, mensagemDiv } = obterValores();

        // Chama a função que envia os dados ao servidor
        await enviarParaServidor(nomeCadastro, cpf, telefone, senha, cep, mensagemDiv);
    });
});

/**
 * Função para enviar os dados do cliente ao servidor (server.js)
 * @param {string} nomeCadastro - Nome do cliente
 * @param {string} cpf - CPF do cliente
 * @param {string} telefone - Telefone do cliente
 * @param {string} senha - Senha escolhida pelo cliente
 * @param {string} cep - CEP do cliente
 * @param {HTMLElement} mensagemDiv - Elemento HTML onde as mensagens de erro/sucesso serão exibidas
 */
async function enviarParaServidor(nomeCadastro, cpf, telefone, senha, cep, mensagemDiv) {
    const urlBase = "http://localhost:3000"; // URL base do servidor

    try {
        // Envia os dados ao servidor via requisição HTTP POST
        const response = await fetch(urlBase + "/cadastrar_cliente", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica que os dados estão sendo enviados no formato JSON
            },
            body: JSON.stringify({ nome: nomeCadastro, cpf, telefone, senha, cep }) // Converte os dados para JSON antes de enviar
        });

        // Converte a resposta do servidor para JSON
        const data = await response.json();

        // Verifica se o cadastro foi bem-sucedido
        if (response.ok) {
            console.log('Sucesso:', data);

            // Armazena o CPF do cliente no Local Storage para referência futura
            localStorage.setItem("cpf_cliente", cpf);

            // Redireciona para a página de pedidos após o cadastro bem-sucedido
            window.location.href = "order.html";
        } else {
            console.error('Erro ao cadastrar cliente:', data);

            // Exibe a mensagem de erro retornada pelo servidor
            mensagemDiv.textContent = "❌ " + data.message;
            mensagemDiv.className = "mensagem erro";
        }

        // Exibe a mensagem de erro/sucesso na interface do usuário
        mensagemDiv.style.display = "block";

    } catch (error) {
        console.error('Erro:', error);

        // Exibe uma mensagem de erro caso a conexão com o servidor falhe
        mensagemDiv.textContent = "❌ Erro ao conectar ao servidor.";
        mensagemDiv.className = "mensagem erro";
        mensagemDiv.style.display = "block";
    }
}
