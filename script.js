const toggleBtn = document.getElementById('toggleBtn');
const passInput = document.getElementById('pass');
toggleBtn.addEventListener('click', () => {
  const isPass = passInput.type === 'password';
  passInput.type = isPass ? 'text' : 'password';
  toggleBtn.textContent = isPass ? 'HIDE' : 'SHOW';
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.getElementById('status');
  status.textContent = 'Warming the oven — signing you in…';
  setTimeout(() => status.textContent = 'Welcome back. Fresh loaves await.', 900);
});