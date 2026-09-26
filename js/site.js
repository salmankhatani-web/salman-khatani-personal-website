/* Progressive enhancement: every idea and link exists in the initial HTML. */
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menu && nav) {
  const closeMenu = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('is-open', open); menu.setAttribute('aria-expanded', String(open)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
}
function enhanceTabs(root) {
  const list = root.querySelector('[data-tab-list]');
  const tabs = [...list.querySelectorAll('[data-tab]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  list.setAttribute('role', 'tablist');
  const vertical = list.classList.contains('tab-list');
  const direction = matchMedia('(min-width: 801px)');
  const orient = () => list.setAttribute('aria-orientation', vertical && direction.matches ? 'vertical' : 'horizontal');
  orient(); direction.addEventListener('change', orient);
  function select(index, focus = false) {
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; panels[i].hidden = i !== index; });
    root.querySelectorAll('[data-story-art]').forEach(art => { art.hidden = art.dataset.storyArt !== tabs[index].dataset.tab; });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    panels[i].setAttribute('role', 'tabpanel'); panels[i].setAttribute('aria-labelledby', tab.id); panels[i].tabIndex = 0;
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', e => {
      const isVertical = list.getAttribute('aria-orientation') === 'vertical';
      const next = isVertical ? 'ArrowDown' : 'ArrowRight'; const previous = isVertical ? 'ArrowUp' : 'ArrowLeft';
      let index;
      if (e.key === next) index = (i + 1) % tabs.length;
      if (e.key === previous) index = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') index = 0;
      if (e.key === 'End') index = tabs.length - 1;
      if (index !== undefined) { e.preventDefault(); select(index, true); }
    });
  });
  select(0);
}
document.querySelectorAll('[data-tabs]').forEach(enhanceTabs);
const signal = document.querySelector('[data-signal]');
if (signal) {
  const questions = [...signal.querySelectorAll('.signal-question')];
  const count = signal.querySelector('[data-count]');
  const pause = signal.querySelector('[data-pause]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer, paused = reduced.matches;
  function show(next, manual = false) { index = (next + questions.length) % questions.length; questions.forEach((q, i) => q.hidden = i !== index); count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`; if (manual) { signal.querySelector("[data-signal-announcement]").textContent = questions[index].textContent; paused = true; schedule(); } }
  function schedule() { clearInterval(timer); pause.textContent = paused ? 'Play' : 'Pause'; pause.setAttribute('aria-label', paused ? 'Play futures signals' : 'Pause futures signals'); if (!paused && !document.hidden && !signal.matches(':hover') && !signal.contains(document.activeElement)) timer = setInterval(() => show(index + 1), 12000); }
  signal.querySelector('[data-prev]').addEventListener('click', () => show(index - 1, true));
  signal.querySelector('[data-next]').addEventListener('click', () => show(index + 1, true));
  pause.addEventListener('click', () => { paused = !paused; schedule(); });
  ['mouseenter', 'mouseleave', 'focusin'].forEach(event => signal.addEventListener(event, schedule));
  signal.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { if (reduced.matches) paused = true; schedule(); });
  show(0); schedule();
}
const download = document.getElementById('ft-download');
if (download) download.addEventListener('click', () => {
  const fields = [['Future to explore','ft-topic'],['Scan / change or uncertainty','ft-driver'],['Imagine / contrasting futures','ft-scenario'],['Test / assumptions','ft-assumption'],['Backcast / first responsible step','ft-action']];
  const body = 'DESIGNING TOMORROW — OPEN COMPANION FUTURES PRACTICE WORKSHEET\nDr. Salman Ahmed Khatani | Futures Studies and Foresight\n\n' + fields.map(([name,id]) => name+'\n'+document.getElementById(id).value.trim()).join('\n\n') + '\n\nThis independent website companion activity is not the full book toolkit.';
  const url = URL.createObjectURL(new Blob([body], {type:'text/plain;charset=utf-8'}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'futures-practice-worksheet.txt'; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('ft-feedback').textContent = 'Worksheet downloaded locally; no responses were uploaded by this exercise.';
});
