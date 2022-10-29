const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers');
const {isLoggedIn} = require('../lib/out');
const {isNotLoggedIn} = require('../lib/out');
const pool = require('../database');
const {roladmin,roldoc,roluser} = require('../lib/roles')
let ecg 
let ppg
let resp
let spo2
let puls
let rp
//*********Signin***********+//
router.get('/signin',isNotLoggedIn, (req,res)=>{

    res.render('auth/signin')

});

router.post('/signin', passport.authenticate('local.signin',{

    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash:true


}));


router.get('/profile',isLoggedIn, roldoc(["doctor"]) ,(req,res)=>{

    res.render('profile')
});


router.get("/logout",isLoggedIn, (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
});


router.get('/registro',isLoggedIn,roldoc(["doctor"]) ,(req,res)=>{

    res.render('auth/registro')
});



router.post('/registro2', async (req,res)=>{

              
              ecg = JSON.stringify(req.body[0])
              ppg = JSON.stringify(req.body[1])
              resp = JSON.stringify(req.body[2])
             
            
             /*fs.writeFileSync('src/JSON/data.json',JSON.stringify({data},null,2))*/
             res.sendStatus(200)
 

})


router.post('/registro3', async (req,res)=>{

              
    spo2 = JSON.stringify(req.body[0])
    puls = JSON.stringify(req.body[1])
    rp = JSON.stringify(req.body[2])
   
  
   /*fs.writeFileSync('src/JSON/data.json',JSON.stringify({data},null,2))*/
   res.sendStatus(200)


})

router.post('/registro', isLoggedIn, async (req,res)=>{

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
       pr,
       ecg,
       ppg,
       resp,
       spo2,
       puls,
       rp
  }; 

  await pool.query('INSERT INTO pacientes set ?', [newLink]);
  req.flash('Success', 'Paciente saved Successfully')
  res.redirect('/profile');
})

router.get('/admin/ultrasecretsadmins', (req,res)=>{

    res.render('auth/secretadmins')

});

router.post('/admins', passport.authenticate('local.admins',{

    successRedirect: '/admin/adminregistsecret',
    failureRedirect: '/admin/ultrasecretsadmins',
    failureFlash:true


}));


router.get('/admin/adminregistsecret', isLoggedIn,roladmin(["admin"]) ,(req,res)=>{

    res.render('auth/adminregist')
});

router.post('/adminregistsecret', passport.authenticate('local.adminR',{

    successRedirect: '/logout',
    failureRedirect: '/admin/adminregistsecret',
    failureFlash:true


}));

module.exports = router;
