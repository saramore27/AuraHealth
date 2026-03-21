/* ═══════════════════════════════════════════════════════════
   yoga.js – Yoga Poses, Mudras & Breathing Exercises
   ═══════════════════════════════════════════════════════════ */

const YOGA_POSES = [
  {
    emoji: "🧘",
    name: "Mountain Pose",
    sanskrit: "Tadasana",
    level: "Beginner",
    benefits: ["Improves posture", "Strengthens thighs & ankles", "Calms the mind"],
    desc: "The foundation of all standing poses. Stand tall with feet together, arms alongside the body.",
    steps: [
      "Stand with feet hip-width apart or together.",
      "Ground all four corners of each foot into the floor.",
      "Lengthen the spine and lift the crown of your head.",
      "Roll your shoulders back and down, relax your arms.",
      "Breathe steadily for 30–60 seconds.",
    ],
    contraindications: "None for most people.",
    duration: "30–60 seconds",
    tags: ["Beginner", "Standing", "Grounding"],
  },
  {
    emoji: "🌳",
    name: "Tree Pose",
    sanskrit: "Vrksasana",
    level: "Beginner",
    benefits: ["Improves balance", "Strengthens core & ankles", "Builds concentration"],
    desc: "A classic balancing pose that improves focus and strengthens the standing leg.",
    steps: [
      "Begin in Mountain Pose.",
      "Shift weight onto the right foot.",
      "Place the left foot on the inner right thigh or calf (not the knee).",
      "Bring palms together at the chest or raise arms overhead.",
      "Hold for 30 seconds, then switch sides.",
    ],
    contraindications: "Use a wall for support if you have balance issues.",
    duration: "30 seconds each side",
    tags: ["Beginner", "Balance", "Standing"],
  },
  {
    emoji: "🐍",
    name: "Cobra Pose",
    sanskrit: "Bhujangasana",
    level: "Beginner",
    benefits: ["Opens the chest", "Strengthens the spine", "Relieves back pain", "Stimulates digestion"],
    desc: "A gentle backbend that strengthens the back muscles and opens the chest.",
    steps: [
      "Lie on your stomach, legs extended, tops of feet on the floor.",
      "Place hands under your shoulders, elbows close to the body.",
      "On an inhale, slowly lift your chest off the floor.",
      "Keep your elbows slightly bent and shoulders away from ears.",
      "Hold for 15–30 seconds, then release on an exhale.",
    ],
    contraindications: "Avoid if you have a severe back injury or are pregnant.",
    duration: "15–30 seconds",
    tags: ["Beginner", "Backbend", "Core"],
  },
  {
    emoji: "🌊",
    name: "Child's Pose",
    sanskrit: "Balasana",
    level: "Beginner",
    benefits: ["Releases tension in the back", "Calms the nervous system", "Stretches hips & thighs"],
    desc: "A restful, grounding pose used as a resting position between challenging asanas.",
    steps: [
      "Kneel on the floor, touch big toes together, sit on your heels.",
      "Separate knees about hip-width apart.",
      "Exhale and fold forward, extending arms in front.",
      "Rest your forehead on the mat.",
      "Hold for 1–3 minutes.",
    ],
    contraindications: "Modify with a bolster if you have knee or hip issues.",
    duration: "1–3 minutes",
    tags: ["Beginner", "Restorative", "Hip Opener"],
  },
  {
    emoji: "⬇️",
    name: "Downward-Facing Dog",
    sanskrit: "Adho Mukha Svanasana",
    level: "Beginner",
    benefits: ["Strengthens arms & legs", "Stretches the entire back body", "Energises & calms"],
    desc: "One of the most practised yoga poses, forming an inverted V-shape with the body.",
    steps: [
      "Start on hands and knees (tabletop position).",
      "Spread fingers wide, press into the floor.",
      "Tuck toes, exhale, and lift hips toward the ceiling.",
      "Straighten legs as much as possible, press heels toward the floor.",
      "Hold for 1–3 minutes, breathing steadily.",
    ],
    contraindications: "Bend knees if hamstrings are tight. Avoid with wrist injuries.",
    duration: "1–3 minutes",
    tags: ["Beginner", "Full Body", "Inversion"],
  },
  {
    emoji: "⚔️",
    name: "Warrior I",
    sanskrit: "Virabhadrasana I",
    level: "Beginner",
    benefits: ["Strengthens legs & core", "Opens hips & chest", "Builds stamina & focus"],
    desc: "A powerful standing pose that builds strength, stability, and confidence.",
    steps: [
      "Step the right foot forward between your hands (from Downward Dog).",
      "Spin the back foot to 45°, press it firmly into the floor.",
      "Rise up, bending the front knee over the ankle.",
      "Raise arms overhead, palms facing each other.",
      "Hold for 30–60 seconds, then switch sides.",
    ],
    contraindications: "Modify with shorter stance if hip flexors are tight.",
    duration: "30–60 seconds each side",
    tags: ["Beginner", "Standing", "Strength"],
  },
  {
    emoji: "🦋",
    name: "Butterfly Pose",
    sanskrit: "Baddha Konasana",
    level: "Beginner",
    benefits: ["Opens inner thighs & groin", "Stimulates abdominal organs", "Relieves mild depression"],
    desc: "A seated pose that opens the hips and inner groin. Flap the knees like butterfly wings.",
    steps: [
      "Sit on the floor, bend knees and bring soles of feet together.",
      "Hold your feet with your hands.",
      "Gently press knees toward the floor.",
      "Sit tall or fold forward for a deeper stretch.",
      "Hold for 1–5 minutes.",
    ],
    contraindications: "Place blankets under knees if groin is very tight.",
    duration: "1–5 minutes",
    tags: ["Beginner", "Hip Opener", "Seated"],
  },
  {
    emoji: "🌙",
    name: "Half Moon Pose",
    sanskrit: "Ardha Chandrasana",
    level: "Intermediate",
    benefits: ["Improves balance & coordination", "Strengthens legs & core", "Opens hips & chest"],
    desc: "A challenging balance pose that requires strength and focus.",
    steps: [
      "Begin in Triangle Pose on the right side.",
      "Bend the right knee slightly, shift weight onto the right foot.",
      "Bring the right hand to the floor about 12 inches in front.",
      "Lift the left leg parallel to the floor.",
      "Extend left arm toward the ceiling, open the chest.",
      "Hold 30 seconds, then repeat on the left side.",
    ],
    contraindications: "Use a block under the bottom hand if needed.",
    duration: "30 seconds each side",
    tags: ["Intermediate", "Balance", "Standing"],
  },
  {
    emoji: "🌀",
    name: "Seated Spinal Twist",
    sanskrit: "Ardha Matsyendrasana",
    level: "Intermediate",
    benefits: ["Detoxifies organs", "Improves spinal flexibility", "Aids digestion"],
    desc: "A seated twist that wrings out the spine and massages abdominal organs.",
    steps: [
      "Sit with legs extended. Bend the right knee, place foot outside left thigh.",
      "Keep the left leg extended or bend it under the right thigh.",
      "Inhale and lengthen the spine.",
      "Exhale and twist to the right, placing the left elbow outside the right knee.",
      "Look over the right shoulder. Hold 30–60 seconds, then switch sides.",
    ],
    contraindications: "Keep the twist gentle if you have spinal issues.",
    duration: "30–60 seconds each side",
    tags: ["Intermediate", "Twist", "Seated"],
  },
  {
    emoji: "🕊️",
    name: "Pigeon Pose",
    sanskrit: "Eka Pada Rajakapotasana",
    level: "Intermediate",
    benefits: ["Deep hip opener", "Releases stored emotions", "Stretches the piriformis"],
    desc: "A powerful hip-opening pose that releases deep tension in the hips and glutes.",
    steps: [
      "From Downward Dog, bring the right knee forward behind the right wrist.",
      "Extend the left leg straight back.",
      "Square the hips toward the mat.",
      "Fold forward over the front shin or stay upright.",
      "Hold 1–3 minutes, then switch sides.",
    ],
    contraindications: "Use a block or blanket under the hip if needed. Avoid if knee injury.",
    duration: "1–3 minutes each side",
    tags: ["Intermediate", "Hip Opener", "Yin"],
  },
  {
    emoji: "🦅",
    name: "Crow Pose",
    sanskrit: "Bakasana",
    level: "Advanced",
    benefits: ["Builds upper body strength", "Improves balance & focus", "Strengthens wrists"],
    desc: "An arm balance that requires strength, balance, and mental focus.",
    steps: [
      "Squat with feet hip-width apart, arms inside the knees.",
      "Place hands flat on the floor, shoulder-width apart.",
      "Bend elbows slightly, place knees on the backs of your upper arms.",
      "Lean forward, shifting weight into the hands.",
      "Lift feet off the floor, one at a time. Hold for 5–10 seconds.",
    ],
    contraindications: "Place a folded blanket in front as a safety cushion.",
    duration: "5–15 seconds",
    tags: ["Advanced", "Arm Balance", "Core"],
  },
  {
    emoji: "🙃",
    name: "Headstand",
    sanskrit: "Sirsasana",
    level: "Advanced",
    benefits: ["Increases blood flow to the brain", "Strengthens shoulders & core", "Builds confidence"],
    desc: "The 'King of Asanas' — an inversion that requires significant core and shoulder strength.",
    steps: [
      "Interlace fingers on the mat, forearms down, crown of head on the mat.",
      "Lift hips, walk feet in until hips are over shoulders.",
      "Slowly lift both legs, engaging the core.",
      "Stack ankles over hips over shoulders.",
      "Hold for 10 seconds to 2 minutes. Come down with control.",
    ],
    contraindications: "Do NOT attempt without proper guidance. Avoid with neck, eye, or blood-pressure issues.",
    duration: "10 seconds – 2 minutes",
    tags: ["Advanced", "Inversion", "Core"],
  },
];

const MUDRAS = [
  {
    emoji: "👌",
    name: "Gyan Mudra",
    sanskrit: "Gyan / Chin Mudra",
    level: "All Levels",
    benefits: ["Enhances concentration & memory", "Calms the mind", "Reduces insomnia & anxiety"],
    desc: "The most widely known mudra — touch the tip of the index finger to the tip of the thumb.",
    steps: [
      "Sit comfortably in a meditation posture.",
      "Rest hands on knees, palms facing up.",
      "Touch the tip of the index finger to the tip of the thumb gently.",
      "Extend the remaining three fingers straight.",
      "Hold for 15–45 minutes during meditation or pranayama.",
    ],
    contraindications: "None.",
    duration: "15–45 minutes",
    tags: ["All Levels", "Meditation", "Mind"],
  },
  {
    emoji: "🤲",
    name: "Anjali Mudra",
    sanskrit: "Anjali / Namaste Mudra",
    level: "All Levels",
    benefits: ["Cultivates gratitude & respect", "Calms the nervous system", "Centres the mind"],
    desc: "The gesture of prayer — bring both palms together at the heart centre.",
    steps: [
      "Sit or stand comfortably.",
      "Bring both palms together at the centre of the chest.",
      "Press the fingers and palms together with gentle, equal pressure.",
      "Close your eyes and breathe deeply.",
      "Hold for as long as you wish.",
    ],
    contraindications: "None.",
    duration: "As long as desired",
    tags: ["All Levels", "Heart", "Centering"],
  },
  {
    emoji: "🖐️",
    name: "Prana Mudra",
    sanskrit: "Prana Mudra",
    level: "All Levels",
    benefits: ["Activates life-force energy (prana)", "Boosts immunity", "Reduces fatigue & eye disorders"],
    desc: "Touch the tips of the ring finger and little finger to the tip of the thumb.",
    steps: [
      "Sit comfortably with the spine erect.",
      "Touch the tips of the ring finger and little finger to the thumb tip.",
      "Keep the index and middle fingers extended and straight.",
      "Hold both hands in this position, palms facing up.",
      "Practise for 15–30 minutes.",
    ],
    contraindications: "None known.",
    duration: "15–30 minutes",
    tags: ["All Levels", "Energy", "Immunity"],
  },
  {
    emoji: "✊",
    name: "Apana Mudra",
    sanskrit: "Apana Mudra",
    level: "All Levels",
    benefits: ["Supports detoxification", "Aids digestion & constipation", "Balances emotions"],
    desc: "Touch the tips of the middle and ring fingers to the thumb tip.",
    steps: [
      "Sit comfortably in a meditation pose.",
      "Touch the tips of the middle and ring fingers to the tip of the thumb.",
      "Extend the index and little fingers straight.",
      "Place hands on the thighs with palms facing up.",
      "Hold for 15–45 minutes.",
    ],
    contraindications: "None.",
    duration: "15–45 minutes",
    tags: ["All Levels", "Digestion", "Cleansing"],
  },
  {
    emoji: "🤙",
    name: "Shuni Mudra",
    sanskrit: "Shuni Mudra",
    level: "All Levels",
    benefits: ["Improves patience & discipline", "Enhances intuition", "Purifies emotions"],
    desc: "Touch the tip of the middle finger to the tip of the thumb.",
    steps: [
      "Sit comfortably and relax.",
      "Touch the tip of the middle (Saturn) finger to the thumb tip.",
      "Extend the other fingers comfortably.",
      "Rest hands on knees, palms up.",
      "Hold during meditation for 10–30 minutes.",
    ],
    contraindications: "None.",
    duration: "10–30 minutes",
    tags: ["All Levels", "Patience", "Intuition"],
  },
  {
    emoji: "🖖",
    name: "Vayu Mudra",
    sanskrit: "Vayu Mudra",
    level: "All Levels",
    benefits: ["Relieves gas & bloating", "Reduces joint pain", "Calms Vata (air) imbalances"],
    desc: "Fold the index finger down to touch the base of the thumb; press gently with the thumb.",
    steps: [
      "Sit or stand comfortably.",
      "Fold the index finger to touch the base of the thumb.",
      "Press the thumb gently over the folded index finger.",
      "Keep the other three fingers extended and relaxed.",
      "Hold for 15–30 minutes, up to 3 times daily.",
    ],
    contraindications: "Don't hold for too long if you have low blood pressure.",
    duration: "15–30 minutes",
    tags: ["All Levels", "Digestion", "Vata"],
  },
];

const BREATHING_EXERCISES = [
  {
    emoji: "🌬️",
    name: "Alternate Nostril Breathing",
    sanskrit: "Nadi Shodhana Pranayama",
    level: "Beginner",
    benefits: ["Balances the nervous system", "Reduces stress & anxiety", "Improves focus"],
    desc: "A classic pranayama that balances the left and right hemispheres of the brain.",
    steps: [
      "Sit comfortably with a straight spine.",
      "Rest the left hand on the left knee in Gyan Mudra.",
      "Use the right hand: close the right nostril with your right thumb.",
      "Inhale through the left nostril for 4 counts.",
      "Close both nostrils, hold for 4 counts.",
      "Release the right nostril, exhale for 4 counts.",
      "Inhale through the right nostril for 4 counts, hold, exhale left.",
      "Repeat 5–10 cycles.",
    ],
    contraindications: "Do not hold the breath if you have high blood pressure.",
    duration: "5–10 minutes",
    tags: ["Beginner", "Calming", "Balance"],
  },
  {
    emoji: "🔔",
    name: "Humming Bee Breath",
    sanskrit: "Bhramari Pranayama",
    level: "Beginner",
    benefits: ["Instantly calms the mind", "Reduces blood pressure", "Relieves anger & anxiety"],
    desc: "Make a humming sound on the exhale to stimulate the vagus nerve and calm the body.",
    steps: [
      "Sit comfortably and close your eyes.",
      "Cover your ears with your thumbs, eyes with fingers (or just close eyes).",
      "Take a deep inhale through the nose.",
      "On the exhale, make a continuous humming 'mmmm' sound like a bee.",
      "Feel the vibration in the face and skull.",
      "Repeat 5–10 times.",
    ],
    contraindications: "Avoid during pregnancy or if you have ear infections.",
    duration: "5–10 minutes",
    tags: ["Beginner", "Calming", "Anxiety"],
  },
  {
    emoji: "🔥",
    name: "Bellows Breath",
    sanskrit: "Bhastrika Pranayama",
    level: "Intermediate",
    benefits: ["Energises the body & mind", "Clears nasal passages", "Boosts metabolism"],
    desc: "Rapid, forceful inhales and exhales to generate internal heat and increase energy.",
    steps: [
      "Sit comfortably with a straight spine.",
      "Breathe in and out rapidly through the nose.",
      "Both the inhale and exhale should be forceful and equal in duration.",
      "Start at 1 breath per second, work up to 2 per second.",
      "Practice 20–30 pumps, then rest. Repeat 3 rounds.",
    ],
    contraindications: "Avoid with high blood pressure, heart disease, or epilepsy.",
    duration: "3–5 minutes",
    tags: ["Intermediate", "Energising", "Detox"],
  },
  {
    emoji: "❄️",
    name: "Cooling Breath",
    sanskrit: "Sheetali Pranayama",
    level: "Beginner",
    benefits: ["Cools the body & mind", "Reduces Pitta imbalances", "Lowers blood pressure"],
    desc: "Inhale through a curled tongue to cool and calm the body. Excellent in hot weather.",
    steps: [
      "Sit comfortably, close your eyes.",
      "Roll your tongue into a tube (curling the sides upward) and stick it out slightly.",
      "Inhale slowly through the curled tongue, feeling the cooling sensation.",
      "Retract the tongue, close the mouth, and exhale through the nose.",
      "Repeat 10–15 times.",
    ],
    contraindications: "If you cannot curl the tongue, use Sitkari (inhale between the teeth).",
    duration: "5–10 minutes",
    tags: ["Beginner", "Cooling", "Pitta"],
  },
  {
    emoji: "🌊",
    name: "Ocean Breath",
    sanskrit: "Ujjayi Pranayama",
    level: "Beginner",
    benefits: ["Calms and focuses the mind", "Regulates breathing during yoga", "Builds heat internally"],
    desc: "A soft, audible breath resembling ocean waves. Used throughout yoga practice.",
    steps: [
      "Inhale through the nose while slightly constricting the back of the throat.",
      "The inhale should make a soft 'SAAH' sound.",
      "Exhale through the nose with the same constriction — making a 'HAAH' sound.",
      "Keep the breath smooth, long, and controlled.",
      "Practise for 5–20 minutes or throughout your yoga session.",
    ],
    contraindications: "None for most people.",
    duration: "5–20 minutes",
    tags: ["Beginner", "Yoga", "Focus"],
  },
];

/* ── Render Functions ───────────────────────────────────────── */
function renderYogaGrid(poses, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = poses
    .map(
      (p) => `
    <div class="yoga-card" data-id="${encodeURIComponent(p.name)}" data-collection="${containerId}">
      <div class="yoga-card-emoji">${p.emoji}</div>
      <div class="yoga-card-name">${p.name}</div>
      <div class="yoga-card-sanskrit">${p.sanskrit}</div>
      <div class="yoga-card-desc">${p.desc}</div>
      <div class="yoga-card-tags">
        ${p.tags.map((t) => `<span class="tag ${t.toLowerCase()}">${t}</span>`).join("")}
      </div>
    </div>`
    )
    .join("");
}

function filterYogaPoses() {
  const searchVal = (document.getElementById("poseSearch")?.value || "").toLowerCase();
  const levelVal = document.getElementById("poseFilter")?.value || "";

  const filtered = YOGA_POSES.filter((p) => {
    const matchSearch =
      !searchVal ||
      p.name.toLowerCase().includes(searchVal) ||
      p.sanskrit.toLowerCase().includes(searchVal) ||
      p.desc.toLowerCase().includes(searchVal);
    const matchLevel = !levelVal || p.level === levelVal;
    return matchSearch && matchLevel;
  });

  renderYogaGrid(filtered, "yogaGrid");
}

/* ── Modal Detail View ──────────────────────────────────────── */
function openYogaModal(item) {
  const content = document.getElementById("modalContent");
  if (!content) return;

  content.innerHTML = `
    <div class="modal-emoji">${item.emoji}</div>
    <div class="modal-title">${item.name}</div>
    <div class="modal-sanskrit">${item.sanskrit}</div>
    <div class="modal-section">
      <h4>⏱ Duration</h4>
      <p>${item.duration}</p>
    </div>
    <div class="modal-section">
      <h4>✨ Benefits</h4>
      <ul>${item.benefits.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div>
    <div class="modal-section">
      <h4>📋 Step-by-Step Instructions</h4>
      <ul>${item.steps.map((s) => `<li>${s}</li>`).join("")}</ul>
    </div>
    ${item.contraindications ? `
    <div class="modal-section">
      <h4>⚠️ Contraindications</h4>
      <p>${item.contraindications}</p>
    </div>` : ""}
  `;

  document.getElementById("modalOverlay")?.classList.add("active");
}

/* ── Initialise ─────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderYogaGrid(YOGA_POSES, "yogaGrid");
  renderYogaGrid(MUDRAS, "mudraGrid");
  renderYogaGrid(BREATHING_EXERCISES, "breathingGrid");

  // Search & filter
  document.getElementById("poseSearch")?.addEventListener("input", filterYogaPoses);
  document.getElementById("poseFilter")?.addEventListener("change", filterYogaPoses);

  // Card click → modal
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".yoga-card");
    if (!card) return;
    const name = decodeURIComponent(card.dataset.id);
    const allItems = [...YOGA_POSES, ...MUDRAS, ...BREATHING_EXERCISES];
    const item = allItems.find((p) => p.name === name);
    if (item) openYogaModal(item);
  });
});
