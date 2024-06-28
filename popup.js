let activateButton = document.getElementById('activateButton');
let timerDiv = document.getElementById('timer');
let timerInterval;

chrome.storage.local.get(['isActive', 'endTime'], (result) => {
  if (result.isActive) {
    activateButton.classList.add('active');
    activateButton.textContent = 'Deactivate';
    updateTimer(result.endTime);
  } else {
    activateButton.classList.remove('active');
    activateButton.textContent = 'Activate';
  }
});

activateButton.addEventListener('click', () => {
  chrome.storage.local.get(['isActive'], (result) => {
    if (result.isActive) {
      deactivate();
    } else {
      activate();
    }
  });
});

function activate() {
  activateButton.classList.add('active');
  activateButton.textContent = 'Deactivate';
  let endTime = new Date(Date.now() + 20 * 60 * 1000);
  chrome.storage.local.set({ isActive: true, endTime: endTime.toISOString() });
  updateTimer(endTime.toISOString());
}

function deactivate() {
  activateButton.classList.remove('active');
  activateButton.textContent = 'Activate';
  clearInterval(timerInterval);
  timerDiv.textContent = '';
  chrome.storage.local.set({ isActive: false, endTime: null });
}

function updateTimer(endTime) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    let remaining = new Date(endTime) - Date.now();
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerDiv.textContent = '0:00';
      triggerOverlay();
    } else {
      let minutes = Math.floor(remaining / 60000);
      let seconds = Math.floor((remaining % 60000) / 1000);
      timerDiv.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }, 1000);
}

function triggerOverlay() {
  chrome.runtime.sendMessage({ action: 'triggerOverlay' });
}
