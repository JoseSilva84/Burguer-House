const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

const phoneNumber = "5588996955889"; // Substitua pelo número real, incluindo código do país
const contatoWhat = document.getElementById("contatoWhat");
const contatoWhatbtn = document.getElementById("contatoWhatbtn");
const contatoWhatpedir = document.getElementById("contatoWhatpedir");
const btnWhat = document.querySelectorAll(".btnWhat");

if (contatoWhat) {
contatoWhat.addEventListener("click", () => {
    window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        "Olá! Gostaria de fazer o meu pedido.",
    )}`,
    "_blank",
    );
});
};

if (contatoWhatbtn) {
contatoWhatbtn.addEventListener("click", () => {
    window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        "Olá! Gostaria de fazer o meu pedido.",
    )}`,
    "_blank",
    );
});
};

if (contatoWhatpedir) {
contatoWhatpedir.addEventListener("click", () => {
    window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        "Olá! Gostaria de fazer o meu pedido.",
    )}`,
    "_blank",
    );
});
};

btnWhat.forEach(btn => {
    btn.addEventListener("click", () => {
        window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            "Olá! Gostaria de fazer o meu pedido.",
        )}`,
        "_blank",
        );
    });
});

document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // evita recarregar a página

  // busca elementos e botão de submit (mantendo os mesmos ids existentes)
  const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');

  // helper para ler e normalizar valores
  const val = (id) => {
    const el = document.getElementById(id);
    return el ? String(el.value).trim() : "";
  };

  // desabilita o botão para evitar envios duplicados
  if (submitBtn) submitBtn.disabled = true;

  try {
    const name = val("name");
    const email = val("email");
    const password = val("password");
    const adress = val("adress");

    // validação básica no cliente
    if (!name || !email || !password || !adress) throw new Error("Preencha todos os campos.");
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) throw new Error("Email inválido.");
    if (password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.");

    // limita tamanho para evitar payloads abusivos
    if (name.length > 150 || email.length > 150 || adress.length > 300) throw new Error("Campos muito longos.");

    const dados = { name, email, password, adress };

    const resposta = await fetch("http://localhost:3000/usuarios/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    // verifica status HTTP
    if (!resposta.ok) {
      let msg = `Erro ${resposta.status}`;
      try {
        const errJson = await resposta.json();
        msg = errJson.mensagem || errJson.resposta || JSON.stringify(errJson);
      } catch (_){
        const txt = await resposta.text().catch(()=>null);
        if (txt) msg = txt;
      }
      throw new Error(msg);
    }

    // limpa campos somente após sucesso
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("adress").value = "";

    const resultado = await resposta.json().catch(() => ({}));
    const mensagem = resultado.mensagem || resultado.resposta || 'Operação concluída.';

    // evita injeção mostrando texto seguro
    const safe = String(mensagem).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    alert(safe);
  } catch (err) {
    console.error(err);
    alert(err.message || String(err));
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
});
