const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers');
const {isLoggedIn} = require('../lib/out');
const {isNotLoggedIn} = require('../lib/out');
const pool = require('../database');

//*********Signin***********+//
router.get('/signin',isNotLoggedIn, (req,res)=>{

    res.render('auth/signin')

});

router.post('/signin', passport.authenticate('local.signin',{

    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash:true


}));


router.get('/profile',isLoggedIn,(req,res)=>{

    res.render('profile')
});


router.get("/logout",isLoggedIn, (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/signin");
    });
});


router.get('/registro',isLoggedIn,(req,res)=>{

    res.render('auth/registro')
});

router.post('/registro', isLoggedIn, async (req,res)=>{

      console.log(req.body);
      const {name, lastname,ident,gender,age,bt,date,oc,ec,phone,address,pr } = req.body;
      const newLink = {
           name,
           lastname,
           ident,
           gender,
           age,
           bt,
           date,
           oc,
           ec,
           phone,
           address,
           pr
      }; 
      console.log(newLink)
      await pool.query('INSERT INTO pacientes set ?', [newLink]);
      req.flash('Success', 'Paciente saved Successfully')
      res.redirect('/profile');
})





module.exports = router;
