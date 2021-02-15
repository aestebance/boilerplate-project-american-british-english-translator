const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('POST request to /api/translate', function() {
       test("Translation with text and locale fields", function(done) {
          chai.request(server)
              .post('/api/translate')
              .send({
                  locale: "british-to-american",
                  text: "We watched the footie match for a while."
              })
              .end(function(error, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.text, "We watched the footie match for a while.");
                  assert.equal(res.body.translation, 'We watched the <span class="highlight">soccer</span> match for a while.');
                  done();
              });
       });
       test("Translation with text and invalid locale field", function(done) {
          chai.request(server)
              .post('/api/translate')
              .send({
                  locale: "hello",
                  text: "We watched the footie match for a while."
              })
              .end(function(error, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, 'Invalid value for locale field');
                  done();
              });
       });
       test("Translation with missing text field", function(done) {
          chai.request(server)
              .post('/api/translate')
              .send({
                  locale: "british-to-american"
              })
              .end(function(error, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, 'Required field(s) missing');
                  done();
              });
       });
        test("Translation with missing locale field", function(done) {
          chai.request(server)
              .post('/api/translate')
              .send({
                  text: "We watched the footie match for a while."
              })
              .end(function(error, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, 'Required field(s) missing');
                  done();
              });
       });
        test("Translation with empty text", function(done) {
          chai.request(server)
              .post('/api/translate')
              .send({
                  locale: "british-to-american",
                  text: ""
              })
              .end(function(error, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, 'No text to translate');
                  done();
              });
       });
        test("Translation with text that needs no translation", function(done) {
          chai.request(server)
              .post('/api/translate')
              .send({
                  locale: "british-to-american",
                  text: "Hello man"
              })
              .end(function(error, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.text, "Hello man");
                  assert.equal(res.body.translation, 'Everything looks good to me!');
                  done();
              });
       });

    });
});
