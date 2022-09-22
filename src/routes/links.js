const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/out');
const pool = require('../database');
const fs = require('fs')


router.get('/list',isLoggedIn, async(req,res)=>{


    const links = await pool.query('SELECT * FROM database_medical.pacientes');
    console.log(links)
    res.render('links/list',{links})

});

router.get('/edit/:id',isLoggedIn, async (req,res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM database_medical.pacientes WHERE id =?', [id]);
   
    res.render('links/edit', {links: links[0]});

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

router.get('/view/:id',isLoggedIn, async (req,res) =>{
    const { id } = req.params;
    const data = await pool.query('SELECT ecg FROM database_medical.pacientes WHERE id =?', [id]);
    
    var json = JSON.stringify(data);
    
    console.log(json)
    
    
    /*fs.writeFileSync('src/JSON/data.json',JSON.stringify({dat},null,2))*/
    res.render('links/view', {data: data[0]});

});




module.exports = router;