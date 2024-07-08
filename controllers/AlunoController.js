const AlunoModel = require('../models/AlunoModel');

// Função do Controller:
//   intermediário na comunicação do servidor com o banco de dados
//   e responsável por tratar os erros (try, catch)

class AlunoController extends AlunoModel {
    static async searchByName(req, res) {
        let { name, offset, limit } = req.query;
        if (!name) name = "";

        let result = await super.searchByName(name);
        if (limit >= 1 && offset >= 0) {
            result = result.slice(offset, offset + limit + 1);
        }

        res.status(200).json(result);
    }

    static async deleteById(req, res) {
        const result = super.deleteById(id);
    }

    static async editById(req, res) {
        const result = super.editById(obj);
    }
}

module.exports = AlunoController;
