const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://database/docker-compose');

const userSchema = new mongoose.Schema({
    nick: String,
    name: String,
    dni: String,
    birthdate: Date,
    rol:{type:Number, min:0,max:4},
    genre:{type:Number, min:0,max:1},
    password: String
});

const User = mongoose.model('User', userSchema);

router.get('/User', function(req, res, next) {
    User.find({},function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

router.get('/User/:nick', function(req, res) {
    User.find({ nick: req.params.nick}, function(err, user){
        if (err){
            res.status(500).send(error);
        }
        res.status(200).json(user);
    });
});


router.post('/User', function(req, res) {
    let PostUser=new User({
        name: req.body.name,
        nick: req.body.nick,
        dni: req.body.dni,
        birthdate: req.body.birthdate,
        rol: req.body.rol,
        genre: req.body.genre,
        password: req.body.password
    });

    User.findOne({ nick: req.body.nick}, function(err, user){
        if(user===null){
            PostUser.save(err =>{
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(200).json({
                    message: 'User created succesfully'
                })
                console.log("Terminado");
            });
        }

        else{
            console.log("Nick ya existente");
        }
    });
});

router.put('/User/:nick', function(req, res) {
    let updObj= new User({
        name: req.body.name,
        dni: req.body.dni,
        password: req.body.password
    });

    User.findOne({nick:req.params.nick}, (err,user) => {
        if(err || user===null)
            res.status(500).send({message: "Error al encontrar el usuario"});
        else
            user.update(updObj,(err) => {
                if(err)
                    res.status(500).send({message: "Error al actualizar el usuario"});
                
                res.json({message: "Usuario actualizado"});
            });  
    });
});


router.delete('/User/:nick', function(req, res) {
    User.findOne({nick: req.body.nick}, (err, user) => {
        if(err)
            res.status(500).send({message:"Error al encontrar el usuario"});
        else
            user.remove((err)=>{
                if(err)
                    res.status(500).send({message:"Error al borrar el usuario"});

                res.status(200).send({message:"El usuario ha sido eliminado de la base de datos"});
            }); 
    });
});

module.exports = router;
