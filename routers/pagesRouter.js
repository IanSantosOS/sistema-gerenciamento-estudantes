const express = require('express');
const router = express.Router();

const AlunoController = require('../controllers/AlunoController');
const AdminMiddleware = require('../middlewares/AdminMiddleware');

// --------------- PÁGINAS PRINCIPAIS ---------------

router.get('/', AdminMiddleware.loginAuth, (req, res) => {
    res.redirect('/homepage');
});

router.get('/login/', (req, res) => {
    if (req.session?.login) {
        res.redirect('/homepage');
    } else {
        res.render('login');
    }
});

router.get('/homepage/', AdminMiddleware.loginAuth, (req, res) => {
    res.render('homepage', req.session.login);
});

// --------------------- ADMIN ---------------------

router.get('/admin/cadastro', AdminMiddleware.loginAuth, (req, res) => {
    res.render('cadastro-admin', req.session.login);
});

// --------------------- ALUNOS ---------------------

router.get('/alunos/lista/', AdminMiddleware.loginAuth, (req, res) => {
    const {page} = req.query;

    if (parseInt(page) < 1 || isNaN(page)) {
        res.redirect('/alunos/lista?page=1');
    } else {
        res.render('lista-alunos', req.session.login);
    }
});

router.get('/alunos/cadastro/', AdminMiddleware.loginAuth, (req, res) => {
    const params = {
        ...req.session.login,
        titulo: 'cadastrar aluno',
        script: '/js/cadastro-aluno.js'
    }
    res.render('cadastro-atualizar', params);
});

router.get('/alunos/atualizar/', AdminMiddleware.loginAuth, async (req, res) => {
    let { id } = req.query;
    id = parseInt(id);

    const params = {
        ...req.session.login,
        titulo: 'atualizar aluno',
        script: '/js/atualizar-aluno.js'
    }

    if (id !== NaN && id > 0) {
        const verifyId = (await AlunoController.getAlunoById(id))[0];
        if (verifyId) {
            res.render('cadastro-atualizar', params);
            return;
        }
    }
    res.render('erro', {
        contato: true,
        titulo: 'Aluno não encontrado',
        msg: 'Não foi encontrado nenhum aluno com esse id para ser atualizado. Certifique-se de que o id se encontra na lista de alunos'
    });
});

router.get('/alunos/avaliacao/', AdminMiddleware.loginAuth, (req, res) => {
    const {page} = req.query;
    
    if (parseInt(page) < 1 || isNaN(page)) {
        res.redirect('/alunos/avaliacao?page=1');
    } else {
        res.render('lista-avaliacoes', req.session.login);
    }
});

module.exports = router;
