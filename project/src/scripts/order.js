
function obterValoresPizza(){

    const saborPizza = document.getElementById('sabor_pizza').value;
    const tamanhoPizza = document.getElementById('tamanho_pizza').value;

    return {saborPizza, tamanhoPizza};
}



document.addEventListener("DOMContentLoaded", () => {

    const button  = document.querySelector('button[type="submit"]');
    if (button == undefined) {
        console.log("button is undefined");
        return;
    }
    
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const {saborPizza, tamanhoPizza} = obterValoresPizza();
        if (saborPizza && tamanhoPizza) {
        await enviarPedidoParaServidor(saborPizza, tamanhoPizza);
        } else {
            console.log("Valores inválidos para o pedido.");
    }
    });
})
    
;

// Função para enviar os dados do pedido para o servidor
async function enviarPedidoParaServidor(saborPizza, tamanhoPizza) {
    const urlBase = "http://localhost:3000";

    fetch(urlBase + "/cadastrar_pedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sabor_pizza: saborPizza, tamanho_pizza: tamanhoPizza })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Sucesso:", data);
        window.location.href = "confirm.html"; // Redireciona para a página de confirmação
    })
    .catch(error => console.error("Erro:", error));
}
