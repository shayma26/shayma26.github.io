
/* ---------------- wire config into the page ---------------- */
document.getElementById('coverTitle').textContent = `${CONFIG.groomName} و ${CONFIG.brideName}`;
document.getElementById('familiesLine').innerHTML =
  `تتشرف عائلة <br/><br/> <b>${CONFIG.brideFamily}</b><br> بدعوتكم لحضور حفل عقد قران ابنتهما`;
// document.getElementById('groomName').textContent = CONFIG.groomName;
document.getElementById('brideName').textContent = CONFIG.brideName;
document.getElementById('dateDisplay').textContent = CONFIG.dateDisplay;
document.getElementById('timeDisplay').textContent = CONFIG.timeDisplay;
document.getElementById('venueName').textContent = CONFIG.venueName;
document.getElementById('venueCity').textContent = CONFIG.venueCity;
document.getElementById('mapLink').href =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.venueMapQuery)}`;

const bgMusic = document.getElementById('bgMusic');
bgMusic.querySelector('source').src = CONFIG.musicSrc;
bgMusic.load();

/* ---------------- open interaction ---------------- */
const cardWrap = document.getElementById('cardWrap');
const coverBtn = document.getElementById('coverBtn');
let opened = false;

function openInvitation(){
  if(opened) return;
  opened = true;
  cardWrap.classList.add('opened');
  bgMusic.play().catch(()=>{ /* autoplay blocked; user can use the sound toggle */ });
}
coverBtn.addEventListener('click', openInvitation);
coverBtn.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') openInvitation(); });

/* ---------------- sound toggle ---------------- */
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');
soundToggle.addEventListener('click', ()=>{
  if(bgMusic.paused){
    bgMusic.play().catch(()=>{});
    soundIcon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>';
  } else {
    bgMusic.pause();
    soundIcon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
  }
});

/* ---------------- countdown ---------------- */
const target = new Date(CONFIG.weddingDateTime).getTime();
const els = {
  d: document.getElementById('cd-days'),
  h: document.getElementById('cd-hours'),
  m: document.getElementById('cd-mins'),
  s: document.getElementById('cd-secs')
};
function pad(n){ return String(n).padStart(2,'0'); }
function tick(){
  const diff = target - Date.now();
  if(diff <= 0){
    els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = '00';
    document.querySelector('.countdown-label').textContent = 'تم عقد القران بحمد الله 🎉';
    clearInterval(timer);
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  els.d.textContent = pad(d);
  els.h.textContent = pad(h);
  els.m.textContent = pad(m);
  els.s.textContent = pad(s);
}
tick();
const timer = setInterval(tick, 1000);
