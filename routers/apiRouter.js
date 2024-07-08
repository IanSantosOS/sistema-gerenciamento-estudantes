const express = require('express');
const router = express.Router();

const AlunoController = require('../controllers/AlunoController');

const AdminMiddleware = require('../middlewares/AdminMiddleware');
const AlunoMiddleware = require('../middlewares/AlunoMiddleware');

// --------------------- ADMIN ---------------------

router.post('/login', AdminMiddleware.login);

router.post('/logout', AdminMiddleware.logout);

// router.get('/admin/cadastro', (req, res) => {
//     // res.render('');
// });

// --------------------- ALUNOS ---------------------
//, AlunoMiddleware.verificarQueryNomeVazio

router.get('/alunos/lista', AlunoController.searchByName);

router.post('/alunos/cadastro', (req, res) => { });

router.put('/alunos/atualizar/:id', (req, res) => { });

router.delete('/alunos/delete/:id', AlunoMiddleware.verifyAlunoId, AlunoController.deleteById);

router.get('/alunos/avaliacao', (req, res) => { });

router.get('/alunos/frequencia', (req, res) => { });

module.exports = router;
