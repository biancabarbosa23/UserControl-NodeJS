# UserControl-NodeJS

Aplicativo mobile feito para cadastrar e gerenciar usuários por nivel de acesso, utilizando autenticação, conexão com o MondoDB.
- Nivel de acesso administrativo (999) - Tem acesso a listagem, desativação e alteraração dos usuarios cadastrados.
- Nivel de acesso Comum (1) - Tem acesso somente a seu perfil, podendo modifica-lo.
- Nivel de acesso desabilitado (0) -  Não tem acesso a plataforma.  


## Importante

- Necessário todas as dependencias do projeto

### Requisitos

 - NodeJs

 
### Iniciando 
```
$ git clone https://github.com/biancabarbosa23/UserControl-NodeJS.git
```
```
$ cd UserControl-NodeJS
```
```
$ npm install
```
```
$ npm run dev
```


### Rotas

- http://localhost:3030/login [POST](Fazer login no sistema com E-mail ou CPF)

- http://localhost:3030/register [POST](Criar uma conta no sistema com Nome, Cpf, E-mail e Senha)

- http://localhost:3030/users [GET](Busca todos funcionarios cadastrados, tem que possuir nível de acesso 999)
 
- http://localhost:3030/user/:id [PUT](Atulizar unico usuários com ID)

- http://localhost:3030/user/:id [GET](Buscar unico usuario com ID)


## Autores

**Bianca Alves**

## Licença
 
 - Nenhuma

## Agradecimentos

* Mind Consulting

