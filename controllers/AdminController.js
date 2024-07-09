const AdminModel = require('../models/AdminModel');
const bcrypt = require('bcrypt');

class AdminController extends AdminModel {
    static async accessAccount(username_email, password) {
        const admin = await super.getAdminByUsernameOrEmail(username_email);
        let result = false;

        if (admin) result = await bcrypt.compare(password, admin.senha);

        return result;
    }

    static async registerAccount(req, res) {
        let {username, email, password} = req.body;

        password = await bcrypt.hash(password, 15);

        try {
            await super.registerAccount(username, email, password);
            res.status(201).end();
        }
        catch(err) {
            console.error(err);

            res.status(500).json({
                msg: 'Erro Interno no Servidor.'
            });
        }

    }
}

module.exports = AdminController;