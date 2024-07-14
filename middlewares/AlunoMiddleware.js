const AlunoController = require('../controllers/AlunoController');
const validator = require('validator');

class AlunoMiddleware {
    static async verifyAlunoId(req, res, next) {
        const { id } = req.params;
        const result = await AlunoController.getAlunoById(id);

        if (result.length === 0) {
            res.status(400).json({
                msg: 'Número de indentificação de aluno inexistente (id não existe/não encontrado)!'
            });
            return;
        }

        next();
    }

    static async verifyInputs(req, res, next) {
        const { body } = req;
        const msg = {};

        if (!body.name.trim()) {
            msg.name = 'Nome é obrigatório e não pode ser vazio'
        }
        
        if (!body.email.trim()) {
            msg.email = 'E-mail é obrigatório e não pode ser vazio'
        }
        else if (!validator.isEmail(email)) {
            msg.email = 'E-mail inválido';
        }

        if (!body.cpf.trim()) {
            msg.cpf = 'CPF é obrigatório e não pode ser vazio'
        }
        else if (body.cpf.length !== 11) {
            msg.cpf = 'CPF deve conter 11 números'
        }
        else if (isNaN(body.cpf)) {
            msg.cpf = 'CPF aceita apenas números, nada de letras ou pontuação (a, b, ., -)'
        }
        
        const today = new Date();
        const birthdate = new Date(body.birthdate);

        if (birthdate >= today) {
            msg.birthdate = 'Data de nascimento é obrigatório e não pode ser vazio'
        }
        else if (birthdate >= today) {
            msg.birthdate = 'Data de nascimento não pode ser igual ou superior a data de hoje'
        }
        else if (!validator.isDate(birthdate)) {
            msg.birthdate = 'Data de nascimento inválida'
        }

        if (!body.telefone.trim()) {
            msg.telefone = 'Telefone é obrigatório e não pode ser vazio'
        }
        else if (body.telefone.length !== 11) {
            msg.telefone = 'Telefone deve conter 11 números'
        }
        else if (isNaN(body.telefone)) {
            msg.telefone = 'Telefone aceita apenas números, nada de letras ou pontuação (a, b, ., -)'
        }

        // Verifica se existe alguma mensagem de erro

        if (Object.values(msg).length !== 0) {
            return res.status(400).json({ msg });
        }

        next();
    }

    static async verifyNotas(req, res, next) {
    }
}

module.exports = AlunoMiddleware;
 