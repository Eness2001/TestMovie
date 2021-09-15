
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://enes:1234enes1234@movie-api.mtqwo.mongodb.net/Movie-api?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>
        console.log("Connect db"));

mongoose.Promise = global.Promise;

