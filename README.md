# Projeto VUTTR
Projeto Very Useful Tools to Remember(VUTTR) criado para o desafio do [Bossabox](https://bossabox.com/), criado com ajuda das seguintes bibliotecas:
 - [formik](https://jaredpalmer.com/formik/)
 - [react-particles-js](https://www.npmjs.com/package/react-particles-js)
 - [tachyons](https://tachyons.io/)
## Abrindo o Projeto
Para os comandos a seguir funcionarem instale o [Node.js](https://nodejs.org/en/) que instala junto o **NPM**(node package manager).
Baixe o projeto ou utilize o `git clone`, entre dentro da pasta do projeto usando o terminal do seus sistema  e execute os seguintes comandos, usando um terminal para cada parte :
 1. Json-Server:
  ```
cd challenge-fake-api && npm start
```
 2. Sistema VUTTR:
   ```
npm install && npm start
```
Primeiro temos que inicializar Json-Server, que é a API que guardar e modifica as tools a partir de chamadas REST, e depois o Sistema VUTTR que é onde fica o website, que terá uma interface onde o usuário podera intergir com API.

**Nota:** O comando `npm install`, só precisa ser utilizado na primeira vez em que for abrir o VUTTR. 
##  Deploy
Para conseguir o artefato do projeto execute:
   ```
npm install && npm run build
```