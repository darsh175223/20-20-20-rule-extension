importScripts('firebaseConfig.js');
importScripts('lib/firebase-app.js', 'lib/firebase-auth.js', 'lib/firebase-firestore.js');

let timer;
let endTime;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isActive: false, endTime: null, sessions: 0, longBreak: false });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === '20-20-20-timer') {
    triggerOverlay();
  } else if (alarm.name === 'long-break-timer') {
    notifyLongBreak();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'triggerOverlay') {
    triggerOverlay();
  } else if (message.action === 'resetTimer') {
    resetTimer();
  } else if (message.action === 'logSession') {
    logSession();
  }
});

function startTimer() {
  chrome.storage.local.get(['endTime', 'sessions', 'longBreak'], (result) => {
    let workDuration = result.longBreak ? 10 * 60 * 1000 : 20 * 60 * 1000; // 20 minutes or 10 minutes for long break
    let endTime = result.endTime ? new Date(result.endTime) : new Date(Date.now() + workDuration);
    if (!result.endTime) {
      chrome.storage.local.set({ endTime: endTime.toISOString() });
    }
    chrome.alarms.create('20-20-20-timer', { when: endTime.getTime() });
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

function notifyLongBreak() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Time for a Longer Break',
    message: 'Take a 10-minute break to rest your eyes and relax!'
  });
}

function logSession() {
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('sessions').add({
        uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  });
}
