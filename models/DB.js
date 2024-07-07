require('dotenv').config({ path: './.env.database' });
const mysql = require('mysql2/promise');

class DB {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            console.log('Conectando ao banco de dados...');
            this.connection = await mysql.createConnection({
                host: process.env.BCDD_HOST,
                user: process.env.BCDD_USER,
                password: process.env.BCDD_PASSWORD,
                database: process.env.BCDD_DATABASE
            });
            console.log('Conexão bem-sucedida\n');
        }
        catch (err) {
            console.error('Erro ao conectar com o banco de dados: ' + err.stack);
        }

        return this.connection
    }

    async end() {
        try {
            console.log('Encerrando conexão com o banco de dados...');
            await this.connection.end();
            console.log('Conexão encerrada\n');
        } catch (err) {
            console.error('Erro ao encerrar conexão com o banco de dados: ' + err.stack);
        }
    }
}

module.exports = new DB();
