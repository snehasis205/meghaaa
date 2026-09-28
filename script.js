'use strict';
/* ============ EDIT ME: name, audio, messages ============ */
const CONFIG = {
  name: 'Megha',
  song: 'assets/megha-song.mp3',
  fallback: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // royalty-free demo track
};
const N = CONFIG.name;
// Each line: [text, optional class]  (soft = dim italic, big = glowing headline)
const T = {
  s1: [[`Hey ${N}…`], ['I know this is late.', 'soft'], ['Very late, actually.', 'soft'], ['Because your birthday was on 21st August.'], ['So technically… I owe you a proper surprise.']],
  s2: [['Before anything else…', 'soft'], ['I should probably explain something.'], ["I don't even know you for that long.", 'soft'], [`I just somehow started calling you ${N}.`], ['And now it feels weird to call you anything else.']],
  s2x: [['Some names are introduced.', 'soft'], ['Some names just happen.', 'soft'], [`${N} was definitely the second one.`]],
  orbs: ['New connections are weirdly exciting.', 'Sometimes one day is enough to make someone interesting.', 'Maybe this is one of those random little things worth exploring.', 'Some nicknames stick before you even decide on them.', 'No pressure. Just curiosity.'],
  s3: [["Yes, I'm late.", 'soft'], ['But I figured a normal “happy birthday” message wasn’t really enough.', 'soft']],
  s3b: [['Okay… now the actual surprise begins.']],
  q: [['What would you choose for a random evening?', ['Long drive 🚗', 'Movie 🎬', 'Food adventure 🍜', 'Just talk for hours 🌙']],
      ['Your perfect vibe?', ['Peaceful 🌿', 'Chaotic ⚡', 'Funny 😄', 'Mysterious 🌫️']],
      ['Pick one.', ['Rain 🌧️', 'Night sky 🌌', 'Beach 🏖️', 'Mountains 🏔️']],
      ['A perfect weekend morning?', ['Sleeping in 😴', 'Slow chai & quiet ☕', 'A tiny adventure 🧭', 'No plan at all 🎲']],
      ['The best kind of conversation?', ['Deep & thoughtful 💭', 'Silly & endless 😂', 'Random tangents 🌀', 'Honest & easy 🤍']]],
  qres: [['Interesting…', 'big'], ['Maybe I need to know you a little more.', 'soft']],
  low: 'Okay… apparently we need more practice 😭', mid: 'Not bad.', high: `Okay ${N}, that's suspiciously impressive 👀`,
  tot: [['Coffee ☕', 'Tea 🍵'], ['Sunrise 🌅', 'Sunset 🌇'], ['Calls 📞', 'Texts 💬'], ['Mountains 🏔️', 'Beach 🌊'], ['Late-night talks 🌙', 'Early-morning walks 🌤️'], ['Music 🎧', 'Movies 🎬']],
  s6: [['Okay… now I have a few things I definitely want to remember.', 'soft']],
  s7: [['Okay, enough games.', 'big'], ["Here's something you can actually listen to.", 'soft']],
  s7b: [['Maybe this song will make the surprise last a little longer.', 'soft']],
  s8: ["I know we've only known each other for a short while.", "So I don't want to pretend we already know everything about each other.", 'But sometimes, even a short time can be enough to make someone feel unexpectedly special.', "And maybe that's why I wanted to make this.", 'Not to make anything complicated.', 'Not to force anything.', 'Just to say…', "I'd genuinely like to know you better.", 'And maybe see where this little beginning takes us.'],
  s9: [['So…', 'soft'], ['Birthday surprise?'], ['Done.', 'big'], ['Games?'], ['Done.', 'big'], ['Song?'], ['Done.', 'big'], ["Now there's just one little thing left.", 'soft'], ['Should we see where this goes?', 'big']],
  no: ['That button is currently on a coffee break ☕', 'It went to get chai. Back never.', 'Shy today. Try the glowing one 😌', 'Error 404: courage not found.', 'This button has taken a vow of silence.'],
  s10: [['Okay… then let’s start with one thing.', 'soft'], ['Let’s get to know each other.', 'big'], ['No pressure.'], ['No expectations.'], ['Just one conversation at a time.'], ['Deal?', 'big']],
  fin: [[`Happy belated birthday, ${N}.`, 'big'], ["And thank you for becoming one of those unexpected little chapters I didn't know I needed."], ["Let's see what happens next.", 'soft']],
  eggs: { name: 'Okay, yes. I’m slightly obsessed with this nickname 😭', moon: 'The moon says: good things often begin on very ordinary days. 🌙', key: 'You typed the secret word. Fine, I practise spelling it too. 😌', heart: 'You found the hidden heart. Bonus wish: may this year surprise you, in the good way. 💫' }
};
/* ============ helpers ============ */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const wait = ms => sleep(RM ? Math.min(ms, 250) : ms);
const rev = el => { el.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in'))); };
const rand = (a, b) => a + Math.random() * (b - a);
async function say(box, lines, gap = 1700) {
  for (const [t, c] of lines) {
    const p = document.createElement('p'); p.className = 'line ' + (c || ''); p.textContent = t; box.appendChild(p);
    await sleep(50); p.classList.add('in'); await wait(gap);
  }
}
$$('.nm').forEach(e => e.textContent = N);
document.title = `For ${N} 🌙`;
let toastT; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 4800); }

/* ============ optional sound effects ============ */
let AC, soundOn = true;
function tone(f, d = .12, t = 0, type = 'sine', v = .05) {
  if (!soundOn) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume();
    const o = AC.createOscillator(), g = AC.createGain(), s = AC.currentTime + t;
    o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, s); g.gain.exponentialRampToValueAtTime(.0001, s + d);
    o.connect(g); g.connect(AC.destination); o.start(s); o.stop(s + d);
  } catch (e) { /* audio unsupported: ignore */ }
}
const sfx = { click: () => tone(620, .09), pop: () => tone(900, .08, 0, 'triangle'), ok: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .25, i * .09)), yes: () => [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, .45, i * .1, 'sine', .07)) };
$('#snd').onclick = () => { soundOn = !soundOn; $('#snd').textContent = soundOn ? '🔊' : '🔇'; $('#snd').setAttribute('aria-pressed', soundOn); if (soundOn) sfx.click(); };

/* ============ canvases: background + celebration ============ */
const dpr = Math.min(devicePixelRatio || 1, 2), bg = $('#bg'), b = bg.getContext('2d'), fx = $('#fx'), f = fx.getContext('2d');
let stars = [], hearts = [];
const newHeart = init => ({ x: rand(0, innerWidth), y: init ? rand(0, innerHeight) : innerHeight + 30, v: rand(.15, .45), sz: rand(10, 20), a: rand(.08, .3), p: rand(0, 6.28) });
function fit() {
  for (const [c, x] of [[bg, b], [fx, f]]) { c.width = innerWidth * dpr; c.height = innerHeight * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  stars = Array.from({ length: Math.round(innerWidth / 7) }, () => ({ x: rand(0, innerWidth), y: rand(0, innerHeight), r: rand(.3, 1.6), t: rand(0, 6.28), s: rand(.005, .025) }));
  hearts = Array.from({ length: 8 }, () => newHeart(true));
}
function drawBg() {
  b.clearRect(0, 0, innerWidth, innerHeight);
  for (const s of stars) { s.t += s.s; b.globalAlpha = .3 + .7 * Math.abs(Math.sin(s.t)); b.fillStyle = '#fff'; b.beginPath(); b.arc(s.x, s.y, s.r, 0, 6.28); b.fill(); }
  b.textAlign = 'center'; b.fillStyle = '#ff9ecb';
  for (const h of hearts) { h.y -= h.v; h.p += .01; h.x += Math.sin(h.p) * .3; if (h.y < -30) Object.assign(h, newHeart(false)); b.globalAlpha = h.a; b.font = h.sz + 'px serif'; b.fillText('♥', h.x, h.y); }
  b.globalAlpha = 1; if (!RM) requestAnimationFrame(drawBg);
}
let P = [], fxRun = false, party = false;
function addP(o) { P.push(Object.assign({ life: 1, g: .05, vr: 0, rot: 0, size: 3, kind: 'dot' }, o)); if (!fxRun) { fxRun = true; requestAnimationFrame(loopFx); } }
function firework(x, y, n = 36) {
  const c = ['#ffd9a0', '#ff9ecb', '#8f7bff', '#fff'][Math.floor(rand(0, 4))];
  for (let i = 0; i < n; i++) { const a = rand(0, 6.28), v = rand(1, 4.2); addP({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, c, decay: rand(.008, .018), size: rand(1.5, 3) }); }
}
function loopFx() {
  f.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = P.length - 1; i >= 0; i--) {
    const p = P[i]; p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += p.vr; p.life -= p.decay;
    if (p.life <= 0 || p.y > innerHeight + 40 || p.y < -60) { P.splice(i, 1); continue; }
    f.globalAlpha = Math.min(1, p.life * 1.6); f.fillStyle = p.c;
    if (p.kind === 'heart') { f.font = p.size + 'px serif'; f.textAlign = 'center'; f.fillText('♥', p.x, p.y); }
    else if (p.kind === 'rect') { f.save(); f.translate(p.x, p.y); f.rotate(p.rot); f.fillRect(-p.size, -p.size / 2, p.size * 2, p.size); f.restore(); }
    else { f.beginPath(); f.arc(p.x, p.y, p.size, 0, 6.28); f.fill(); }
  }
  f.globalAlpha = 1;
  if (P.length || party) requestAnimationFrame(loopFx); else { fxRun = false; f.clearRect(0, 0, innerWidth, innerHeight); }
}
function celebrate(ms = 9000) {
  if (RM) { firework(innerWidth / 2, innerHeight / 3, 30); return; }
  party = true; const end = Date.now() + ms, cols = ['#ffd9a0', '#ff9ecb', '#8f7bff', '#fff', '#7fe0ff'];
  const id = setInterval(() => {
    if (Date.now() > end) { clearInterval(id); party = false; return; }
    for (let i = 0; i < 3; i++) addP({ x: rand(0, innerWidth), y: -10, vx: rand(-1, 1), vy: rand(1, 3), g: .02, c: cols[Math.floor(rand(0, 5))], kind: 'rect', size: rand(3, 6), vr: rand(-.2, .2), decay: .004 });
    if (Math.random() < .35) addP({ x: rand(0, innerWidth), y: innerHeight + 10, vx: rand(-.5, .5), vy: rand(-3, -1.5), g: -.005, c: '#ff9ecb', kind: 'heart', size: rand(16, 30), decay: .006 });
    if (Math.random() < .12) firework(rand(innerWidth * .15, innerWidth * .85), rand(innerHeight * .12, innerHeight * .5));
  }, 90);
  firework(innerWidth / 2, innerHeight / 3, 60);
}
addEventListener('resize', fit); fit(); drawBg();

/* ============ cursor + ripple ============ */
if (matchMedia('(pointer:fine)').matches) {
  document.body.classList.add('fine'); const cu = $('#cursor');
  addEventListener('pointermove', e => { cu.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
}
document.addEventListener('pointerdown', e => {
  const t = e.target.closest('.btn,.opt,.pick,.no'); if (!t) return; const r = t.getBoundingClientRect(), s = document.createElement('span');
  s.className = 'rip'; s.style.left = e.clientX - r.left + 'px'; s.style.top = e.clientY - r.top + 'px'; t.appendChild(s); setTimeout(() => s.remove(), 650);
});

/* ============ screen router ============ */
const scr = $$('.screen'), inits = {}; let cur = 0, busy = false, initialized = new Set();
async function go(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n < 1 || n > scr.length || busy || n === cur + 1) return;
  busy = true;
  const current = scr[cur];
  current.classList.add('leave');
  await sleep(RM ? 0 : 600);
  current.classList.remove('active', 'leave');
  cur = n - 1;
  const next = scr[cur];
  next.classList.add('active');
  $('#prog').textContent = String(n).padStart(2, '0') + ' / ' + String(scr.length).padStart(2, '0');
  window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
  busy = false;
  // Run each screen's setup once. This prevents duplicate timers, handlers, and text
  // when a user navigates with rapid clicks or browser restoration.
  if (inits[n] && !initialized.has(n)) { initialized.add(n); void inits[n](); }
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  if (!g || g.hidden || g.disabled) return;
  sfx.click();
  void go(g.dataset.go);
});

/* ---- 1 ---- */
inits[1] = async () => { await say($('#l1'), T.s1); rev($('#open')); };
/* ---- 2 ---- */
inits[2] = async () => { await sleep(500); await say($('#l2'), T.s2); rev($('#why')); };
$('#why').onclick = async () => {
  sfx.click(); $('#why').hidden = true; await say($('#ex'), T.s2x, 1500);
  const box = $('#orbs'); $('#orbWrap').hidden = false;
  [[6, 20], [27, 62], [48, 6], [68, 58], [86, 14]].forEach(([x, y], k) => {
    const o = document.createElement('button'); o.className = 'orb'; o.textContent = ['✨', '☁️', '⭐', '🌙', '☁️'][k];
    o.style.cssText = `left:${x}%;top:${y}%;animation-delay:${k * .7}s`; o.setAttribute('aria-label', 'Reveal a little message');
    o.onclick = () => { sfx.pop(); const w = $('#whisper'); w.style.opacity = 0; setTimeout(() => { w.textContent = T.orbs[k]; w.style.opacity = 1; }, 250); o.classList.add('used'); };
    box.appendChild(o);
  });
  rev($('#to3'));
};
/* ---- 3 ---- */
inits[3] = async () => { await sleep(500); await say($('#l3'), T.s3, 2000); $('#cakeBox').hidden = false; };
let blown = false;
async function blow() {
  if (blown) return; blown = true; sfx.pop();
  $('#flame').classList.add('out'); $('#smoke').classList.add('on'); $('#cakeHint').hidden = true;
  const r = $('#candle').getBoundingClientRect(); firework(r.left + r.width / 2, r.top, 30);
  await wait(1500); await say($('#l3b'), T.s3b, 1200); rev($('#to4'));
}
$('#candle').onclick = blow;
$('#candle').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blow(); } };
/* ---- 4 quiz ---- */
inits[4] = () => {
  const ans = []; let i = 0; const box = $('#quiz');
  const render = () => {
    $('#qn').textContent = `Question ${i + 1} of ${T.q.length}`; const [q, o] = T.q[i];
    box.innerHTML = `<div class="fade"><p class="q"></p><div class="opts"></div></div>`; box.querySelector('.q').textContent = q;
    o.forEach((t, k) => {
      const bt = document.createElement('button'); bt.className = 'opt'; bt.textContent = 'ABCD'[k] + '.  ' + t;
      bt.onclick = async () => { sfx.click(); bt.classList.add('sel'); $$('#quiz .opt').forEach(x => x.disabled = true); ans.push(k); await sleep(RM ? 100 : 550); ++i < T.q.length ? render() : finish(); };
      box.querySelector('.opts').appendChild(bt);
    });
  };
  const finish = async () => {
    sfx.ok(); box.hidden = true; $('#qn').hidden = true; await say($('#qres'), T.qres, 1600);
    const s = ans.reduce((a, c) => a + c, 0), M = [['Curiosity Level', 86 + (s * 7) % 13, '👀'], ['Potential for random conversations', 90 + (s * 3) % 10, 'dangerously high.'], ['Plot-twist energy', 55 + (s * 11 + ans[1] * 9) % 40, '']];
    const w = document.createElement('div'); w.className = 'glass card'; w.innerHTML = '<h3>Vibe Meter</h3>';
    M.forEach(([n, v, x]) => { const d = document.createElement('div'); d.className = 'meter'; d.innerHTML = `<span>${n}: ${v}% ${x}</span><div class="bar"><i></i></div>`; w.appendChild(d); d.dataset.v = v; });
    w.insertAdjacentHTML('beforeend', '<p class="hint">0% scientific. 100% for fun.</p>'); $('#qres').appendChild(w);
    setTimeout(() => $$('#qres .meter').forEach(d => d.querySelector('i').style.width = d.dataset.v + '%'), 100);
    await wait(2200); rev($('#to5'));
  };
  render();
};
/* ---- 5 hearts: deterministic touch/click game ---- */
let heartGameRunning = false;
let heartGameTimer = null;
let heartGameSpawnTimer = null;
let heartGameEndAt = 0;
let heartGameScore = 0;
let heartGameSpawnSeq = 0;

function clearHeartGame() {
  clearInterval(heartGameTimer);
  clearTimeout(heartGameSpawnTimer);
  heartGameTimer = null;
  heartGameSpawnTimer = null;
  $('#arena').querySelectorAll('.heart').forEach(h => h.remove());
}

function finishHeartGame() {
  if (!heartGameRunning) return;
  heartGameRunning = false;
  clearHeartGame();
  const score = heartGameScore;
  $('#ht').textContent = '0';
  sfx.ok();
  $('#gres').textContent = `${score} hearts. ` + (score < 8 ? T.low : score < 18 ? T.mid : T.high);
  $('#gstart').textContent = 'Play again ✨';
  rev($('#gstart'));
  rev($('#to6'));
}

function spawnCatchableHeart() {
  const ar = $('#arena');
  if (!heartGameRunning || !ar || ar.clientWidth < 40 || ar.clientHeight < 40) return;

  const h = document.createElement('button');
  h.type = 'button';
  h.className = 'heart';
  h.textContent = ['♥', '💗', '💖', '💜'][Math.floor(Math.random() * 4)];
  h.setAttribute('aria-label', 'Catch heart');
  h.dataset.caught = '0';
  h.style.setProperty('--x', `${Math.max(8, Math.random() * (ar.clientWidth - 52))}px`);
  h.style.setProperty('--y', `${Math.max(8, Math.random() * (ar.clientHeight - 62))}px`);
  h.style.setProperty('--size', `${34 + Math.random() * 18}px`);

  const seq = ++heartGameSpawnSeq;
  const catchHeart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!heartGameRunning || h.dataset.caught === '1') return;
    h.dataset.caught = '1';
    heartGameScore += 1;
    $('#hc').textContent = String(heartGameScore);
    sfx.pop();
    h.classList.add('pop');
    setTimeout(() => h.remove(), 180);
  };

  // pointerdown is the primary control for mouse, touch and pen.
  h.addEventListener('pointerdown', catchHeart, { passive: false });
  // click is a keyboard/accessibility fallback, but cannot double-score.
  h.addEventListener('click', catchHeart);
  h.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') catchHeart(e);
  });

  ar.appendChild(h);

  // Every heart expires on its own timer. The game never depends on CSS animation events.
  setTimeout(() => {
    if (h.isConnected && h.dataset.caught !== '1') {
      h.classList.add('expire');
      setTimeout(() => h.remove(), 140);
    }
  }, 1150 + Math.random() * 500);
}

function scheduleHeartSpawn() {
  if (!heartGameRunning) return;
  spawnCatchableHeart();
  heartGameSpawnTimer = setTimeout(scheduleHeartSpawn, 320 + Math.random() * 230);
}

inits[5] = () => {
  // The Start button must be visible when Screen 5 opens, including after browser back/forward restoration.
  const btn = $('#gstart');
  btn.hidden = false;
  btn.classList.add('in');
  if (!heartGameRunning) {
    $('#hc').textContent = '0';
    $('#ht').textContent = '20';
  }
};

$('#gstart').onclick = () => {
  if (heartGameRunning) return;
  clearHeartGame();
  heartGameRunning = true;
  heartGameScore = 0;
  heartGameSpawnSeq = 0;
  heartGameEndAt = performance.now() + 20000;
  sfx.click();

  const ar = $('#arena');
  ar.innerHTML = '';
  $('#hc').textContent = '0';
  $('#ht').textContent = '20';
  $('#gres').textContent = 'Go! Catch the glowing hearts 💗';
  $('#gstart').hidden = true;
  $('#to6').hidden = true;
  $('#gstart').classList.remove('in');
  $('#to6').classList.remove('in');

  scheduleHeartSpawn();
  heartGameTimer = setInterval(() => {
    const left = Math.max(0, Math.ceil((heartGameEndAt - performance.now()) / 1000));
    $('#ht').textContent = String(left);
    if (left <= 0) finishHeartGame();
  }, 120);
};

/* ---- 6 this or that ---- */
inits[6] = () => {
  const box = $('#tot'), picks = []; let i = 0;
  const render = () => {
    $('#tn').textContent = `${i + 1} of ${T.tot.length}`; box.innerHTML = '<div class="pair fade"></div>'; const pr = box.firstChild;
    T.tot[i].forEach((t, k) => {
      const bt = document.createElement('button'); bt.className = 'pick'; bt.textContent = t;
      bt.onclick = async () => { sfx.click(); bt.classList.add('sel'); $$('#tot .pick').forEach(x => { x.disabled = true; if (x !== bt) x.classList.add('gone'); });
        picks.push(t); const c = document.createElement('span'); c.textContent = t; $('#chips').appendChild(c); await sleep(RM ? 100 : 650); ++i < T.tot.length ? render() : done(); };
      pr.appendChild(bt); if (!k) pr.insertAdjacentHTML('beforeend', '<span>or</span>');
    });
  };
  const done = async () => { sfx.ok(); box.hidden = true; $('#tn').hidden = true; await say($('#l6'), T.s6, 1800); rev($('#to7')); };
  render();
};
/* ---- 7 song ---- */
const au = $('#au'); let fb = false, want = false;
au.src = CONFIG.song; au.volume = .8;
const fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
au.addEventListener('error', () => {
  if (!fb) { fb = true; au.src = CONFIG.fallback; au.load(); $('#astat').textContent = `Playing a temporary track. Add ${CONFIG.song} for the real song.`; if (want) au.play().catch(() => { }); }
  else { $('#astat').textContent = `Couldn't load any audio. Check ${CONFIG.song} and your connection.`; $('#pp').textContent = '▶'; document.body.classList.remove('playing'); }
});
au.addEventListener('loadedmetadata', () => $('#dur').textContent = fmt(au.duration));
au.addEventListener('timeupdate', () => { $('#cur').textContent = fmt(au.currentTime); if (au.duration) $('#seek').value = au.currentTime / au.duration * 1000; });
au.addEventListener('play', () => { $('#pp').textContent = '❚❚'; $('#pp').setAttribute('aria-label', 'Pause'); document.body.classList.add('playing'); });
['pause', 'ended'].forEach(ev => au.addEventListener(ev, () => { $('#pp').textContent = '▶'; $('#pp').setAttribute('aria-label', 'Play'); document.body.classList.remove('playing'); }));
$('#pp').onclick = () => { if (au.paused) { want = true; au.play().catch(() => { }); } else { want = false; au.pause(); } };
$('#seek').oninput = e => { if (au.duration) au.currentTime = e.target.value / 1000 * au.duration; };
$('#vol').oninput = e => au.volume = e.target.value;
const bars = Array.from({ length: 28 }, () => { const i = document.createElement('i'); $('#viz').appendChild(i); return i; });
setInterval(() => bars.forEach((x, k) => x.style.height = (au.paused ? 6 : 8 + Math.abs(Math.sin(Date.now() / 260 + k * .6)) * rand(10, 38)) + 'px'), 130);
inits[7] = async () => { await say($('#l7'), T.s7, 1500); $('#player').hidden = false; await wait(1800); await say($('#l7b'), T.s7b, 1200); rev($('#to8')); };
/* ---- 8 letter ---- */
inits[8] = async () => {
  const L = $('#letter'); await sleep(700);
  for (const t of T.s8) { const p = document.createElement('p'); p.className = 'line'; p.textContent = t; L.appendChild(p); await sleep(60); p.classList.add('in'); await wait(2500); }
  rev($('#to9'));
};
/* ---- 9 the question ---- */
inits[9] = async () => {
  const m = $('#mid'); m.classList.add('on'); await wait(2400);
  await say($('#l9'), T.s9, 1150); rev($('#choice'));
};
let nn = 0; const no = $('#no');
function dodge() {
  const tip = $('#tip'); tip.textContent = T.no[nn++ % T.no.length];
  no.classList.remove('wob'); void no.offsetWidth; no.classList.add('wob');
  const lim = Math.min(120, innerWidth / 2 - 60); no.style.transform = `translate(${rand(-lim, lim)}px,${rand(-30, 40)}px)`;
}
no.addEventListener('pointerenter', dodge); no.addEventListener('pointerdown', e => { e.preventDefault(); dodge(); }); no.addEventListener('click', dodge);
$('#yes').onclick = () => { sfx.yes(); celebrate(); go(10); };
/* ---- 10 celebration ---- */
inits[10] = async () => { await wait(1800); await say($('#l10'), T.s10, 1700); rev($('#final')); };
$('#final').onclick = async () => {
  sfx.yes(); $('#final').hidden = true; celebrate(4500); $('#l10').style.display = 'none'; await wait(800); await say($('#fin'), T.fin, 2600);
};

/* ============ easter eggs ============ */
let taps = 0; $('#nameTap').onclick = () => { if (++taps === 7) { toast(T.eggs.name); sfx.ok(); taps = 0; } };
$('#moon').onclick = () => { sfx.pop(); toast(T.eggs.moon); };
$('#hh').onclick = () => { sfx.ok(); toast(T.eggs.heart); firework(innerWidth - 40, innerHeight - 40, 24); };
let kb = ''; addEventListener('keydown', e => { if (e.key.length !== 1) return; kb = (kb + e.key.toLowerCase()).slice(-N.length); if (kb === N.toLowerCase()) { toast(T.eggs.key); sfx.ok(); kb = ''; } });
// (5th egg: the "Still here? I knew you were curious" midnight transition before the big question)

/* ============ start ============ */
setTimeout(() => { $('#loader').classList.add('gone'); initialized.add(1); void inits[1](); }, 1400);
