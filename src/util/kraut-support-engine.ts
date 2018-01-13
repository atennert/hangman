'use strict';

const transformer: any = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };

const _fixUmlauts = (word: string) =>
  [...word].map(letter => transformer[letter] ? transformer[letter] : letter).join('');

export default function pickWord(): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      const content = JSON.parse(xhr.responseText);
      console.log(content['noun']);
      resolve(_fixUmlauts(content['noun'].toLowerCase()));
    });
    xhr.addEventListener('error', (error) => {
      console.log(error.message);
      reject();
    });
    xhr.open('GET', 'https://www.krautipsum.de/api/noun');
    xhr.send();
  });
}
