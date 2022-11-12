const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers');
const {isLoggedIn} = require('../lib/out');
const {isNotLoggedIn} = require('../lib/out');
const pool = require('../database');
const {roladmin,roldoc,roluser} = require('../lib/roles')
const emaileruser = require('../lib/emaileruser');
let ecg 
let ppg
let resp
let ifl
let sound
let spo2
let puls
let rp
let hr
let sh
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
              ifl = JSON.stringify(req.body[3])
              sound = JSON.stringify(req.body[4])
            
             /*fs.writeFileSync('src/JSON/data.json',JSON.stringify({data},null,2))*/
             res.sendStatus(200)
 

})


router.post('/registro3', async (req,res)=>{

              
    spo2 = JSON.stringify(req.body[0])
    puls = JSON.stringify(req.body[1])
    rp = JSON.stringify(req.body[2])
    hr = JSON.stringify(req.body[3])
  
   /*fs.writeFileSync('src/JSON/data.json',JSON.stringify({data},null,2))*/
   res.sendStatus(200)


})

router.post('/registro', isLoggedIn, async (req,res)=>{

  const {name, lastname,ident,gender,status,age,bt,date,oc,ec,phone,address,pr,emailpacient } = req.body;
  

  const rows = await pool.query('SELECT name FROM database_medical.pacientes WHERE ident =?', [ident])
  const rows2 = await pool.query('SELECT name FROM database_medical.pacientes WHERE emailpacient =?', [emailpacient])

   if( rows.length > 0){

    req.flash('message','El usuario ya se encuentra registrado')
    res.redirect("/registro")

   } else if(rows2.length > 0){

    req.flash('message','El correo electrnocio ya se encuentra registrado')
    res.redirect("/registro")


   }else{

       if (status == "indicator healt"){
           
           sh = 1
       }else if(status == "indicator aler"){
           sh = 2
       }else {
           sh = 3
       }

    let usern = name;
    let passn = ident;
  
    const newLink = {
        name,
        lastname,
        ident,
        gender,
        status,
        sh,
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
        ifl,
        sound,
        spo2,
        puls,
        rp,
        hr,
        usern,
        passn,
        emailpacient
   }; 

   
   const newuser = {
    name,
    usern,
    passn,
    emailpacient
 };

     newLink.passn = await helpers.encrypts(passn);
  
 
   await pool.query('INSERT INTO pacientes set ?', [newLink]);
   emaileruser.sendMail(newuser)
   req.flash('Success', 'Paciente saved Successfully')
   res.redirect('/profile');

      

   }
  

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
