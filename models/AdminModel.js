const db = require('./DB');

class Admin {
    constructor() {}

    static async accessAcount(username_email, password) {
        const [rows] = await db.execute(
            'SELECT * FROM ADMIN WHERE LOWER(usuario) = LOWER(?) or email = ?',
            [username_email, username_email]
        );

        // por algum motivo o banco de dados não está diferenciando
        // maiúsculo do minúsculo então tive que verificar a senha aqui ao invés do select
        if (rows[0].senha === password) {
            return rows[0];
        }
        return undefined;
    }
}

module.exports = Admin;
