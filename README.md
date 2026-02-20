# Burguer House

Projeto simples de interface para uma lanchonete (Burguer House) construída com HTML, CSS e JavaScript.

## Descrição

Esta é uma pequena aplicação front-end que demonstra um layout de cardápio e interação básica para um site de hamburgueria. O projeto é intencionalmente leve e pensado para aprendizado e personalização.

## Como executar

Você pode abrir o projeto de duas maneiras:

- Abrir o arquivo `index.html` diretamente em um navegador moderno (Chrome, Edge, Firefox).
- Executar um servidor local (recomendado para testes com fetch/rotas relativas):

```bash
# Usando Python 3 (porta 8000)
python -m http.server 8000

# Ou usando http-server (Node.js)
npx http-server . -p 8000
```

Depois, abra `http://localhost:8000` no navegador.

## Atualizações recentes

- Adicionada página de login `/login.html` com campos: `Nome`, `Email`, `Endereço` e `Senha`.
- Botão `Faça login` no cabeçalho agora aponta para `login.html`.
- `script.js` foi atualizado para:
	- validação simples dos campos antes do envio;
	- desabilitar o botão de envio durante a requisição;
	- tratamento de erros via `try/catch` e verificação de `response.ok`;
	- uso de payload compatível com o model atual do backend (`adress` existe no model do servidor — considere padronizar para `address`).
- Ajustes no CSS para garantir que o botão flutuante do WhatsApp mantenha a posição correta.

## Estrutura de arquivos

- `index.html` — markup da página principal.
- `style.css` — estilos e layout.
- `script.js` — lógica interativa do front-end.

## Backend (opcional)

Existe um backend mínimo em `backend/` usando Node.js, Express e Sequelize.
- `backend/server.js` — entrypoint do servidor.
- `backend/src/models/User.js` — model Sequelize com os campos `name`, `email` e `adress` (observe o typo `adress`).

Para testes do front enviando requisições ao backend local, lembre-se de habilitar CORS no servidor (ex.: instalar `cors` e usar `app.use(cors())` em `backend/server.js`).

Exemplo de instalação e execução rápida do backend:

```bash
cd backend
npm install
node server.js
```

Se o front for servido por arquivo (`file://`) ou por outra origem, ajuste a configuração `cors()` para permitir a origem correta.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6)

## Personalização

Sinta-se à vontade para alterar estilos, imagens e textos para adequar ao seu cardápio. Para adicionar novos itens, edite o HTML ou acrescente geração dinâmica via `script.js`.

## Contribuição

Este é um projeto simples — contribuições são bem-vindas. Para sugestões ou melhorias, abra uma issue ou envie um pull request no repositório que contenha este projeto.

## Licença

Adapte conforme necessário; por padrão, não há uma licença específica incluída.
