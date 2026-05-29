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
  // Modal
  // ============================================
  var overlay = document.getElementById('modal-overlay');
  var body = document.getElementById('modal-body');
  var closeBtn = document.getElementById('modal-close');

  function openModal(html) {
    body.innerHTML = html;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    var v = body.querySelector('video');
    if (v) { v.pause(); v.currentTime = 0; }
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  // ============================================
  // Event delegation: Work + Creative card clicks
  // ============================================
  document.addEventListener('click', function(e) {
    // --- Work cards ---
    var workCard = e.target.closest('.work-card');
    if (workCard && !e.target.closest('video') && !e.target.closest('button')) {
      e.preventDefault();
      var video = workCard.querySelector('video');
      var titleEl = workCard.querySelector('h4');
      var metaEl = workCard.querySelector('.work-meta');
      var title = titleEl ? titleEl.textContent : '';
      var meta = metaEl ? metaEl.textContent : '';
      var src = '';
      if (video) {
        var source = video.querySelector('source');
        if (source) src = source.getAttribute('src');
      }
      var html = '';
      if (src) {
        html += '<video controls autoplay playsinline>';
        html += '<source src="' + escapeHtml(src) + '" type="video/mp4">';
        html += '</video>';
      }
      html += '<div class="modal-title">' + escapeHtml(title) + '</div>';
      html += '<div class="modal-meta">' + escapeHtml(meta) + '</div>';
      openModal(html);
      return;
    }

    // --- Creative cards ---
    var creativeCard = e.target.closest('.creative-card');
    if (creativeCard) {
      e.preventDefault();
      var img = creativeCard.querySelector('img');
      var titleEl = creativeCard.querySelector('h4');
      var descEl = creativeCard.querySelector('p');
      var dateEl = creativeCard.querySelector('.date');
      var title = titleEl ? titleEl.textContent : '';
      var desc = descEl ? descEl.textContent : '';
      var date = dateEl ? dateEl.textContent : '';
      var html = '';
      if (img) {
        html += '<img src="' + escapeHtml(img.getAttribute('src')) + '" alt="' + escapeHtml(title) + '" loading="lazy">';
      }
      html += '<div class="modal-title">' + escapeHtml(title) + '</div>';
      html += '<div class="modal-desc">' + escapeHtml(desc) + '</div>';
      if (date) {
        html += '<div class="modal-date">' + escapeHtml(date) + '</div>';
      }
      openModal(html);
      return;
    }

    // --- Learning items (expand/collapse) ---
    var learningItem = e.target.closest('.learning-item');
    if (learningItem && !e.target.closest('a')) {
      e.preventDefault();
      learningItem.classList.toggle('expanded');
      return;
    }
  });

  // ============================================
  // Load Creative (dynamic)
  // ============================================
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

  // ============================================
  // Load Learning (dynamic) — with expand markup
  // ============================================
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
            '<span class="expand-icon">&#9660;</span>' +
            '<div class="problem">' + escapeHtml(item.problem) + '</div>' +
            '<div class="solution-wrap">' +
            '<div class="solution">' + escapeHtml(item.solution) + '</div>' +
            '</div>' +
            '<div class="solution-date">' + escapeHtml(item.date) + '</div>' +
            '</div>';
        }).join('');
      })
      .catch(function(err) {
        console.error('Failed to load learning data:', err);
      });
  }

  // ============================================
  // Utility: safe HTML escape
  // ============================================
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ============================================
  // Kick off
  // ============================================
  loadCreative();
  loadLearning();

})();
