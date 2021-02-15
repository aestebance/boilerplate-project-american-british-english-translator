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
        if (mode === 'american-to-british') {
            this.#translationList.forEach((item) => {
                newString = newString.replace(item[0], item[1]);
            });
        } else {
            this.#translationList.forEach((item) => {
                newString = newString.replace(item[1], item[0]);
            });
        }

        let regexTime = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g
        let times = newString.match(regexTime);
        if (times) {
            times.forEach((time) => {
                if (mode === 'american-to-british') {
                    newString = newString.replace(time, time.replace(':', '.'));
                }
                else {
                    newString = newString.replace(time, time.replace('.', ':'));
                }
            })
        }
        return newString;
    }
}

module.exports = Translator;
