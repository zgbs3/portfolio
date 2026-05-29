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

  // ============================================
  // Scroll entrance animations
  // ============================================
  (function() {
    var observer;
    var supportsIntersection = 'IntersectionObserver' in window;

    if (!supportsIntersection) {
      // Fallback: show all immediately
      var all = document.querySelectorAll('.reveal');
      for (var i = 0; i < all.length; i++) {
        all[i].classList.add('revealed');
      }
      // Also expose a no-op so dynamic scripts don't error
      window.__observeReveal = function(el) { el.classList.add('revealed'); };
      return;
    }

    observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    });

    // Observe existing elements
    var elements = document.querySelectorAll('.reveal');
    for (var i = 0; i < elements.length; i++) {
      observer.observe(elements[i]);
    }

    // Expose for dynamically added elements
    window.__observeReveal = function(el) {
      observer.observe(el);
    };
  })();

})();
