import MessageHandler from '../src/ui/message-handler';
import { Messages, StatusMessage } from '../src/ui/messages';
import { mock, instance, verify, anything, deepEqual } from 'ts-mockito';

describe('MessageHandler', () => {
  let messageHandler: MessageHandler,
    messagesMock: Messages;

  beforeEach(() => {
    messagesMock = mock(Messages);

    messageHandler = new MessageHandler();
    messageHandler.setMessages(instance(messagesMock));
  });

  it('should show game success when word is complete', () => {
    messageHandler.showGameOverMessage('test', [], 10);

    verify(messagesMock.showMessage(anything())).once();
  });

  it('should show game failed when fails are maxed', () => {
    messageHandler.showGameOverMessage('____', [...'abcdefghij'], 10);

    verify(messagesMock.showMessage(anything())).once();
  });
});
