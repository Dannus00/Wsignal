const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/out');
const pool = require('../database');
const {roladmin,roldoc,roluser} = require('../lib/roles')



router.get('/list',isLoggedIn, roldoc(["doctor"]) ,async(req,res)=>{


    const links = await pool.query('SELECT id,name,lastname,ident,created_at FROM database_medical.pacientes');
  
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
    req.flash('Success', 'Link Romoved Successfully')
    res.redirect('/list');
});

router.post('/edit/:id', isLoggedIn, async (req,res)=>{
    const { id } = req.params;
    
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
    
    await pool.query('UPDATE pacientes set ? WHERE id =?', [newLink,id]);
    req.flash('Success', 'Paciente saved Successfully')
    res.redirect('/profile');
})

router.get('/view/:id',isLoggedIn, roldoc(["doctor"]) ,async (req,res) =>{
    const { id } = req.params;
    const data = await pool.query('SELECT ecg,ppg,resp,spo2,puls,rp FROM database_medical.pacientes WHERE id =?', [id]);
    
    
    res.render('links/view', {data: data[0]});

});




module.exports = router;