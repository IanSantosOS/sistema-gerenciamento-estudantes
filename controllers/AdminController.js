const AdminModel = require('../models/AdminModel');
const bcrypt = require('bcrypt');

class AdminController extends AdminModel {
    static async registerAccount(req, res) {
        return
    }
}

module.exports = AdminController;