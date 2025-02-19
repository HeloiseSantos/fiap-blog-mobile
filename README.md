# Mobile FIAP Blog

Este é um projeto desenvolvido para o Tech Challenge da quarta fase do curso de pós graduação em desenvolvimento full stack da universidade FIAP. O mesmo consiste na criação de um aplicativo mobile, em React Native, para o gerenciamento de um blogging educacional dinâmico, que possibilita aos professores a possibilidade de listar, criar, editar e excluir posts e aos alunos visualizar a lista de posts cadastrados e ler posts específicos escolhidos por eles.

## 🛠️ Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Render](https://render.com/)
- [Auth0](https://auth0.com/)

## 💻 Pré-requisitos

Antes de iniciar, verifique se seu computador possui instalado:

- [Node.js](https://nodejs.org/pt);

## 🔧 Instalação

Para executar o mobile do blog em ambiente local, siga estas etapas, utilizando seu terminal preferido:

```bash
# Clonar repositório:
git clone https://github.com/HeloiseSantos/fiap-blog-mobile

# Acessar pasta do projeto
cd fiap-blog-mobile

# Abrir projeto no editor de código:
code .

# Instalar dependências
npm i -g expo-cli
```

## 🚀 Executar projeto localmente

```bash
# Levantar server local
npx expo start
```

Com o projeto rodando na porta 3000 [http://localhost:3000/], é possível utilizá-lo de duas formas:

- Consumindo a API publicada na nuvem [https://fiap-blog-backend-latest.onrender.com];
- Consumindo a API localmente. 

Para consumir a API via Render, não é necessário realizar nenhuma modificação no projeto, basta rodar localmente e utilizar. 

Para consumir a API localmente, é necessário realizar o seguinte passo a passo:

```bash
# Clonar repositório back-end
git clone https://github.com/HeloiseSantos/fiap-blog-backend.git

# Executar o back-end localmente
Veja intruções para rodar o projeto no próprio README do mesmo.

# No projeto front-end 
- Acessar o seguinte diretório src\app\page.tsx;
- Na linha 39, alterar a URL de https://fiap-blog-backend-latest.onrender.com/posts para http://localhost:3000/posts
```

## 🌐 Publicação (Deploy)

A interface do projeto está publicada e disponível para uso no seguinte endereço:

// URL AQUI

## 🧑🏻‍💻👩🏻‍💻 Colaboradores

Grupo 31, composto por:

- Heloíse Silva Santos - https://github.com/HeloiseSantos
- Jonas de Andrade Zuazo Moreira - https://github.com/jmoreira7
