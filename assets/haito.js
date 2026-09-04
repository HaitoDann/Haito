(function(){
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  function _initParticles(){
    const wrap = document.createElement('div');
    wrap.id = 'pz-particles';
    document.body.prepend(wrap);
    if(reduce) return;
    for(let i=0;i<18;i++){
      const p = document.createElement('div');
      p.className = 'pz-particle';
      const sz = 1 + Math.random()*2;
      const dur = 9 + Math.random()*14;
      const left = Math.random()*100;
      const drift = (Math.random()-.5)*60;
      const delay = -(Math.random()*dur);
      const op = .04 + Math.random()*.06;
      p.style.cssText = `width:${sz}px;height:${sz}px;left:${left}%;--drift:${drift}px;--op:${op};animation-duration:${dur}s;animation-delay:${delay}s`;
      wrap.appendChild(p);
    }
  }

  function _initGrid(){
    const g = document.createElement('div');
    g.id = 'pz-grid';
    document.body.prepend(g);
  }

  function _initStars(){
    const wrap = document.createElement('div');
    wrap.id = 'pz-stars';
    document.body.prepend(wrap);
    if(reduce) return;
    const layers = [
      {count:55, sz:[1,2], op:[.18,.38], dur:[4,7]},
      {count:30, sz:[1.5,3], op:[.08,.22], dur:[6,11]},
      {count:12, sz:[2,4], op:[.05,.14], dur:[9,16]},
    ];
    layers.forEach((cfg, li) => {
      const layer = document.createElement('div');
      layer.className = 'pz-star-layer';
      layer.dataset.l = li;
      for(let i=0;i<cfg.count;i++){
        const s = document.createElement('div');
        s.className = 'pz-star';
        const sz = cfg.sz[0] + Math.random()*(cfg.sz[1]-cfg.sz[0]);
        const op = cfg.op[0] + Math.random()*(cfg.op[1]-cfg.op[0]);
        const dur = cfg.dur[0] + Math.random()*(cfg.dur[1]-cfg.dur[0]);
        const delay = -(Math.random()*dur);
        s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random()*120}%;left:${Math.random()*120}%;--o:${op.toFixed(2)};animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s`;
        layer.appendChild(s);
      }
      wrap.appendChild(layer);
    });
    window.addEventListener('mousemove', e => {
      wrap.querySelectorAll('.pz-star-layer').forEach(layer => {
        const d = [.012,.022,.038][+layer.dataset.l] || .012;
        layer.style.transform = `translate(${(e.clientX-innerWidth/2)*d}px,${(e.clientY-innerHeight/2)*d}px)`;
      });
    }, {passive:true});
  }

  function _initCursor(){
    if(!window.matchMedia || !matchMedia('(pointer:fine)').matches) return;
    if(document.getElementById('pz-cur-dot')) return;
    const dot = document.createElement('div');
    dot.id = 'pz-cur-dot';
    dot.className = 'pz-hide';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.documentElement.classList.add('pz-cursor');
    const HOT = 'a,button,.btn,.proj-card,label,[onclick],[role=button]';
    window.addEventListener('mousemove', e => {
      dot.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
      const t = e.target;
      dot.classList.remove('pz-hide');
      dot.classList.toggle('pz-hot', !!(t && t.closest && t.closest(HOT)));
    }, {passive:true});
    document.addEventListener('mouseleave', () => dot.classList.add('pz-hide'));
    document.addEventListener('mouseenter', () => dot.classList.remove('pz-hide'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    _initParticles();
    if(!reduce){ _initGrid(); _initStars(); _initCursor(); }
  });
})();
