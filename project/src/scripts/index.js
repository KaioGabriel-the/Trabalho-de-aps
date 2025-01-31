
// Função para obter valores das IDs em index.html
function obterValores(){

    const nomeCadastro = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const bairro = document.getElementById('bairro').value;

    return {nomeCadastro, endereco, telefone, bairro};
}

// Aguarda a página ser carregada
document.addEventListener("DOMContentLoaded", ()=> {

    // Encontra o botão cadastrar na página
    const button  = document.querySelector('.bt-submit');
    if (button == undefined) {
        console.log("button is undefined");
        return;
    }

    // Adiciona um evento ao botão, para capturar os dados de suas IDs 
    button.addEventListener('click', async (event) => {
        event.preventDefault();  // Impede que a página recarregue assim que o botão cadastrar seja pressionado. Garantindo gravar os valores.
        const {nomeCadastro, endereco, telefone, bairro} = obterValores();
        await enviarParaServidor(nomeCadastro, endereco, telefone, bairro); // chama função para enviar ao servidor
    });
});

// Função para enviar os dados para o servidor (back end)
async function enviarParaServidor(nomeCadastro, endereco, telefone, bairro) {
    const urlBase = "http://localhost:3000"; // concatena a URL referência do servidor com a rota /cadastrar_cliente
    
    // Método fetch, que envia uma requisição HTTP do tipo POST para o servidor e envia dados como um JSON
    fetch(urlBase+"/cadastrar_cliente", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' // envia os dados como um JSON
        },
        body: JSON.stringify({ nome: nomeCadastro, endereco: endereco, telefone: telefone, bairro: bairro }) // atualiza o corpo do JSON enviado, passando cada propriedade com o parâmetro devido
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data)
        window.location.href = "order.html";
    })
    .catch(error => console.error('Erro:', error));
    
}