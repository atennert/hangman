'use strict';

interface IMessage {
  messageText: string;
  buttonText: string;
  showImage: boolean;
}

export const MSG_WELCOME: IMessage = {
  messageText: 'Willkommen bei<br><span class="game__message-content--bigger">Hangman</span>',
  buttonText: 'Starten',
  showImage: true
}

export class StatusMessage implements IMessage {
  public readonly messageText: string;
  public readonly buttonText = 'Nochmal versuchen';
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
  private readonly gameMessageContent: any;
  private readonly gameMessageText: any;
  private readonly gameMessageButton: any;
  private readonly gameImageContainer: any;
  private readonly messageElem: any;

  private graphicsProvider: () => string;

  constructor(gameRoot: string) {
    this.messageElem = document.createElement('div');
    this.gameMessageContent = document.createElement('div');
    this.gameMessageButton = document.createElement('button');
    this.gameImageContainer = document.createElement('div');
    this.gameMessageText = document.createElement('p');

    this.messageElem.classList.add('game__message');
    this.gameMessageContent.className = 'game__message-content';
    this.gameMessageButton.className = 'game__message-button';
    this.gameMessageButton.setAttribute('type', 'button');

    this.gameMessageContent.appendChild(this.gameMessageText);
    this.gameMessageContent.appendChild(this.gameImageContainer);
    this.gameMessageContent.appendChild(this.gameMessageButton);
    this.messageElem.appendChild(this.gameMessageContent);

    document.querySelector(`.${gameRoot}`)!.appendChild(this.messageElem);

    this.addGameStartListener(this.hideMessage.bind(this));
  }

  setGraphicsProvider(graphics: () => string): void {
    this.graphicsProvider = graphics;
  }

  public addGameStartListener(callback: any): void {
    this.gameMessageButton.addEventListener('click', callback);
  }

  private hideMessage() {
    this.messageElem.classList.remove('show');
  }

  public showMessage(message: IMessage): void {
    this.gameMessageText.innerHTML = message.messageText;
    this.gameImageContainer.innerHTML = this.graphicsProvider();
    if (message.showImage) {
      this.gameImageContainer.removeAttribute('hidden');
    } else {
      this.gameImageContainer.setAttribute('hidden', 'hidden');
    }
    this.gameMessageButton.textContent = message.buttonText;
    this.messageElem.classList.add('show');
  }
}
