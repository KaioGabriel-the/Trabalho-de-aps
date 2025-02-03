
function obterValoresPizza(){

    const saborPizza = document.getElementById('sabor_pizza').value;
    const tamanhoPizza = document.getElementById('tamanho_pizza').value;
    const comBorda = document.getElementById('borda_pizza').value;
    


    return {saborPizza, tamanhoPizza, comBorda};
}



document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector('button[type="submit"]');
    
    if (!button) { // Verifica se o botão existe
        console.log("Botão de envio não encontrado.");
        return;
    }
    
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        
        const { saborPizza, tamanhoPizza, comBorda } = obterValoresPizza();
        
        if (saborPizza && tamanhoPizza && comBorda) {
            await enviarPedidoParaServidor(saborPizza, tamanhoPizza, comBorda);
        } else {
            console.log("Valores inválidos para o pedido.");
        }
    });
});

// Função para enviar os dados do pedido para o servidor
async function enviarPedidoParaServidor(saborPizza, tamanhoPizza, comBorda) {
    const urlBase = "http://localhost:3000";

    fetch(urlBase + "/cadastrar_pedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sabor_pizza: saborPizza, tamanho_pizza: tamanhoPizza, com_borda: comBorda })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Sucesso:", data);
        window.location.href = "confirm.html"; // Redireciona para a página de confirmação
    })
    .catch(error => console.error("Erro:", error));
}
