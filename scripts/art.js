// Prévia da capa que segue o cursor sobre o índice de projetos (só com mouse).
(function () {
  var peek = document.querySelector('.peek');
  if (!peek || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var img = peek.querySelector('img');
  var x = 0, y = 0, tx = 0, ty = 0, raf = 0;
  function loop() {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    peek.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + (peek.classList.contains('is-on') ? 1 : 0.92) + ')';
    raf = requestAnimationFrame(loop);
  }
  function place(e) {
    var w = peek.offsetWidth, h = peek.offsetHeight;
    tx = Math.min(e.clientX + 28, innerWidth - w - 16);
    ty = Math.min(Math.max(e.clientY - h / 2, 70), innerHeight - h - 16);
  }
  document.querySelectorAll('.idx__link').forEach(function (a) {
    function on(e) {
      img.src = a.dataset.preview;
      if (e && e.clientX != null) { place(e); if (!peek.classList.contains('is-on')) { x = tx; y = ty; } }
      peek.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function off() { peek.classList.remove('is-on'); }
    a.addEventListener('mouseenter', on);
    a.addEventListener('mousemove', place);
    a.addEventListener('mouseleave', off);
    a.addEventListener('blur', off);
  });
})();
