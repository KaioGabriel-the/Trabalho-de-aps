
function obterValoresPizza(){

    const saborPizza = document.getElementById('sabor_pizza').value;
    const tamanhoPizza = document.getElementById('tamanho_pizza').value;
    const comBorda = document.getElementById('borda_pizza').value;


    return {saborPizza, tamanhoPizza, comBorda};
}



document.addEventListener("DOMContentLoaded", () => {

    const button  = document.querySelector('button[type="submit"]');
    if (button == undefined) {
        console.log("button is undefined");
        return;
    }
    
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const {saborPizza, tamanhoPizza,comBorda} = obterValoresPizza();
        if (saborPizza && tamanhoPizza) {
        await enviarPedidoParaServidor(saborPizza, tamanhoPizza, comBorda);
        } else {
            console.log("Valores inválidos para o pedido.");
    }
    });
})
    

// Função para enviar os dados do pedido para o servidor
async function enviarPedidoParaServidor(saborPizza, tamanhoPizza, comBorda) {
    const urlBase = "http://localhost:3000";

    try {
        const response = await fetch(urlBase + "/cadastrar_pedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sabor_pizza: saborPizza, tamanho_pizza: tamanhoPizza, com_borda: comBorda })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Sucesso:", data);
            window.location.href = "confirm.html";  // Redireciona apenas após sucesso
        } else {
            console.error("Erro ao registrar pedido:", data);
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}
