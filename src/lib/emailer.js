const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()



/* const createTrans = () => {
 
    const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: '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'
    })
);

        return transport;

}
 */
 const sendMail = async (user) =>{
 
            sgMail.setApiKey(process.env.emakey)
        const msg = {
        to: `${user.email}`, // Change to your recipient
        from: 'danusdiaz0@gmail.com', // Change to your verified sender
        subject:`Hola ${user.username} Bienvenido a MedicalSignal`,
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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