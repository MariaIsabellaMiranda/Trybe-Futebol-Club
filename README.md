# Trybe Futebol Clube
![Captura de tela de 2023-01-06 16-10-05](https://user-images.githubusercontent.com/96309515/211168944-14c20174-0d37-4982-b181-2fbbaefb646c.png)
# Sobre

Nesse projeto, construi um back-end **dockerizado** utilizando modelagem de dados através do **ORM Sequelize**. O desenvolvimento respeitou regras de negócio providas no projeto e uma API foi desenvolvida com a arquitetura de software **MSC (Model-Service-Controller)**, ela é capaz de ser consumida por um front-end, um site informativo sobre partidas e classificações de futebol, que já havia sido provido nesse projeto pela [Trybe](https://www.betrybe.com/), <br>
Foram criados testes de Integração utilizando **Mocha, Chai, ChaiHTTP e Sinon**.<br>
O framework **Express.js** foi usado para criar e estruturar uma **API RESTful** flexível e robusta, por meio de vários endpoints.<br>
Foi utilizado também os princípios **SOLID** e **Programação Orientada a Objetos**.

<br>

## Construído com
  
- Node.js
- MySQL
- Express
- Typescript
- Sequelize
- Docker
- Mocha
- Chai
- ChaiHTTP
- Sinon

<br>

## O que faz?

Ao utilizar essa aplicação um usuário faz seu login, visualiza e cadastra jogos, podendo editar os gols da partida conforme necessário. Há também a opção de visualizar a tabela de classificação/ranking em certos endpoints.

<br>

## Documentação (endpoints)

<details>
<summary> <b>Login</b> </summary>

<br>
  
<details>
  <summary> Método POST </summary>
  
  <br>

Funcionalidade | URL 
---|---
Realiza o login do usuário | http://localhost:3001/login 

<br>

<b>Body (JSON):</b><br>

```
{
  "email": "Nome do Usuário",<br>
  "password": "senha_secreta"<br>
}

```

<b>Resposta da Requisição:</b><br>

```
Status: 200

{
  "token": "Aqui deve conter o token gerado pelo backend."<br>
}
```
</details>

<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Avalia se o usuário é o administrador | http://localhost:3001/login/validate

<br>

<b>Header:</b>
```
Informar um header com o parâmetro authorization contendo o token gerado na requisição anterior.
```

<b>Resposta da Requisição:</b><br>

```
Status: 200

{ "role": "admin" }
```
</details>

<br>

</details>

<details>
<summary> <b>Times</b> </summary>

<br>
  
<details>
  <summary> Método GET </summary>
  
<br>

Funcionalidade | URL 
---|---
Retorna todos os times cadastrados | http://localhost:3001/teams

<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```
</details>

<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Retorna um time específico | http://localhost:3001/teams/:id

<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

{
  "id": 5,
  "teamName": "Cruzeiro"
}
```
</details>

<br>

</details>

<details>
<summary> <b>Partidas</b> </summary>
  
<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Retorna todos as partidas cadastradas | http://localhost:3001/matches

<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
]
```
</details>

<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Retorna todos as partidas cadastradas em progresso | http://localhost:3001/matches?inProgress=true

<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

[
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  }
]
```
</details>

<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Retorna todos as partidas cadastradas finalizadas | http://localhost:3001/matches?inProgress=false
<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  }
]
```
</details>

<details>
  <summary> Método POST </summary>
  
  <br>

Funcionalidade | URL 
---|---
Criação de uma nova partida | http://localhost:3001/matches

<br>

<b>Body (JSON):</b><br>

```
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

<b>Resposta da Requisição:</b><br>

```
Status: 201

{
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}
```
</details>

<details>
  <summary> Método PATCH </summary>
  
  <br>

Funcionalidade | URL 
---|---
Atualiza a chave 'inProgress' de uma partida específica para finalizado  | http://localhost:3001/matches/:id/finish

<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

{ "message": "Finished" }
```
</details>

<details>
  <summary> Método PATCH </summary>
  
  <br>

Funcionalidade | URL 
---|---
Atualiza os gols de uma partida específica  | http://localhost:3001/matches/:id

<br>

<b>Body (JSON):</b><br>

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

<b>Resposta da Requisição:</b><br>

```
Status: 200
```
</details>

<br>

</details>

<details>
<summary> <b>Placares</b> </summary>
  
<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Retorna a classificação geral dos times | http://localhost:3001/leaderboard
<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  ...
]
```
</details>

<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Retorna a classificação dos times mandantes | http://localhost:3001/leaderboard/home
<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": "77.78"
  },
  ...
]
```
</details>

<details>
  <summary> Método GET </summary>
  
  <br>

Funcionalidade | URL 
---|---
Retorna a classificação dos times visitantes | http://localhost:3001/leaderboard/away
<br>

<b>Resposta da Requisição:</b><br>

```
Status: 200

[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": "66.67"
  },
  ...
]
```
</details>
</details>

<br>

## Como excutar o projeto

- Clone o projeto para sua máquina local;
- `cd` no diretório do projeto;
- Rode `npm install` para instalar as dependências;
- Rode `npm start` para inicializar o projeto;
- Rode `npm run compose:up` para iniciar o Docker Compose;
- Rode `npm run compose:down` para parar completamente a aplicação;

Opcional:
- Rode `cd app/backend && npm test` para executar os testes de integração criados.

<br>

## Autor

- Maria Isabella Miranda da Silva <br>
  - Linkedin: [@Maria Isabella](https://www.linkedin.com/in/maria-isabella-miranda/) <br>
  - Email: ma_isabella.miranda@hotmail.com

<br>

## Mostre seu suporte

Me dê uma ⭐️ se você gostou deste projeto!
