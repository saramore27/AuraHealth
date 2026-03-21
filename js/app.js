/* ═══════════════════════════════════════════════════════════
   app.js – Core Application: Navigation, Utilities, Init
   ═══════════════════════════════════════════════════════════ */

/* ── Utility Functions (global, used by other modules) ──────── */

/**
 * Escape HTML to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

/**
 * Format an ISO date string (YYYY-MM-DD) to a human-readable date.
 * @param {string} isoDate  e.g. "2025-12-25"
 * @returns {string}        e.g. "25 Dec 2025"
 */
function formatDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

/**
 * Generate a simple unique ID.
 * @returns {string}
 */
function generateId() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

/* ── Toast Notification ─────────────────────────────────────── */
let toastTimeout = null;

/**
 * Show a brief toast notification.
 * @param {string}  message
 * @param {boolean} [isError=false]
 */
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  if (toastTimeout) clearTimeout(toastTimeout);

  toast.textContent = message;
  toast.className = "toast show" + (isError ? " error" : "");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/* ── SPA Navigation ─────────────────────────────────────────── */
const SECTION_TITLES = {
  dashboard: "Dashboard",
  ayurveda: "Ayurveda & Modern Solutions",
  fitness: "Fitness Tracker",
  yoga: "Yoga & Mudra Guidance",
  chatbot: "AI Health Chatbot",
  medical: "Medical History",
};

/**
 * Switch to the specified section of the SPA.
 * @param {string} sectionId
 */
function navigateTo(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (!targetSection) return;

  // Hide all sections
  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
  // Show target
  targetSection.classList.add("active");

  // Update nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });

  // Update page title
  const titleEl = document.getElementById("pageTitle");
  if (titleEl) titleEl.textContent = SECTION_TITLES[sectionId] || sectionId;

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Scroll main content to top
  window.scrollTo(0, 0);
}

/* ── Mobile Sidebar ─────────────────────────────────────────── */
function openMobileSidebar() {
  document.getElementById("sidebar")?.classList.add("open");
  document.getElementById("sidebarOverlay")?.classList.add("visible");
}

function closeMobileSidebar() {
  document.getElementById("sidebar")?.classList.remove("open");
  document.getElementById("sidebarOverlay")?.classList.remove("visible");
}

/* ── Tab Switching (Yoga section) ───────────────────────────── */
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      // Deactivate all tabs in same tab-bar
      const tabBar = btn.closest(".tab-bar");
      tabBar?.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Hide all tab content siblings
      document.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
      document.getElementById(tabId)?.classList.add("active");
    });
  });
}

/* ── Modal ──────────────────────────────────────────────────── */
function initModal() {
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");

  closeBtn?.addEventListener("click", () => overlay?.classList.remove("active"));
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay?.classList.remove("active");
  });
}

/* ── Create Sidebar Overlay for Mobile ──────────────────────── */
function createSidebarOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  overlay.id = "sidebarOverlay";
  overlay.addEventListener("click", closeMobileSidebar);
  document.body.appendChild(overlay);
}

/* ── App Init ───────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Create mobile overlay
  createSidebarOverlay();

  // Sidebar nav links
  document.querySelectorAll(".nav-link[data-section]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo(link.dataset.section);
    });
  });

  // Feature/stat cards on dashboard
  document.querySelectorAll("[data-section]").forEach((el) => {
    if (!el.classList.contains("nav-link")) {
      el.addEventListener("click", () => {
        const section = el.dataset.section;
        if (section) navigateTo(section);
      });
    }
  });

  // Mobile menu toggle
  document.getElementById("menuToggle")?.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar?.classList.contains("open")) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });

  // Tabs
  initTabs();

  // Modal
  initModal();

  // Start on dashboard
  navigateTo("dashboard");
});
