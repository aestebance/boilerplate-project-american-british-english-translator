const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    #translationList;
    constructor() {
        this.#translationList = [];
        Object.keys(americanOnly).forEach((key) => {
            this.#translationList.push([key, americanOnly[key]]);
        });

        Object.keys(americanToBritishTitles).forEach((key) => {
            this.#translationList.push([key, americanToBritishTitles[key]]);
        });

        Object.keys(americanToBritishSpelling).forEach((key) => {
            this.#translationList.push([key, americanToBritishSpelling[key]]);
        });

        Object.keys(britishOnly).forEach((key) => {
            this.#translationList.push([britishOnly[key], key]);
        });
    }

    translate(text, mode) {
        let newString = text;
        newString = newString.charAt(0).toUpperCase() + newString.slice(1);
        let spanOpen = "<span class='highlight'>";
        let spanClose = "</span>";
        if (mode === 'american-to-british') {
            this.#translationList.forEach((item) => {
                newString = newString.replace(item[0], spanOpen + item[1] + spanClose);
                newString = newString.replace(item[0].charAt(0).toUpperCase() + item[0].slice(1),
                    spanOpen + item[1].charAt(0).toUpperCase() + item[1].slice(1) + spanClose);
            });
        } else {
            this.#translationList.forEach((item) => {
                newString = newString.replace(item[1], spanOpen + item[0] + spanClose);
                newString = newString.replace(item[1].charAt(0).toUpperCase() + item[1].slice(1),
                    spanOpen + item[0].charAt(0).toUpperCase() + item[0].slice(1) + spanClose);
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
        if (text === newString) {
            return 'Everything looks good to me!';
        } else {
            return newString;
        }
    }
}

module.exports = Translator;
