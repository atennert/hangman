import Hangman from 'util/hangmanKi';

const expect = chai.expect;

describe('Hangman', () => {
  let hangman;
  beforeEach(() => {
    hangman = new Hangman();
  });

  it('should be created', () => {
    expect(hangman).to.not.be.undefined;
  });
});