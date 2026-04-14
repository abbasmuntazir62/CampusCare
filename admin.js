import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

console.log("admin.js loaded");

// ── Load all complaints in real-time ──
const complaintsRef = collection(db, "complaints");
const q = query(complaintsRef, orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  const complaints = [];
  snapshot.forEach(doc => {
    complaints.push({ id: doc.id, ...doc.data() });
  });

  updateStats(complaints);
  renderComplaints(complaints);
});

// ── Update stat cards ──
function updateStats(complaints) {
  document.getElementById("stat-total").textContent = complaints.length;
  document.getElementById("stat-pending").textContent =
    complaints.filter(c => c.status === "pending").length;
  document.getElementById("stat-progress").textContent =
    complaints.filter(c => c.status === "in-progress").length;
  document.getElementById("stat-resolved").textContent =
    complaints.filter(c => c.status === "resolved").length;
}

// ── Render complaints list ──
function renderComplaints(complaints) {
  const list = document.getElementById("admin-complaints-list");

  if (complaints.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:60px 20px;color:var(--gray-400)">
        <i class="fa-solid fa-inbox" style="font-size:3rem;margin-bottom:12px"></i>
        <p style="font-size:1rem;font-weight:600">No complaints found</p>
      </div>`;
    return;
  }

  list.innerHTML = complaints.map(c => `
    <div class="complaint-card" id="card-${c.id}">
      <div class="complaint-card-header">
        <div>
          <div class="complaint-title">${c.title || "Untitled"}</div>
          <div class="complaint-meta">
            <span><i class="fa-solid fa-tag"></i> ${c.category || "N/A"}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${c.location || "N/A"}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
          ${getPriorityBadge(c.priority)}
          ${getStatusBadge(c.status)}
        </div>
      </div>
      <div class="complaint-desc">${c.description || ""}</div>
      <div class="complaint-card-footer">
        <span style="font-size:.78rem;color:var(--gray-400)">
          <i class="fa-solid fa-clock"></i>
          ${c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "Just now"}
        </span>
        <div style="display:flex;gap:8px">

          <!-- Status Update Dropdown -->
          <select onchange="updateStatus('${c.id}', this.value)"
            style="font-size:.78rem;padding:5px 8px;border:1px solid var(--gray-200);border-radius:8px;cursor:pointer">
            <option value="" disabled selected>Change Status</option>
            <option value="pending">⏳ Pending</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="resolved">✅ Resolved</option>
            <option value="rejected">❌ Rejected</option>
          </select>

          <!-- Delete Button -->
          <button onclick="deleteComplaint('${c.id}')"
            class="btn btn-sm"
            style="background:var(--red);color:#fff;border:none;padding:5px 10px;border-radius:8px;cursor:pointer">
            <i class="fa-solid fa-trash"></i>
          </button>

        </div>
      </div>
    </div>
  `).join("");
}

// ── Update complaint status ──
window.updateStatus = async (id, newStatus) => {
  if (!newStatus) return;
  try {
    await updateDoc(doc(db, "complaints", id), { status: newStatus });
    showToast("Status updated successfully!", "success");
  } catch (error) {
    console.error("Update error:", error);
    showToast("Failed to update status!", "error");
  }
};

// ── Delete complaint ──
window.deleteComplaint = async (id) => {
  if (!confirm("Are you sure you want to delete this complaint?")) return;
  try {
    await deleteDoc(doc(db, "complaints", id));
    showToast("Complaint deleted!", "success");
  } catch (error) {
    console.error("Delete error:", error);
    showToast("Failed to delete!", "error");
  }
};

// ── Search & Filter ──
document.getElementById("search-complaints").addEventListener("input", applyFilters);
document.getElementById("filter-status").addEventListener("change", applyFilters);
document.getElementById("filter-category").addEventListener("change", applyFilters);
document.getElementById("filter-priority").addEventListener("change", applyFilters);

let allComplaints = [];

onSnapshot(query(collection(db, "complaints"), orderBy("createdAt", "desc")), (snapshot) => {
  allComplaints = [];
  snapshot.forEach(doc => allComplaints.push({ id: doc.id, ...doc.data() }));
  applyFilters();
  updateStats(allComplaints);
});

function applyFilters() {
  const search   = document.getElementById("search-complaints").value.toLowerCase();
  const status   = document.getElementById("filter-status").value;
  const category = document.getElementById("filter-category").value;
  const priority = document.getElementById("filter-priority").value;

  const filtered = allComplaints.filter(c => {
    const matchSearch   = !search   || c.title?.toLowerCase().includes(search) || c.description?.toLowerCase().includes(search);
    const matchStatus   = !status   || c.status === status;
    const matchCategory = !category || c.category === category;
    const matchPriority = !priority || c.priority === priority;
    return matchSearch && matchStatus && matchCategory && matchPriority;
  });

  renderComplaints(filtered);
}

// ── Badge helpers ──
function getPriorityBadge(priority) {
  const map = {
    "High":   { color: "var(--red)",      icon: "🔴" },
    "Medium": { color: "var(--accent)",   icon: "🟡" },
    "Low":    { color: "var(--accent-2)", icon: "🟢" }
  };
  const p = map[priority] || { color: "var(--gray-400)", icon: "⚪" };
  return `<span style="font-size:.72rem;font-weight:700;color:${p.color}">${p.icon} ${priority || "N/A"}</span>`;
}

function getStatusBadge(status) {
  const map = {
    "pending":     { bg: "rgba(245,158,11,.12)", color: "var(--accent)",   label: "⏳ Pending"     },
    "in-progress": { bg: "rgba(59,130,246,.12)",  color: "var(--blue-500)", label: "🔄 In Progress" },
    "resolved":    { bg: "rgba(16,185,129,.12)",  color: "var(--accent-2)", label: "✅ Resolved"    },
    "rejected":    { bg: "rgba(239,68,68,.12)",   color: "var(--red)",      label: "❌ Rejected"    }
  };
  const s = map[status] || { bg: "var(--gray-100)", color: "var(--gray-500)", label: status || "Unknown" };
  return `<span class="status-badge" style="background:${s.bg};color:${s.color}">${s.label}</span>`;
}