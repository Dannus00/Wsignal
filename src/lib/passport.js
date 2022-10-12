const passport = require('passport');
const LocalStrategy = require('passport-local');
const pool = require('../database');
const helpers = require('../lib/helpers');
const emailer = require('../lib/emailer');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
 
 }, async(req,username,password,done)=>{
 
  
    const rows = await pool.query('SELECT * FROM doctors WHERE username =?', [username])
     
     if (rows.length > 0){
 
       const user = rows[0];
       
       /*const validpassword = await pool.query('SELECT * FROM doctors WHERE password =?', [password])*/
       const validpassword = await helpers.matchPassword(password, user.password);
       console.log(validpassword)
       if(validpassword){
 
          done(null, user, req.flash('Success','Welcome' + user.username));
       }else{
 
          done(null,false, req.flash('message','Incorrect Password'));
       }
     }else{
 
       return done(null,false,req.flash('message','The username does not Exists'))
     } 
 
 
 }));



 passport.use('local.admins', new LocalStrategy({
   usernameField: 'username',
   passwordField: 'password',
   passReqToCallback: true

}, async(req,username,password,done)=>{

 
   const rows = await pool.query('SELECT * FROM Admins WHERE Name =?', [username])
    
    if (rows.length > 0){

      const user = rows[0];
      
      const validpassword = await pool.query('SELECT * FROM Admins WHERE Password =?', [password])
      
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


passport.use('local.adminR', new LocalStrategy({

   usernameField: 'username',
   passwordField: 'password',
   passReqToCallback: true
},async(req,username,password,done) =>{

   console.log(req.body)

  const {email} = req.body;

  const newUser = {
     username,
     password,
     email
  };

  
  newUser.password = await helpers.encrypts(password);

  const result = await pool.query('INSERT INTO doctors SET ?', [newUser]);
  newUser.id = result.insertId;
  emailer.sendMail(newUser)
  return done(null, newUser);
}));










 

 passport.serializeUser((user,done)=>{

   done(null, user.id);
 
 });
  
 
 passport.deserializeUser(async(id,done)=>{
 
    const rows  = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
    done(null, rows[0]);
 })