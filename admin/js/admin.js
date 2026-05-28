(function() {
  'use strict';

  // Auth check
  var token = sessionStorage.getItem('admin_token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  // API helper
  function api(method, path, body) {
    var opts = {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    };
    if (body) opts.body = JSON.stringify(body);
    return fetch(path, opts).then(function(r) { return r.json(); });
  }

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    });
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', function() {
    sessionStorage.removeItem('admin_token');
    window.location.href = 'index.html';
  });

  // Load initial data
  loadCreativeList();
  loadLearningList();

  // ===== Creative Collection CRUD =====

  function loadCreativeList() {
    api('GET', '/api/creative').then(function(data) {
      var list = document.getElementById('creative-list');
      if (!data.items || data.items.length === 0) {
        list.innerHTML = '<div class="empty-state">暂无创意内容</div>';
      } else {
        list.innerHTML = data.items.map(function(item, i) {
          return '<div class="item-card">' +
            '<div class="item-card-info">' +
            '<h4>' + esc(item.title) + '</h4>' +
            '<p>' + esc(item.description || '') + '</p>' +
            '<div class="date">' + esc(item.date || '') + '</div>' +
            '</div>' +
            '<div class="item-card-actions">' +
            '<button class="btn btn-sm" onclick="editCreative(' + i + ')">编辑</button>' +
            '<button class="btn btn-danger btn-sm" onclick="deleteCreative(' + i + ')">删除</button>' +
            '</div></div>';
        }).join('');
      }
    });
  }

  function showCreativeForm(item, index) {
    var isEdit = typeof index === 'number';
    var html = '<h2>' + (isEdit ? '编辑创意' : '新增创意') + '</h2>' +
      '<div class="form-group"><label>标题</label><input id="cf-title" value="' + esc(item.title || '') + '"></div>' +
      '<div class="form-group"><label>描述</label><textarea id="cf-desc">' + esc(item.description || '') + '</textarea></div>' +
      '<div class="form-group"><label>图片链接（可选）</label><input id="cf-image" value="' + esc(item.image || '') + '"></div>' +
      '<div class="form-group"><label>日期</label><input id="cf-date" value="' + esc(item.date || '') + '"></div>' +
      '<div class="modal-actions">' +
      '<button class="btn" onclick="closeModal()">取消</button>' +
      '<button class="btn btn-primary" id="cf-save">保存</button>' +
      '</div>';
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('cf-save').addEventListener('click', function() {
      var newItem = {
        title: document.getElementById('cf-title').value,
        description: document.getElementById('cf-desc').value,
        image: document.getElementById('cf-image').value,
        date: document.getElementById('cf-date').value
      };
      saveCreative(newItem, index);
    });
  }

  function editCreative(index) {
    api('GET', '/api/creative').then(function(data) {
      showCreativeForm(data.items[index], index);
    });
  }

  function deleteCreative(index) {
    if (!confirm('确定删除？')) return;
    api('DELETE', '/api/creative', { index: index }).then(function(r) {
      if (r.ok) loadCreativeList();
    });
  }

  function saveCreative(item, index) {
    var method = typeof index === 'number' ? 'PUT' : 'POST';
    var body = { item: item };
    if (typeof index === 'number') body.index = index;
    api(method, '/api/creative', body).then(function(r) {
      if (r.ok) { closeModal(); loadCreativeList(); }
    });
  }

  document.getElementById('add-creative-btn').addEventListener('click', function() {
    showCreativeForm({ title: '', description: '', image: '', date: '' });
  });

  // ===== Learning Records CRUD =====

  function loadLearningList() {
    api('GET', '/api/learning').then(function(data) {
      var list = document.getElementById('learning-list');
      if (!data.items || data.items.length === 0) {
        list.innerHTML = '<div class="empty-state">暂无学习记录</div>';
      } else {
        list.innerHTML = data.items.map(function(item, i) {
          return '<div class="item-card">' +
            '<div class="item-card-info">' +
            '<h4>' + esc(item.problem) + '</h4>' +
            '<p>' + esc(item.solution) + '</p>' +
            '<div class="date">' + esc(item.date || '') + '</div>' +
            '</div>' +
            '<div class="item-card-actions">' +
            '<button class="btn btn-sm" onclick="editLearning(' + i + ')">编辑</button>' +
            '<button class="btn btn-danger btn-sm" onclick="deleteLearning(' + i + ')">删除</button>' +
            '</div></div>';
        }).join('');
      }
    });
  }

  function showLearningForm(item, index) {
    var isEdit = typeof index === 'number';
    var html = '<h2>' + (isEdit ? '编辑学习记录' : '新增学习记录') + '</h2>' +
      '<div class="form-group"><label>遇到的问题</label><textarea id="lf-problem">' + esc(item.problem || '') + '</textarea></div>' +
      '<div class="form-group"><label>解决方案</label><textarea id="lf-solution">' + esc(item.solution || '') + '</textarea></div>' +
      '<div class="form-group"><label>日期</label><input id="lf-date" value="' + esc(item.date || '') + '"></div>' +
      '<div class="modal-actions">' +
      '<button class="btn" onclick="closeModal()">取消</button>' +
      '<button class="btn btn-primary" id="lf-save">保存</button>' +
      '</div>';
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('lf-save').addEventListener('click', function() {
      saveLearning({
        problem: document.getElementById('lf-problem').value,
        solution: document.getElementById('lf-solution').value,
        date: document.getElementById('lf-date').value
      }, index);
    });
  }

  function editLearning(index) {
    api('GET', '/api/learning').then(function(data) {
      showLearningForm(data.items[index], index);
    });
  }

  function deleteLearning(index) {
    if (!confirm('确定删除？')) return;
    api('DELETE', '/api/learning', { index: index }).then(function(r) {
      if (r.ok) loadLearningList();
    });
  }

  function saveLearning(item, index) {
    var method = typeof index === 'number' ? 'PUT' : 'POST';
    var body = { item: item };
    if (typeof index === 'number') body.index = index;
    api(method, '/api/learning', body).then(function(r) {
      if (r.ok) { closeModal(); loadLearningList(); }
    });
  }

  document.getElementById('add-learning-btn').addEventListener('click', function() {
    showLearningForm({ problem: '', solution: '', date: '' });
  });

  // Modal helpers (global scope for onclick handlers)
  window.closeModal = function() {
    document.getElementById('modal').style.display = 'none';
  };

  window.editCreative = editCreative;
  window.deleteCreative = deleteCreative;
  window.editLearning = editLearning;
  window.deleteLearning = deleteLearning;

  function esc(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();
