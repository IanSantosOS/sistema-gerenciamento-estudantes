require('dotenv').config({ path: './env.database' });
const mysql = require('mysql2');

class DB {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.BCDD_HOST,
            user: process.env.BCDD_USER,
            password: process.env.BCDD_PASSWORD,
            database: process.env.BCDD_DATABASE
        });
    }
    
    connect() {
        this.connection.end((err) => {
            if (err) {
                console.error('Erro ao encerrar conexão com o banco de dados: ' + err.stack);
                return;
            }
            console.log('Conexão bem-sucedida');
        });
        return this.connection
    }

    end() {
        this.connection((err) => {
            if (err) {
                console.error('Erro ao encerrar conexão com o banco de dados: ' + err.stack);
            }
            console.log('Conexão encerrada');
        });
    }
}

module.exports = DB;
