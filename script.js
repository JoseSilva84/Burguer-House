const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

const phoneNumber = "5588996955889"; // Substitua pelo número real, incluindo código do país
const contatoWhat = document.getElementById("contatoWhat");
const contatoWhatbtn = document.getElementById("contatoWhatbtn");
const contatoWhatpedir = document.getElementById("contatoWhatpedir");

const linkredesSociais = document.querySelector(".linkredesSociais");
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

if (linkredesSociais) {
linkredesSociais.addEventListener("click", () => {
    window.open(
    `https://wa.me/5575992456130?text=${encodeURIComponent(
        "Olá! Gostaria de saber mais sobre seus serviços.",
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

// função utilitária para enviar formulários (login ou cadastro)
async function handleForm(e, mode) {
  e.preventDefault();
  const form = e.currentTarget;
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  const val = (id) => {
    const el = document.getElementById(id);
    return el ? String(el.value).trim() : "";
  };

  if (submitBtn) submitBtn.disabled = true;

  try {
    const password = val("password");

    if (!password) throw new Error("Preencha a senha.");

    let url = "";
    let payload = { password };

    if (mode === "register") {
      const name = val("name");
      const email = val("email");
      const adress = val("adress");
      if (!name || !email || !adress) throw new Error("Preencha todos os campos do cadastro.");
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) throw new Error("Email inválido.");
      if (password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.");
      if (name.length > 150 || email.length > 150 || adress.length > 300) throw new Error("Campos muito longos.");
      url = "http://localhost:3000/usuarios/cadastro";
      payload = { name, email, password, adress };
    } else {
      // login by email
      const email = val("email");
      if (!email) throw new Error("Preencha o email.");
      url = "http://localhost:3000/usuarios/login";
      payload = { email, password };
    }

    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resposta.ok) {
      let msg = `Erro ${resposta.status}`;
      try {
        const errJson = await resposta.json();
        msg = errJson.error || errJson.mensagem || errJson.resposta || JSON.stringify(errJson);
      } catch (_){
        const txt = await resposta.text().catch(()=>null);
        if (txt) msg = txt;
      }
      throw new Error(msg);
    }

    const resultado = await resposta.json().catch(() => ({}));
    const mensagem = resultado.message || resultado.mensagem || resultado.resposta || 'Operação concluída.';
    alert(String(mensagem));

    if (mode === "login") {
      // redireciona após login bem‑sucedido
      window.location.href = "index.html";
    } else {
      // após registro, talvez direcionar para login
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error(err);
    alert(err.message || String(err));
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => handleForm(e, "login"));
}
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => handleForm(e, "register"));
}
