/* ═══════════════════════════════════════════════════════════
   fitness.js – Fitness Tracking Module
   ═══════════════════════════════════════════════════════════ */

const FITNESS_KEY = "aurahealth_workouts";

/* ── Storage Helpers ────────────────────────────────────────── */
function getWorkouts() {
  try {
    return JSON.parse(localStorage.getItem(FITNESS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWorkouts(workouts) {
  localStorage.setItem(FITNESS_KEY, JSON.stringify(workouts));
}

/* ── Stats Calculation ──────────────────────────────────────── */
function getTodayStats(workouts) {
  const today = new Date().toISOString().slice(0, 10);
  const todayWorkouts = workouts.filter((w) => w.date === today);
  return {
    calories: todayWorkouts.reduce((s, w) => s + (w.calories || 0), 0),
    steps: todayWorkouts.reduce((s, w) => s + (w.steps || 0), 0),
    minutes: todayWorkouts.reduce((s, w) => s + (w.duration || 0), 0),
    count: todayWorkouts.length,
  };
}

function getAllTimeStats(workouts) {
  return {
    calories: workouts.reduce((s, w) => s + (w.calories || 0), 0),
    steps: workouts.reduce((s, w) => s + (w.steps || 0), 0),
    count: workouts.length,
  };
}

/* ── Render Workout List ────────────────────────────────────── */
function renderWorkouts() {
  const workouts = getWorkouts();
  const listEl = document.getElementById("workoutList");
  if (!listEl) return;

  if (workouts.length === 0) {
    listEl.innerHTML =
      '<p class="empty-state">No workouts logged yet. Add your first workout above! 💪</p>';
    return;
  }

  // Sort newest first
  const sorted = [...workouts].sort(
    (a, b) => new Date(b.date + "T" + b.time) - new Date(a.date + "T" + a.time)
  );

  listEl.innerHTML = sorted
    .map(
      (w, idx) => `
    <div class="workout-item" data-id="${w.id}">
      <div class="workout-item-info">
        <div class="workout-item-type">${w.type}</div>
        <div class="workout-item-meta">${formatDate(w.date)} · ${w.time}</div>
        ${w.notes ? `<div class="workout-item-notes">"${escapeHtml(w.notes)}"</div>` : ""}
      </div>
      <div class="workout-item-stats">
        <span class="workout-badge">⏱ ${w.duration} min</span>
        ${w.calories ? `<span class="workout-badge">🔥 ${w.calories} kcal</span>` : ""}
        ${w.steps ? `<span class="workout-badge">👟 ${w.steps.toLocaleString()} steps</span>` : ""}
        <button class="btn btn-ghost delete-workout-btn" data-workout-id="${w.id}" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`
    )
    .join("");
}

/* ── Update Dashboard Stats ─────────────────────────────────── */
function updateFitnessStats() {
  const workouts = getWorkouts();
  const today = getTodayStats(workouts);
  const all = getAllTimeStats(workouts);

  // Dashboard cards
  const elCal = document.getElementById("statCalories");
  const elSteps = document.getElementById("statSteps");
  const elWk = document.getElementById("statWorkouts");
  if (elCal) elCal.textContent = all.calories.toLocaleString();
  if (elSteps) elSteps.textContent = all.steps.toLocaleString();
  if (elWk) elWk.textContent = all.count;

  // Fitness section stat boxes
  const el2Cal = document.getElementById("todayCalories");
  const el2Steps = document.getElementById("todaySteps");
  const el2Min = document.getElementById("todayMinutes");
  const el2Wk = document.getElementById("todayWorkouts");
  if (el2Cal) el2Cal.textContent = today.calories.toLocaleString();
  if (el2Steps) el2Steps.textContent = today.steps.toLocaleString();
  if (el2Min) el2Min.textContent = today.minutes;
  if (el2Wk) el2Wk.textContent = today.count;
}

/* ── Add Workout ────────────────────────────────────────────── */
function addWorkout(data) {
  const workouts = getWorkouts();
  workouts.push(data);
  saveWorkouts(workouts);
  renderWorkouts();
  updateFitnessStats();
}

/* ── Delete Workout ─────────────────────────────────────────── */
function deleteWorkout(id) {
  const workouts = getWorkouts().filter((w) => w.id !== id);
  saveWorkouts(workouts);
  renderWorkouts();
  updateFitnessStats();
  showToast("Workout deleted.");
}

/* ── Clear All Workouts ─────────────────────────────────────── */
function clearAllWorkouts() {
  if (!confirm("Clear all workout history? This cannot be undone.")) return;
  saveWorkouts([]);
  renderWorkouts();
  updateFitnessStats();
  showToast("All workouts cleared.");
}

/* ── Initialise ─────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workoutForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const type = document.getElementById("workoutType").value.trim();
      const duration = parseInt(document.getElementById("workoutDuration").value, 10);
      const calories = parseInt(document.getElementById("workoutCalories").value, 10) || 0;
      const steps = parseInt(document.getElementById("workoutSteps").value, 10) || 0;
      const notes = document.getElementById("workoutNotes").value.trim();

      if (!type) { showToast("Please select an activity type.", true); return; }
      if (!duration || duration < 1) { showToast("Please enter a valid duration.", true); return; }

      const now = new Date();
      addWorkout({
        id: generateId(),
        type,
        duration,
        calories,
        steps,
        notes,
        date: now.toISOString().slice(0, 10),
        time: now.toTimeString().slice(0, 5),
      });

      form.reset();
      showToast("Workout logged! 💪");
    });
  }

  const clearBtn = document.getElementById("clearWorkoutsBtn");
  if (clearBtn) clearBtn.addEventListener("click", clearAllWorkouts);

  // Event delegation for delete buttons
  document.getElementById("workoutList")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-workout-btn");
    if (btn) deleteWorkout(btn.dataset.workoutId);
  });

  renderWorkouts();
  updateFitnessStats();
});
