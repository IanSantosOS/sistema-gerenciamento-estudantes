const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();

// todo o código está dentro de uma função assíncrona para esperar a
// conexão com o banco de dados ser estabelecida.
(async () => {

await require('./models/DB').connect(); // Inicia a conexão ao banco de dados

// Configuração

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'gerenciamento-estudantes',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Rotas aqui

app.use('/', require('./routers/pagesRouter'));
app.use('/api', require('./routers/apiRouter'));

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).render('erro', {
        contato: true,
        titulo:'500: Erro interno do servidor',
        msg: 'Aconteceu um erro interno dentro do nosso servidor.'
    });
});

app.use((_req, res) => {
    res.status(404).render('erro', {
        contato: false,
        titulo: '404: Página não encontrada',
        msg: 'Essa página não existe, verifique se a URL está correta e tente novamente.'
    });
});

// Servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\x1b[43;1m Funcionou!!! \x1b[0m Servidor está rodando na porta: ${PORT}\x1b[0m\n`);
});

})();