const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//models
const User = require('../models/User');
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) =>{
   const {username,password} = req.body;

    bcrypt.hash(password, 10).then((hash) =>{
        const  user = new User({
            username,
            password: hash
        });

        const promise = user.save();
        promise.then((data)=>{
            res.json(data)
        }).catch((err)=>{
            res.json(err);
        });
    });
});

router.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    User.findOne({              // Veri tabanında giriş yapılırken kullanılan username aranıyor
        username
    }, (err, user) => {
        if (err)            // hata varsa hata basar
            throw err;

        if(!user){     // user bulamazsa alttaki mesajı basar
            res.json({
                status: false,
                message: 'Authentication failed, user not found.'
            });
        }else{
            bcrypt.compare(password, user.password).then((result) => {
                if (!result){
                    res.json({
                        status: false, // veri tabanına kaydedilmiş şifre çözülür girilen şifreyle eşleşmezse assağı daki mesajı basar
                        message: 'Authentication failed, wrong password.'
                    });
                }else{
                    const payload = {
                        username
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 720 // 12 saat
                    });

                    res.json({
                        status: true,
                        token
                    })
                }
            });
        }
    });

});


module.exports = router;
