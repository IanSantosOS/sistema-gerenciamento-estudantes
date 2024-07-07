const express = require('express');
const router = express.Router();

const AlunoController = require('../controllers/AlunoController');

// --------------- PÁGINAS PRINCIPAIS ---------------

router.post('/login', (req, res) => {
    res.status(400).send({ msg: '* Usuário, e-mail ou senha inválidos!' });
    res.end()
});

router.post('/logout', (req, res) => {
    if (!req.session?.username) return;

    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.status(500).render('erro', {
                contato: true,
                titulo: '500: Erro interno do servidor',
                msg: 'Aconteceu um erro interno dentro do nosso servidor ao tentar sair da conta.'
            });
        } else {
            res.redirect('/login');
        }
    });
});

// --------------------- ADMIN ---------------------

// router.get('/admin/cadastro', (req, res) => {
//     // res.render('');
// });

// --------------------- ALUNOS ---------------------

router.get('/alunos/lista', async (req, res) => {
    const { nome } = req.query;
    return await AlunoController.searchByName(nome)
});

router.post('/alunos/cadastro', (req, res) => { });

router.put('/alunos/atualizar/:id', (req, res) => { });

router.delete('/alunos/delete/:id', (req, res) => { });

router.get('/alunos/avaliacao', (req, res) => { });

router.get('/alunos/frequencia', (req, res) => { });

module.exports = router;
