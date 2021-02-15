const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    #universalTranslationList;
    #britishTranslationList;
    #americanTranslationList;
    constructor() {
        this.#universalTranslationList = [];
        this.#americanTranslationList = [];
        this.#britishTranslationList = [];
        Object.keys(americanOnly).forEach((key) => {
            this.#americanTranslationList.push([key, americanOnly[key]]);
        });

        Object.keys(americanToBritishTitles).forEach((key) => {
            this.#universalTranslationList.push([key, americanToBritishTitles[key]]);
        });

        Object.keys(americanToBritishSpelling).forEach((key) => {
            this.#universalTranslationList.push([key, americanToBritishSpelling[key]]);
        });

        Object.keys(britishOnly).forEach((key) => {
            this.#britishTranslationList.push([key, britishOnly[key]]);
        });
    }

    translate(text, mode) {
        let newString = text;
        let spanOpen = "<span class='highlight'>";
        let spanClose = "</span>";
        if (mode === 'american-to-british') {
            this.#universalTranslationList.forEach((item) => {
                newString = newString.replace(item[0], spanOpen + item[1] + spanClose);
                newString = newString.replace(item[0].charAt(0).toUpperCase() + item[0].slice(1),
                    spanOpen + item[1].charAt(0).toUpperCase() + item[1].slice(1) + spanClose);
            });
            this.#americanTranslationList.forEach((item) => {
                newString = newString.replace(item[0], spanOpen + item[1] + spanClose);
                newString = newString.replace(item[0].charAt(0).toUpperCase() + item[0].slice(1),
                    spanOpen + item[1].charAt(0).toUpperCase() + item[1].slice(1) + spanClose);
            });
        } else {
            this.#universalTranslationList.forEach((item) => {
                newString = newString.replace(item[1], spanOpen + item[0] + spanClose);
                newString = newString.replace(item[1].charAt(0).toUpperCase() + item[1].slice(1),
                    spanOpen + item[0].charAt(0).toUpperCase() + item[0].slice(1) + spanClose);
            });
            this.#britishTranslationList.forEach((item) => {
                newString = newString.replace(item[0], spanOpen + item[1] + spanClose);
                newString = newString.replace(item[0].charAt(0).toUpperCase() + item[0].slice(1),
                    spanOpen + item[1].charAt(0).toUpperCase() + item[1].slice(1) + spanClose);
            });
        }

        let britishRegexTime = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(\.)([0-5][0-9]))/g;
        let americanRegexTime = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:)([0-5][0-9]))/g;
        let times;
        if (mode === 'american-to-british') {
            times = newString.match(americanRegexTime);
        }
        else {
            times = newString.match(britishRegexTime);
        }
        if (times) {
            times.forEach((time) => {
                if (mode === 'american-to-british') {
                    newString = newString.replace(time, spanOpen + time.replace(':', '.') + spanClose);
                }
                else {
                    newString = newString.replace(time, spanOpen + time.replace('.', ':') + spanClose);
                }
            })
        }
        newString = newString.charAt(0).toUpperCase() + newString.slice(1);
        if (text === newString) {
            return 'Everything looks good to me!';
        } else {
            return newString;
        }
    }
}

module.exports = Translator;
