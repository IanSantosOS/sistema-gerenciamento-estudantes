const express = require('express');
const router = express.Router();

// --------------- PÁGINAS PRINCIPAIS ---------------

router.get('/', (req, res) => {
    res.redirect('/homepage');
});

router.get('/login/', (req, res) => {
    res.render('login');
});

router.get('/homepage/', (req, res) => {
    res.render('homepage', { username: 'user', email: 'user@usersync.com' }); // apenas teste, será alterado no futuro
});

// --------------------- ADMIN ---------------------

router.get('/admin/cadastro', (req, res) => {
    res.render('cadastro-admin', { username: 'user', email: 'user@usersync.com' }); // apenas teste, será alterado no futuro
});

// --------------------- ALUNOS ---------------------

router.get('/alunos/lista/', (req, res) => {
    res.render('lista-alunos', { username: 'user', email: 'user@usersync.com' }); // apenas teste, será alterado no futuro
});

router.get('/alunos/cadastro/', (req, res) => {
    res.render('cadastro-atualizar', { username: 'user', email: 'user@usersync.com', titulo: 'cadastrar aluno', script: '/js/cadastro-aluno.js' }); // apenas teste, será alterado no futuro
});

router.get('/alunos/atualizar/', (req, res) => {
    const { id } = req.query;
    if (id === undefined) { // mudar para uma função que pesquisa esse id em específico
        res.render('erro', {
            contato: true,
            titulo: 'Aluno não encontrado',
            msg: 'Não foi encontrado nenhum aluno com esse id para ser atualizado. Certifique-se de que o id se encontra na lista de alunos'
        });
    } else {
        res.render('cadastro-atualizar', { username: 'user', email: 'user@usersync.com', titulo: 'atualizar aluno', script: '/js/atualizar-aluno.js' }); // apenas teste, será alterado no futuro
    }
});

router.get('/alunos/avaliacao/', (req, res) => {
    res.render('lista-avaliacoes', { username: 'user', email: 'user@usersync.com' }); // apenas teste, será alterado no futuro
});

router.get('/alunos/frequencia/', (req, res) => {
    res.render('lista-frequencias', { username: 'user', email: 'user@usersync.com' }); // apenas teste, será alterado no futuro
});

module.exports = router;
