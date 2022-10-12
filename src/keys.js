require('dotenv').config()


module.exports = {

    database: {
       host: process.env.ht,
       user: process.env.us,
       password: process.env.pss,
       database: process.env.db
    }



};