'use strict';
import { Messages, StatusMessage } from './messages';

export default class MessageHandler {
  private messages: Messages | undefined;

  setMessages(messages: Messages) {
    this.messages = messages;
  }

  showGameOverMessage(word: string, fails: string[], maxFails: number): void {
    const letters = fails.join(', ');
    let newMessage;
    switch (fails.length) {
      case maxFails:
        newMessage = new StatusMessage(
          `<span class="game__message-content--big">You lost</span><br>Looked for word: ${word}<br>Wrong letters: ${letters}`, true);
        break;
      case 0:
        newMessage = new StatusMessage(
          `<span class="game__message-content--big">You won</span><br>Looked for word: ${word}`, false);
        break;
      default:
        newMessage = new StatusMessage(
          `<span class="game__message-content--big">You won</span><br>Looked for word: ${word}<br>Wrong letters: ${letters}`, true);
        break;
    }

    if (this.messages) {
      this.messages.showMessage(newMessage);
    } else {
      console.error('MessageHandler:', 'no messages defined!');
    }
  }
}
