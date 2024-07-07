const express = require('express');
const router = express.Router();

// --------------- PÁGINAS PRINCIPAIS ---------------

router.get('/', (_req, res) => {
    res.redirect('/homepage');
});

router.get('/login/', (_req, res) => {
    res.render('login');
});

router.get('/homepage/', (_req, res) => {
    res.render('homepage', { username: 'user', email: 'user@admin.com' }); // apenas teste, será alterado no futuro
});

// --------------------- ADMIN ---------------------

// router.get('/admin/cadastro', (req, res) => {
//     // res.render('');
// });

// --------------------- ALUNOS ---------------------

router.get('/alunos/lista/', (req, res) => {
    const { nome } = req.query;
    res.render('lista-alunos');
});

router.get('/alunos/cadastro/', (req, res) => {
    res.render('cadastro-atualizar', { username: 'user', email: 'user@admin.com', titulo: 'cadastrar aluno', script: '/js/cadastro-aluno.js' }); // apenas teste, será alterado no futuro
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
        res.render('cadastro-atualizar', { username: 'user', email: 'user@admin.com', titulo: 'atualizar aluno', script: '/js/atualizar-aluno.js' }); // apenas teste, será alterado no futuro
    }
});

router.get('/alunos/avaliacao/', (req, res) => {
    // res.render('');
});

router.get('/alunos/frequencia/', (req, res) => {
    // res.render('');
});

module.exports = router;
