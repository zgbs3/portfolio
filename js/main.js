(function() {
  'use strict';

  // ============================================
  // Navbar shadow on scroll
  // ============================================
  var navbar = document.getElementById('navbar');
  var ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        navbar.style.boxShadow = window.scrollY > 10
          ? '0 1px 20px rgba(0,0,0,0.06)'
          : 'none';
        ticking = false;
      });
      ticking = true;
    }
  });

  // ============================================
  // Highlight active nav link
  // ============================================
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function() {
    var current = '';
    sections.forEach(function(section) {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function(link) {
      link.style.color = '';
      link.style.fontWeight = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--accent)';
      }
    });
  });

})();
