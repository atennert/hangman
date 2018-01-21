'use strict';
import { Messages, MSG_WELCOME, StatusMessage } from './messages';

export default class MessageHandler {
  private messages: Messages;

  setMessages(messages: Messages) {
    this.messages = messages;
  }

  showGameOverMessage(word: string, fails: string[], maxFails: number): void {
    const letters = fails.join(',');
    const newMessage = fails.length === maxFails
      ? new StatusMessage(
`<span class="game__message-content--big">Du hast verloren.</span><br>Gesuchtes Wort: ${word}<br>Falsche Buchstaben: ${!letters ? '-' : letters}`, true)
      : new StatusMessage(
`<span class="game__message-content--big">Du hast gewonnen.</span><br>Gesuchtes Wort: ${word}<br>Falsche Buchstaben: ${letters}`, fails.length > 0);

    this.messages.showMessage(newMessage);
  }

  showStartMessage() {
    this.messages.showMessage(MSG_WELCOME);
  }
}
