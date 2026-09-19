document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------------------
     Close the mobile nav menu after a link is tapped
     -------------------------------------------------------------- */
  var navCollapseEl = document.getElementById('mainNav');
  var navLinks = navCollapseEl ? navCollapseEl.querySelectorAll('a') : [];

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapseEl.classList.contains('show') && window.bootstrap) {
        var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* --------------------------------------------------------------
     Add a shadow under the header once the page is scrolled
     -------------------------------------------------------------- */
  var header = document.getElementById('site-header');

  function updateHeaderShadow() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });

  /* --------------------------------------------------------------
     Highlight the current section's link in the nav while scrolling
     -------------------------------------------------------------- */
  var sections = document.querySelectorAll('main section[id], .hero[id]');
  var navAnchorLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchorLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

});
