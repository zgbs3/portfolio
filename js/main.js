(function() {
  'use strict';

  // Navbar shadow on scroll
  var navbar = document.getElementById('navbar');
  var ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        if (window.scrollY > 10) {
          navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.06)';
        } else {
          navbar.style.boxShadow = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Highlight active nav link
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function() {
    var current = '';
    sections.forEach(function(section) {
      var top = section.offsetTop - 100;
      if (window.scrollY >= top) {
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

  // Load dynamic content
  loadCreative();
  loadLearning();
})();

function loadCreative() {
  fetch('data/creative.json')
    .then(function(res) { return res.json(); })
    .then(function(items) {
      var grid = document.getElementById('creative-grid');
      if (!grid) return;
      if (!items || items.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-secondary);grid-column:1/-1;">创意内容即将上线...</p>';
        return;
      }
      grid.innerHTML = items.map(function(item) {
        return '<div class="creative-card">' +
          (item.image ? '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy">' : '') +
          '<div class="creative-card-body">' +
          '<h4>' + escapeHtml(item.title) + '</h4>' +
          '<p>' + escapeHtml(item.description) + '</p>' +
          (item.date ? '<div class="date">' + escapeHtml(item.date) + '</div>' : '') +
          '</div></div>';
      }).join('');
    })
    .catch(function(err) {
      console.error('Failed to load creative data:', err);
    });
}

function loadLearning() {
  fetch('data/learning.json')
    .then(function(res) { return res.json(); })
    .then(function(items) {
      var list = document.getElementById('learning-list');
      if (!list) return;
      if (!items || items.length === 0) {
        list.innerHTML = '<p style="color:var(--text-secondary);">学习记录即将上线...</p>';
        return;
      }
      list.innerHTML = items.map(function(item) {
        return '<div class="learning-item">' +
          '<div class="problem">' + escapeHtml(item.problem) + '</div>' +
          '<div class="solution">' + escapeHtml(item.solution) + '</div>' +
          '<div class="date">' + escapeHtml(item.date) + '</div>' +
          '</div>';
      }).join('');
    })
    .catch(function(err) {
      console.error('Failed to load learning data:', err);
    });
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
