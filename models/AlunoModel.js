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

    static async getAlunoById(id) {
        const [rows] = await db.connection.execute(
            "SELECT usuario_admin, cpf, nome_comp, telefone, email, sexo, data_nasc, observacao, pcd, rua, numero, bairro, cidade, complemento, cep " +
            "FROM ALUNO WHERE id_aluno = ?",
            [id]
        );
        return rows;
    }

    static async deleteById(id) {
        return await db.connection.execute('DELETE FROM ALUNO WHERE id_aluno = ?', [id]);
    }

    static async editById(obj) {}

    static async getAvaliacoes(obj) {
        const [rows] = db.connection.execute(
            'SELECT adt.cod_turma as turma, a.nome_comp as nome, av1.nota as an1, av2.nota as n2, av3.nota as n3, av4.nota as n4, disc.nome as disc ' +
            'FROM aluno_disciplina_turma as adt, aluno as a, discipina as disc ' +
            'aluno_disciplina_avaliacao adv1, avaliacao av1 ' +
            'aluno_disciplina_avaliacao adv2, avaliacao av2 ' +
            'aluno_disciplina_avaliacao adv3, avaliacao av3 ' +
            'aluno_disciplina_avaliacao adv4, avaliacao av4 ' +
            'WHERE a.id_aluno = adt.id_aluno AND disc.cod_disc = adt.cod_disc AND ' +
            'a.id_aluno = adv1.id_aluno AND a.id_aluno = adv2.id_aluno AND ' +
            'a.id_aluno = adv3.id_aluno AND a.id_aluno = adv4.id_aluno AND ' +
            'adt.cod_disc = adv1.cod_disc AND adt.cod_disc = adv2.cod_disc AND ' +
            'adt.cod_disc = adv3.cod_disc AND adt.cod_disc = adv4.cod_disc AND ' +
            'adv1.id_aval = av1.id_aval AND adv2.id_aval = av2.id_aval AND ' +
            'adv3.id_aval = av3.id_aval AND adv4.id_aval = av4.id_aval AND'
        )
        return rows;
    }

    static async editAvalicao(obj) {}
}

module.exports = Aluno;
