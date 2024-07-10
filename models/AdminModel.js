const db = require('./DB');

class Admin {
    static async getAdminByUsernameOrEmail(username_email) {
        const [rows] = await db.connection.execute(
            'SELECT * FROM ADMIN WHERE LOWER(usuario) = LOWER(?) or LOWER(email) = LOWER(?)',
            [username_email, username_email]
        );

        return rows[0];
    }

    static async registerAccount(username, email, password) {
        const [rows] = await db.connection.execute(
            'INSERT INTO ADMIN VALUES (?, ?, ?)',
            [username, email, password]
        );
        return rows;
    }

    static async hasUsername(username) {
        const [rows] = await db.connection.execute(
            'SELECT usuario FROM ADMIN WHERE usuario = ?',
            [username]
        );
        return rows[0];
    }

    static async hasEmail(email) {
        const [rows] = await db.connection.execute(
            'SELECT email FROM ADMIN WHERE email = ?',
            [email]
        );
        return rows[0];
    }
}

module.exports = Admin;
