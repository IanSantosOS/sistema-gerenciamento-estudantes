const express = require('express');
const router = express.Router();

// PÁGINAS PRINCIPAIS

router.get('/', (req, res) => {});

router.get('/login', (req, res) => {});

router.get('/homepage', (req, res) => {});

// ADMIN

// router.get('/admin/cadastro', (req, res) => {
//     // res.render('');
// });

// ALUNOS

router.get('/alunos/lista', (req, res) => {});

router.get('/alunos/cadastro', (req, res) => {});

router.get('/alunos/atualizar', (req, res) => {});

module.exports = router;
