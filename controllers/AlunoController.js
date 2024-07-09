const AlunoModel = require('../models/AlunoModel');

// Função do Controller:
//   intermediário na comunicação do servidor com o banco de dados
//   e responsável por tratar os erros (try, catch)

class AlunoController extends AlunoModel {
    static async searchByName(req, res) {
        let { name, offset, limit } = req.query;
        if (!name) name = "";

        if (offset) offset = Number(offset);
        if (limit) limit = Number(limit);

        let result = await super.searchByName(name);
        if (limit >= 1 && offset >= 0) {
            result = result.slice(offset, offset + limit);
        }

        res.status(200).json(result);
    }

    static async deleteById(req, res) {
        const { id } = req.params;
        try {
            const [rows] = await super.deleteById(parseInt(id));
            res.status(200).end();
        } catch(err) {
            console.error(err)
            res.status(500).end();
        }
    }

    static async editById(req, res) {
        const result = super.editById(obj);
    }
}

module.exports = AlunoController;
