import getImage from './image';
import { Routes } from './router';

interface IMenuEntry {
  name: string;
  target: Routes;
}

/**
 * This class generates the menu.
 */
export default class Menu {
  private static readonly MENU_ENTRIES: [IMenuEntry] = [
    {name: 'Start game', target: Routes.Game}
  ];

  constructor(gameRoot: HTMLDivElement) {
    const header = document.createElement('header'),
      title = document.createElement('h1'),
      description = document.createElement('p'),
      menuContainer = document.createElement('nav'),
      image = document.createElement('div'),
      menu = document.createElement('ul'),
      container = document.createElement('div'),
      fragment = document.createDocumentFragment();

    title.textContent = 'Hangman';
    title.className = 'menu__title'
    header.className = 'menu__header';
    header.appendChild(title);

    description.textContent = 'Hangman game for German words.';
    description.className = 'menu__description';

    image.innerHTML = getImage();
    image.className = 'image__container';
    image.setAttribute('aria-label', 'Stick figure hanging on the gallows.');

    menuContainer.className = 'menu__container';
    menu.className = 'menu__list';
    let entry: IMenuEntry,
      menuEntry: HTMLLIElement,
      link: HTMLAnchorElement;
    for (entry of Menu.MENU_ENTRIES) {
      menuEntry = document.createElement('li');
      menuEntry.className = 'menu__entry';
      link = document.createElement('a');
      link.textContent = entry.name;
      link.href = entry.target;
      link.className = 'menu__link';
      menuEntry.appendChild(link);
      menu.appendChild(menuEntry);
    }
    menuContainer.appendChild(menu);

    container.className = 'menu';
    container.appendChild(header);
    container.appendChild(description);
    container.appendChild(image);
    container.appendChild(menuContainer);

    fragment.appendChild(container);
    gameRoot.appendChild(fragment);
  }
}
