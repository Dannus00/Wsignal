const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/out');
const pool = require('../database');


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
    await pool.query('UPDATE pacientes set ? WHERE id =?', [newLink,id]);
    req.flash('Success', 'Paciente saved Successfully')
    res.redirect('/profile');
})






module.exports = router;