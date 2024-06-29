document.getElementById('signInButton').addEventListener('click', () => {
  chrome.tabs.create({ url: 'signIn.html' });
});

document.getElementById('saveSettings').addEventListener('click', () => {
  const workDuration = document.getElementById('workDuration').value;
  const breakDuration = document.getElementById('breakDuration').value;
  const sessionsBeforeLongBreak = document.getElementById('sessionsBeforeLongBreak').value;
  const longBreakDuration = document.getElementById('longBreakDuration').value;

  chrome.storage.local.set({
    workDuration: workDuration * 60 * 1000, // Convert to milliseconds
    breakDuration: breakDuration * 1000, // Convert to milliseconds
    sessionsBeforeLongBreak: parseInt(sessionsBeforeLongBreak),
    longBreakDuration: longBreakDuration * 60 * 1000 // Convert to milliseconds
  });
});

document.getElementById('darkMode').addEventListener('change', () => {
  const isDarkMode = document.getElementById('darkMode').checked;
  chrome.storage.local.set({ darkMode: isDarkMode });
  document.body.style.backgroundColor = isDarkMode ? 'black' : 'white';
  document.body.style.color = isDarkMode ? 'white' : 'black';
});

document.getElementById('analyticsButton').addEventListener('click', () => {
  chrome.tabs.create({ url: 'analytics.html' });
});

let activateButton = document.getElementById('activateButton');
let timerDiv = document.getElementById('timer');
let timerInterval;

chrome.storage.local.get(['isActive', 'endTime', 'darkMode', 'workDuration', 'breakDuration'], (result) => {
  document.getElementById('darkMode').checked = result.darkMode;
  document.body.style.backgroundColor = result.darkMode ? 'black' : 'white';
  document.body.style.color = result.darkMode ? 'white' : 'black';

  if (result.isActive) {
    activateButton.classList.add('active');
    activateButton.textContent = 'Deactivate';
    updateTimer(result.endTime, result.workDuration, result.breakDuration);
  } else {
    activateButton.classList.remove('active');
    activateButton.textContent = 'Activate';
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('settings').style.display = 'block';
      document.getElementById('analyticsButton').style.display = 'block';
    } else {
      document.getElementById('settings').style.display = 'none';
      document.getElementById('analyticsButton').style.display = 'none';
    }
  });
});

activateButton.addEventListener('click', () => {
  chrome.storage.local.get(['isActive', 'workDuration', 'breakDuration'], (result) => {
    if (result.isActive) {
      deactivate();
    } else {
      activate(result.workDuration, result.breakDuration);
    }
  });
});

function activate(workDuration, breakDuration) {
  activateButton.classList.add('active');
  activateButton.textContent = 'Deactivate';
  let endTime = new Date(Date.now() + workDuration);
  chrome.storage.local.set({ isActive: true, endTime: endTime.toISOString() });
  updateTimer(endTime.toISOString(), workDuration, breakDuration);
}

function deactivate() {
  activateButton.classList.remove('active');
  activateButton.textContent = 'Activate';
  clearInterval(timerInterval);
  timerDiv.textContent = '';
  chrome.storage.local.set({ isActive: false, endTime: null });
}

function updateTimer(endTime, workDuration, breakDuration) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    let remaining = new Date(endTime) - Date.now();
    if (isNaN(remaining)) {
      clearInterval(timerInterval);
      timerDiv.textContent = '0:00';
      triggerOverlay(breakDuration);
    } else {
      let minutes = Math.floor(remaining / 60000);
      let seconds = Math.floor((remaining % 60000) / 1000);
      timerDiv.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }, 1000);
}

function triggerOverlay(breakDuration) {
  chrome.runtime.sendMessage({ action: 'triggerOverlay', breakDuration: breakDuration });
}
