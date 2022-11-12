const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const sgMail = require('@sendgrid/mail')
const helpers = require('../lib/helpers');
require('dotenv').config()






const sendMail = async (user) =>{
    
    sgMail.setApiKey(process.env.emakey)
const msg = {
to: `${user.emailpacient}`, // Change to your recipient
from: "medicalsignal0@gmail.com", // Change to your verified sender
subject:`Hola ${user.name} Bienvenido a MedicalSignal`,
text: 'and easy to do anywhere, even with Node.js',
html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width,initial-scale=1">
   <meta name="x-apple-disable-message-reformatting">
   <title></title>
   <!--[if mso]>
   <noscript>
       <xml>
           <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
       </xml>
   </noscript>
   <![endif]-->
   <style>
      table,
      td,
      div,
      h1,
      p {
         font-family: Arial, sans-serif;
      }
   </style>
</head>
 
<body style="margin:0;padding:0;">
   <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
      <tr>
         <td align="center" style="padding:0;">
            <table role="presentation"
               style="width:602px;border-collapse:collapse;border:1px solid #a7b6b8;border-spacing:0;text-align:left;">
               <tr>
                  <td align="center" style="padding:1px 0 1px 0;background:#95d8f3; border-radius: 10%;">
                     <img src="https://i.ibb.co/0KcVyJC/image2.png" alt="" width="400"
                        style="height:auto;display:block;" />
                  </td>
               </tr>
               <tr>
                  <td style="padding:36px 30px 42px 30px;">
                     <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                           <td style="padding:0 0 36px 0;color:#153643;">
                              <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Hola ${user.name} Bienvenido a MedicalSignal</h1>
                              <p
                                 style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                 Le informamos que apartir de este momento se encuentra registrado.
                                 <p>Donde podra: </p>
                         
                           </td>
                        </tr>
                        <tr>
                           <td style="padding:0;">
                              <table role="presentation"
                                 style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                 <tr>
                                    <td style="width:260px;padding:0;vertical-align:top;color:#153643;">

                                       <h1 style="font-size:14px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Revisar su historial clinico</h1>
                                       <p
                                          style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                          <img src="https://i.ibb.co/LS4dqTz/historia-del-hospital.png" alt="" width="200"
                                             style="height:auto;display:block;" /></p>
                                    
                                    </td>
                                    <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                                    <td style="width:260px;padding:0;vertical-align:top;color:#153643;">

                                       <h1 style="font-size:14px;margin:0 0 20px 0;font-family:Arial,sans-serif;">llevar registro de sus diagnosticos</h1>
                                       <p
                                          style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                          <img src="https://i.ibb.co/VDKggL5/historia-clinica.png" alt="" width="200"
                                             style="height:auto;display:block;" /></p>
                           
                  
                                    </td>
                                 </tr>

                             
                              </table>
                              
                              <tr>
                                 <td style="color:#153643; text-align: center;">
                                    <p
                                       style="font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                      
                                       <p>Inicie sesion con: </p>
                                       <p>Usuario: ${user.usern} </p>
                                       <p>Contraseña: ${user.passn} </p>
                                       <p
                                       style="margin:0;font-size:28px;line-height:16px;font-family:Arial,sans-serif;color:#19bbe4;">
                                       <a href="http://www.example.com" style="color:#1fd4cb;text-decoration:underline;">Comenzar</a>
                                    </p>
                                       
                                 </td>
                              </tr>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               
               <tr>
                  <td style="padding:30px;background:#95d8f3;">
                     <table role="presentation"
                        style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                        <tr>
                           <td style="padding:0;width:50%;" align="left">
                              <p
                                 style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                 &reg; MedicalSignal, 2022<br /><a href="http://www.example.com"
                                    style="color:#ffffff;text-decoration:underline;">contactanos</a>
                              </p>
                           </td>
                           <td style="padding:0;width:50%;" align="right">
                              <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                 <tr>
                                    <td style="padding:0 0 0 10px;width:38px;">
                                       <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                             src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38"
                                             style="height:auto;display:block;border:0;" /></a>
                                    </td>
                                    <td style="padding:0 0 0 10px;width:38px;">
                                       <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                             src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38"
                                             style="height:auto;display:block;border:0;" /></a>
                                    </td>
                                 </tr>
                              </table>
                              
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
            </table>
         </td>
      </tr>
   </table>
</body>

</html>`,
}
sgMail
.send(msg)
.then(() => {
    console.log('Email sent')
})
.catch((error) => {
    console.error(error)
})


return
}











exports.sendMail = (user) => sendMail(user)