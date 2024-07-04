const AlunoModel = require('../models/AlunoModel');

// Função do Controller:
//   intermediário na comunicação do servidor com o banco de dados
//   e responsável por tratar os erros (try, catch)

class AlunoController extends AlunoModel {
    static async getAll() {
        const result = super.getAll();
    }

    static async searchByName(name) {
        const result = super.searchByName(name);
    }

    static async deleteById(id) {
        const result = super.deleteById(id);
    }

    static async editById(obj) {
        const result = super.editById(obj);
    }
}

module.exports = AlunoController;
