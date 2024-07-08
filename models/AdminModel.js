const db = require('./DB');

class Admin {
    constructor() {}

    static async accessAccount(username_email, password) {
        const [rows] = await db.connection.execute(
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

    static async registerAccount(username, email, password) {
        const [rows] = await db.connection.execute(
            'INSERT INTO ADMIN VALUES (?, ?, ?)',
            [username, email, password]
        );
        return rows;
    }
}

module.exports = Admin;
