// Greeting from the signed-in email
let user = '';
try { user = sessionStorage.getItem('hc_user') || ''; } catch (e) {}
const name = user.split('@')[0].replace(/[._-]+/g, ' ').trim();
if (name) {
  document.getElementById('greeting').textContent =
    'Welcome back, ' + name.charAt(0).toUpperCase() + name.slice(1);
}

// Sign out
document.getElementById('signout').addEventListener('click', () => {
  try { sessionStorage.removeItem('hc_user'); } catch (e) {}
  location.href = 'index.html';
});

// Nav turns solid after the hero
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 60);

// Parallax on the oven band
const plx = document.querySelector('[data-parallax]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;
function frame() {
  onScroll();
  if (plx && !reduce) {
    const r = plx.parentElement.getBoundingClientRect();
    const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -0.12;
    plx.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
  }
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
frame();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Bake list reservations (saved in this browser)
const KEY = 'hc_reserved';
let reserved = [];
try { reserved = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
const total = document.getElementById('bakeTotal');
function paint() {
  document.querySelectorAll('#bakeList li').forEach(li => {
    const on = reserved.includes(li.dataset.id);
    const b = li.querySelector('.reserve');
    b.classList.toggle('on', on);
    b.textContent = on ? 'Reserved ✓' : 'Reserve';
  });
  total.textContent = reserved.length
    ? reserved.length + (reserved.length === 1 ? ' item' : ' items') + ' reserved for tomorrow.'
    : 'Nothing reserved yet.';
}
document.getElementById('bakeList').addEventListener('click', (e) => {
  const b = e.target.closest('.reserve');
  if (!b) return;
  const id = b.closest('li').dataset.id;
  reserved = reserved.includes(id) ? reserved.filter(x => x !== id) : [...reserved, id];
  try { localStorage.setItem(KEY, JSON.stringify(reserved)); } catch (err) {}
  paint();
});
paint();