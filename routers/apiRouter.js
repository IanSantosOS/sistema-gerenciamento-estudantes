const express = require('express');
const router = express.Router();

const AlunoMiddleware = require('../middlewares/AlunoMiddleware');
const AlunoController = require('../controllers/AlunoController');

const AdminMiddleware = require('../middlewares/AdminMiddleware');
const AdminController = require('../controllers/AdminController');

// --------------------- ADMIN ---------------------

router.post('/login', (req, res, next) => {
    if (!req.session?.login) {
        return next();
    }
    res.status(400).end();
}, AdminMiddleware.login);

router.post('/logout', AdminMiddleware.loginAuth, AdminMiddleware.logout);

router.post('/admin/cadastro', AdminMiddleware.verifyRegister, AdminController.registerAccount);

// --------------------- ALUNOS ---------------------

router.get('/alunos/lista', AdminMiddleware.loginAuth, AlunoController.searchByName);

router.post('/alunos/cadastro', AdminMiddleware.loginAuth, (req, res) => { });

router.put('/alunos/atualizar/:id', AdminMiddleware.loginAuth, (req, res) => { });

router.delete('/alunos/delete/:id', AdminMiddleware.loginAuth, AlunoMiddleware.verifyAlunoId, AlunoController.deleteById);

router.get('/alunos/avaliacao', AdminMiddleware.loginAuth, (req, res) => { });

router.get('/alunos/frequencia', AdminMiddleware.loginAuth, (req, res) => { });

module.exports = router;
