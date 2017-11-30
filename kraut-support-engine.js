/**
 * Created by ante4822 on 31.07.2017.
 */

'use strict';

const transformer = {ä:'ae', ö:'oe', ü:'ue', ß:'ss'};

const _fixUmlauts = word =>
    [...word].map(letter => transformer[letter] ? transformer[letter] : letter).join('');

function pickWord() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            let content = JSON.parse(xhr.responseText);
            console.log(content['noun']);
            resolve(_fixUmlauts(content['noun'].toLowerCase()));
        });
        xhr.addEventListener('error', (error) => {
            console.log(error.message);
            reject();
        });
        xhr.open('GET', 'http://www.krautipsum.de/api/noun');
        xhr.send();
    })
}

