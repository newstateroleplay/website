// === (2) Smooth Scrolling ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// === (4) Discord Mitgliederzähler ===
// Ersetze DEINE_ID durch deine Discord-Guild-ID (Widget muss in Discord aktiviert sein)
fetch('https://discord.com/api/guilds/1431753776074723348/widget.json')
  .then(res => res.json())
  .then(data => {
    document.querySelector('#discordCount span').textContent = data.presence_count;
  })
  .catch(() => {
    document.querySelector('#discordCount span').textContent = 'nicht verfügbar';
  });

// === (6) Fortschrittsbalken beim Scrollen ===
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
});

// === (7) Beta-Button Popup ===
document.querySelector('.btn.beta').addEventListener('click', e => {
  e.preventDefault();
  alert('🧩 Die Closed Beta startet bald!\nFolge uns auf Discord, um nichts zu verpassen.');
});
// === SUPPORT FORMULAR ===
// Webhook-URL hier einfügen (achte darauf, sie geheim zu halten)
const DISCORD_WEBHOOK_URL = "";

document.querySelector('#supportForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const topic = document.querySelector('#topic').value.trim();
  const message = document.querySelector('#message').value.trim();
  const statusMsg = document.querySelector('#supportStatus');

  if (!username || !topic || !message) {
    statusMsg.textContent = "❗ Bitte fülle alle Felder aus.";
    return;
  }

  // Nachricht formatieren
  const payload = {
    content: `📨 **Neue Support-Anfrage!**\n👤 Von: ${username}\n🧩 Thema: ${topic}\n💬 Nachricht:\n${message}`
  };

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      statusMsg.textContent = "✅ Nachricht erfolgreich gesendet! Unser Team meldet sich bald.";
      document.querySelector('#supportForm').reset();
    } else {
      throw new Error("Fehler beim Senden");
    }
  } catch (err) {
    statusMsg.textContent = "⚠️ Es gab ein Problem beim Senden. Bitte versuche es später erneut.";
  }
});
// === (8) FAQ-System ===

// Hier kannst du bequem alle Fragen & Antworten eintragen:
const faqs = [
  {
    question: "🕹️ Wann startet die Closed Beta?",
    answer: "Die Closed Beta startet in Kürze! Folge unserem Discord, um benachrichtigt zu werden."
  },
  {
    question: "📱 Auf welchen Geräten läuft das Spiel?",
    answer: "New State RP wird für Android und iOS verfügbar sein."
  },
  {
    question: "💬 Wie kann ich dem Team beitreten?",
    answer: "Wir veröffentlichen regelmäßig Bewerbungsphasen im Discord-Server."
  },
  {
    question: "⚙️ Ist das Spiel kostenlos?",
    answer: "Ja, das Spiel wird komplett kostenlos spielbar sein."
  }
];

// FAQ-Container aus dem DOM holen
const faqContainer = document.getElementById("faqContainer");

// FAQs dynamisch ins HTML einfügen
faqs.forEach(faq => {
  const item = document.createElement("div");
  item.classList.add("faq-item");
  item.innerHTML = `
    <h3 class="faq-question">${faq.question}</h3>
    <p class="faq-answer">${faq.answer}</p>
  `;
  faqContainer.appendChild(item);
});

// Klick-Event für Ein/Ausblenden
faqContainer.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
// === GTA-Style Loading Screen ===
const loader = document.getElementById('loader');
const bar = document.getElementById('bar');

if (loader && bar) {
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.style.display = 'none';
      }, 200);
    }
    bar.style.width = progress + '%';
  }, 50);
}



// === Fade-In ===
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});



// === Musiksteuerung ===
const music = document.getElementById("bgmusic");
const muteBtn = document.getElementById("muteBtn");
let musicStarted = false;

// Musik erst starten, wenn der Nutzer interagiert
function startMusicOnce() {
  if (!musicStarted) {
    music.play().catch(()=>{});
    musicStarted = true;
    document.removeEventListener("click", startMusicOnce);
  }
}
document.addEventListener("click", startMusicOnce);

muteBtn.onclick = () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "🔈" : "🔊";
};
// === Fade-In beim Laden der Seite ===
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

