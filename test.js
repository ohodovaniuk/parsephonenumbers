var chai = require('chai');
var expect = require('chai').expect;
var fs = require('fs');
chai.use(require('chai-http'));
var app = require('./server.js');

//test the GET request
describe('API endpoint /api/phonenumbers/parse/text', function() {
    it('No phone number received.', function(){
        return chai.request(app)
            .get('/api/phonenumbers/parse/text/test')
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res.body).to.be.empty;
            });
    });

    it('Correct phone number to be returned: [\'+1 416-491-5050\']', function() {
    return chai.request(app)
        .get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050')
        .then(function(response) {
            expect(response).to.have.status(200);
            expect(response.body).to.include('+1 416-491-5050');
        });
    });
});

//test the POST request
describe('API endpoint /api/phonenumbers/parse/file', function() {
    it('Correct phone numbers to be returned: [\'+1 647-900-9763\', \'+1 647-677-2388\', \'+1 416-285-9778\']', function() {
    return chai.request(app)
        .post('/api/phonenumbers/parse/file')
        .set('Content-Type', 'text/plain;charset=base64')
        .attach('file', fs.readFileSync('./phoneNumbers.txt'), 'phoneNumbers.txt')
        .then(function(response){
            expect(response).to.have.status(200);
            expect(response.body).to.include('+1 647-900-9763', '+1 647-677-2388', '+1 416-285-9778');
        });
    })
});
