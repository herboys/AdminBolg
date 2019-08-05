var express = require('express');
var router = express.Router();
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
    queryname:'SELECT * FROM user where userid=',
    increase:'INSERT INTO user (userid,username,userpassword) VALUES(?,?,?)'
}
router.all('*',  (req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
router.get('/home',async(req,res,next)=>{

    connection.connect()
    let param=req.query||req.params

    let list =new Promise((resolve,reject)=>{
        connection.query(sql.queryname+param.username,(err,result)=>{
            if (err){
                console.log(err)
            }
            if(result){
                result = {
                    code: 200,
                    msg: '已经注册'
                }
                res.send(result);
            }else {
                // 添加数据
                return new Promise((resolve,reject)=>{
                    let addSqlincrease = [param.userid,param.username,param.userpassword];
                    connection.query(sql.increase,addSqlincrease,(err,result)=>{
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
                        connection.end();
                    })
                })

            }

        })
    })

});
// connection.end();
console.log( 'server listening to 3000, http://localhost:3000' )
module.exports = router;

//Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
// res.header('Access-Control-Allow-Headers', 'Content-Type');
// res.header('Access-Control-Allow-Methods', '*');
// res.header('Content-Type', 'application/json;charset=utf-8');
