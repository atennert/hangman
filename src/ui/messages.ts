'use strict';
import { Routes } from './router';

interface IMessage {
  messageText: string;
  againButtonText: string;
  menuButtonText: string;
  showImage: boolean;
}

export class StatusMessage implements IMessage {
  public readonly messageText: string;
  public readonly againButtonText = 'Try again';
  public readonly menuButtonText = 'Go to menu';
  public readonly showImage: boolean;

  constructor(message: string, showImage: boolean) {
    this.messageText = message;
    this.showImage = showImage;
  }
}

/**
 * This class handles the showing of messages to the user. So far
 * this includes a welcome message and the game over message.
 */
export class Messages {
  /* tslint:disable-next-line: max-line-length */
  private static readonly FOCUSSABLE_ELEMENTS_SELECTOR = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  private readonly gameMessageContent: HTMLDivElement;
  private readonly gameMessageText: HTMLParagraphElement;
  private readonly gameMessageAgainButton: HTMLButtonElement;
  private readonly gameMessageMenuLink: HTMLAnchorElement;
  private readonly gameImageContainer: HTMLDivElement;
  private readonly messageElem: HTMLDivElement;

  private graphicsProvider: (() => string) = () => '';

  private focusWindowListener = () => {};
  private keyDownListener: ((e: KeyboardEvent) => void) = () => {};

  constructor(messageRoot: HTMLDivElement) {
    this.messageElem = messageRoot;
    this.gameMessageContent = document.createElement('div');
    this.gameMessageAgainButton = document.createElement('button');
    // TODO put this button in a nav
    this.gameMessageMenuLink = document.createElement('a');
    this.gameImageContainer = document.createElement('div');
    this.gameMessageText = document.createElement('p');

    this.gameMessageContent.className = 'game__message-content';
    this.gameMessageAgainButton.className = 'game__message-button';
    this.gameMessageAgainButton.setAttribute('type', 'button');
    this.gameMessageMenuLink.className = 'game__message-button';
    this.gameMessageMenuLink.href = Routes.Menu;
    this.gameMessageMenuLink.onclick = () => {
      this.hideMessage();
    };

    this.gameMessageContent.appendChild(this.gameMessageText);
    this.gameMessageContent.appendChild(this.gameImageContainer);
    this.gameMessageContent.appendChild(this.gameMessageAgainButton);
    this.gameMessageContent.appendChild(this.gameMessageMenuLink);
    this.messageElem.appendChild(this.gameMessageContent);

    this.addGameStartListener(this.hideMessage.bind(this));
  }

  setGraphicsProvider(graphics: () => string): void {
    this.graphicsProvider = graphics;
  }

  public addGameStartListener(callback: any): void {
    this.gameMessageAgainButton.addEventListener('click', callback);
  }

  private hideMessage() {
    this.messageElem.classList.remove('show');
    window.removeEventListener('focus', this.focusWindowListener);
    window.removeEventListener('keydown', this.keyDownListener);
  }

  public showMessage(message: IMessage): void {
    this.gameMessageText.innerHTML = message.messageText;
    this.gameImageContainer.innerHTML = this.graphicsProvider();
    if (message.showImage) {
      this.gameImageContainer.removeAttribute('hidden');
    } else {
      this.gameImageContainer.setAttribute('hidden', 'hidden');
    }
    this.gameMessageAgainButton.textContent = message.againButtonText;
    this.gameMessageMenuLink.textContent = message.menuButtonText;

    this.setupKeyboardTrap();

    this.messageElem.classList.add('show');
  }

  private setupKeyboardTrap(): void {
    const focussableElements = this.messageElem.querySelectorAll(Messages.FOCUSSABLE_ELEMENTS_SELECTOR);
    const focussableElementArray = Array.prototype.slice.call(focussableElements) as Element[];

    const firstTabStop = <HTMLElement>focussableElementArray[0];
    const lastTabStop = <HTMLElement>focussableElementArray[focussableElementArray.length - 1];

    // secure against address line tabbing
    this.focusWindowListener = () => firstTabStop.focus();
    window.addEventListener('focus', this.focusWindowListener);

    // modal window tabbing
    this.keyDownListener = (event: KeyboardEvent) => {
      // paranoia check
      if (focussableElementArray.indexOf(document.activeElement) === -1) {
        firstTabStop.focus();
        event.preventDefault();
        return;
      }

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstTabStop) {
            event.preventDefault();
            lastTabStop.focus();
          }
        } else if (document.activeElement === lastTabStop) {
          event.preventDefault();
          firstTabStop.focus();
        }
      }
    };
    window.addEventListener('keydown', this.keyDownListener);
    firstTabStop.focus();
  }
}
