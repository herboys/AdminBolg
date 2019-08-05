const db = require('../config/db')
let home = () => {
    return new  Promise((resolve, reject) => {
        db.query('select * from user', (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}//显示全部 （select*）

exports.home = home
//在routes目录下index.js中
var express = require('express');
var router = express.Router();

router.get('/home', async (req, res, next) => {
    console.log(req.session.user,"ads")
    try {
        console.log(req.session.user)
        let result = await require('../services/users').show();
        res.send(result);
    } catch (e) {
    }
    res.send(e);
})
module.exports = router;
