/**
 * Função para obter valores dos campos de entrada em order.html
 * @returns {Object} Objeto contendo os valores dos campos: sabor_pizza, tamanho_pizza e borda_pizza
 */
function obterValoresPizza(){

    const saborPizza = document.getElementById('sabor_pizza').value;
    const tamanhoPizza = document.getElementById('tamanho_pizza').value;
    const comBorda = document.getElementById('borda_pizza').value;


    return {saborPizza, tamanhoPizza, comBorda};
}


// Aguarda a página ser carregada completamente antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

    const button  = document.querySelector('button[type="submit"]');
    if (button == undefined) {
        console.log("button is undefined");
        return;
    }
    
    // Adiciona um evento de clique ao botão de cadastro, capturando os valores da página e enviando ao servidor
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const {saborPizza, tamanhoPizza,comBorda} = obterValoresPizza();
        if (saborPizza && tamanhoPizza) {
        await enviarPedidoParaServidor(saborPizza, tamanhoPizza, comBorda); // Envia dados para o servidor (server.js)
        } else {
            console.log("Valores inválidos para o pedido.");
    }
    });
})
    

/** 
 * Função para enviar os dados do pedido ao servidor (server.js)
 * @param {string} sabor_pizza - Sabor da pizza escolhida 
 * @param {string} tamanho_pizza - Tamanho da pizza escolhida
 * @param {boolean} com_borda - Borda da pizza no pedido
*/
async function enviarPedidoParaServidor(saborPizza, tamanhoPizza, comBorda) {
    const urlBase = "http://localhost:3000";

    try {
        const response = await fetch(urlBase + "/cadastrar_pedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Envia os dados como um JSON
            },
            body: JSON.stringify({ sabor_pizza: saborPizza, tamanho_pizza: tamanhoPizza, com_borda: comBorda })
        });

        const data = await response.json();

        if (response.ok) { // Verifica se resposta de envio foi bem-sucedida.
            console.log("Sucesso:", data);
            window.location.href = "confirm.html";  // Redireciona para confirm.html apenas após sucesso 
        } else {
            console.error("Erro ao registrar pedido:", data);
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}
