const AlunoController = require('../controllers/AlunoController');

class AlunoMiddleware {
    static async verifyAlunoId(req, res, next) {
        const { id } = req.params;
        const result = await AlunoController.searchById(id);

        if (result.length === 0) {
            res.status(400).json({
                msg: 'Número de indentificação de aluno inexistente (id não existe/não encontrado)!'
            });
            return;
        }

        next();
    }
}

module.exports = AlunoMiddleware;
