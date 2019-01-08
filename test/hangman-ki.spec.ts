import Hangman from '../src/game/hangman-ki';
import { expect } from 'chai';

describe('Hangman', () => {
  let hangman: Hangman;

  beforeEach(() => {
    hangman = new Hangman();
    hangman.setFailsListener(() => {});
    hangman.setWordListener(() => {});
  });

  it('should show current fails', (done) => {
    const letterCallback = hangman.getLetterCallback();

    new Promise((resolve) => {
      // check that the first return value is 0
      hangman.setFailsListener((fails, ) => {
        expect(fails).to.be.equal(0);
        resolve();
      });

      hangman.setWord('yay');
    }).then(() => {
      // check that the second return value is 1
      const nextCheck = new Promise((resolve) =>
        hangman.setFailsListener((fails, ) => {
          expect(fails).to.be.equal(1);
          resolve();
        })
      );
      letterCallback('b');
      return nextCheck;
    }).then(done);
  });

  it('should show updated words', (done) => {
    const letterCallback = hangman.getLetterCallback();

    new Promise((resolve) => {
      // check that the first return value is ___
      hangman.setWordListener((word) => {
        expect(word).to.be.equal('___');
        resolve();
      });

      hangman.setWord('yay');
    }).then(() => {
      // check that the second return value is _a_
      const nextCheck = new Promise((resolve) =>
        hangman.setWordListener((word) => {
          expect(word).to.be.equal('_a_');
          resolve();
        })
      );
      letterCallback('a');
      return nextCheck;
    }).then(done);
  });

  it('should notify about game over from fails', (done) => {
    const letterCallback = hangman.getLetterCallback();

    new Promise((resolve) => {
      hangman.setWordListener(() => {
        resolve();
      });

      hangman.setWord('yay');
    }).then(() => {
      return new Promise((resolve) => {
        hangman.setGameOverListener((word, fails, maxFails) => {
          expect(word).to.be.equal('yay');
          expect(fails.length).to.be.equal(10);
          expect(maxFails).to.be.equal(10);
          resolve();
        });
        for (const letter of '0123456789') {
          letterCallback(letter);
        }
      });
    }).then(done);
  });

  it('should notify about game over from wins', (done) => {
    const letterCallback = hangman.getLetterCallback();

    new Promise((resolve) => {
      hangman.setWordListener(() => {
        resolve();
      });

      hangman.setWord('yay');
    }).then(() => {
      return new Promise((resolve) => {
        hangman.setGameOverListener((word, fails: string[], maxFails) => {
          expect(word).to.be.equal('yay');
          expect(fails.length).to.be.equal(0);
          expect(maxFails).to.be.equal(10);
          resolve();
        });
        letterCallback('a');
        letterCallback('y');
      });
    }).then(done);
  });
});
