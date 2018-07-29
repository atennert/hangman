import { Routes } from './router';
import getImage from './image';


export class GameOver {
  private readonly gameImageContainer: HTMLDivElement;
  private readonly gameOverHead: HTMLParagraphElement;
  private readonly gameOverMain: HTMLParagraphElement;
  private readonly gameOverSecondary: HTMLParagraphElement;

  constructor(gameRoot: HTMLDivElement) {
    const gameOverContent = document.createElement('div'),
      navigation = document.createElement('nav'),
      navList = document.createElement('ul'),
      gameOverAgainLink = document.createElement('a'),
      gameOverMenuLink = document.createElement('a');
    this.gameImageContainer = document.createElement('div'),
    this.gameOverHead = document.createElement('p'),
    this.gameOverMain = document.createElement('p'),
    this.gameOverSecondary = document.createElement('p');

    this.gameOverHead.className = 'game__over-content--big';
    this.gameOverMain.className = 'game__over-content--main';
    this.gameOverSecondary.className = 'game__over-content--secondary';

    gameOverContent.className = 'game__over-content';
    navigation.className = 'game__over-navigation'
    gameOverAgainLink.className = 'game__over-button';
    gameOverAgainLink.href = Routes.Game;
    gameOverAgainLink.innerText = 'Try again';
    gameOverMenuLink.className = 'game__over-button';
    gameOverMenuLink.href = Routes.Menu;
    gameOverMenuLink.innerText = 'Go to menu';
    this.gameImageContainer.innerHTML = getImage();
    this.gameImageContainer.className = 'game__over-image--container';

    navList.className = 'nav__list';
    let navEntry: HTMLLIElement;
    [gameOverAgainLink, gameOverMenuLink].forEach((link) => {
      navEntry = document.createElement('li');
      navEntry.appendChild(link);
      navList.appendChild(navEntry);
    });

    navigation.appendChild(navList);
    gameOverContent.appendChild(this.gameOverHead);
    gameOverContent.appendChild(this.gameOverMain);
    gameOverContent.appendChild(this.gameOverSecondary);
    gameOverContent.appendChild(this.gameImageContainer);
    gameOverContent.appendChild(navigation);
    gameRoot.appendChild(gameOverContent);
  }

  public setData({currentWord, fails, maxFails}: {currentWord: string, fails: string[], maxFails: number}): void {
    const letters = fails.join(', ');
    switch (fails.length) {
      case maxFails:
        this.showMessage('You lost.',
          `Looked for word: ${currentWord}.`,
          `Wrong letters: ${letters}`,
          fails.length);
        break;
      case 0:
        this.showMessage('You won.', `Looked for word: ${currentWord}.`, '', fails.length);
        break;
      default:
        this.showMessage(
          'You won.',
          `Looked for word: ${currentWord}.`,
          `Wrong letters: ${letters}.`, fails.length);
        break;
    }
  }

  private showMessage(head: string, main: string, secondary: string, fails: number): void {
    this.gameOverHead.innerText = head;
    this.gameOverMain.innerText = main;
    this.gameOverSecondary.innerText = secondary;

    if (fails > 0) {
      Array.prototype.forEach.call(this.gameImageContainer.querySelectorAll('.hangman__part'), (element: any) => {
        element.style.visibility = 'hidden';
      });
      for (let i = 1; i <= fails; i++) {
        this.gameImageContainer.querySelector(`.hangman__part--${i}`)!.removeAttribute('style');
      }
    }
  }
}
