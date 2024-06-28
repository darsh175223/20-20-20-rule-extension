chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isActive: false, endTime: null });
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === '20-20-20-timer') {
      triggerOverlay();
    }
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'triggerOverlay') {
      triggerOverlay();
    } else if (message.action === 'resetTimer') {
      resetTimer();
    }
  });
  
  function startTimer() {
    chrome.storage.local.get(['autoStart'], (result) => {
      const autoStart = result.autoStart || false; // Default to disabled autoStart
      if (autoStart) {
        chrome.storage.local.get(['endTime'], (result) => {
          let endTime = result.endTime ? new Date(result.endTime) : new Date(Date.now() + 20 * 60 * 1000);
          if (!result.endTime) {
            chrome.storage.local.set({ endTime: endTime.toISOString() });
          }
          chrome.alarms.create('20-20-20-timer', { when: endTime.getTime() });
        });
      }
    });
  }
  
  function stopTimer() {
    chrome.alarms.clear('20-20-20-timer');
    chrome.storage.local.set({ endTime: null });
  }
  
  function resetTimer() {
    stopTimer();
    startTimer();
  }
  
  function triggerOverlay() {
    chrome.storage.local.get(['isActive'], (result) => {
      if (result.isActive) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
          });
        });
      }
    });
  }
  
  // You'll need to create a separate content.js file to handle displaying the overlay on the webpage.
  