const passport = require('passport');
const LocalStrategy = require('passport-local');
const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
 
 }, async(req,username,password,done)=>{
 
  
    const rows = await pool.query('SELECT * FROM doctors WHERE username =?', [username])
     
     if (rows.length > 0){
 
       const user = rows[0];
       
       const validpassword = await pool.query('SELECT * FROM doctors WHERE password =?', [password])
       
       console.log(validpassword)
       if(validpassword.length>0){
 
          done(null, user, req.flash('Success','Welcome' + user.username));
       }else{
 
          done(null,false, req.flash('message','Incorrect Password'));
       }
     }else{
 
       return done(null,false,req.flash('message','The username does not Exists'))
     } 
 
 
 }));


 

 passport.serializeUser((user,done)=>{

   done(null, user.id);
 
 });
  
 
 passport.deserializeUser(async(id,done)=>{
 
    const rows  = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
    done(null, rows[0]);
 })