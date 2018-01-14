import Hangman from 'util/hangmanKi';

const expect = chai.expect;

describe('Hangman', () => {
  let hangman,
    wordProvider,
    wordCallback,
    failsCallback;

  beforeEach(() => {
    wordProvider = new (class WordProvider{
      getWord() {
        this.getWordCalled = true;
        return Promise.resolve('yay');
      }
    });
    wordCallback = (word) => {};
    failsCallback = (fails) =>{};

    hangman = new Hangman();
    hangman.wordProvider = wordProvider;
    hangman.wordListener = wordCallback;
    hangman.failsListener = failsCallback;
  });

  it('should be created', () => {
    expect(hangman).to.not.be.undefined;
  });

  it('should get words from word provider', () => {
    hangman.init();
    expect(wordProvider.getWordCalled).to.be.true;
  });
});