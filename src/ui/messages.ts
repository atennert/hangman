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
  private readonly gameMessageContent: any;
  private readonly gameMessageText: any;
  private readonly gameMessageAgainButton: any;
  private readonly gameMessageMenuLink: any;
  private readonly gameImageContainer: any;
  private readonly messageElem: any;

  private graphicsProvider: (() => string) | undefined;

  constructor(messageRoot: HTMLDivElement) {
    this.messageElem = messageRoot;
    this.gameMessageContent = document.createElement('div');
    this.gameMessageAgainButton = document.createElement('button');
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
  }

  public showMessage(message: IMessage): void {
    this.gameMessageText.innerHTML = message.messageText;
    this.gameImageContainer.innerHTML = this.graphicsProvider && this.graphicsProvider();
    if (message.showImage) {
      this.gameImageContainer.removeAttribute('hidden');
    } else {
      this.gameImageContainer.setAttribute('hidden', 'hidden');
    }
    this.gameMessageAgainButton.textContent = message.againButtonText;
    this.gameMessageMenuLink.textContent = message.menuButtonText;
    this.messageElem.classList.add('show');
  }
}
