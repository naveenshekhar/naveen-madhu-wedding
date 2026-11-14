/* ======================================================================
   MY WEDDING INVITATION — INTERACTIVE ENGINE
   Animations, Music Player, Envelope Reveal, Event Modal, Countdown
   ====================================================================== */

/* ======================================================================
   EDIT WEDDING DETAILS HERE
   - time / venue left as null shows "to be confirmed" to guests
   - gallery: add photo paths, e.g. ["assets/photo-1.jpg", ...]
   ====================================================================== */

/* -* ---------------- small reusable pieces ---------------- */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ICON={
  bud:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 3c3 4 3.5 8.5 0 13-3.5-4.5-3-9 0-13z" fill="currentColor" fill-opacity=".18"/><path d="M12 16c-2-3-5.5-5-9-5 .6 4 4 6 9 5zM12 16c2-3 5.5-5 9-5-.6 4-4 6-9 5z"/><path d="M12 16v5"/></svg>`,
  pin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,
  cal:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>`,
  arch:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 38V20c0-4 3-6 5-7 1-4 4-7 7-9 3 2 6 5 7 9 2 1 5 3 5 7v18"/><path d="M13 38V22c0-3 2-4 3.5-5 .8-3 2.3-5 3.5-6 1.2 1 2.7 3 3.5 6 1.5 1 3.5 2 3.5 5v16"/><path d="M20 1v3"/></svg>`,
  close:`<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>`
};
const postmark=(e)=>{ const M=(e.month||"MAR").toUpperCase(), N=esc(e.name.toUpperCase()), ring=e.name.length<=8?`${N} · ${e.date} ${M} 2027 ·`:`${N} · ${e.date} ${M} ·`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
  <defs><path id="pm-${e.id}" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1 -72 0"/></defs>
  <circle class="seal" cx="50" cy="50" r="46" stroke="currentColor" stroke-width="2"/>
  <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text font-family="Cormorant Garamond, serif" font-weight="700" font-size="10.5" fill="currentColor" textLength="214" lengthAdjust="spacingAndGlyphs"><textPath href="#pm-${e.id}">${ring}</textPath></text>
  <text x="50" y="49" text-anchor="middle" font-family="Cormorant Garamond, serif" font-weight="700" font-size="20" fill="currentColor">${e.date}</text>
  <text x="50" y="62" text-anchor="middle" font-family="Cormorant Garamond, serif" font-weight="700" font-size="9" letter-spacing="2" fill="currentColor">${M}</text>
  <path d="M-8 44q8-5 16 0t16 0M-8 52q8-5 16 0t16 0M-8 60q8-5 16 0t16 0" fill="none" stroke="currentColor" stroke-width="1.3" transform="translate(-6 0)"/></svg>`; };
const dressChips=(e,lead='')=>`<span class="dress-chips">${e.dress.map(([c,t])=>`<span class="chip"><i class="${c}"></i>${lead}${esc(t)}</span>`).join('')}</span>`;
const longName=e=>e.name.length>20?'long':'';
const venueOf=e=>e.venue?WEDDING.venues[e.venue]:null;

document.documentElement.classList.add('js');
document.querySelectorAll('[data-orn]').forEach(el=>el.innerHTML=ICON[el.dataset.orn]);

/* the night scene breathes: stars twinkle, the moon glows, moonlight shimmers on the sea (lanterns stay still) */
(function night(){
  const st=$('#stageIn'); let h='<span class="moonglow"></span><span class="moonpath"></span>';
  for(let k=0;k<46;k++){ const x=(k*37.7)%100, y=(k*13.3)%30+1, sz=(k%3)+1;
    h+=`<span class="twk" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${sz}px;height:${sz}px;animation-delay:${(-(k*.37)%4).toFixed(2)}s;animation-duration:${(2.4+(k%5)*.6).toFixed(1)}s"></span>`; }
  st.insertAdjacentHTML('beforeend',h);
})();

/* home section: the lamps along the aisle light up, pair by pair, as the guest scrolls down */
(function lamps(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const st=$('#stageIn');
  // left %, top %, size %, all measured on the photo
  st.insertAdjacentHTML('beforeend',[[38.5,57.5,5],[61.3,58.4,5],[36.3,59.9,5.5],[63.9,61.7,5.5],[33.5,63.5,6],[66,64,6],[28.3,66.7,8],[70.4,67,8],[5.7,70.5,9],[94.5,70.6,9],[8.9,85.6,9],[91.4,85.5,9]]
    .map(([x,y,s],k)=>`<span class="lit" style="left:${x}%;top:${y}%;width:${s}%"><i class="glowlamp" style="--dl:${(-k*.6).toFixed(1)}s"></i></span>`).join(''));
  const ls=[...st.querySelectorAll('.lit')];
  let raf=0;
  const set=()=>{ raf=0; ls.forEach(l=>{ l.style.opacity=Math.max(0,Math.min(1,(.84-l.getBoundingClientRect().top/innerHeight)/.2)).toFixed(2); }); };
  const req=()=>{ if(!raf) raf=requestAnimationFrame(set); };
  addEventListener('scroll',req,{passive:true}); addEventListener('resize',req);
  set();
})();

/* petals drifting down the carpet */
(function hero(){

  const v=$('.vows');
  v.insertAdjacentHTML('afterbegin',Array.from({length:9},(_,k)=>`<span class="petal" aria-hidden="true" style="left:${(k*11+5)%96}%;--dx:${k%2?40:-40}px;--rot:${300+k*40}deg;animation-duration:${11+k%4*2.5}s;animation-delay:${-k*1.7}s;scale:${.8+(k%3)*.25}"></span>`).join(''));
})();



let currentTrackIndex = 0; // Default: शाही शहनाई
try {
  localStorage.removeItem('nm-wedding-melody');
  const savedTrack = sessionStorage.getItem('nm-wedding-melody');
  const foundIdx = MELODIES.findIndex(m => m.id === savedTrack);
  if (foundIdx !== -1) currentTrackIndex = foundIdx;
} catch(e) {}

const bgm = $('#bgm');
const musicPill = $('#musicPill');
const mBtn = $('#music');
const melodySelectBtn = $('#melodySelectBtn');
const melodyNameDisplay = $('#melodyNameDisplay');
const melodyModal = $('#melodyModal');
const melodyModalClose = $('#melodyModalClose');
const melodyModalBackdrop = $('#melodyModalBackdrop');
const melodyTracksList = $('#melodyTracksList');

let musicWanted = true;
try { if (localStorage.getItem('vu-music') === 'off') musicWanted = false; } catch(e) {}

function setMusicUI(on) {
  mBtn.classList.toggle('on', on);
  mBtn.setAttribute('aria-pressed', String(on));
  mBtn.setAttribute('aria-label', on ? 'Pause background music' : 'Play background music');
}

function fadeTo(v, ms = 900) {
  const s = bgm.volume, t0 = performance.now();
  const step = t => {
    const k = Math.min(1, (t - t0) / ms);
    bgm.volume = Math.min(1, Math.max(0, s + (v - s) * k));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function playMusic() {
  bgm.volume = 0;
  const p = bgm.play();
  setMusicUI(true);
  fadeTo(0.75, 1400);
  if (p && p.catch) p.catch(() => setMusicUI(false));
}

function pauseMusic() {
  bgm.pause();
  setMusicUI(false);
}

mBtn.addEventListener('click', () => {
  const on = bgm.paused;
  on ? playMusic() : pauseMusic();
  try { localStorage.setItem('vu-music', on ? 'on' : 'off'); } catch(e) {}
});

function renderMelodyTracks() {
  melodyTracksList.innerHTML = MELODIES.map((t, idx) => `
    <button class="track-item ${idx === currentTrackIndex ? 'active' : ''}" type="button" data-idx="${idx}">
      <div class="track-info">
        <div class="track-title-row">
          <svg class="lang-icon-sm" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
          <span class="track-title">${esc(t.title)}</span>
          <span class="track-native">(${esc(t.native)})</span>
        </div>
        <span class="track-tag">${esc(t.tag)}</span>
      </div>
      <div class="track-status-icon">
        ${idx === currentTrackIndex ? '<svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" opacity="0.6"><path d="M8 5v14l11-7z"/></svg>'}
      </div>
    </button>
  `).join('');

  melodyTracksList.querySelectorAll('.track-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx, 10);
      switchTrack(idx);
      closeMelodyModal();
    });
  });
}

function updateTrackUI() {
  const cur = MELODIES[currentTrackIndex];
  if (melodyNameDisplay) melodyNameDisplay.textContent = cur.title;
  renderMelodyTracks();
}

function switchTrack(idx) {
  if (idx < 0 || idx >= MELODIES.length) return;
  const wasPlaying = !bgm.paused;
  currentTrackIndex = idx;
  const cur = MELODIES[idx];
  try { sessionStorage.setItem('nm-wedding-melody', cur.id); } catch(e) {}
  updateTrackUI();

  // Crossfade switch
  fadeTo(0, 300);
  setTimeout(() => {
    bgm.src = cur.src;
    bgm.currentTime = 0;
    if (wasPlaying || musicWanted) {
      playMusic();
    }
  }, 320);
}

function openMelodyModal() {
  melodyModal.hidden = false;
  melodySelectBtn.setAttribute('aria-expanded', 'true');
  renderMelodyTracks();
}

function closeMelodyModal() {
  melodyModal.hidden = true;
  melodySelectBtn.setAttribute('aria-expanded', 'false');
}

if (melodySelectBtn) melodySelectBtn.addEventListener('click', openMelodyModal);
if (melodyModalClose) melodyModalClose.addEventListener('click', closeMelodyModal);
if (melodyModalBackdrop) melodyModalBackdrop.addEventListener('click', closeMelodyModal);

// Initial track setup
updateTrackUI();
bgm.src = MELODIES[currentTrackIndex].src;

document.addEventListener('visibilitychange', () => {
  if (document.hidden && !bgm.paused) {
    bgm.pause();
    bgm.dataset.resume = '1';
  } else if (!document.hidden && bgm.dataset.resume) {
    delete bgm.dataset.resume;
    bgm.play().catch(() => setMusicUI(false));
  }
});

/* timeline of stamps */
function stampHTML(e,i){
  const v=venueOf(e);
  return `<article class="ev rv" aria-label="${esc(e.name)}">
    <button class="stamp" type="button" data-i="${i}" aria-haspopup="dialog" aria-label="${esc(e.name)}, ${e.date} ${e.month||"March"}, ${esc(e.time)}${v?', '+esc(v.name):''}. Open details">
      <img class="stamp-bg" src="assets/images/stamp-bg.webp" alt="">
      <span class="postmark">${postmark(e)}</span>
      <span class="stamp-in">
        <span class="photo"><img src="${e.img}" alt="" loading="lazy" style="object-position:${e.pos}"><span class="tapview" aria-hidden="true"><span class="dot"></span>Tap to view</span></span>
        <span class="info">
          <h3 class="${longName(e)}">${esc(e.name)}</h3>
          <span class="when">${e.date} ${(e.month||"MAR").toUpperCase()} · ${esc(e.time.toUpperCase())}</span>
          ${e.timeNote?`<span class="tbc">${esc(e.timeNote)}</span>`:''}
          <span class="where">${v?esc(v.name):'Venue to be confirmed'}</span>
          ${e.venueNote?`<span class="tbc">${esc(e.venueNote)}</span>`:''}
          ${e.dress?dressChips(e,e.dress.length<2?'Dress code · ':''):''}
        </span>
      </span>
    </button>
    <div class="ev-actions">${v?`<a class="btn btn-map" href="${esc(v.map)}" target="_blank" rel="noopener">${ICON.pin}Directions</a>`:''}</div>
  </article>`;
}
$('#timeline').innerHTML=WEDDING.days.map(d=>`<div class="day">
  <div class="day-head rv"><span class="dot">${ICON.bud}</span><span class="num">${d.date}</span><span class="lbl"><b>${d.label}</b><span>${d.weekday}</span></span></div>
  ${WEDDING.events.map((e,i)=>e.date===d.date?stampHTML(e,i):'').join('')}
</div>`).join('');

/* ---------------- event sheet ---------------- */
const sheet=$('#sheet'), card=$('#sheetCard');
let lastTrigger=null;
function sheetHTML(e,i){
  const v=venueOf(e), ev=WEDDING.events, d=WEDDING.days.find(x=>x.date===e.date);
  return `<div class="grab" aria-hidden="true"></div>
    <button class="sheet-close" type="button" data-close aria-label="Close and return to the invitation">${ICON.close}</button>
    <div class="pic"><img src="${e.img}" alt="" style="object-position:${e.pos}"></div>
    <div class="body">
      <p class="eyebrow">${d?esc(d.weekday):''} · ${e.date} ${e.month||"March"} 2027</p>
      <h2 id="sh-title" class="${longName(e)}">${esc(e.name)}</h2>
      <div class="facts">
        <div class="fact">${ICON.cal}<div><b>${e.date} ${e.month||"March"} 2027</b><span>${d?esc(d.weekday):''}</span></div></div>
        <div class="fact">${ICON.clock}<div><b>${esc(e.time)}</b>${e.timeNote?`<span>${esc(e.timeNote)}</span>`:''}</div></div>
        <div class="fact">${ICON.pin}<div><b>${v?esc(v.name):'Venue to be confirmed'}</b>${v?(e.venueNote?`<span>${esc(e.venueNote)}</span>`:''):'<span>We will share it soon</span>'}</div></div>
      </div>
      ${e.dress?`<div class="dress-box"><p>${esc(e.name)} dress code</p>${dressChips(e)}</div>`:''}
      <div class="acts">
        ${v?`<a class="btn btn-map" href="${esc(v.map)}" target="_blank" rel="noopener">${ICON.pin}Get directions</a>`:''}
        <button class="btn btn-soft" type="button" data-close>Back to the invitation</button>
      </div>
      <div class="nav"><button type="button" data-go="${i-1}" ${i===0?'disabled':''}>‹ ${i>0?esc(ev[i-1].name):''}</button><button type="button" data-go="${i+1}" ${i===ev.length-1?'disabled':''}>${i<ev.length-1?esc(ev[i+1].name):''} ›</button></div>
    </div>`;
}
function openEvent(i,btn){
  sheet.classList.remove('carpet-sheet');
  if(btn) lastTrigger=btn;
  card.innerHTML=sheetHTML(WEDDING.events[i],i);
  card.scrollTop=0;
  if(!sheet.open){ sheet.showModal(); document.body.classList.add('locked'); requestAnimationFrame(()=>requestAnimationFrame(()=>sheet.classList.add('show'))); }
  $('.sheet-close',card).focus({preventScroll:true});
}
function closeEvent(){
  sheet.classList.remove('show');
  const done=()=>{ if(sheet.open) sheet.close(); };
  matchMedia('(prefers-reduced-motion: reduce)').matches?done():setTimeout(done,380);
}
sheet.addEventListener('close',()=>{document.body.classList.remove('locked'); lastTrigger&&lastTrigger.focus({preventScroll:true});});
sheet.addEventListener('cancel',e=>{e.preventDefault();closeEvent();});
$('#sheetStage').addEventListener('click',e=>{ if(e.target===e.currentTarget) closeEvent(); });
card.addEventListener('click',e=>{
  if(e.target.closest('[data-close]')) return closeEvent();
  const g=e.target.closest('[data-go]'); if(g) openEvent(+g.dataset.go);
});
$('#timeline').addEventListener('click',e=>{const b=e.target.closest('.stamp'); if(b) openEvent(+b.dataset.i,b);});

/* ---------------- envelope opening ---------------- */
const env=$('#env'), opener=$('#opener'), veil=$('#veil'), site=$('#site');
const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
$('.bokeh').innerHTML=[[22,58,9],[70,62,7],[38,70,12],[58,52,6],[82,70,10],[14,72,6],[48,60,8],[64,74,5]]
  .map(([x,y,s],k)=>`<i style="left:${x}%;top:${y}%;width:${s}%;aspect-ratio:1;animation-delay:${(.85+k*.09).toFixed(2)}s"></i>`).join('');
let opened=false;
function setSiteHidden(h){ site.inert=h; site.setAttribute('aria-hidden',h?'true':'false'); }
setSiteHidden(true); document.body.classList.add('locked');
const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(en=>{
  if(en.isIntersecting){en.target.classList.remove('pre');io.unobserve(en.target)}
}),{rootMargin:'0px 0px -10% 0px'}):null;
function markBelowFold(){
  if(!io) return;
  document.querySelectorAll('.rv').forEach(el=>{ if(el.getBoundingClientRect().top>innerHeight*0.9){el.classList.add('pre');io.observe(el)} });
}
function finishReveal(){
  opener.hidden=true; setSiteHidden(false); document.body.classList.remove('locked');
  scrollTo(0,0);
  if(!reduce()) markBelowFold();
  requestAnimationFrame(()=>{ document.documentElement.classList.add('revealed'); veil.classList.remove('on'); veil.classList.add('off'); });
  setTimeout(()=>veil.classList.remove('off'),500);
  const h=$('.hero h1'); if(h){ h.setAttribute('tabindex','-1'); h.focus({preventScroll:true}); }
}
function reveal(){
  if(opened) return; opened=true;
  musicPill.hidden=false; if(musicWanted) playMusic();
  if(reduce()){ veil.classList.add('on'); setTimeout(finishReveal,350); return; }
  env.classList.add('opening');
  setTimeout(()=>veil.classList.add('on'),850);
  setTimeout(finishReveal,1150);
}
env.addEventListener('click',reveal);
$('#replay').addEventListener('click',()=>{
  opened=false; env.classList.remove('opening'); document.documentElement.classList.remove('revealed');
  opener.hidden=false; setSiteHidden(true); document.body.classList.add('locked'); musicPill.hidden=true; pauseMusic();
  try { sessionStorage.removeItem('nm-wedding-melody'); } catch(e) {}
  switchTrack(0);
  env.querySelectorAll('.tap-glow,.pearl-ring').forEach(n=>{n.style.animation='none';n.offsetWidth;n.style.animation=''});
  env.focus();
});
/* ---------------- venues + directions pop-up ---------------- */
$('#vlist').innerHTML=Object.entries(WEDDING.venues).map(([k,v])=>`<div class="vrow rv"><b>${esc(v.name)}</b><span>${WEDDING.events.filter(e=>e.venue===k).map(e=>`${esc(e.name)} · ${e.date} ${e.month||"March"}`).join('  ·  ')}</span></div>`).join('');
{ const miss=WEDDING.events.filter(e=>!e.venue).map(e=>e.name); $('#vnote').textContent=miss.length?`The ${miss.join(' and ')} venue will be shared soon.`:''; }
function routeHTML(){
  return `<div class="grab" aria-hidden="true"></div>
    <button class="sheet-close" type="button" data-close aria-label="Close and return to the invitation">${ICON.close}</button>
    <div class="body"><p class="eyebrow">Directions</p><h2 id="sh-title">Venues</h2>
    ${Object.entries(WEDDING.venues).map(([k,v])=>`<div class="vcard"><h3>${esc(v.name)}</h3>
      <div class="for">${WEDDING.events.filter(e=>e.venue===k).map(e=>`<span>${esc(e.name)} · ${e.date} ${e.month||"March"}</span>`).join('')}</div>
      <a class="btn btn-map" href="${esc(v.map)}" target="_blank" rel="noopener">${ICON.pin}Open in Google Maps</a></div>`).join('')}
    ${WEDDING.events.some(e=>!e.venue)?`<p class="note">The ${WEDDING.events.filter(e=>!e.venue).map(e=>esc(e.name)).join(' and ')} venue will be shared soon.</p>`:''}
    <button class="btn btn-soft" type="button" data-close>Back to the invitation</button></div>`;
}
$('#routeBtn').addEventListener('click',e=>{
  lastTrigger=e.currentTarget; card.innerHTML=routeHTML(); card.scrollTop=0; sheet.classList.add('carpet-sheet');
  if(!sheet.open){ sheet.showModal(); document.body.classList.add('locked'); requestAnimationFrame(()=>requestAnimationFrame(()=>sheet.classList.add('show'))); }
  $('.sheet-close',card).focus({preventScroll:true});
});

/* ---------------- message, tips, links ---------------- */
$('#coupleMsg').innerHTML=`${esc(WEDDING.message)}<span class="sig">${WEDDING.signoff.map(esc).join('<br>')}</span>`;



/* ---------------- moments: a gentle endless auto-scroll; a touch pauses it ---------------- */
(function moments(){
  const box=$('#strip'), inner=$('#stripIn'), g=WEDDING.gallery;
  const one=g.map((src,i)=>`<img src="${esc(src)}" alt="Naveen and Madhu, photo ${i+1}" draggable="false">`).join('');
  if(g.length<2){ inner.innerHTML=one; box.classList.add('solo'); box.removeAttribute('tabindex'); $('.strip-hint').hidden=true; return; }
  inner.innerHTML=one+one.replace(/alt="[^"]*"/g,'alt="" aria-hidden="true"')+one.replace(/alt="[^"]*"/g,'alt="" aria-hidden="true"');
  if(reduce()) return;
  let paused=false, resumeT=0, last=0, pos=0;
  const pause=()=>{ paused=true; clearTimeout(resumeT); };
  const resume=()=>{ clearTimeout(resumeT); resumeT=setTimeout(()=>{ paused=false; pos=box.scrollLeft; },2200); };
  box.addEventListener('pointerdown',pause); box.addEventListener('touchstart',pause,{passive:true});
  box.addEventListener('pointerup',resume); box.addEventListener('touchend',resume); box.addEventListener('mouseleave',resume);
  box.addEventListener('focusin',pause); box.addEventListener('focusout',resume);
  const step=t=>{ const dt=last?Math.min(50,t-last):16; last=t;
    const third=inner.scrollWidth/3;
    if(!paused && third>box.clientWidth*.5){ pos+=dt*.035; if(pos>=third*2) pos-=third; box.scrollLeft=pos; }
    else if(paused){ if(box.scrollLeft>=third*2) box.scrollLeft-=third; if(box.scrollLeft<1) box.scrollLeft+=third; }
    requestAnimationFrame(step); };
  const start=()=>{ pos=inner.scrollWidth/3; box.scrollLeft=pos; requestAnimationFrame(step); };
  (document.readyState==='complete')?start():addEventListener('load',start);
})();

/* ---------------- countdown ---------------- */
(function countdown(){
  const el=$('#cd'), to=new Date(WEDDING.countdown.to).getTime();
  $('#cdTo').textContent=WEDDING.countdown.label;
  const cell=(v,l)=>`<div><b>${String(v).padStart(2,'0')}</b><span>${l}</span></div>`;
  const tick=()=>{ let s=Math.max(0,Math.floor((to-Date.now())/1000));
    if(!s){ el.innerHTML=cell(0,'Days')+cell(0,'Hours')+cell(0,'Mins')+cell(0,'Secs'); $('#cdTo').textContent='The celebrations have begun'; return; }
    el.innerHTML=cell(Math.floor(s/86400),'Days')+cell(Math.floor(s%86400/3600),'Hours')+cell(Math.floor(s%3600/60),'Mins')+cell(s%60,'Secs'); };
  tick(); setInterval(tick,1000);
})();

/* ---------------- 3D rooms follow the scroll, the finger and the phone tilt ---------------- */
(function rooms(){
  const rs=[...document.querySelectorAll('[data-room]')]; if(!rs.length||reduce()) return;
  let tx=0, ty=0;
  const set=()=>{ rs.forEach(r=>{ const b=r.getBoundingClientRect(); if(b.bottom<0||b.top>innerHeight) return;
      const p=Math.max(-1,Math.min(1,(b.top+b.height/2-innerHeight/2)/(innerHeight/2)));
      const sx=tx*4, sy=p*4+ty*2;
      r.style.setProperty('--L',(20+sx)+'%'); r.style.setProperty('--R',(80+sx)+'%');
      r.style.setProperty('--T',(13+sy)+'%'); r.style.setProperty('--B',(68+sy*.6)+'%');
      const f=r.querySelector('[data-fig]'); if(f) f.style.transform=`translateX(${tx*6}px) scale(${1.04-Math.abs(p)*.08})`; }); };
  let raf=0; const req=()=>{ if(!raf) raf=requestAnimationFrame(()=>{raf=0;set();}); };
  addEventListener('scroll',req,{passive:true}); addEventListener('resize',req);
  addEventListener('pointermove',e=>{ tx=(e.clientX/innerWidth-.5)*2; ty=(e.clientY/innerHeight-.5)*2; req(); },{passive:true});
  addEventListener('deviceorientation',e=>{ if(e.gamma==null) return; tx=Math.max(-1,Math.min(1,e.gamma/30)); ty=Math.max(-1,Math.min(1,(e.beta-45)/40)); req(); });
  set();
})();

/* the scroll cue fades once the guest starts scrolling, and returns at the very top */
(function(){
  const sl=$('.scroll-line'); if(!sl) return;
  const upd=()=>{ if(scrollY>40) sl.classList.add('seen'); sl.classList.toggle('gone',scrollY>40); };
  addEventListener('scroll',upd,{passive:true}); upd();
})();
