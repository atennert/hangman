'use strict';
import { Messages, StatusMessage } from './messages';

export default class MessageHandler {
  private messages: Messages;

  setMessages(messages: Messages) {
    this.messages = messages;
  }

  showGameOverMessage(word: string, fails: string[], maxFails: number): void {
    const letters = fails.join(',');
    const newMessage = fails.length === maxFails
      ? new StatusMessage(
`<span class="game__message-content--big">You lost</span><br>Looked for word: ${word}<br>Wrong letters: ${!letters ? '-' : letters}`, true)
      : new StatusMessage(
`<span class="game__message-content--big">You won</span><br>Looked for word: ${word}<br>Wrong letters: ${letters}`, fails.length > 0);

    this.messages.showMessage(newMessage);
  }
}
