'use strict';

const _WORDS = ['lol',
  'dudelsack',
  'haus',
  'kaninchen',
  'trueffel',
  'autobahn',
  'element',
  'pflaster',
  'luefter',
  'birne'];


export default function pickWord2(): Promise<any> {
  return Promise.resolve(_WORDS[Math.max(0, Math.ceil(Math.random() * _WORDS.length) - 1)]);
}

