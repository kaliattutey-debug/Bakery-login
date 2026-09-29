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
  const email = document.getElementById('email').value.trim();
  status.textContent = 'Warming the oven — signing you in…';
  try { sessionStorage.setItem('hc_user', email); } catch (err) {}
  setTimeout(() => { location.href = 'home.html'; }, 900);
});