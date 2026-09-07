(function () {
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('ht-theme', t); } catch(e){}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  });
})();
