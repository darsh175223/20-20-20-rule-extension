chrome.storage.local.get(['isActive'], (result) => {
  if (result.isActive) {
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.color = 'green';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.fontSize = '48px';
    overlay.style.zIndex = '9999';
    document.body.appendChild(overlay);

    let countdown = 20;
    overlay.textContent = countdown;

    let countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        overlay.remove();
        resetTimer();
      } else {
        overlay.textContent = countdown;
      }
    }, 1000);

    overlay.addEventListener('click', () => {
      clearInterval(countdownInterval);
      overlay.remove();
      resetTimer();
    });
  }
});

function resetTimer() {
  chrome.runtime.sendMessage({ action: 'resetTimer' });
}
