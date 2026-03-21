/* ═══════════════════════════════════════════════════════════
   medical.js – Medical History Storage Module
   ═══════════════════════════════════════════════════════════ */

const MEDICAL_KEY = "aurahealth_medical";

/* ── Type Emoji Map ─────────────────────────────────────────── */
const TYPE_EMOJI = {
  Diagnosis: "🩺",
  Prescription: "💊",
  "Lab Result": "🧪",
  Vaccination: "💉",
  Allergy: "⚠️",
  Surgery: "🏥",
  "Vital Signs": "❤️",
  Other: "📄",
};

/* ── Storage Helpers ────────────────────────────────────────── */
function getMedicalRecords() {
  try {
    return JSON.parse(localStorage.getItem(MEDICAL_KEY)) || [];
  } catch {
    return [];
  }
}

function saveMedicalRecords(records) {
  localStorage.setItem(MEDICAL_KEY, JSON.stringify(records));
}

/* ── Render Records ─────────────────────────────────────────── */
function renderMedicalRecords(filterType) {
  const records = getMedicalRecords();
  const listEl = document.getElementById("medicalList");
  if (!listEl) return;

  const filtered = filterType
    ? records.filter((r) => r.type === filterType)
    : records;

  if (filtered.length === 0) {
    listEl.innerHTML =
      '<p class="empty-state">No medical records found. Add your first record above! 📋</p>';
    return;
  }

  // Sort newest date first
  const sorted = [...filtered].sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date);
    return b.createdAt - a.createdAt;
  });

  listEl.innerHTML = sorted
    .map(
      (r) => `
    <div class="medical-item" data-id="${r.id}">
      <div class="medical-item-left">
        <span class="medical-item-type-badge">${TYPE_EMOJI[r.type] || "📄"} ${r.type}</span>
        <div class="medical-item-title">${escapeHtml(r.title)}</div>
        <div class="medical-item-meta">
          📅 ${formatDate(r.date)}
          ${r.doctor ? ` · 👨‍⚕️ ${escapeHtml(r.doctor)}` : ""}
        </div>
        ${
          r.details
            ? `<div class="medical-item-details">${escapeHtml(r.details)}</div>`
            : ""
        }
      </div>
      <div>
        <button class="btn btn-ghost" onclick="deleteMedicalRecord('${r.id}')" title="Delete record">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`
    )
    .join("");
}

/* ── Update Dashboard Count ─────────────────────────────────── */
function updateMedicalStats() {
  const count = getMedicalRecords().length;
  const el = document.getElementById("statRecords");
  if (el) el.textContent = count;
}

/* ── Add Record ─────────────────────────────────────────────── */
function addMedicalRecord(data) {
  const records = getMedicalRecords();
  records.push(data);
  saveMedicalRecords(records);

  const filterVal = document.getElementById("medicalFilter")?.value || "";
  renderMedicalRecords(filterVal);
  updateMedicalStats();
}

/* ── Delete Record ──────────────────────────────────────────── */
function deleteMedicalRecord(id) {
  if (!confirm("Delete this medical record?")) return;
  const records = getMedicalRecords().filter((r) => r.id !== id);
  saveMedicalRecords(records);

  const filterVal = document.getElementById("medicalFilter")?.value || "";
  renderMedicalRecords(filterVal);
  updateMedicalStats();
  showToast("Record deleted.");
}

/* ── Clear All Records ──────────────────────────────────────── */
function clearAllMedical() {
  if (!confirm("Clear ALL medical records? This cannot be undone.")) return;
  saveMedicalRecords([]);
  renderMedicalRecords();
  updateMedicalStats();
  showToast("All medical records cleared.");
}

/* ── Initialise ─────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("medicalForm");
  if (form) {
    // Default date to today
    const dateInput = document.getElementById("recordDate");
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const type = document.getElementById("recordType").value;
      const date = document.getElementById("recordDate").value;
      const title = document.getElementById("recordTitle").value.trim();
      const doctor = document.getElementById("recordDoctor").value.trim();
      const details = document.getElementById("recordDetails").value.trim();

      if (!type) { showToast("Please select a record type.", true); return; }
      if (!date) { showToast("Please select a date.", true); return; }
      if (!title) { showToast("Please enter a title or condition.", true); return; }

      addMedicalRecord({
        id: generateId(),
        type,
        date,
        title,
        doctor,
        details,
        createdAt: Date.now(),
      });

      form.reset();
      dateInput.value = new Date().toISOString().slice(0, 10);
      showToast("Medical record saved! 📋");
    });
  }

  // Filter change
  document.getElementById("medicalFilter")?.addEventListener("change", (e) => {
    renderMedicalRecords(e.target.value);
  });

  // Clear all
  document.getElementById("clearMedicalBtn")?.addEventListener("click", clearAllMedical);

  renderMedicalRecords();
  updateMedicalStats();
});
