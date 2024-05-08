<h1> 🦸‍♂️ Projeto sobre super-heróis </h1>

<h2> Descrição: </h2>

🦸‍♂️ Projeto sobre super-heróis, utilizando um banco de dados PostgreSQL para possibilitar operações CRUD completas para os heróis. 📚💥🦹‍♂️

<img src="https://t.ctcdn.com.br/SMTDYQzyBcve8QuOkCfEShirdIA=/1200x675/smart/i854309.jpeg" alt="Imagem dos super-heróis da DC">

<h2>Funcionalidades:</h2>

- Criação, leitura, atualização e exclusão (CRUD) de heróis.
- Implementação de uma rota que permite simular uma batalha entre dois heróis.
- Filtro de batalha por nome de herói.
- Criação de uma rota para consultar o histórico de todas as batalhas registradas.

<h2> Tecnologias Utilizadas: </h2>
- Node.js
- Express
- PostgreSQL
- dotenv

<h2> Como Usar: </h2>


<h2> Rotas: </h2>

- **GET** /herois: Retorna todos os heróis.
- **GET** /herois/:id: Busca um herói pelo ID.
- **POST** /herois: Cria um novo herói.
- **PUT** /herois/:id: Atualiza um herói existente.
- **DELETE** /herois/:id: Deleta um herói existente.
- **GET** /herois/nome/:nome: Busca heróis por nome.
- **GET** /herois/poder/:poder: Busca heróis com algum tipo de poder.
- **GET** /batalhar/:idHeroi1/:idHeroi2: Simula uma batalha entre dois heróis.
- **GET** /historico: Retorna o histórico de todas as batalhas registradas.