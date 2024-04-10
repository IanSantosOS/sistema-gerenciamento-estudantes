const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();

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

// Rotas Aqui;

app.use('/', require('./routers/homepageRouter'));
app.use('/login', require('./routers/loginRouter'));
app.use('/cadastro', require('./routers/cadastroRouter'));

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Erro interno do servidor');
});

// Servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n\x1b[43;1m Funcionou!!! \x1b[0m Servidor está rodando na porta: ${PORT}\x1b[0m\n`);
});