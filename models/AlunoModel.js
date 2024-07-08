const db = require('./DB');

class Aluno {
    static async register(obj) {
        return await db.connection.execute(
            'INSERT INTO ALUNO' +
            '(usuario_admin, cpf, nome_comp, telefone, email, sexo, data_nasc, observacao, pcd, rua, numero, bairro, cidade, complemento, cep)' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                obj.user_admin, obj.cpf, obj.nome, obj.telefone,
                obj.email, obj.sexo, obj.nasc, obj.observacao,
                obj.pcd, obj.rua, obj.numero, obj.bairro,
                obj.cidade, obj.complemento, obj.cep
            ]
        );
    }

    /* USAR VIEWS NAS PESQUISAS (SELECT) */

    static async searchByName(name) {
        const [results] = await db.connection.execute(
            "SELECT DISTINCT a.id_aluno, a.nome_comp, adt.cod_turma, a.telefone " +
            "FROM ALUNO AS a, ALUNO_DISCIPLINA_TURMA AS adt " +
            "WHERE a.id_aluno = adt.id_aluno AND a.nome_comp LIKE ? " +
            "ORDER BY a.nome_comp;",
            [`%${name}%`]
        );
        return results;
    }

    static async searchById(id) {
        const [rows] = await db.connection.execute("SELECT * FROM ALUNO WHERE id_aluno = ?", [id]);
        return rows;
    }

    static async deleteById(id) {
        return await db.connection.execute('DELETE FROM ALUNO WHERE id_aluno = ?', [id]);
    }

    static async editById(obj) {}

    static async getAvaliacoes() {}

    static async editAvalicao() {}

    static async getFrequencias() {}

    static async editFrequencia() {}
}

module.exports = Aluno;
