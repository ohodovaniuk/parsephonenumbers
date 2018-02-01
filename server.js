var express = require('express'); //framework that offers the features needed
var app = express();
var multer = require('multer'); //handles the multipart/form-data
var upload = multer({dest: 'uploads/'});
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var PNF = require('google-libphonenumber').PhoneNumberFormat;

app.listen(8000, function() {
    console.log('The server is running on port 8000');
});

//Manage the GET request
app.get('/api/phonenumbers/parse/text/:phoneNumber', function(request, response) {
    if (request.params.phoneNumber !== 'nothing') {
        var phoneNumber = [request.params.phoneNumber];
        response.status(200).json(parseNumbers(phoneNumber));
    }
    else {
        response.status(400).json([]);
    }
});

// Manage the POST request
app.post('/api/phonenumbers/parse/file', upload.single('file'), function(request, response) {
    if(!request.file) {
        response.status(400).json('No file attached!');
    }
    else {
        var fs = require('fs');
        var text = Buffer.from(fs.readFileSync(request.file.path).toString(), 'base64');
        var phoneNumbers = text.toString().split('\n');
        response.status(200).json(parseNumbers(phoneNumbers));
    }
});

//Phone number parser
function parseNumbers(phoneNumbers) {
    var number;
    var parsedPhoneNumbers = [];
    try {
        //Go through the numbers and parse them
        for (var i = 0; i < phoneNumbers.length; i++) {
            number = phoneUtil.parse(phoneNumbers[i], 'CA');
            parsedPhoneNumbers.push(phoneUtil.format(number, PNF.INTERNATIONAL));
        }
    }
    catch(err) {
        //print the exception to the logfile for security reasons
        console.log("Exception:" + err);
    }
    //Return only unique phone numbers, no duplicates
    return Array.from(new Set(parsedPhoneNumbers));
}

module.exports = app;
