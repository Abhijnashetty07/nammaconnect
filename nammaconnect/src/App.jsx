
import { useMemo, useState } from "react";
import "./App.css";

const situations = [
  { id: "travel", icon: "🛺", title: "Travel & Transport", subtitle: "Autos, buses and directions" },
  { id: "food", icon: "🍽️", title: "Food & Shopping", subtitle: "Restaurants and markets" },
  { id: "college", icon: "🎓", title: "College & Work", subtitle: "Meet people and communicate" },
  { id: "health", icon: "🩺", title: "Health & Help", subtitle: "Ask for help and explain needs" },
];
const missionQuestions = {
  travel: {
    title: "Where do you need to go?",
    options: [
      { label: "🏥 Find a hospital", phraseId: 10 },
      { label: "🚌 Find a bus station", phraseId: 3 },
      { label: "🛑 Ask the driver to stop", phraseId: 2 },
    ],
  },

  health: {
    title: "What medical help do you need?",
    options: [
      { label: "🆘 I need help", phraseId: 9 },
      { label: "🏥 Where is the hospital?", phraseId: 10 },
    ],
  },

  food: {
    title: "What do you need?",
    options: [
      { label: "💧 I need water", phraseId: 5 },
      { label: "🍽️ How much does this cost?", phraseId: 4 },
    ],
  },

  help: {
    title: "How can we help you communicate?",
    options: [
      { label: "🆘 Ask someone for help", phraseId: 9 },
      { label: "🏥 Ask where the hospital is", phraseId: 10 },
    ],
  },

  communication: {
    title: "What do you want to tell them?",
    options: [
      { label: "I don't understand", phraseId: 8 },
      { label: "I need help", phraseId: 9 },
    ],
  },

  shopping: {
    title: "What do you want to ask?",
    options: [
      { label: "💰 Ask the price", phraseId: 4 },
      { label: "💧 Ask for water", phraseId: 5 },
    ],
  },
};
const missionRetry = {
  travel: 3,
  health: 10,
  food: 5,
  help: 9,
  communication: 8,
  shopping: 4,
};
const phrases = [
  { id: 1, category: "travel", kannada: "ನಮಸ್ಕಾರ", latin: "Namaskara", meaning: "Hello / Greetings", context: "A polite way to greet someone", level: "Beginner" },
  { id: 2, category: "travel", kannada: "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ", latin: "Illi nillisi", meaning: "Please stop here", context: "When travelling by auto or taxi", level: "Beginner" },
  { id: 3, category: "travel", kannada: "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?", latin: "Bus nildana ellide?", meaning: "Where is the bus stop?", context: "When asking for directions", level: "Beginner" },
  { id: 4, category: "food", kannada: "ಇದರ ಬೆಲೆ ಎಷ್ಟು?", latin: "Idara bele eshtu?", meaning: "How much does this cost?", context: "When shopping at a local market", level: "Beginner" },
  { id: 5, category: "food", kannada: "ನನಗೆ ನೀರು ಬೇಕು", latin: "Nanage neeru beku", meaning: "I need water", context: "At a restaurant or shop", level: "Beginner" },
  { id: 6, category: "food", kannada: "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ", latin: "Tumba chennagide", meaning: "It's very good", context: "Complimenting food or something you like", level: "Beginner" },
  { id: 7, category: "college", kannada: "ನಿಮ್ಮ ಹೆಸರೇನು?", latin: "Nimma hesarenu?", meaning: "What is your name?", context: "When meeting someone", level: "Beginner" },
  { id: 8, category: "college", kannada: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ", latin: "Nanage arthavaglilla", meaning: "I didn't understand", context: "When you need someone to explain again", level: "Beginner" },
  { id: 9, category: "health", kannada: "ನನಗೆ ಸಹಾಯ ಬೇಕು", latin: "Nanage sahaya beku", meaning: "I need help", context: "When asking someone for assistance", level: "Beginner" },
  { id: 10, category: "health", kannada: "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?", latin: "Aspatre ellide?", meaning: "Where is the hospital?", context: "When looking for a hospital", level: "Beginner" },
];


function App() {
  const [practiceIndex, setPracticeIndex] = useState(0);
  const currentPhrase = phrases[practiceIndex];
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const [page, setPage] = useState("home");
  
  const [revealed, setRevealed] = useState(false);
  const [learned, setLearned] = useState([]);
  
const filteredPhrases = useMemo(() => {
  const query = search.trim().toLowerCase();

  return phrases.filter((phrase) => {
    const matchesCategory =
      activeCategory === "all" ||
      phrase.category === activeCategory;

    const matchesSearch =
      query === "" ||
      phrase.kannada.toLowerCase().includes(query) ||
      phrase.latin.toLowerCase().includes(query) ||
      phrase.meaning.toLowerCase().includes(query);

    const matchesSaved =
      page !== "saved" || saved.includes(phrase.id);

    return matchesCategory && matchesSearch && matchesSaved;
  });
}, [activeCategory, search, page, saved]);






function speak(text) {
  const phrase = phrases.find((p) => p.kannada === text);

  if (!phrase) {
    console.error("Phrase not found:", text);
    return;
  }

  const audio = new Audio(`/audio/${phrase.id}.mp3`);

  audio.play().catch((error) => {
    console.error("Audio playback failed:", error);
    alert("Could not play audio. Please try again.");
  });
}


  function toggleSaved(id) {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function startPractice() {
    setPracticeIndex(0);
    setRevealed(false);
    setPage("practice");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setPage("home")}>
          <span className="brand-mark">ನ</span>
          <span>Namma<span className="brand-light">Connect</span>
            <small>YOUR EVERYDAY KANNADA</small>
          </span>
        </button>

        <p className="nav-label">YOUR SPACE</p>
        <button className={`nav-item ${page === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}>⌂ <span>Home</span></button>
        <button className={`nav-item ${page === "learn" ? "active" : ""}`}
          onClick={() => { setPage("learn"); setActiveCategory("all"); }}>
          ▤ <span>Explore phrases</span>
        </button>
        <button className={`nav-item ${page === "practice" ? "active" : ""}`}
          onClick={startPractice}>◎ <span>Practice with me</span></button>
        <button className={`nav-item ${page === "saved" ? "active" : ""}`}
          onClick={() => { setPage("saved"); setSearch(""); }}>
          ♡ <span>Saved phrases</span>
          <span className="nav-count">{saved.length}</span>
        </button>

        <div className="sidebar-bottom">
          <div className="daily-note">
            <span>✳</span>
            <strong>Ondu dina, ondu hejje.</strong>
            <p>One day, one step. Every phrase brings you closer.</p>
          </div>
          <div className="sidebar-footer">Made with ♥ for Karnataka</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand">ನ NammaConnect</div>
          <span className="top-note">A little Kannada goes a long way.</span>
          <div className="level-pill"><span>✦</span> BEGIN YOUR JOURNEY</div>
        </header>

        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow"><span /> YOUR KANNADA JOURNEY STARTS HERE</div>
                <h1>Feel at home.<br />Speak <em>Kannada.</em></h1>
                <p>Real words for real moments. Learn what to say, practise how to say it, and feel more at home wherever life takes you in Karnataka.</p>
                <div className="hero-actions">
  <button
    className="primary-btn"
    onClick={() => setPage("urgency")}
  >
    🆘 Get Help Quickly
  </button>

  <button
    className="text-btn"
    onClick={() => setPage("learn")}
  >
    Explore phrases →
  </button>

  <button
    className="text-btn"
    onClick={startPractice}
  >
    Practise Kannada →
  </button>
  <button
  className="primary-btn"
  onClick={() => setPage("mission")}
>
  🎯 Start a Mission
</button>
</div>
                <div className="hero-proof">
                  <span className="proof-icon">✳</span>
                  <span><strong>Start with just 5 minutes</strong><small>No experience needed. Just curiosity.</small></span>
                </div>
              </div>
              <div className="hero-art">
                <div className="art-circle circle-one" />
                <div className="art-circle circle-two" />
                <div className="art-kannada">ನಮಸ್ಕಾರ</div>
                <div className="art-translation">NAMASKARA <span>↗</span></div>
                <div className="floating-card float-top">✦ &nbsp; Your next new word</div>
                <div className="floating-card float-bottom"><span className="mini-sound">♫</span><span><strong>Listen. Learn. Connect.</strong><small>One conversation at a time.</small></span></div>
                <div className="art-sparkle sparkle-one">✳</div>
                <div className="art-sparkle sparkle-two">✦</div>
              </div>
            </section>

            <section className="stats-row">
              <div><strong>{phrases.length.toString().padStart(2, "0")}</strong><span>USEFUL PHRASES</span></div>
              <div><strong>04</strong><span>EVERYDAY SITUATIONS</span></div>
              <div><strong>{learned.length.toString().padStart(2, "0")}</strong><span>PHRASES PRACTISED</span></div>
              <div><strong>{saved.length.toString().padStart(2, "0")}</strong><span>YOUR SAVED WORDS</span></div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div><p className="eyebrow">WHERE SHALL WE BEGIN?</p><h2>Kannada for your everyday</h2></div>
                <button className="text-btn" onClick={() => setPage("learn")}>Explore all <span>→</span></button>
              </div>
              <div className="situation-grid">
                {situations.map((situation, index) => (
                  <button className={`situation-card card-${index}`} key={situation.id}
                    onClick={() => { setActiveCategory(situation.id); setSearch(""); setPage("learn"); }}>
                    <span className="situation-icon">{situation.icon}</span>
                    <span className="situation-title">{situation.title}</span>
                    <span className="situation-subtitle">{situation.subtitle}</span>
                    <span className="card-arrow">↗</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="section-block phrase-preview">
              <div className="section-heading">
                <div><p className="eyebrow">A LITTLE KANNADA TODAY</p><h2>Your first useful phrases</h2></div>
                <button className="text-btn" onClick={() => setPage("learn")}>See all phrases <span>→</span></button>
              </div>
              <PhraseList phrases={phrases.slice(0, 3)} saved={saved}
                onSave={toggleSaved} onSpeak={speak} />
            </section>

            <section className="practice-banner">
              <div><span className="eyebrow">YOUR NEXT STEP</span><h2>Knowing words is good.<br /><em>Using them is better.</em></h2>
                <p>Try a friendly, guided conversation. No pressure, just practice.</p></div>
              <button className="primary-btn" onClick={startPractice}>Let's practise <span>→</span></button>
            </section>
          </>
        )}
        {page === "urgency" && (
  <section className="content-page">
    <p className="eyebrow">QUICK COMMUNICATION</p>

    <h1>Need help? We've got you.</h1>

    <p className="page-intro">
      Choose a situation. Show the Kannada phrase or play it aloud.
    </p>

    <button
      className="secondary-btn"
      onClick={() => setPage("home")}
    >
      ← Back to Home
    </button>

    <div className="section-block">
      {phrases
        .filter((phrase) =>
          [2, 3, 5, 8, 9, 10].includes(phrase.id)
        )
        .map((phrase) => (
          <article className="phrase-card" key={phrase.id}>
            <div className="phrase-main">
              <h3>{phrase.meaning}</h3>

              <h2>{phrase.kannada}</h2>

              <p className="transliteration">
                {phrase.latin}
              </p>

              <button
                className="listen-btn"
                onClick={() => speak(phrase.kannada)}
              >
                🔊 Play Kannada
              </button>
            </div>
          </article>
        ))}
    </div>
  </section>
)}
{page === "mission" && (
  <section className="content-page mission-page">
    <p className="eyebrow">🎯 NAMMACONNECT MISSION MODE</p>

    <h1>Let's solve this together.</h1>

    <p className="page-intro">
      Tell us what's happening. We'll help you communicate in Kannada.
    </p>

    <div className="situation-grid">
      {[
        {
          id: "travel",
          icon: "🚕",
          title: "I need to go somewhere",
          subtitle: "Autos, buses and directions",
        },
        {
          id: "health",
          icon: "🏥",
          title: "I need medical help",
          subtitle: "Hospitals and health assistance",
        },
        {
          id: "food",
          icon: "🍽️",
          title: "I need food or water",
          subtitle: "Restaurants and daily needs",
        },
        {
          id: "help",
          icon: "🆘",
          title: "I need urgent help",
          subtitle: "Ask someone nearby for assistance",
        },
        {
          id: "communication",
          icon: "💬",
          title: "I can't explain myself",
          subtitle: "Help me communicate a message",
        },
        {
          id: "shopping",
          icon: "🛍️",
          title: "I'm shopping",
          subtitle: "Prices and buying things",
        },
      ].map((mission) => (
        <button
          className="situation-card"
          key={mission.id}
          onClick={() => {
            setActiveCategory(mission.id);
            setPage("mission-details");
          }}
        >
          <span className="situation-icon">{mission.icon}</span>
          <span className="situation-title">{mission.title}</span>
          <span className="situation-subtitle">{mission.subtitle}</span>
          <span className="card-arrow">→</span>
        </button>
      ))}
    </div>

    <button
      className="secondary-btn"
      onClick={() => setPage("home")}
    >
      ← Back to Home
    </button>
  </section>
)}
{page === "mission-details" && (
  <section className="content-page">
    <p className="eyebrow">🎯 YOUR MISSION</p>

    <h1>{missionQuestions[activeCategory]?.title || "What do you need?"}</h1>

    <p className="page-intro">
      Choose an option. We'll prepare a Kannada message for you.
    </p>

    <div className="situation-grid">
      {(missionQuestions[activeCategory]?.options || []).map((option) => (
        <button
          className="situation-card"
          key={option.phraseId}
          onClick={() => {
            setPracticeIndex(
              phrases.findIndex((phrase) => phrase.id === option.phraseId)
            );
            setPage("mission-message");
          }}
        >
          <span className="situation-title">{option.label}</span>
          <span className="card-arrow">→</span>
        </button>
      ))}
    </div>

    <button
      className="secondary-btn"
      onClick={() => setPage("mission")}
    >
      ← Back to situations
    </button>
  </section>
)}
{page === "mission-message" && (
  <section className="content-page">
    <p className="eyebrow">YOUR MESSAGE IS READY</p>

    <h1>Let's communicate.</h1>

    <div className="practice-card">
      <h2>{phrases[practiceIndex]?.kannada}</h2>

      <p className="transliteration">
        {phrases[practiceIndex]?.latin}
      </p>

      <h3>{phrases[practiceIndex]?.meaning}</h3>

      <button
        className="listen-btn"
        onClick={() => speak(phrases[practiceIndex]?.kannada)}
      >
        🔊 Play Kannada
      </button>

      <button
        className="primary-btn"
        onClick={() => setPage("mission-followup")}
      >
        Continue →
      </button>
    </div>

    <button
      className="secondary-btn"
      onClick={() => setPage("mission")}
    >
      ← Start another mission
    </button>
  </section>
)}
{page === "mission-followup" && (
  <section className="content-page">
    <p className="eyebrow">🎯 MISSION CHECK</p>

    <h1>Did they understand you?</h1>

    <p className="page-intro">
      Let's help you take the next step.
    </p>

    <div className="situation-grid">
      <button
        className="situation-card"
        onClick={() => setPage("mission-success")}
      >
        <span className="situation-title">
          ✅ Yes, they understood!
        </span>
        <span className="card-arrow">→</span>
      </button>

      <button
        className="situation-card"
        onClick={() => setPage("mission-retry")}
      >
        <span className="situation-title">
          🔄 Not yet, try another phrase
        </span>
        <span className="card-arrow">→</span>
      </button>

      <button
        className="situation-card"
        onClick={() => setPage("mission")}
      >
        <span className="situation-title">
          🏠 Start a different mission
        </span>
        <span className="card-arrow">→</span>
      </button>
    </div>
  </section>
)}

{page === "mission-success" && (
  <section className="content-page">
    <p className="eyebrow">✨ MISSION COMPLETE</p>
    <h1>Well done!</h1>
    <p className="page-intro">
      You took a step towards communicating in Kannada.
      Keep NammaConnect ready for your next conversation!
    </p>

    <button className="primary-btn" onClick={() => setPage("mission")}>
      🎯 Start another mission
    </button>

    <button className="secondary-btn" onClick={() => setPage("home")}>
      ← Back to Home
    </button>
  </section>
)}

{page === "mission-retry" && (
  <section className="content-page">
    <p className="eyebrow">🔄 LET'S TRY AGAIN</p>
    <h1>Let's try a different phrase.</h1>
    <p className="page-intro">
      Choose a simpler message and play it again.
    </p>

    <div className="practice-card">
  <h2>
    {phrases.find(
      (phrase) => phrase.id === (missionRetry[activeCategory] || 9)
    )?.kannada}
  </h2>

  <p className="transliteration">
    {phrases.find(
      (phrase) => phrase.id === (missionRetry[activeCategory] || 9)
    )?.latin}
  </p>

  <h3>
    {phrases.find(
      (phrase) => phrase.id === (missionRetry[activeCategory] || 9)
    )?.meaning}
  </h3>

  <button
    className="listen-btn"
    onClick={() =>
      speak(
        phrases.find(
          (phrase) => phrase.id === (missionRetry[activeCategory] || 9)
        )?.kannada
      )
    }
  >
    🔊 Play Kannada
  </button>
</div>

    <button className="secondary-btn" onClick={() => setPage("mission")}>
      ← Choose another mission
    </button>
  </section>
)}
        {(page === "learn" || page === "saved") && (
          <section className="content-page">
            <p className="eyebrow">{page === "saved" ? "YOUR PERSONAL PHRASEBOOK" : "SMALL WORDS, BIG CONNECTIONS"}</p>
            <h1>{page === "saved" ? "Your saved phrases." : "Find your words."}</h1>
            <p className="page-intro">{page === "saved" ? "The phrases you want to keep close." : "Explore useful Kannada for the moments that make up everyday life."}</p>
            <input className="search-input" value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="⌕   Search in English, Kannada or transliteration..." />
            {page !== "saved" && <div className="filter-row">
              <button className={activeCategory === "all" ? "filter active-filter" : "filter"}
                onClick={() => setActiveCategory("all")}>All phrases</button>
              {situations.map((item) => <button key={item.id}
                className={activeCategory === item.id ? "filter active-filter" : "filter"}
                onClick={() => setActiveCategory(item.id)}>{item.icon} {item.title}</button>)}
            </div>}
            <p className="result-count">{filteredPhrases.length} PHRASES TO EXPLORE</p>
            <PhraseList phrases={filteredPhrases} saved={saved} onSave={toggleSaved} onSpeak={speak} />
            {filteredPhrases.length === 0 && <div className="empty-state"><span>♡</span><h3>Nothing here just yet.</h3><p>Try another search, or save a phrase you want to remember.</p></div>}
          </section>
        )}

        {page === "practice" && (
          <section className="content-page practice-page">
            <p className="eyebrow">A SAFE SPACE TO PRACTISE</p>
            <h1>Let's find your voice.</h1>
            <p className="page-intro">Learn one phrase at a time. Read it, listen, then try to remember its meaning.</p>
            <div className="practice-card">
              <div className="practice-card-top"><span>PHRASE {practiceIndex + 1} OF {phrases.length}</span><span>✦ BEGINNER</span></div>
              <div className="practice-emoji">{["🛺","🛍️","🚌","🍲","💧"][practiceIndex % 5]}</div>
              <h2>{currentPhrase.kannada}</h2>
              <p className="transliteration">{currentPhrase.latin}</p>
              <button className="listen-btn" onClick={() => speak(currentPhrase.kannada)}>♫ &nbsp; Listen to pronunciation</button>
              <div className="meaning-area">
                {revealed ? <><span className="eyebrow">MEANING</span><h3>{currentPhrase.meaning}</h3><p>{currentPhrase.context}</p></>
                  : <button className="reveal-btn" onClick={() => setRevealed(true)}>Reveal the meaning ↓</button>}
              </div>
              <div className="practice-controls">
                <button className="secondary-btn" onClick={() => { setRevealed(false); setPracticeIndex((practiceIndex + phrases.length - 1) % phrases.length); }}>← Previous</button>
                <button className="primary-btn" onClick={() => { setLearned((old) => old.includes(currentPhrase.id) ? old : [...old, currentPhrase.id]); setPracticeIndex((practiceIndex + 1) % phrases.length); setRevealed(false); }}>Got it, next →</button>
              </div>
            </div>
            <p className="practice-tip">A little tip: say the phrase aloud if you feel comfortable. Making mistakes is part of learning.</p>
          </section>
        )}

        <footer className="main-footer"><span>ನಮಸ್ಕಾರ · Made for everyday connections</span><span>Learn with curiosity. Connect with kindness.</span></footer>
      </main>
    </div>
  );
}

function PhraseList({ phrases, saved, onSave, onSpeak }) {
  return (
    <div className="phrase-list">
      {phrases.map((phrase) => (
        <article className="phrase-card" key={phrase.id}>
          <div className="phrase-main">
            <span className="phrase-category">{situations.find((s) => s.id === phrase.category)?.title}</span>
            <h3>{phrase.kannada}</h3>
            <p className="transliteration">{phrase.latin}</p>
            <p className="phrase-meaning">{phrase.meaning}</p>
            <p className="phrase-context">{phrase.context}</p>
          </div>
          <div className="phrase-actions">
            <button className="icon-btn" title="Listen to pronunciation" onClick={() => onSpeak(phrase.kannada)}>♫</button>
            <button className={`icon-btn ${saved.includes(phrase.id) ? "is-saved" : ""}`}
              title={saved.includes(phrase.id) ? "Remove saved phrase" : "Save phrase"}
              onClick={() => onSave(phrase.id)}>{saved.includes(phrase.id) ? "♥" : "♡"}</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default App;
