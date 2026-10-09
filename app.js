const stepEmail = document.getElementById('stepEmail');
const stepLink  = document.getElementById('stepLink');
const progress  = document.getElementById('progress');
const success   = document.getElementById('success');
const fill      = document.querySelector('.fill');
const status    = document.getElementById('status');

// --- Step 1: submit email ---
stepEmail.addEventListener('submit', async (e) => {
  e.preventDefault();
  stepEmail.classList.add('hidden');
  progress.classList.remove('hidden');
  await runProgress([
    'Sending magic link…',
    'Checking inbox delivery…',
    'Link sent ✔'
  ]);
  progress.classList.add('hidden');
  stepLink.classList.remove('hidden');
});

// --- Step 2: submit magic link / code ---
stepLink.addEventListener('submit', async (e) => {
  e.preventDefault();
  stepLink.classList.add('hidden');
  progress.classList.remove('hidden');
  await runProgress([
    'Verifying magic link…',
    'Validating token…',
    'Generating 1 Month license…',
    'Activating Premium…',
    'Finalizing…'
  ]);
  progress.classList.add('hidden');
  success.classList.remove('hidden');
});

// --- Back button ---
document.getElementById('backBtn').addEventListener('click', () => {
  stepLink.classList.add('hidden');
  stepEmail.classList.remove('hidden');
  document.getElementById('magic').value = '';
});

// --- Progress bar helper ---
function runProgress(steps) {
  return new Promise(resolve => {
    fill.style.width = '0%';
    let i = 0;
    const tick = setInterval(() => {
      fill.style.width = ((i + 1) / steps.length * 100) + '%';
      status.textContent = steps[i];
      i++;
      if (i >= steps.length) { clearInterval(tick); setTimeout(resolve, 450); }
    }, 850);
  });
}