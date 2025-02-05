document.getElementById("form-login").addEventListener("submit", async function (event) {
    event.preventDefault();

    const cpf = document.getElementById("cpfUsuario").value.trim();
    const senha = document.getElementById("senhaUsuario").value.trim();
    const mensagemErro = document.getElementById("mensagemErro");

    if (!cpf || !senha) {
        mensagemErro.textContent = "Preencha todos os campos.";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cpf, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Armazena o CPF do cliente no localStorage
            localStorage.setItem("cpf_cliente", data.cliente.cpf);
            window.location.href = "order.html"; // Redireciona para a página de pedidos
        } else {
            mensagemErro.textContent = data.message;
        }
    } catch (error) {
        mensagemErro.textContent = "Erro ao conectar com o servidor.";
        console.error("Erro no login:", error);
    }
});
