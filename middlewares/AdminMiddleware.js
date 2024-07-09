const AdminController = require('../controllers/AdminController');

class AdminMiddleware {
    static async login(req, res, _next) {
        const {username_email, password} = req.body;

        if (username_email && password) {
            if (await AdminController.accessAccount(username_email, password)) {
                const admin = await AdminController.getAdminByUsernameOrEmail(username_email);
                req.session.login = {
                    username: admin.usuario,
                    email: admin.email
                };
                res.status(200).end();
                return;
            }
        }
        res.status(400).json({ msg: '* Usuário, e-mail ou senha inválidos!' });
    }

    static logout(req, res, _next) {
        if (!req.session?.login) return;

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

    static loginAuth(req, res, next) {
        if (req.session?.login) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = AdminMiddleware;
