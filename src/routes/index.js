const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/out');
const {isNotLoggedIn} = require('../lib/out');
const helpers = require('../lib/helpers');
const pool = require('../database');
const passport = require('passport');

router.get('/', (req,res)=>{

    res.render('index')
    
})


router.get('/Settings',isLoggedIn, (req,res)=>{

    res.render('auth/settingsDoc')

});


router.post('/Settings', isLoggedIn, async (req,res) => {
    const id  = req.user.id;
    let {useract,newuser,passact,passnew} = req.body;
    const userd =  await pool.query('SELECT usern,password FROM doctors WHERE id =?', [id])
   
   
    if( userd[0].usern == useract){


        const validpassword = await helpers.matchPassword(passact, req.user.password);
        
        if(validpassword){

            passnew = await helpers.encrypts(passnew);
            await pool.query(`UPDATE doctors set usern = "${newuser}", password = "${passnew}" WHERE id =?`, [id])
            req.flash('Success', `Datos actualizados correctamente`)
            res.redirect("/Settings")
        }else{
            req.flash('message','la contraseña ingresada actual no coincide')
            res.redirect("/Settings")
        }
    }else{
        req.flash('message','El usuario actual ingresado no coincide')
        res.redirect("/Settings")
    }


})


module.exports = router;