const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers');
const {isLoggedIn} = require('../lib/out');
const {isNotLoggedIn} = require('../lib/out');
const pool = require('../database');
const { readFile } = require('fs');
const spawn = require('child_process').spawn
const FileReader = require('filereader')

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

      const {name, lastname,ident,gender,age,bt,date,oc,ec,phone,address,pr,ecg } = req.body;
      let arg1 = '/home/alexander/Escritorio/records/a01m.mat'
      console.log(ecg)

      

    const pythonProcess = spawn('python3', ['src/python/index.py', `${ecg}`])
      
      let pythonResponse = ""
      pythonProcess.stdout.on('data', function (data) {
        pythonResponse += data
    
       })

       pythonProcess.stdout.on('end', function () {
        console.log(pythonResponse)
      
    })
    
      
      
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
    
      await pool.query('INSERT INTO pacientes set ?', [newLink]);
      req.flash('Success', 'Paciente saved Successfully')
      res.redirect('/profile');
})


router.post('/registro2',  (req,res)=>{

             console.log(req.body)
             res.sendStatus(200)
 

})





module.exports = router;
