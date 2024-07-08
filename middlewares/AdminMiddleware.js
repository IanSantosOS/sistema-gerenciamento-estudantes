// const AdminController = require('../controllers/AdminController');

class AdminMiddleware {
    static login(req, res, _next) {
        res.status(400).send({ msg: '* Usuário, e-mail ou senha inválidos!' });
    }

    static logout(req, res, _next) {
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
    }
}

module.exports = AdminMiddleware;
