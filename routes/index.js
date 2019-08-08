var express = require('express');
var router = express.Router();
var connections=require('../config/MySql')
var mysql = require('mysql');

// 链接数据库
var connection=mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bolg'
})

// 数据查询语法
const sql={
    query:'SELECT * FROM user',
    queryname:'SELECT * FROM user where username=',
    userpassword:'SELECT * FROM user where userpassword=',
    increase:'INSERT INTO user (username,userpassword) VALUES(?,?)'
}

// 跨域设置
router.all('*',  (req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// 注册账号
router.get('/BolgRegister',async(req,res,next)=>{
    console.log(req.query)
    let param=req.query||req.params
    let list =new Promise((resolve,reject)=>{
        connection.query(sql.queryname+"'"+param.username+"'",(err,result)=>{
            if (err){
                console.log(err,"null")
            }
            if(result.length>0){
                result = {
                    code: 200,
                    msg: '您已经注册'
                }
                res.send(result);
            }
            else {
                return new Promise((resolve,reject)=>{
                    let addSqlincrease = [param.username,param.userpassword];
                    connection.query(sql.increase,addSqlincrease,(err,result)=>{
                        console.log(err,"err")
                        if(result){
                            console.log(result)
                            result = {
                                code: 200,
                                msg: '注册成功',
                            };
                        }else{
                            result = {
                                code: 200,
                                msg: '注册失败'
                            }
                        }
                        res.send(result);
                        // connection.end();
                    })
                })

            }

        })
    })

});

// 登录账号
router.post('/BolgLogin', async (req, res, next) => {
    let param = req.body;
    connection.query(sql.queryname + "'" + param.username + "'", (err, result) => {
        if (result.length === 0) {
            result = {
                code: 200,
                msg: '账号不存在'
            }
            res.send(result)
        } else {
            connection.query(sql.userpassword + "'" + param.userpassword + "'" + "and+username=" + "'" + param.username + "'", (err, result) => {
                if (result.length === 0) {
                    result = {
                        code: 200,
                        msg: '密码错误，请从新登录'
                    }
                } else {
                    console.log(result)
                    result = {
                        code: 200,
                        msg: '登录成功',
                        list: [{uid: result[0].uid}, {username: result[0].username}]
                    }
                }
                res.send(result)
            })
        }
    })
})

// 打印当前项目地址
console.log( 'server listening to 3000, http://localhost:3000')


module.exports = router
