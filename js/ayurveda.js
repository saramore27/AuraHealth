/* ═══════════════════════════════════════════════════════════
   ayurveda.js – Ayurvedic & Modern Health Content
   ═══════════════════════════════════════════════════════════ */

const DOSHA_QUIZ = [
  {
    q: "1 of 5 · How would you describe your body frame?",
    options: [
      { label: "Slim/light — hard to gain weight", dosha: "Vata" },
      { label: "Medium, athletic build", dosha: "Pitta" },
      { label: "Larger/stocky — easy to gain weight", dosha: "Kapha" },
    ],
  },
  {
    q: "2 of 5 · How is your skin usually?",
    options: [
      { label: "Dry, rough, or flaky", dosha: "Vata" },
      { label: "Warm, oily in the T-zone, prone to redness", dosha: "Pitta" },
      { label: "Smooth, oily, cool", dosha: "Kapha" },
    ],
  },
  {
    q: "3 of 5 · What best describes your appetite?",
    options: [
      { label: "Irregular — sometimes hungry, sometimes not", dosha: "Vata" },
      { label: "Strong appetite, irritable when hungry", dosha: "Pitta" },
      { label: "Steady appetite, can skip meals easily", dosha: "Kapha" },
    ],
  },
  {
    q: "4 of 5 · How do you handle stress?",
    options: [
      { label: "Anxious, overthink, worry", dosha: "Vata" },
      { label: "Irritable, controlling, perfectionistic", dosha: "Pitta" },
      { label: "Withdraw, become quiet", dosha: "Kapha" },
    ],
  },
  {
    q: "5 of 5 · How is your sleep?",
    options: [
      { label: "Light, interrupted, hard to fall asleep", dosha: "Vata" },
      { label: "Moderate, vivid dreams, wake from heat", dosha: "Pitta" },
      { label: "Deep, heavy, tend to oversleep", dosha: "Kapha" },
    ],
  },
];

const DOSHA_RESULTS = {
  Vata: {
    title: "Your Dominant Dosha: Vata 🌬️",
    description:
      "Vata governs movement and communication in the body. Vata types are creative, quick-thinking, and energetic — but when imbalanced they may experience anxiety, dryness, and irregular digestion. Eat warm, nourishing foods; establish routines; practice grounding yoga like Yin or Hatha. Herbs: Ashwagandha, Shatavari, Triphala.",
  },
  Pitta: {
    title: "Your Dominant Dosha: Pitta 🔥",
    description:
      "Pitta governs transformation — digestion, metabolism, and intellect. Pitta types are driven, intelligent, and passionate. When imbalanced: inflammation, irritability, acid reflux. Eat cooling foods (cucumber, coconut, mint); avoid spicy/fried foods; practise cooling yoga or swimming. Herbs: Brahmi, Amalaki, Neem.",
  },
  Kapha: {
    title: "Your Dominant Dosha: Kapha 🌊",
    description:
      "Kapha governs structure and stability — lubrication, immunity, and calm. Kapha types are steady, compassionate, and strong. When imbalanced: lethargy, weight gain, congestion. Eat light, spicy, and warm foods; exercise daily; try energising yoga like Vinyasa. Herbs: Trikatu, Guggul, Ginger.",
  },
};

const REMEDIES = [
  {
    emoji: "🌿",
    name: "Ashwagandha (Withania somnifera)",
    desc: "An adaptogenic root that reduces stress, boosts energy, and supports immune function. Take as powder in warm milk or as a supplement.",
    dosha: "Balances: Vata & Kapha",
  },
  {
    emoji: "🍋",
    name: "Amalaki (Indian Gooseberry)",
    desc: "Extremely rich in Vitamin C, a potent antioxidant. Supports immunity, skin health, digestion, and eye health. Consume fresh or as Chyawanprash.",
    dosha: "Balances: Pitta",
  },
  {
    emoji: "🌼",
    name: "Turmeric (Curcuma longa)",
    desc: "Powerful anti-inflammatory herb. Curcumin reduces inflammation, supports joint health, and boosts immunity. Mix with black pepper and warm milk (golden milk).",
    dosha: "Balances: Vata, Pitta & Kapha",
  },
  {
    emoji: "🫚",
    name: "Triphala",
    desc: "A classic Ayurvedic formula of three fruits: Amalaki, Bibhitaki, Haritaki. Supports digestion, detoxification, and regular bowel movements.",
    dosha: "Balances: All Doshas",
  },
  {
    emoji: "🌱",
    name: "Brahmi (Bacopa monnieri)",
    desc: "A brain tonic that enhances memory, concentration, and reduces anxiety. Commonly used as an oil for scalp massage or as a supplement.",
    dosha: "Balances: Vata & Pitta",
  },
  {
    emoji: "🫘",
    name: "Neem (Azadirachta indica)",
    desc: "A powerful blood purifier and antibacterial herb. Supports healthy skin, oral hygiene, and blood sugar regulation.",
    dosha: "Balances: Pitta & Kapha",
  },
  {
    emoji: "🫖",
    name: "Ginger (Zingiber officinale)",
    desc: "Stimulates digestion, relieves nausea, reduces inflammation, and warms the body. Excellent as herbal tea or added to meals.",
    dosha: "Balances: Vata & Kapha",
  },
  {
    emoji: "🌸",
    name: "Shatavari (Asparagus racemosus)",
    desc: "A rejuvenating tonic for vitality and hormonal balance. Supports reproductive health, immunity, and digestive wellness.",
    dosha: "Balances: Vata & Pitta",
  },
];

const MODERN_TIPS = [
  {
    icon: "🩺",
    title: "Annual Health Screenings",
    text: "Regular check-ups catch conditions early. Schedule yearly blood panels, blood pressure checks, and screenings appropriate for your age and sex.",
  },
  {
    icon: "🥗",
    title: "Anti-Inflammatory Diet",
    text: "Focus on whole grains, leafy greens, berries, nuts, and fatty fish. Reduce processed foods, added sugars, and trans fats to lower systemic inflammation.",
  },
  {
    icon: "💧",
    title: "Hydration is Key",
    text: "Aim for 8–10 glasses of water daily. Proper hydration supports kidney function, skin health, energy levels, and cognitive performance.",
  },
  {
    icon: "😴",
    title: "Prioritise Quality Sleep",
    text: "Adults need 7–9 hours per night. Sleep deprivation raises cortisol, impairs immunity, and increases risk of cardiovascular disease.",
  },
  {
    icon: "🧠",
    title: "Mental Health Matters",
    text: "Practice mindfulness, maintain social connections, and seek professional support when needed. Mental health is inseparable from physical health.",
  },
  {
    icon: "🚶",
    title: "Move Every 30 Minutes",
    text: "Prolonged sitting increases health risks. Set reminders to stand, stretch, or walk briefly every 30 minutes throughout your day.",
  },
];

/* ── Quiz Logic ─────────────────────────────────────────────── */
(function initDoshaQuiz() {
  const scores = { Vata: 0, Pitta: 0, Kapha: 0 };
  let currentQ = 0;

  function renderQuestion() {
    const qEl = document.getElementById("quizQuestion");
    const oEl = document.getElementById("quizOptions");
    if (!qEl || !oEl) return;

    if (currentQ >= DOSHA_QUIZ.length) {
      showResult();
      return;
    }

    const q = DOSHA_QUIZ[currentQ];
    qEl.textContent = q.q;
    oEl.innerHTML = "";

    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => {
        scores[opt.dosha]++;
        currentQ++;
        renderQuestion();
      });
      oEl.appendChild(btn);
    });
  }

  function showResult() {
    const dominant = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const result = DOSHA_RESULTS[dominant];
    const rEl = document.getElementById("quizResult");
    document.getElementById("quizQuestion").textContent = "";
    document.getElementById("quizOptions").innerHTML =
      '<button class="quiz-option-btn" id="retakeQuizBtn">🔄 Retake Quiz</button>';
    rEl.classList.remove("hidden");
    rEl.innerHTML = `<h4>${result.title}</h4><p>${result.description}</p>`;

    document.getElementById("retakeQuizBtn").addEventListener("click", () => {
      scores.Vata = 0; scores.Pitta = 0; scores.Kapha = 0;
      currentQ = 0;
      rEl.classList.add("hidden");
      rEl.innerHTML = "";
      renderQuestion();
    });
  }

  document.addEventListener("DOMContentLoaded", renderQuestion);
})();

/* ── Render Remedies & Tips ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const remedyGrid = document.getElementById("remedyGrid");
  if (remedyGrid) {
    REMEDIES.forEach((r) => {
      remedyGrid.innerHTML += `
        <div class="remedy-card">
          <div class="remedy-emoji">${r.emoji}</div>
          <div class="remedy-name">${r.name}</div>
          <div class="remedy-desc">${r.desc}</div>
          <div class="remedy-dosha">${r.dosha}</div>
        </div>`;
    });
  }

  const tipsGrid = document.getElementById("modernTipsGrid");
  if (tipsGrid) {
    MODERN_TIPS.forEach((t) => {
      tipsGrid.innerHTML += `
        <div class="tip-card">
          <div class="tip-icon">${t.icon}</div>
          <div class="tip-content">
            <h4>${t.title}</h4>
            <p>${t.text}</p>
          </div>
        </div>`;
    });
  }
});
