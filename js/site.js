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

/* Curated video layer: one muted autoplay feature on the homepage; every other video is user-initiated. */
(() => {
  const script = [...document.scripts].find(s => /\/js\/site\.js(?:\?|$)/.test(s.src));
  if (script && !document.querySelector('link[data-video-showcase]')) {
    const root = new URL('../', script.src);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('css/video-showcase-2026-10-12.css', root).href;
    link.dataset.videoShowcase = 'true';
    document.head.append(link);
  }
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const markup = (autoplay = false) => {
    const auto = autoplay && !reducedMotion;
    const params = `rel=0&playsinline=1&controls=1${auto ? '&autoplay=1&mute=1' : ''}`;
    return `<div class="video-head"><div><span class="eyebrow">Watch · Listen · Explore</span><h2>Ideas in motion.</h2></div><p>Selected public video records showing Dr. Salman Ahmed Khatani's work across AI literacy, futures practice and public dialogue.</p></div>
    <div class="video-showcase-grid">
      <article class="video-feature">
        <div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/_To1rQ37xVo?${params}" title="Dr. Salman Ahmed Khatani — AI Foundations and Large Language Models" loading="${auto ? 'eager' : 'lazy'}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
        <div class="video-copy"><span class="eyebrow">Featured · YouTube · AI literacy</span><h3>AI Foundations + Large Language Models</h3><p>Lecture 1 of the AI Generalist Roadmap: a practical introduction to artificial intelligence, LLMs and responsible starting points for learners.</p></div>
      </article>
      <div class="video-side">
        <a class="video-link-card" href="https://www.teachthefuture.org/video" target="_blank" rel="noopener noreferrer" aria-label="Play World Futures Day 2026 session on Teach the Future"><span class="play-button" aria-hidden="true"><span>▶</span></span><span class="video-source">Teach the Future · 53:39</span><strong>AI Futures for Social Good</strong><small>World Futures Day 2026 · Co-facilitated public futures session</small></a>
        <a class="video-link-card" href="https://www.linkedin.com/posts/salman-khatani-12ab8346_drsalmanahmedkhatani-airevolution-artificialintelligence-activity-7443323209032249344-sPbK" target="_blank" rel="noopener noreferrer" aria-label="Play AI Revolution video on LinkedIn"><span class="play-button" aria-hidden="true"><span>▶</span></span><span class="video-source">LinkedIn · Public video</span><strong>AI Revolution: Risks, Rewards & Future of Humanity</strong><small>AI, creativity, human judgment and the futures we are designing</small></a>
      </div>
    </div>
    <p class="video-note"><strong>Playback note:</strong> only the featured homepage video may start automatically, and it starts muted. All other videos require a click. Visitors using reduced-motion settings will not receive autoplay.</p>`;
  };

  const homeTarget = document.querySelector('.impact-snapshot');
  if (homeTarget && !document.getElementById('watch')) {
    const section = document.createElement('section');
    section.className = 'video-showcase';
    section.id = 'watch';
    section.setAttribute('aria-label', 'Selected public videos');
    section.innerHTML = `<div class="wrap">${markup(true)}</div>`;
    homeTarget.insertAdjacentElement('afterend', section);
  }

  const mediaMain = document.querySelector('main.document-main');
  const mediaIntro = mediaMain?.querySelector('.intro');
  if (mediaMain && mediaIntro && /Speaking and Media/i.test(mediaIntro.textContent) && !mediaMain.querySelector('.video-showcase')) {
    const section = document.createElement('section');
    section.className = 'video-showcase';
    section.setAttribute('aria-label', 'Selected public videos');
    section.innerHTML = markup(false);
    mediaIntro.insertAdjacentElement('afterend', section);
  }
})();
