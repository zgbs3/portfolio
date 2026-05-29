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
  // Load Creative preview (index page only)
  // ============================================
  var creativeGrid = document.getElementById('creative-grid');
  if (creativeGrid) {
    fetch('data/creative.json')
      .then(function(res) { return res.json(); })
      .then(function(items) {
        if (!items || items.length === 0) {
          creativeGrid.innerHTML = '<p style="color:var(--text-secondary);grid-column:1/-1;">创意内容即将上线...</p>';
          return;
        }
        // Show up to 4 items as preview
        var preview = items.slice(0, 4);
        creativeGrid.innerHTML = preview.map(function(item) {
          return '<div class="creative-card">' +
            (item.image ? '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" loading="lazy">' : '') +
            '<div class="creative-card-body">' +
            '<h4>' + esc(item.title) + '</h4>' +
            '<p>' + esc(item.description) + '</p>' +
            (item.date ? '<div class="date">' + esc(item.date) + '</div>' : '') +
            '</div></div>';
        }).join('');
        if (items.length > 4) {
          creativeGrid.insertAdjacentHTML('beforeend',
            '<p style="color:var(--text-secondary);grid-column:1/-1;text-align:center;">还有 ' + (items.length - 4) + ' 项创意</p>');
        }
      })
      .catch(function(err) { console.error(err); });
  }

  // ============================================
  // Load Learning preview (index page only)
  // ============================================
  var learningList = document.getElementById('learning-list');
  if (learningList) {
    fetch('data/learning.json')
      .then(function(res) { return res.json(); })
      .then(function(items) {
        if (!items || items.length === 0) {
          learningList.innerHTML = '<p style="color:var(--text-secondary);">学习记录即将上线...</p>';
          return;
        }
        // Show up to 3 items as preview
        var preview = items.slice(0, 3);
        learningList.innerHTML = preview.map(function(item) {
          return '<div class="learning-item">' +
            '<div class="problem">' + esc(item.problem) + '</div>' +
            '<div class="solution">' + esc(item.solution) + '</div>' +
            '<div class="date">' + esc(item.date) + '</div>' +
            '</div>';
        }).join('');
        if (items.length > 3) {
          learningList.insertAdjacentHTML('beforeend',
            '<p style="color:var(--text-secondary);text-align:center;margin-top:12px;">还有 ' + (items.length - 3) + ' 条记录</p>');
        }
      })
      .catch(function(err) { console.error(err); });
  }

  // ============================================
  // Utility: safe HTML escape
  // ============================================
  function esc(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

})();
