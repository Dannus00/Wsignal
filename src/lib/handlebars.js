const {format} = require('timeago.js');
const Handlebars = require('handlebars')


const helpers = {};

helpers.timeago = (timestamp)=>{

    return format(timestamp)
}

Handlebars.registerHelper('encodeMyString',function(inputData){
    return new Handlebars.SafeString(inputData);
});

module.exports = helpers;