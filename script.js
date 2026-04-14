/* =============================================
   CampusCare – I.T.S Engineering College
   script.js – Global JavaScript
============================================= */

/* ── Dummy Complaint Data ── */
const complaintsData = [
  {
    id: "CC-2024-001",
    title: "Broken Projector in Room 304",
    category: "Maintenance",
    location: "Block A – Room 304",
    description: "The projector in Room 304 has been malfunctioning for the past week. It flickers and shuts off randomly during lectures, causing disruption.",
    status: "pending",
    date: "2024-11-18",
    student: "Muntazir Abbas",
    rollNo: "2200101",
    priority: "High"
  },
  {
    id: "CC-2024-002",
    title: "Water Leakage in Boys' Hostel Corridor",
    category: "Infrastructure",
    location: "Boys' Hostel – 2nd Floor",
    description: "There is a persistent water leakage from the roof in the second-floor corridor. The floor stays wet and is a safety hazard.",
    status: "progress",
    date: "2024-11-15",
    student: "Rahul Verma",
    rollNo: "2200045",
    priority: "High"
  },
  {
    id: "CC-2024-003",
    title: "Canteen Food Quality Issues",
    category: "Canteen",
    location: "Main Canteen",
    description: "The food quality in the main canteen has deteriorated significantly. Students have reported finding foreign particles in meals repeatedly.",
    status: "resolved",
    date: "2024-11-10",
    student: "Priya Singh",
    rollNo: "2200178",
    priority: "Medium"
  },
  {
    id: "CC-2024-004",
    title: "Non-functional Wi-Fi in Library",
    category: "IT & Network",
    location: "Central Library",
    description: "The Wi-Fi network in the library has been down for 3 days. Students are unable to access online resources needed for their projects.",
    status: "progress",
    date: "2024-11-17",
    student: "Mohammed Zaid",
    rollNo: "2200212",
    priority: "High"
  },
  {
    id: "CC-2024-005",
    title: "Damaged Chairs in Seminar Hall",
    category: "Maintenance",
    location: "Seminar Hall – Block B",
    description: "Multiple chairs in the seminar hall are broken or unstable. This is dangerous for students attending long sessions.",
    status: "pending",
    date: "2024-11-19",
    student: "Sneha Gupta",
    rollNo: "2200089",
    priority: "Medium"
  },
  {
    id: "CC-2024-006",
    title: "Washroom Hygiene – Girls' Block",
    category: "Hygiene",
    location: "Girls' Block – Ground Floor",
    description: "The ground-floor washrooms in the girls' block are not being cleaned regularly. There is also a shortage of essential supplies.",
    status: "pending",
    date: "2024-11-20",
    student: "Aisha Khan",
    rollNo: "2200156",
    priority: "High"
  },
  {
    id: "CC-2024-007",
    title: "Insufficient Seating in Computer Lab",
    category: "Infrastructure",
    location: "Computer Lab 2 – Block C",
    description: "Computer Lab 2 has only 24 working systems for 40 students in a batch. Several systems are non-functional since last month.",
    status: "rejected",
    date: "2024-11-08",
    student: "Vikram Tiwari",
    rollNo: "2200034",
    priority: "Medium"
  },
  {
    id: "CC-2024-008",
    title: "Faulty Electrical Wiring – Lab 5",
    category: "Electrical",
    location: "Electronics Lab 5",
    description: "There is exposed and faulty wiring near one of the workstations in Electronics Lab 5. This poses a serious electrical hazard.",
    status: "resolved",
    date: "2024-11-05",
    student: "Deepak Rathore",
    rollNo: "2200201",
    priority: "High"
  },
  {
    id: "CC-2024-009",
    title: "No Drinking Water on 3rd Floor",
    category: "Sanitation",
    location: "Block A – 3rd Floor",
    description: "The water cooler on the 3rd floor of Block A has not been functional for 10 days. Students have to go all the way to the ground floor.",
    status: "progress",
    date: "2024-11-14",
    student: "Kavya Mishra",
    rollNo: "2200067",
    priority: "Medium"
  },
  {
    id: "CC-2024-010",
    title: "Parking Area Lights Not Working",
    category: "Electrical",
    location: "Main Parking Lot",
    description: "The floodlights in the main parking area are not working since the past 2 weeks. It is very dark and unsafe for students who leave late.",
    status: "pending",
    date: "2024-11-21",
    student: "Rohit Bansode",
    rollNo: "2200143",
    priority: "Low"
  }
];

/* ── Navbar hamburger toggle ── */
function initNavbar() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const navCta    = document.querySelector('.nav-cta');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => {
    navLinks && navLinks.classList.toggle('open');
    navCta   && navCta.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks && navLinks.classList.remove('open');
      navCta   && navCta.classList.remove('open');
    }
  });
  // Mark active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
}

/* ── Toast Notifications ── */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info} toast-icon"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeInUp .3s ease reverse both';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ── Modal Helpers ── */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    document.querySelectorAll('.modal-overlay').forEach(m => {
      m.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
});

/* ── Badge HTML Helper ── */
function getBadgeHTML(status) {
  const map = {
    pending:  { cls: 'badge-pending',  icon: 'fa-clock',         label: 'Pending'     },
    progress: { cls: 'badge-progress', icon: 'fa-spinner',       label: 'In Progress' },
    resolved: { cls: 'badge-resolved', icon: 'fa-circle-check',  label: 'Resolved'    },
    rejected: { cls: 'badge-rejected', icon: 'fa-circle-xmark',  label: 'Rejected'    }
  };
  const b = map[status] || map['pending'];
  return `<span class="badge ${b.cls}"><i class="fa-solid ${b.icon}"></i>${b.label}</span>`;
}

/* ── Format date ── */
function fmtDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/* ── Student Dashboard ── */
function initStudentDashboard() {
  if (!document.getElementById('student-complaints-list')) return;

  // Show only current student's complaints (first 4 for demo)
  const myComplaints = complaintsData.slice(0, 4);
  updateStudentStats(myComplaints);
  renderStudentComplaints(myComplaints);

  // Search & filter
  const searchInput  = document.getElementById('search-complaints');
  const statusFilter = document.getElementById('filter-status');
  const catFilter    = document.getElementById('filter-category');

  function applyFilters() {
    const q   = (searchInput?.value   || '').toLowerCase();
    const st  = statusFilter?.value   || '';
    const cat = catFilter?.value      || '';
    const filtered = myComplaints.filter(c =>
      (!q   || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) &&
      (!st  || c.status === st) &&
      (!cat || c.category === cat)
    );
    renderStudentComplaints(filtered);
  }
  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
  catFilter?.addEventListener('change', applyFilters);
}

function updateStudentStats(complaints) {
  const total    = complaints.length;
  const pending  = complaints.filter(c => c.status === 'pending').length;
  const progress = complaints.filter(c => c.status === 'progress').length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  setValue('stat-total',    total);
  setValue('stat-pending',  pending);
  setValue('stat-progress', progress);
  setValue('stat-resolved', resolved);
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function renderStudentComplaints(list) {
  const container = document.getElementById('student-complaints-list');
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `<div class="no-results"><i class="fa-solid fa-inbox"></i><p>No complaints found matching your search.</p></div>`;
    return;
  }
  container.innerHTML = list.map(c => `
    <div class="complaint-card ${c.status}" data-id="${c.id}">
      <div class="complaint-top">
        <div>
          <div class="complaint-title">${c.title}</div>
          <div class="complaint-meta">
            <span><i class="fa-solid fa-tag"></i>${c.category}</span>
            <span><i class="fa-solid fa-location-dot"></i>${c.location}</span>
            <span><i class="fa-solid fa-calendar"></i>${fmtDate(c.date)}</span>
            <span class="complaint-id">${c.id}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          ${getBadgeHTML(c.status)}
          <span class="badge" style="background:${c.priority==='High'?'#fee2e2':c.priority==='Medium'?'#fef3c7':'#f0fdf4'};color:${c.priority==='High'?'#991b1b':c.priority==='Medium'?'#92400e':'#065f46'}">${c.priority}</span>
        </div>
      </div>
      <p class="complaint-desc">${c.description}</p>
      <div class="complaint-actions">
        <button class="btn btn-sm btn-outline-blue" onclick="viewComplaint('${c.id}')"><i class="fa-solid fa-eye"></i> View</button>
        ${c.status === 'pending' ? `<button class="btn btn-sm btn-danger" onclick="withdrawComplaint('${c.id}')"><i class="fa-solid fa-trash"></i> Withdraw</button>` : ''}
      </div>
    </div>
  `).join('');
}

function viewComplaint(id) {
  const c = complaintsData.find(x => x.id === id);
  if (!c) return;
  const modal = document.getElementById('view-modal');
  if (modal) {
    document.getElementById('modal-title').textContent = c.title;
    document.getElementById('modal-body').innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        <div><strong style="font-size:.75rem;color:var(--gray-500);text-transform:uppercase">Status</strong><br>${getBadgeHTML(c.status)}</div>
        <div><strong style="font-size:.75rem;color:var(--gray-500);text-transform:uppercase">Priority</strong><br><strong>${c.priority}</strong></div>
        <div><strong style="font-size:.75rem;color:var(--gray-500);text-transform:uppercase">Category</strong><br>${c.category}</div>
        <div><strong style="font-size:.75rem;color:var(--gray-500);text-transform:uppercase">Date Filed</strong><br>${fmtDate(c.date)}</div>
        <div style="grid-column:1/-1"><strong style="font-size:.75rem;color:var(--gray-500);text-transform:uppercase">Location</strong><br>${c.location}</div>
      </div>
      <div><strong style="font-size:.75rem;color:var(--gray-500);text-transform:uppercase">Description</strong><p style="margin-top:6px;color:var(--gray-600);line-height:1.7">${c.description}</p></div>
    `;
    openModal('view-modal');
  }
}

function withdrawComplaint(id) {
  if (confirm('Are you sure you want to withdraw this complaint?')) {
    const card = document.querySelector(`.complaint-card[data-id="${id}"]`);
    if (card) { card.style.opacity = '0'; card.style.transform = 'scale(.95)'; setTimeout(() => card.remove(), 300); }
    showToast('Complaint withdrawn successfully.', 'success');
  }
}

/* ── Admin Dashboard ── */
function initAdminDashboard() {
  if (!document.getElementById('admin-complaints-list')) return;

  updateAdminStats(complaintsData);
  renderAdminComplaints(complaintsData);

  const searchInput  = document.getElementById('search-complaints');
  const statusFilter = document.getElementById('filter-status');
  const catFilter    = document.getElementById('filter-category');
  const priFilter    = document.getElementById('filter-priority');

  function applyFilters() {
    const q   = (searchInput?.value  || '').toLowerCase();
    const st  = statusFilter?.value  || '';
    const cat = catFilter?.value     || '';
    const pri = priFilter?.value     || '';
    const filtered = complaintsData.filter(c =>
      (!q   || c.title.toLowerCase().includes(q) || c.student.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) &&
      (!st  || c.status === st) &&
      (!cat || c.category === cat) &&
      (!pri || c.priority === pri)
    );
    renderAdminComplaints(filtered);
  }
  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
  catFilter?.addEventListener('change', applyFilters);
  priFilter?.addEventListener('change', applyFilters);
}

function updateAdminStats(complaints) {
  const total    = complaints.length;
  const pending  = complaints.filter(c => c.status === 'pending').length;
  const progress = complaints.filter(c => c.status === 'progress').length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  setValue('stat-total',    total);
  setValue('stat-pending',  pending);
  setValue('stat-progress', progress);
  setValue('stat-resolved', resolved);
}

function renderAdminComplaints(list) {
  const container = document.getElementById('admin-complaints-list');
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `<div class="no-results"><i class="fa-solid fa-inbox"></i><p>No complaints found matching your filters.</p></div>`;
    return;
  }
  container.innerHTML = list.map(c => `
    <div class="complaint-card ${c.status}" data-id="${c.id}">
      <div class="complaint-top">
        <div>
          <div class="complaint-title">${c.title}</div>
          <div class="complaint-meta">
            <span><i class="fa-solid fa-user"></i>${c.student} (${c.rollNo})</span>
            <span><i class="fa-solid fa-tag"></i>${c.category}</span>
            <span><i class="fa-solid fa-location-dot"></i>${c.location}</span>
            <span><i class="fa-solid fa-calendar"></i>${fmtDate(c.date)}</span>
            <span class="complaint-id">${c.id}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          ${getBadgeHTML(c.status)}
          <span class="badge" style="background:${c.priority==='High'?'#fee2e2':c.priority==='Medium'?'#fef3c7':'#f0fdf4'};color:${c.priority==='High'?'#991b1b':c.priority==='Medium'?'#92400e':'#065f46'}">${c.priority}</span>
        </div>
      </div>
      <p class="complaint-desc">${c.description}</p>
      <div class="complaint-actions">
        <select onchange="updateStatus('${c.id}', this.value)" style="font-size:.82rem">
          <option value="">Update Status…</option>
          <option value="pending"  ${c.status==='pending'  ? 'selected':''}>⏳ Pending</option>
          <option value="progress" ${c.status==='progress' ? 'selected':''}>🔄 In Progress</option>
          <option value="resolved" ${c.status==='resolved' ? 'selected':''}>✅ Resolved</option>
          <option value="rejected" ${c.status==='rejected' ? 'selected':''}>❌ Rejected</option>
        </select>
        <button class="btn btn-sm btn-outline-blue" onclick="viewComplaintAdmin('${c.id}')"><i class="fa-solid fa-eye"></i> Details</button>
        <button class="btn btn-sm btn-primary" onclick="sendNotification('${c.id}')"><i class="fa-solid fa-paper-plane"></i> Notify</button>
      </div>
    </div>
  `).join('');
}

function updateStatus(id, newStatus) {
  if (!newStatus) return;
  const complaint = complaintsData.find(c => c.id === id);
  if (!complaint) return;
  const oldStatus = complaint.status;
  complaint.status = newStatus;
  const card = document.querySelector(`.complaint-card[data-id="${id}"]`);
  if (card) {
    card.classList.remove('pending','progress','resolved','rejected');
    card.classList.add(newStatus);
    const badgeWrapper = card.querySelector('.complaint-top > div:last-child');
    if (badgeWrapper) {
      const oldBadge = badgeWrapper.querySelector('.badge:first-child');
      if (oldBadge) oldBadge.outerHTML = getBadgeHTML(newStatus);
    }
  }
  updateAdminStats(complaintsData);
  const labels = { pending: 'Pending', progress: 'In Progress', resolved: 'Resolved', rejected: 'Rejected' };
  showToast(`Complaint ${id} updated to "${labels[newStatus]}"`, 'success');
}

function viewComplaintAdmin(id) {
  viewComplaint(id); // reuse same modal logic
}

function sendNotification(id) {
  const c = complaintsData.find(x => x.id === id);
  if (c) showToast(`Notification sent to ${c.student} for ${c.id}`, 'success');
}

/* ── Form: Login ── */
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  const toggle = document.getElementById('toggle-password');
  const passInput = document.getElementById('password');
  toggle?.addEventListener('click', () => {
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    toggle.className = `fa-solid ${passInput.type === 'password' ? 'fa-eye' : 'fa-eye-slash'} input-right-icon`;
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass  = document.getElementById('password').value;
    if (!email || !pass) { showToast('Please fill in all fields.', 'error'); return; }
    const btn = form.querySelector('.btn-primary');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in…';
    setTimeout(() => {
      if (email.toLowerCase().includes('admin')) {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    }, 1200);
  });
}

/* ── Form: Signup ── */
function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  const toggle = document.getElementById('toggle-password');
  const passInput = document.getElementById('password');
  toggle?.addEventListener('click', () => {
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    toggle.className = `fa-solid ${passInput.type === 'password' ? 'fa-eye' : 'fa-eye-slash'} input-right-icon`;
  });
  // Password strength
  passInput?.addEventListener('input', () => {
    const val = passInput.value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    if (!strengthBar) return;
    const strength = val.length > 10 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val) ? 3
      : val.length > 6 && /[A-Z]/.test(val) && /[0-9]/.test(val) ? 2
      : val.length > 3 ? 1 : 0;
    const widths = ['0%','33%','66%','100%'];
    const colors = ['transparent','var(--red)','var(--accent)','var(--accent-2)'];
    const labels = ['','Weak','Fair','Strong'];
    strengthBar.style.width = widths[strength];
    strengthBar.style.background = colors[strength];
    if (strengthText) strengthText.textContent = labels[strength];
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirm  = document.getElementById('confirm-password').value;
    if (password !== confirm) { showToast('Passwords do not match!', 'error'); return; }
    const btn = form.querySelector('.btn-primary');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account…';
    setTimeout(() => {
      showToast('Account created successfully! Redirecting…', 'success');
      setTimeout(() => window.location.href = 'student-dashboard.html', 1200);
    }, 1500);
  });
}

/* ── New Complaint Form ── */
function initNewComplaintForm() {
  const form = document.getElementById('new-complaint-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting…';
    setTimeout(() => {
      closeModal('new-complaint-modal');
      showToast('Complaint submitted successfully! ID: CC-2024-' + String(Math.floor(Math.random()*900)+100), 'success');
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Complaint';
      form.reset();
    }, 1500);
  });
}

/* ── Smooth counter animation for stats ── */
function animateCounters() {
  document.querySelectorAll('.stat-value[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 40);
  });
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLoginForm();
  initSignupForm();
  initStudentDashboard();
  initAdminDashboard();
  initNewComplaintForm();
  animateCounters();
});
