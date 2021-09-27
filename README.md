# re-mess

**re-mess (react messenger) is a simple event bus for messaging through independent components without having global state.**

1. Use ```useSubscribe``` hook to subsribe to message (it will automatically resubscribe every render), you can also specify message priority if multiple messages with the same appMessage exist.

Example: 
```
import { useSubscribe } from 'messenger'

function Receiver() {
  useSubscribe('appMessage', (args) => console.log('receive', args))
  ...
  return(<></>) 
}
```
useSubscribe hook has 3 params: 
- expected appMessage;
- callback;
- priority(optional);

2. Send appMessage from another component or just function by calling ```sendMessage``` function

Example: 
```
import { sendMessage } from 'messenger'

function Sender() {
  sendMessage('appMessage', 'from sender')
  ...
  return(<></>) 
}
```
sendMessage function has 2 params: 
- appMessage to send;
- args;
