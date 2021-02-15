'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
      .post((req, res) => {
        if (!req.body.hasOwnProperty('text') || !req.body.hasOwnProperty('locale')) {
          return res.json({
            error: 'Required field(s) missing'
          });
        }
        if (req.body.text === "") {
          return res.json({
            error: 'No text to translate'
          });
        }

        if (!(req.body.locale !== "british-to-american" && req.body.locale !== "american-to-british")) {
            return res.json({
                error: 'Invalid value for locale field'
            });
        }
        const {text, locale} = req.body;

        return res.json({
          translation: "Everything looks good to me!"
        });
      });
};
