const AdminController = require('../controllers/AdminController');
const validator = require('validator');

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

    static async verifyRegister(req, res, next) {
        const {username, email, password, password_confirm} = req.body;

        const msg = {};

        if (!username.trim()) {
            msg.username = 'Nome de usuário é obrigatório e não pode ser vazio';
        }
        else if (await AdminController.hasUsername(username)) {
            msg.username = 'Nome de usuário já existe';
        }
        else if (username !== username.replace(/\s+/g, '')) {
            msg.username = 'Nome de usuário não deve conter espaço';
        }
        else if (username.includes('@') || username.includes('?') || username.includes('!')) {
            msg.username = 'Nome de usuário não deve conter @, ? ou !';
        }
        else if (username !== username.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
            msg.username = 'Nome de usuário não deve conter pontuação (á, ã, ü, etc...)';
        }

        if (!email.trim()) {
            msg.email = 'E-mail é obrigatório e não pode ser vazio';
        }
        else if (!validator.isEmail(email)) {
            msg.email = 'E-mail inválido';
        }
        else if (await AdminController.hasEmail(email)) {
            msg.email = 'E-mail já está em uso';
        }

        if (!password.trim()) {
            msg.password = 'Senha é obrigatória e não pode ser vazia';
        }
        else if (password.length < 4) {
            msg.password = 'A senha tem que ter no mínimo 4 dígitos';
        }

        if (!password_confirm.trim()) {
            msg.password_confirm = 'A confirmação da senha é obrigatória e não pode ser vazia';
        }
        else if (password_confirm !== password) {
            msg.password_confirm = 'As senhas não coincidem (são diferentes)';
        }

        // Verifica se existe alguma mensagem de erro

        if (Object.values(msg).length !== 0) {
            return res.status(400).json({ msg });
        }

        next();
    }
}

module.exports = AdminMiddleware;
