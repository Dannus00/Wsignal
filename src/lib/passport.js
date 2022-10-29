const passport = require('passport');
const LocalStrategy = require('passport-local');
const pool = require('../database');
const helpers = require('../lib/helpers');
const emailer = require('../lib/emailer');



passport.use('local.signin', new LocalStrategy({
    usernameField: 'usern',
    passwordField: 'password',
    passReqToCallback: true
 
 }, async(req,usern,password,done)=>{
 
  
    const rows = await pool.query('SELECT * FROM doctors WHERE usern =?', [usern])
     
     if (rows.length > 0){
 
       const user = rows[0];
       
       /*const validpassword = await pool.query('SELECT * FROM doctors WHERE password =?', [password])*/
       const validpassword = await helpers.matchPassword(password, user.password);
       
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
   usernameField: 'usernameadmin',
   passwordField: 'passwordadmin',
   passReqToCallback: true

}, async(req,usernameadmin,passwordadmin,done)=>{

 
   const rows1 = await pool.query('SELECT * FROM Admins WHERE Name =?', [usernameadmin])
    
    if (rows1.length > 0){

      const user = rows1[0];
      
      const validpassword = await pool.query('SELECT * FROM Admins WHERE Password =?', [passwordadmin])
      const valid = validpassword[0]
     
      if(valid.Password == passwordadmin){

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

  
   const {email} = req.body;
   const {lastname} = req.body;
   const {ident} = req.body;
   const {usern} = req.body;
   const role  = "doctor"


   const rows = await pool.query('SELECT * FROM doctors WHERE email =?', [email])
   const rows2 = await pool.query('SELECT * FROM doctors WHERE email =?', [ident])

      if (rows2.length > 0){

         
         done(null,false, req.flash('message','Este usuario ya se encuentra registrado'));
      
    }else if (rows.length > 0){

      done(null,false, req.flash('message','El correo electronico ya se encuentra registrado'));

    }else{

      const newUser = {
         username,
         lastname,
         ident,
         email,
         usern,
         password,
         role
      };
    
      const newuser = {
       username,
       usern,
       password,
       email
    };
    
      
      newUser.password = await helpers.encrypts(password);
    
      const result = await pool.query('INSERT INTO doctors SET ?', [newUser]);
      newUser.id = result.insertId;
      emailer.sendMail(newuser)
      return done(null, newUser);
      
    } 

 
  
}));






 passport.serializeUser((user,done)=>{

   done(null, user);
 
 });
  
 
 passport.deserializeUser(async(id,done)=>{
 
   /*  const rows  = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]); */
    done(null, id);
 })
