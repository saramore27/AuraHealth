/* ═══════════════════════════════════════════════════════════
   chatbot.js – AI Health Chatbot
   Handles: symptom insights, navigation, YouTube recommendations
   ═══════════════════════════════════════════════════════════ */

/* ── Knowledge Base ─────────────────────────────────────────── */
const SYMPTOM_DB = {
  headache: {
    icon: "😣",
    title: "Headache",
    insights: [
      "Most headaches are tension-type, caused by stress, dehydration, or poor posture.",
      "Try drinking a large glass of water — dehydration is a common trigger.",
      "Gently massage your temples and the base of your skull.",
      "Apply a cold or warm compress to your forehead or neck.",
      "Reduce screen brightness and take a break from screens.",
    ],
    ayurveda: "In Ayurveda, headaches are often related to Vata or Pitta imbalance. Try Brahmi oil scalp massage or peppermint oil on temples.",
    warning: "Seek urgent care if your headache is sudden and severe ('thunderclap'), or accompanied by fever, stiff neck, vision changes, or confusion.",
    youtube: [
      { label: "Headache Relief Yoga", id: "BsPLk3oZ47c" },
      { label: "Pressure Points for Headache", id: "KXlasaTjG18" },
      { label: "Headache Acupressure", id: "mVTz8Nk93PA" },
    ],
  },
  stress: {
    icon: "😰",
    title: "Stress & Anxiety",
    insights: [
      "Chronic stress activates the sympathetic (fight-or-flight) nervous system.",
      "Try the 4-7-8 breathing technique: inhale 4s, hold 7s, exhale 8s.",
      "Physical exercise is one of the most effective stress-relievers.",
      "Limit caffeine and alcohol, which can worsen anxiety.",
      "Practice mindfulness — even 5 minutes a day makes a difference.",
    ],
    ayurveda: "Ayurveda recommends Ashwagandha for stress. Abhyanga (self-massage with warm sesame oil) calms Vata and the nervous system.",
    warning: "If stress or anxiety is severely impacting your daily life, please consult a mental health professional.",
    youtube: [
      { label: "Stress Relief Yoga Flow", id: "hJbRpHZr_d0" },
      { label: "5-Minute Meditation for Anxiety", id: "O-6f5wQXSu8" },
      { label: "Breathing for Stress Relief", id: "DbDoBzGY3vo" },
    ],
  },
  sleep: {
    icon: "😴",
    title: "Sleep Issues / Insomnia",
    insights: [
      "Adults need 7–9 hours of sleep. Chronic sleep deprivation raises disease risk.",
      "Keep a consistent sleep schedule — same bed time and wake time every day.",
      "Avoid screens (phone, tablet, TV) 1 hour before bed — blue light disrupts melatonin.",
      "Keep your bedroom cool (around 65–68°F / 18–20°C), dark, and quiet.",
      "Avoid large meals, caffeine, and alcohol in the evening.",
    ],
    ayurveda: "Ashwagandha and warm turmeric milk (golden milk) before bed help calm the nervous system. Brahmi oil on the feet promotes deep sleep.",
    warning: "See a doctor if you experience excessive daytime sleepiness, loud snoring, or stop breathing during sleep (possible sleep apnoea).",
    youtube: [
      { label: "Yoga for Better Sleep", id: "v7AYKMP6rOE" },
      { label: "Sleep Meditation Music", id: "1vx8iUvfyCY" },
      { label: "4-7-8 Breathing for Sleep", id: "gz4G31dy1q4" },
    ],
  },
  fatigue: {
    icon: "😩",
    title: "Fatigue & Low Energy",
    insights: [
      "Check your iron, B12, and Vitamin D levels — deficiencies commonly cause fatigue.",
      "Stay hydrated; even mild dehydration can cause tiredness.",
      "Regular moderate exercise (30 min/day) actually increases energy levels over time.",
      "Eat balanced meals with protein and complex carbohydrates to stabilise blood sugar.",
      "Limit sugar and processed foods which cause energy crashes.",
    ],
    ayurveda: "Prana Mudra practised for 15 minutes daily helps activate vital energy. Chyawanprash and Ashwagandha are classic Ayurvedic energy tonics.",
    warning: "If fatigue is persistent (more than 2 weeks) and doesn't improve with rest, consult a doctor to rule out thyroid issues, anaemia, or other conditions.",
    youtube: [
      { label: "Morning Energy Yoga", id: "sTANio_2E0Q" },
      { label: "Overcome Fatigue Naturally", id: "Sn5iBv_kF5w" },
      { label: "Yoga for Energy Boost", id: "4vTJHUDB5ak" },
    ],
  },
  back_pain: {
    icon: "🦴",
    title: "Back Pain",
    insights: [
      "Most back pain is muscular and resolves within 4–6 weeks.",
      "Apply heat (warm pad) for muscle spasms; ice for acute injury/inflammation.",
      "Gentle movement is better than bed rest for most back pain.",
      "Strengthen core muscles to support the spine.",
      "Check your posture — avoid slouching and ensure ergonomic desk setup.",
    ],
    ayurveda: "Kati Basti (warm oil treatment on the lower back) is an Ayurvedic remedy. Mahanarayan oil massage helps with pain relief.",
    warning: "Seek immediate medical attention if back pain follows an injury, is accompanied by numbness/tingling in the legs, or you have loss of bowel/bladder control.",
    youtube: [
      { label: "Yoga for Back Pain Relief", id: "4vTJHUDB5ak" },
      { label: "Lower Back Stretches", id: "L_xrDAtykMI" },
      { label: "Core Strengthening for Back", id: "RqcOCBb4arc" },
    ],
  },
  digestion: {
    icon: "🫃",
    title: "Digestive Issues",
    insights: [
      "Eat slowly and chew food well — digestion starts in the mouth.",
      "Avoid eating when stressed; the nervous system diverts energy away from digestion.",
      "Include probiotics (yoghurt, kefir, kimchi) to support gut flora.",
      "Ginger tea before meals stimulates digestive enzymes.",
      "Maintain regular meal times — irregular eating disrupts digestive rhythm.",
    ],
    ayurveda: "Triphala taken before bed is Ayurveda's premier digestive tonic. Drinking warm water with lemon first thing in the morning activates the digestive fire (Agni).",
    warning: "See a doctor if you have persistent abdominal pain, bloody stool, unexplained weight loss, or prolonged diarrhoea/vomiting.",
    youtube: [
      { label: "Yoga for Digestion", id: "R-vFMSoKcF0" },
      { label: "Gut Health Diet Tips", id: "4B5VqzMKoTs" },
      { label: "Abdominal Massage for Digestion", id: "ahyVqAVFR0E" },
    ],
  },
  cold: {
    icon: "🤧",
    title: "Cold & Congestion",
    insights: [
      "Rest is the most important treatment for the common cold.",
      "Gargle with warm salt water to soothe a sore throat.",
      "Steam inhalation (with or without eucalyptus oil) clears nasal congestion.",
      "Honey and lemon in warm water soothes the throat and may reduce cough.",
      "Stay hydrated — drink plenty of warm fluids.",
    ],
    ayurveda: "Tulsi (Holy Basil) and ginger tea is a classic Ayurvedic cold remedy. Sesame oil applied to the inside of nostrils (Nasya) moisturises and protects nasal passages.",
    warning: "See a doctor if fever exceeds 103°F (39.4°C), cold symptoms worsen after 10 days, or you have difficulty breathing.",
    youtube: [
      { label: "Natural Cold Remedies", id: "5AVZQ7E1Gys" },
      { label: "Yoga for Immunity", id: "jlkBwGUxvLs" },
      { label: "Sinus Relief Yoga", id: "RiV3MFO_GkM" },
    ],
  },
  anxiety: {
    icon: "😨",
    title: "Anxiety",
    insights: [
      "Anxiety is the body's natural response to perceived threat — but chronic anxiety is harmful.",
      "Practice the 5-4-3-2-1 grounding technique: name 5 things you can see, 4 you can touch, etc.",
      "Limit caffeine — it directly stimulates the anxiety response.",
      "Regular aerobic exercise is as effective as some medications for mild-moderate anxiety.",
      "Journalling your thoughts can help identify anxiety triggers.",
    ],
    ayurveda: "Brahmi and Ashwagandha are renowned Ayurvedic nervine tonics. Shirodhara (warm oil poured on the forehead) deeply calms the nervous system.",
    warning: "If anxiety is preventing you from living normally, please reach out to a mental health professional — effective treatments exist.",
    youtube: [
      { label: "Yoga for Anxiety", id: "hJbRpHZr_d0" },
      { label: "Guided Meditation for Anxiety", id: "O-6f5wQXSu8" },
      { label: "Breathing Exercises for Calm", id: "DbDoBzGY3vo" },
    ],
  },
};

const YOUTUBE_RECOMMENDATIONS = {
  "yoga videos": {
    title: "Yoga for Beginners & Beyond",
    videos: [
      { label: "30-Minute Morning Yoga Flow", id: "v7AYKMP6rOE" },
      { label: "Yoga for Beginners (Full Class)", id: "oBu-pQG6sTY" },
      { label: "Evening Relaxation Yoga", id: "COp7BR_Dvps" },
      { label: "Power Yoga Full Body Workout", id: "YmN0mNFOd90" },
    ],
  },
  "meditation videos": {
    title: "Guided Meditation Sessions",
    videos: [
      { label: "10-Minute Morning Meditation", id: "O-6f5wQXSu8" },
      { label: "Body Scan Meditation", id: "QS2yDmWk0vs" },
      { label: "Sleep Meditation", id: "1vx8iUvfyCY" },
      { label: "Mindfulness Meditation", id: "6p_yaNFSYao" },
    ],
  },
  "nutrition tips": {
    title: "Nutrition & Healthy Eating",
    videos: [
      { label: "Ayurvedic Diet Basics", id: "4B5VqzMKoTs" },
      { label: "Anti-Inflammatory Foods", id: "wGBXkh8ZRBU" },
      { label: "Plant-Based Eating Guide", id: "r7RnmFrHMNk" },
      { label: "Meal Planning for Health", id: "M3bD3QIj8mQ" },
    ],
  },
  "fitness videos": {
    title: "Fitness & Exercise",
    videos: [
      { label: "Full Body HIIT Workout", id: "ml6cT4AZdqI" },
      { label: "Beginner Strength Training", id: "RqcOCBb4arc" },
      { label: "Low Impact Cardio", id: "4vTJHUDB5ak" },
      { label: "Morning Stretch Routine", id: "sTANio_2E0Q" },
    ],
  },
  "ayurveda videos": {
    title: "Ayurveda Guides",
    videos: [
      { label: "Introduction to Ayurveda", id: "k_pJMqePBNg" },
      { label: "Daily Ayurvedic Routine (Dinacharya)", id: "8Bp5R6Tb3C0" },
      { label: "Ayurvedic Cooking Basics", id: "LfU1t_bfhGY" },
      { label: "Understand Your Dosha", id: "D4AkPvECOno" },
    ],
  },
  "breathing exercises": {
    title: "Pranayama & Breathing",
    videos: [
      { label: "Alternate Nostril Breathing", id: "DbDoBzGY3vo" },
      { label: "Belly Breathing Tutorial", id: "gz4G31dy1q4" },
      { label: "Wim Hof Breathing Method", id: "nzCaZQqAs9I" },
      { label: "Breathing for Stress Relief", id: "tEmt1Znux58" },
    ],
  },
};

const NAVIGATION_COMMANDS = {
  "open fitness": { section: "fitness", reply: "Opening the Fitness Tracker for you! 🏃" },
  "go to fitness": { section: "fitness", reply: "Navigating to Fitness Tracker! 🏃" },
  "open yoga": { section: "yoga", reply: "Opening Yoga & Mudra Guidance! 🧘" },
  "go to yoga": { section: "yoga", reply: "Taking you to Yoga & Mudra! 🧘" },
  "open ayurveda": { section: "ayurveda", reply: "Opening Ayurveda & Modern Solutions! 🌿" },
  "open medical": { section: "medical", reply: "Opening your Medical History! 📋" },
  "go to medical": { section: "medical", reply: "Navigating to Medical History! 📋" },
  "open chatbot": { section: "chatbot", reply: "You're already here! 😊" },
  "go home": { section: "dashboard", reply: "Taking you to the Dashboard! 🏠" },
  "open dashboard": { section: "dashboard", reply: "Here's your Dashboard! 🏠" },
};

const GENERAL_RESPONSES = {
  hello: "Hello! How are you feeling today? Tell me about any symptoms or ask for health tips! 🌿",
  hi: "Hi there! 👋 I'm AuraBot. Ask me about symptoms, yoga, ayurveda, or type 'yoga videos' for YouTube recommendations!",
  hey: "Hey! 😊 I'm here to help with your health questions. What would you like to know?",
  thanks: "You're welcome! 🙏 Stay healthy and balanced!",
  "thank you": "My pleasure! 🌿 Don't hesitate to ask if you need anything else.",
  help:
    "I can help you with:\n• **Symptoms** — describe what you feel (headache, stress, fatigue, etc.)\n• **YouTube videos** — type 'yoga videos', 'meditation videos', 'nutrition tips'\n• **Navigation** — type 'open fitness', 'open yoga', 'open medical'\n• **Health tips** — ask about specific topics",
  tips: "Here are some quick health tips:\n1. Drink 8 glasses of water daily 💧\n2. Walk 10,000 steps a day 🚶\n3. Sleep 7–9 hours 😴\n4. Practice 5 minutes of mindfulness 🧘\n5. Eat more vegetables and whole grains 🥗",
  "what can you do":
    "I can help with symptom insights, ayurvedic remedies, YouTube health recommendations, app navigation, and general health tips! Ask away 🌿",
  dosha: "Your dosha is your unique Ayurvedic constitution. Go to the **Ayurveda & Modern** section and take the dosha quiz! I can also take you there — just say 'open ayurveda'.",
};

/* ── Helper: Build YouTube Link HTML ────────────────────────── */
function buildYouTubeLinks(videos) {
  return videos
    .map(
      (v) =>
        `<a class="yt-link" href="https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}" target="_blank" rel="noopener noreferrer">▶️ ${escapeHtml(v.label)}</a>`
    )
    .join(" ");
}

/* ── Bot Response Logic ─────────────────────────────────────── */
function getBotResponse(input) {
  const text = input.toLowerCase().trim();

  // Check general responses first (exact or substring)
  for (const [key, response] of Object.entries(GENERAL_RESPONSES)) {
    if (text === key || text.includes(key)) {
      return { type: "text", content: response };
    }
  }

  // Navigation commands
  for (const [cmd, action] of Object.entries(NAVIGATION_COMMANDS)) {
    if (text.includes(cmd)) {
      return { type: "navigate", section: action.section, content: action.reply };
    }
  }

  // YouTube recommendations
  for (const [keyword, data] of Object.entries(YOUTUBE_RECOMMENDATIONS)) {
    if (text.includes(keyword)) {
      const links = buildYouTubeLinks(data.videos);
      return {
        type: "youtube",
        content: `Here are some **${data.title}** videos for you:\n\n${links}`,
      };
    }
  }

  // Symptom matching
  const symptomKeys = {
    headache: ["headache", "head pain", "migraine", "head ache"],
    stress: ["stress", "stressed", "overwhelmed", "burnout"],
    sleep: ["sleep", "insomnia", "can't sleep", "cant sleep", "sleeping"],
    fatigue: ["fatigue", "tired", "exhausted", "low energy", "no energy", "lethargic"],
    back_pain: ["back pain", "back ache", "backache", "spine", "lumbar"],
    digestion: ["digestion", "stomach", "bloating", "constipation", "ibs", "gut", "digestive"],
    cold: ["cold", "flu", "congestion", "runny nose", "sore throat", "cough", "sneezing"],
    anxiety: ["anxiety", "anxious", "panic", "worry", "worried", "nervous"],
  };

  for (const [key, keywords] of Object.entries(symptomKeys)) {
    if (keywords.some((kw) => text.includes(kw))) {
      const s = SYMPTOM_DB[key];
      const ytLinks = buildYouTubeLinks(s.youtube);
      return {
        type: "symptom",
        content: {
          title: `${s.icon} ${s.title}`,
          insights: s.insights,
          ayurveda: s.ayurveda,
          warning: s.warning,
          ytLinks,
        },
      };
    }
  }

  // Default fallback
  return {
    type: "text",
    content:
      "I'm not sure I understood that. Try describing a symptom (e.g., 'headache', 'stress'), ask for 'yoga videos', or type 'help' to see what I can do! 🌿",
  };
}

/* ── Render Bot Message ─────────────────────────────────────── */
function renderBotMessage(response) {
  const window = document.getElementById("chatWindow");
  if (!window) return;

  let html = "";

  if (response.type === "text" || response.type === "navigate" || response.type === "youtube") {
    // Convert **bold** markdown to <strong>
    const formatted = response.content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
    html = `<p>${formatted}</p>`;
  } else if (response.type === "symptom") {
    const { title, insights, ayurveda, warning, ytLinks } = response.content;
    html = `
      <p><strong>${title}</strong></p>
      <p><strong>Insights:</strong></p>
      <ul>${insights.map((i) => `<li>${i}</li>`).join("")}</ul>
      <p><strong>🌿 Ayurvedic Approach:</strong><br/>${ayurveda}</p>
      <p><strong>⚠️ When to See a Doctor:</strong><br/><em>${warning}</em></p>
      <p><strong>▶️ Recommended Videos:</strong><br/>${ytLinks}</p>
    `;
  }

  appendMessage("bot", html);

  // Handle navigation after rendering message
  if (response.type === "navigate") {
    setTimeout(() => navigateTo(response.section), 600);
  }
}

/* ── Append Message to Chat ─────────────────────────────────── */
function appendMessage(sender, htmlContent) {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${sender === "bot" ? "bot-message" : "user-message"}`;

  if (sender === "bot") {
    msgDiv.innerHTML = `
      <div class="chat-avatar bot-avatar">🤖</div>
      <div class="chat-bubble">${htmlContent}</div>`;
  } else {
    msgDiv.innerHTML = `
      <div class="user-avatar-chat">A</div>
      <div class="chat-bubble">${htmlContent}</div>`;
  }

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* ── Typing Indicator ───────────────────────────────────────── */
function showTyping() {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return null;

  const div = document.createElement("div");
  div.className = "chat-message bot-message typing-indicator";
  div.id = "typingIndicator";
  div.innerHTML = `
    <div class="chat-avatar bot-avatar">🤖</div>
    <div class="chat-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return div;
}

/* ── Send Message ───────────────────────────────────────────── */
function sendMessage(userInput) {
  const text = userInput.trim();
  if (!text) return;

  // Render user bubble
  appendMessage("user", escapeHtml(text));

  // Clear input
  const inputEl = document.getElementById("chatInput");
  if (inputEl) inputEl.value = "";

  // Show typing indicator
  const typingEl = showTyping();

  // Simulate response delay (300–900ms)
  const delay = 300 + Math.random() * 600;
  setTimeout(() => {
    if (typingEl) typingEl.remove();
    const response = getBotResponse(text);
    renderBotMessage(response);
  }, delay);
}

/* ── Initialise Chatbot ─────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("chatSendBtn");
  const inputEl = document.getElementById("chatInput");

  sendBtn?.addEventListener("click", () => sendMessage(inputEl?.value || ""));
  inputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage(inputEl.value);
  });

  // Quick-action chips
  document.getElementById("chatChips")?.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) sendMessage(chip.dataset.msg);
  });
});
