const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/homepage');
});

router.get('/homepage', (req, res) => {
    res.render('homepage');
});

module.exports = router;