// Smooth scrolling for in-page links (#apie, #paslaugos, ...), respecting reduced motion.
document.addEventListener('click', function (event) {
  var link = event.target.closest('a[href^="#"]');
  if (!link) return;
  var id = link.getAttribute('href').slice(1);
  var target = id ? document.getElementById(id) : null;
  if (!target) return;
  event.preventDefault();
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
});
