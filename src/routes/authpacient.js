const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/out');
const {isNotLoggedIn} = require('../lib/out');
const helpers = require('../lib/helpers');
const pool = require('../database');
const passport = require('passport');
const {roladmin,roldoc,roluser} = require('../lib/roles')



router.get('/profileUser',isLoggedIn, roluser(["paciente"]), (req,res)=>{

    res.render('user/pacientUser')

});



router.post('/userpacient', passport.authenticate('local.user',{

    successRedirect: '/profileUser',
    failureRedirect: '/signin',
    failureFlash:true


}));


router.get('/HistoUser',isLoggedIn, roluser(["paciente"]) ,async (req,res) =>{
  
    const id = req.user.id;

    const links = await pool.query('SELECT name,lastname,ident,gender,age,bt,date,oc,ec,phone,address,pr,emailpacient FROM database_medical.pacientes WHERE id =?', [id]);
   
    res.render('user/histoUser', {links: links[0]});

});



router.get('/UserDiagnostic',isLoggedIn, roluser(["paciente"]) ,async (req,res) =>{
    

    const id = req.user.id;


    const links = await pool.query('SELECT * FROM database_medical.diagnostics WHERE idpaciente =?', [id]);
    
   
    res.render('user/diagnosticUser',{links});

});


router.post('/uploaduser', isLoggedIn, roluser(["paciente"]), async (req,res) =>{

    const id = req.user.id;
  
  

  let sampleFile;
  let uploadpath;
   
   if(!req.files || Object.keys(req.files).length === 0){

       return res.status(400).send('no files were upload')
   }

   //name of the input is sampleFile
   sampleFile = req.files.sampleFile;
   uploadpath =  'src/public/upload/' + sampleFile.name
   

  //Use mv() to place file on the server
   sampleFile.mv(uploadpath, function(err){

       if(err) return res.status(500).send(err);


       
       const tiempoTranscurrido = Date.now();
       const hoy = new Date(tiempoTranscurrido);
       let time = hoy.toLocaleDateString();


        pool.query(`INSERT INTO database_medical.diagnostics (diagpdf,idpaciente,datediag) VALUES("${sampleFile.name}","${id}","${time}")`);

      


        req.flash('Success', 'Archivo Subido Correctamente')
        res.redirect('/UserDiagnostic');
      
        /* res.send('File Upload');*/
   });
});



router.get('/settingsUser',isLoggedIn, roluser(["paciente"]) ,async (req,res) =>{
    

    const id = req.user.id;


    const links = await pool.query('SELECT name,lastname,emailpacient FROM database_medical.pacientes WHERE id =?', [id]);
    
    res.render('user/configuser', {links: links[0]});

});


router.post('/settingnsUser',isLoggedIn, roluser(["paciente"]) ,async (req,res) =>{
    
    const id = req.user.id;
    let {useract,newuser,passact,passnew} = req.body;
    
   
   
    if( req.user.username == useract){


        const validpassword = await helpers.matchPassword(passact, req.user.password);
        
        if(validpassword){

            passnew = await helpers.encrypts(passnew);
            await pool.query(`UPDATE database_medical.userpacient set username = "${newuser}", password = "${passnew}" WHERE id =?`, [id])
            req.flash('Success', `Datos actualizados correctamente`)
            res.redirect("/settingsUser")
        }else{
            req.flash('message','la contraseña ingresada actual no coincide')
            res.redirect("/settingsUser")
        }
    }else{
        req.flash('message','El usuario actual ingresado no coincide')
        res.redirect("/settingsUser")
    }




});











module.exports = router;