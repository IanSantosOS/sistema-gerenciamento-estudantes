const express = require('express');
const router = express.Router();

// PÁGINAS PRINCIPAIS

router.get('/', (req, res) => {
    res.redirect('/homepage');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/homepage', (req, res) => {
    res.render('homepage');
});

// ADMIN

// router.get('/admin/cadastro', (req, res) => {
//     // res.render('');
// });

// ALUNOS

router.get('/alunos/lista', (req, res) => {
    // res.render('');
});

router.get('/alunos/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/alunos/atualizar', (req, res) => {
    // res.render('');
});

module.exports = router;
