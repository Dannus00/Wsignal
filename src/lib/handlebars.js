const {format} = require('timeago.js');
const Handlebars = require('handlebars');
const moment = require('moment');


const helpers = {};

helpers.timeago = (timestamp)=>{

    return format(timestamp)
}

Handlebars.registerHelper('encodeMyString',function(inputData){
    return new Handlebars.SafeString(inputData);
});

Handlebars.registerHelper('formatTime', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

module.exports = helpers;