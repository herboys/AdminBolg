var express = require('express');
var router = express.Router();
 var connections=require('../config/MySql')
var mysql = require('mysql');

var connection=mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bolg'
})
const sql={
    query:'SELECT * FROM user',
    queryname:'SELECT * FROM user where username=',
    increase:'INSERT INTO user (username,userpassword) VALUES(?,?)'
}

router.all('*',  (req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
router.get('/home',async(req,res,next)=>{
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
                    msg: '已经注册1'
                }
                res.send(result);
            }
            else {
                return new Promise((resolve,reject)=>{
                    let addSqlincrease = [param.username,param.userpassword];
                    connection.query(sql.increase,addSqlincrease,(err,result)=>{
                        console.log(err,"err")
                        if(result){
                            result = {
                                code: 200,
                                msg: '添加成功'
                            };
                        }else{
                            result = {
                                code: 200,
                                msg: '添加失败'
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
// connection.end();
console.log( 'server listening to 3000, http://localhost:3000' )
module.exports = router;
