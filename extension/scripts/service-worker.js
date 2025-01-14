console.log('hello from service-worker.js');

const commands = {
  async init({tabId}) {
    try {
      await chrome.debugger.attach({ tabId }, "1.3");
    } catch (e) {
      console.error('error calling chrome.debugger.attach:', e);
    }
    try {
      console.log('Send Target.setAutoAttach');
      await chrome.debugger.sendCommand(
        { tabId: tabId },
        "Target.setAutoAttach",
        { autoAttach: true, waitForDebuggerOnStart: true, flatten: true }
      );
      console.log('after Send Target.setAutoAttach');
    } catch (e) {
      console.error('error trying to use chrome.debugger.sendCommand:', e);
    }
  },
};

/*
chrome.action.onClicked.addListener(function (tab) {
  if (tab.url.startsWith('http')) {
    chrome.debugger.attach({ tabId: tab.id }, '1.2', function () {
      chrome.debugger.sendCommand(
        { tabId: tab.id },
        'Network.enable',
        {},
        function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          }
        }
      );
    });
  } else {
    console.log('Debugger can only be attached to HTTP/HTTPS pages.');
  }
});

  await dp.Target.setAutoAttach({
      autoAttach: true, waitForDebuggerOnStart: true, flatten: true});

  session.evaluate(`
    window._worker = new Worker(
      'data:text/javascript,' +
          'console.log("Hello from worker!");'
    );
  `);

  const attached = (await dp.Target.onceAttachedToTarget()).params;

  testRunner.log(`Attached to ${attached.targetInfo.url}`);
  const wp = session.createChild(attached.sessionId).protocol;

  wp.Runtime.enable();
  let messageCount = 0;
  wp.Runtime.onConsoleAPICalled(event => {
    const message = event.params.args[0].value;
    testRunner.log(`[worker] ${message}`);
    if (++messageCount == 2)
      testRunner.completeTest();
  });
  wp.Runtime.evaluate({expression: `console.log("First post!")`});
  wp.Runtime.runIfWaitingForDebugger();    
  }
};
*/

console.log('addListener in service-worker.js');
chrome.runtime.onConnect.addListener(function(devToolsConnection) {

  console.log('devToolsConnected?:', devToolsConnection);

  // assign the listener function to a variable so we can remove it later
  const devToolsListener = function(msg, sender, sendResponse) {
    console.log('got message from devTools', msg);
    const {cmd, data} = msg;
    const fn = commands[cmd];
    if (!fn) {
      console.error('unknown command from devTools:', cmd, message);
      return;
    }
    fn(data, sender, sendResponse);
  };

  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(function() {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});
