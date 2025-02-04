
/**
 * Função para obter valores dos campos de entrada em index.html
 * @returns {Object} Objeto contendo os valores dos campos: nome, endereço, telefone e bairro
 */
function obterValores(){

    const nomeCadastro = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const bairro = document.getElementById('bairro').value;

    return {nomeCadastro, endereco, telefone, bairro};
}

// Aguarda a página ser carregada completamente antes de executar o código
document.addEventListener("DOMContentLoaded", ()=> {

    // Encontra o botão cadastrar na página
    const button  = document.querySelector('.bt-submit');
    if (button == undefined) {
        console.log("button is undefined");
        return;
    }

    // Adiciona um evento de clique ao botão de cadastro, capturando os valores da página e enviando ao servidor
    button.addEventListener('click', async (event) => {
        event.preventDefault();  // Impede que a página recarregue assim que o botão cadastrar seja pressionado. Garantindo gravar os valores.
        const {nomeCadastro, endereco, telefone, bairro} = obterValores(); // Obtém valores dos campos.
        await enviarParaServidor(nomeCadastro, endereco, telefone, bairro); // Envia para o servidor
    });
});

/**  
 * Função para enviar os dados do cliente ao servidor (server.js)
 * @param {string} nomeCadastro - Nome do cliente
 * @param {string} endereco - Endereço do cliente
 * @param {string} telefone - Telefone do cliente
 * @param {string} bairro - Bairro do cliente
*/
async function enviarParaServidor(nomeCadastro, endereco, telefone, bairro) {
    const urlBase = "http://localhost:3000"; // concatena a URL referência do servidor com a rota /cadastrar_cliente
    
    try {
        const response = await fetch(urlBase+"/cadastrar_cliente", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' // Envia os dados como um JSON
            },
            body: JSON.stringify({ nome: nomeCadastro, endereco: endereco, telefone: telefone, bairro: bairro })
        });

        const data = await response.json();
        
        if (response.ok) {  // Verifica se a resposta foi bem-sucedida
            console.log('Sucesso:', data);
            window.location.href = "order.html";  // Redireciona para página de pedidos apenas se o envio for bem-sucedido
        } else {
            console.error('Erro ao cadastrar cliente:', data);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

