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

  // ============================================
  // Typewriter effect for hero tagline
  // ============================================
  (function() {
    var el = document.querySelector('.hero-tagline');
    if (!el) return;
    var fullText = el.textContent;
    el.textContent = '';
    el.classList.add('typing');
    var i = 0;
    var timer = setInterval(function() {
      if (i < fullText.length) {
        el.textContent += fullText[i];
        i++;
      } else {
        clearInterval(timer);
        el.classList.remove('typing');
        el.classList.add('typed');
      }
    }, 130);
  })();

  // ============================================
  // Back to top button
  // ============================================
  (function() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var scrollTicking = false;
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          if (window.scrollY > 500) {
            btn.classList.add('btt-visible');
          } else {
            btn.classList.remove('btt-visible');
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  // ============================================
  // Copy to clipboard for contact info
  // ============================================
  (function() {
    var toast = document.getElementById('copy-toast');
    if (!toast) return;

    var timer = null;

    function showToast() {
      if (timer) clearTimeout(timer);
      toast.classList.add('toast-show');
      timer = setTimeout(function() {
        toast.classList.remove('toast-show');
      }, 2000);
    }

    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-copy]');
      if (!btn) return;

      var text = btn.getAttribute('data-copy');
      if (!text) return;

      // Try modern clipboard API first, fall back to execCommand
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showToast();
        }).catch(function() {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }

      function fallbackCopy(str) {
        var ta = document.createElement('textarea');
        ta.value = str;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast(); } catch(e) {}
        document.body.removeChild(ta);
      }
    });
  })();

})();
