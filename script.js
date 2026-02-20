const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // evita recarregar a página

    const dados = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      adress: document.getElementById("adress").value,
    };

    const resposta = await fetch("http://localhost:3000/usuarios/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("adress").value = "";

    const resultado = await resposta.json();
    alert(resultado.resposta);
  });
