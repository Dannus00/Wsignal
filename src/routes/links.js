const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/out');
const pool = require('../database');
const {roladmin,roldoc,roluser} = require('../lib/roles')
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
let ide 



router.get('/list',isLoggedIn, roldoc(["doctor"]) ,async(req,res)=>{


    const links = await pool.query('SELECT id,name,lastname,ident,status,sh,created_at FROM database_medical.pacientes');
  
    res.render('links/list',{links})


});

router.get('/edit/:id',isLoggedIn, roldoc(["doctor"]) ,async (req,res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM database_medical.pacientes WHERE id =?', [id]);
   
    res.render('links/edit', {links: links[0]});

});

router.get('/delete/:id', isLoggedIn, roldoc(["doctor"]) ,async (req,res)=>{

    
    //console.log(req.params.id);
    //res.send('Deleted');

    const { id } = req.params;
    await pool.query('DELETE FROM database_medical.pacientes WHERE ID = ?', [id]);
    await pool.query(`ALTER TABLE database_medical.pacientes AUTO_INCREMENT = 0`);
    await pool.query('DELETE FROM database_medical.diagnostics WHERE idpaciente = ?', [id]);
    await pool.query('ALTER TABLE database_medical.diagnostics AUTO_INCREMENT = 1');
    req.flash('Success', 'Link Romoved Successfully')
    res.redirect('/list');
});

router.post('/edit/:id', isLoggedIn, async (req,res)=>{
    const { id } = req.params;
    
    const {name, lastname,ident,gender,status,age,bt,date,oc,ec,phone,address,pr } = req.body;
    const newLink = {
         name,
         lastname,
         ident,
         gender,
         status,
         age,
         bt,
         date,
         oc,
         ec,
         phone,
         address,
         pr
    }; 
    
    await pool.query('UPDATE pacientes set ? WHERE id =?', [newLink,id]);
    req.flash('Success', 'Paciente saved Successfully')
    res.redirect('/profile');
})

router.get('/view/:id',isLoggedIn, roldoc(["doctor"]) ,async (req,res) =>{
    const { id } = req.params;
    const data = await pool.query('SELECT name,ident,age,ecg,ppg,resp,ifl,sound,spo2,puls,rp,hr FROM database_medical.pacientes WHERE id =?', [id]);
    
    
    res.render('links/view', {data: data[0]});

});


router.get('/diagnostico/:id', isLoggedIn, roldoc(["doctor"]), async (req,res) =>{

    const { id } = req.params;
    const data = await pool.query('SELECT id,name,lastname,ident,gender,age,bt,date,address,pr FROM database_medical.pacientes WHERE id =?', [id]);


    res.render('links/diagnostico',{data: data[0]});


});

router.get('/uploadd/:id', isLoggedIn, roldoc(["doctor"]), async (req,res) =>{

    const { id } = req.params;
    ide = id;
    const data = await pool.query('SELECT * FROM database_medical.diagnostics WHERE idpaciente =?', [id]); 


    res.render('links/upload',{data});


});

router.post('/uploadd', isLoggedIn, roldoc(["doctor"]), async (req,res) =>{

     const id = ide; 
   
   

   let sampleFile;
   let uploadpath;
    
    if(!req.files || Object.keys(req.files).length === 0){

        return res.status(400).send('no files were upload')
    }

    //name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadpath =  'src/public/upload/' + sampleFile.name
    console.log(sampleFile);

   //Use mv() to place file on the server
    sampleFile.mv(uploadpath, function(err){

        if(err) return res.status(500).send(err);


        
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        let time = hoy.toLocaleDateString();


         pool.query(`INSERT INTO database_medical.diagnostics (diagpdf,idpaciente,datediag) VALUES("${sampleFile.name}","${ide}","${time}")`);

       


         req.flash('Success', 'Archivo Subido Correctamente')
         res.redirect('/list');
       
         /* res.send('File Upload');*/
 

    });

    

});



module.exports = router;