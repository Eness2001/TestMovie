const jwt = require('jsonwebtoken');
const {decode} = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  const token = req.headers['x-acces-token'] || req.body.token || req.query.token

    if (token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                res.json({
                    status:false,
                    message:'Failed to authenticate token.'
                })
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        res.json({
           status:false,
            message:'No token provided.'
        });
    }
};