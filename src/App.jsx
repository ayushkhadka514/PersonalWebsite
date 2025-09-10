import React, { useState, useRef, useEffect } from "react";

// ------------------------------------------------------------
// Personal Website — Two-level navigation
// Top nav: About Me, Projects (dropdown), Resume
// Project: CSCI 5612: NFL Game Winner Prediction
// Selecting the project reveals project-specific tabs: Introduction,
// Conclusions, DataPrep_EDA, Clustering, PCA, NaiveBayes, DecTrees,
// SVMs, Regression, NN.
// ------------------------------------------------------------

// Project-specific tabs
const PROJECT_TABS = [
  { id: "introduction", label: "Introduction" },
  { id: "conclusions", label: "Conclusions" },
  { id: "dataprep_eda", label: "DataPrep_EDA" },
  { id: "clustering", label: "Clustering" },
  { id: "pca", label: "PCA" },
  { id: "naivebayes", label: "NaiveBayes" },
  { id: "dectrees", label: "DecTrees" },
  { id: "svms", label: "SVMs" },
  { id: "regression", label: "Regression" },
  { id: "nn", label: "NN" },
];

function TabButton({ id, label, active, onClick }) {
  return (
    <button
      className={
        "px-4 py-2 rounded-full text-sm md:text-base transition shrink-0 " +
        (active
          ? "bg-black text-white shadow-md"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800")
      }
      onClick={() => onClick(id)}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-3 overflow-x-auto">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="prose max-w-none break-words">{children}</div>
    </div>
  );
}


function Image({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full rounded-xl shadow object-cover"
      loading="lazy"
    />
  );
}

// -------------------------
// HOME VIEWS
// -------------------------
function AboutMeContent() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <Image
          src={`${import.meta.env.BASE_URL}/large.jpg`}
          alt="Portrait"
        />
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">Hi, I’m Ayush Khadka</h2>
          <p className="text-gray-600">I’m a student and builder interested in data science, machine learning, and turning real‑world problems into simple, human‑centered tools. This site collects my projects, notes, and experiments.</p>
        </div>
      </div>
      <SectionCard title="About Me">
        <p>
          Replace this with a short bio, your interests, and what you’re working on right now. Add a few photos or links. Keep it friendly and non‑technical on the homepage.
        </p>
      </SectionCard>
    </div>
  );
}

function ProjectsLanding({ openProject }) {
  return (
    <div className="space-y-8">
      <SectionCard title="Projects">
        <p>Choose a project to view details. You can add more cards later.</p>
      </SectionCard>
      <div className="grid md:grid-cols-3 gap-6">
        <button onClick={() => openProject("csci5612")}
          className="bg-white rounded-2xl shadow p-6 text-left hover:shadow-md transition">
          <h3 className="text-lg font-semibold">CSCI 5612: NFL Game Winner Prediction</h3>
          <p className="text-gray-600 mt-2">A course project exploring how to predict the winner of NFL games.</p>
        </button>
      </div>
    </div>
  );
}

function ResumeContent() {
  return (
    <div className="space-y-8">
      <SectionCard title="Resume">
        <p>
          Drop your <strong>resume.pdf</strong> into the public folder and link it here. Example: <a className="underline" href="/resume.pdf" target="_blank" rel="noreferrer">Open my resume</a>.
        </p>
      </SectionCard>
    </div>
  );
}

// -------------------------
// PROJECT VIEWS — NFL Game Winner Prediction (NON‑TECHNICAL INTRO)
// -------------------------
function IntroContent() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <Image src="https://placehold.co/800x500" alt="Football stadium hero" />
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Predicting NFL Game Winners: What It Is and Why It Matters</h2>
          <p className="text-gray-600">A plain‑language introduction to the people, places, and weekly rhythms behind America’s most watched sport.</p>
        </div>
      </div>

      {/* Paragraph 1: Background & Motivation — 10+ sentences, non‑technical */}
      <SectionCard title="Background & Motivation">
        <p>
          The National Football League is more than a collection of games; it is a shared weekly ritual that stitches together families, friends, cities, and rivalries. Every autumn weekend, millions of people plan food, travel, and conversations around a schedule that feels both familiar and full of surprise. In living rooms, bars, dorms, and stadiums, the question is always the same: who will win on Sunday. That simple question has a way of pulling in stories about momentum, matchups, weather, and history without requiring anyone to speak in technical terms. Picking winners is part prediction and part storytelling, a way to make sense of a long season one kickoff at a time. People who do not follow statistics closely still care about the answer because the outcome shapes moods on Monday and memories for years. Cities light up buildings in team colors, and neighborhoods change their traffic patterns when a home game is in town. Broadcasters build narratives around comebacks, upsets, and grudges that stretch back decades. Fans trade good‑natured bets, office pools, and family bragging rights that last through holidays. The motivation for this project is to explore that simple question with care and clarity, offering explanations that anyone can follow while keeping the joy of the game front and center.
        </p>
      </SectionCard>

      {/* Paragraph 2: Who It Affects — 10+ sentences */}
      <SectionCard title="Who It Affects">
        <p>
          Predictions touch people you see and people you never meet. Casual fans use them to decide which games to watch and when to invite friends over. Season‑ticket holders plan travel, parking, and tailgates around expected crowds and kickoff windows. Local businesses near stadiums prepare staff and supplies based on whether a matchup looks tight or lopsided. Broadcasters and podcast hosts lean on expectations to frame stories and choose which angles to highlight. Fantasy managers and pick’em participants set lineups and make choices that keep them engaged with every drive. Coaches and players do not live by predictions, but they cannot escape the conversation that swirls around them all week. Families with kids in youth football programs follow certain teams because their heroes shape how young athletes dream. City services notice the ripple effects too, adjusting transit, policing, and cleanup for game days that could draw larger turnouts. Alumni clubs and fan groups organize watch parties that depend on shared beliefs about which game will be the most exciting. Even people who do not watch football feel the impact through traffic, noise, and the mood of their town when a big rivalry is at stake.
        </p>
      </SectionCard>

      {/* Paragraph 3: Why It Matters — 10+ sentences */}
      <SectionCard title="Why It Matters">
        <p>
          Clear expectations make weekends easier to plan and conversations easier to enter. Knowing which matchups are likely to be close helps viewers pick time blocks that fit work, school, or family commitments. Communities benefit when big days are predictable, because restaurants, transit systems, and neighborhood groups can coordinate volunteers and services. Predictions also help people appreciate the game on a deeper level by pointing out details that might otherwise be missed, like how travel, rest, and weather shape performance. When explained well, they turn a long list of games into a set of stories that anyone can follow without jargon. They also teach a healthy respect for uncertainty by reminding us that upsets happen and that confidence is not certainty. That lesson carries beyond sports, encouraging patience and humility when plans meet real life. For students and new fans, thoughtful previews make the sport more welcoming, lowering the barrier to entry. For long‑time fans, they offer fresh frames for old rivalries and a chance to see familiar teams with new eyes. In short, better expectations lead to better weekends, better conversations, and a better sense of what makes football compelling.
        </p>
      </SectionCard>

      {/* Paragraph 4: What Has Been Tried — 10+ sentences */}
      <SectionCard title="What Has Been Tried">
        <p>
          For decades, fans and media have used a wide mix of approaches to guess who will win. Television panels share picks based on experience, film study, injuries, and the mood in the locker room. Newspapers and websites publish power rankings that summarize recent form in simple, readable lists. Local radio highlights weather, travel, and short‑week schedules that can tilt the field in quiet ways. People look at home‑field advantage, rest days, and rivalries because those patterns feel familiar and sensible. Others rely on wisdom of the crowd, pooling many opinions to smooth out extreme views. Some outlets run season simulations to sketch broad possibilities and keep readers engaged through long stretches of the schedule. Office pools and family pick’em sheets blend intuition, loyalty, and a dash of superstition that keeps things fun. Bookmakers set public expectations through point spreads that reflect collective beliefs at a moment in time. Team historians bring context from classic matchups that still shape how fans feel about certain stadiums and dates. All of these efforts share a common goal: making the coming weekend understandable and worth following, even when surprises are part of the charm.
        </p>
      </SectionCard>

      {/* Paragraph 5: What Can Still Be Done — 10+ sentences */}
      <SectionCard title="What Can Still Be Done">
        <p>
          There is room to make predictions clearer, fairer, and more useful for everyday fans. Explanations can be written in plain language that connects matchups to details people recognize, like rest, travel distance, weather, and how often opponents see each other. Visuals can be simple and focused so that readers grasp the point in seconds, not minutes. Confidence should be expressed honestly so that close games are framed as close, not as certainties. Updates can arrive on a predictable schedule that respects how people plan their weekends. Community voices can be included to reflect local knowledge about stadium quirks and regional weather that national shows might miss. Summaries can spotlight not only who is favored but also what would have to happen for an underdog to win, which helps viewers watch with sharper eyes. Language can avoid jargon and avoid treating players like numbers, keeping respect for the people on the field. Post‑game notes can look back at what was expected and what happened without blame or gloating, so learning stays part of the fun. Smaller experiments can test new ways of presenting information before committing to a full season format. With these steps, predictions become a friendly guide to the weekend rather than a mysterious scorecard.
        </p>
      </SectionCard>

      <div className="grid md:grid-cols-3 gap-6">
        <Image src="https://placehold.co/600x400" alt="Stadium crowd" />
        <Image src="https://placehold.co/600x400" alt="Sideline view" />
        <Image src="https://placehold.co/600x400" alt="Football on turf" />
      </div>
    </div>
  );
}

function ConclusionsContent() {
  return (
    <div className="space-y-6">
      <SectionCard title="Conclusions (Non‑Technical)">
        <p>
          This space will present plain‑language takeaways anyone can use, focusing on people, places, and practical next steps without any jargon. It will connect the dots between everyday experiences and the patterns observed, explain what changed and for whom, and describe what actions matter most for fans and communities. It will avoid references to specific models, methods, parameters, or code so that the message stays clear for all readers. It will use simple visuals and photographs to anchor the story in real life rather than abstractions. It will compare what weekends looked like before and after the work, emphasizing clarity over precision. It will highlight who benefits first, who might be left out, and what choices could close those gaps. It will suggest steps that viewers, local businesses, and community leaders can take, acknowledging limits and trade‑offs. It will return to the original motivations and show how the findings respond to them. It will be organized as 5+ paragraphs with images, and it will be kept current as the project evolves. It will end with a short reflection on what surprised us most and what still needs attention.
        </p>
      </SectionCard>
      <div className="grid md:grid-cols-2 gap-6">
        <Image src="https://placehold.co/800x450" alt="Conclusion visual 1" />
        <Image src="https://placehold.co/800x450" alt="Conclusion visual 2" />
      </div>
    </div>
  );
}

function PlaceholderMethod({ name }) {
  return (
    <div className="space-y-8">
      <SectionCard title={`${name} — Overview`}>
        <p>
          Briefly describe the {name} method in plain language and state what you plan to do with it for this project. Consider adding a small diagram or illustration here to help readers visualize the idea.
        </p>
      </SectionCard>
      <SectionCard title="Data">
        <ul className="list-disc pl-6 space-y-1">
          <li>Small image of the prepared dataset for this method.</li>
          <li>Link to <strong>raw data</strong> and <strong>clean data</strong> (required).</li>
          <li>Note any sampling, splitting, or normalization specific to this method.</li>
        </ul>
      </SectionCard>
      <SectionCard title="Code">
        <p>
          Link to the repository or notebook for this tab. Mention the language and core packages used. <em>Do not paste code directly on the page.</em>
        </p>
      </SectionCard>
      <SectionCard title="Results">
        <p>
          Discuss and visualize the results relevant to your topic. Explain parameter choices and what the outcomes mean for everyday understanding. Include charts or small images as needed.
        </p>
      </SectionCard>
    </div>
  );
}

function DataPrepEDA() {
  return (
    <div className="space-y-8">
      <SectionCard title="Data Sources & Access">
        <ul className="list-disc pl-6 space-y-1">
          <li>Describe how, where, and why you gathered your NFL data (schedules, scores, team stats, injuries, weather, etc.).</li>
          <li>Include links to all <strong>raw data</strong> files and any APIs used (with base URL and a core GET example).</li>
          <li>Add short notes about licensing, update frequency, and any known caveats.</li>
        </ul>
      </SectionCard>
      <SectionCard title="Raw vs Cleaned Snapshots">
        <p>Insert small images or screenshots showing portions of the raw data alongside cleaned/standardized versions, so readers can see the transformation.</p>
      </SectionCard>
      <SectionCard title="Exploration & Summaries">
        <p>Provide quick visuals and descriptive summaries: distributions (e.g., points, margins), missingness, outliers, home/away splits, and early observations.</p>
      </SectionCard>
    </div>
  );
}

// Simple outside click hook for dropdown
function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function App() {
  // App state
  const [mode, setMode] = useState("home"); // 'home' | 'project'
  const [homeTab, setHomeTab] = useState("about"); // 'about' | 'projects' | 'resume'
  const [activeProject, setActiveProject] = useState(null); // e.g., 'csci5612'
  const [projectTab, setProjectTab] = useState("introduction");
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setShowProjectsMenu(false));

  const openProject = (id) => {
    setActiveProject(id);
    setProjectTab("introduction");
    setMode("project");
    setShowProjectsMenu(false);
  };

  const goHome = (tab = "about") => {
    setMode("home");
    setHomeTab(tab);
    setActiveProject(null);
  };

  // Render helpers
  const renderHome = () => {
    switch (homeTab) {
      case "about":
        return <AboutMeContent />;
      case "projects":
        return <ProjectsLanding openProject={openProject} />;
      case "resume":
        return <ResumeContent />;
      default:
        return null;
    }
  };

  const renderProject = () => {
    switch (projectTab) {
      case "introduction":
        return <IntroContent />;
      case "conclusions":
        return <ConclusionsContent />;
      case "dataprep_eda":
        return <DataPrepEDA />;
      case "clustering":
        return <PlaceholderMethod name="Clustering" />;
      case "pca":
        return <PlaceholderMethod name="PCA" />;
      case "naivebayes":
        return <PlaceholderMethod name="Naive Bayes" />;
      case "dectrees":
        return <PlaceholderMethod name="Decision Trees" />;
      case "svms":
        return <PlaceholderMethod name="SVMs" />;
      case "regression":
        return <PlaceholderMethod name="Regression" />;
      case "nn":
        return <PlaceholderMethod name="Neural Networks" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="w-full px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => goHome("about")}>
            <div className="w-10 h-10 rounded-2xl bg-black text-white grid place-items-center font-bold">DS</div>
            <div>
              <h1 className="text-xl font-semibold">Personal Data Science Project</h1>
              <p className="text-sm text-gray-500">A living portfolio of your course modules</p>
            </div>
          </div>

          {/* Top-level nav */}
          <nav className="flex gap-2 items-center">
            <TabButton id="about" label="About Me" active={mode === "home" && homeTab === "about"} onClick={() => goHome("about")} />

            {/* Projects dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                className={
                  "px-4 py-2 rounded-full text-sm md:text-base transition " +
                  ((mode === "project" || (mode === "home" && homeTab === "projects"))
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800")
                }
                onClick={() => {
                  if (mode === "project") {
                    setShowProjectsMenu((s) => !s);
                  } else {
                    setShowProjectsMenu((s) => !s);
                    setHomeTab("projects");
                    setMode("home");
                  }
                }}
              >
                Projects ▾
              </button>
              {showProjectsMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow border p-2">
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                    onClick={() => openProject("csci5612")}
                  >
                    CSCI 5612: NFL Game Winner Prediction
                  </button>
                </div>
              )}
            </div>

            <TabButton id="resume" label="Resume" active={mode === "home" && homeTab === "resume"} onClick={() => goHome("resume")} />
          </nav>
        </div>

        {/* Project subnav (only when a project is open) */}
        {mode === "project" && (
          <div className="w-full px-6 pb-4">
            <div className="text-sm text-gray-500 mb-2">
              <button className="underline" onClick={() => goHome("projects")}>Projects</button> <span className="mx-1">›</span> CSCI 5612: NFL Game Winner Prediction
            </div>
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap pr-2">
              {PROJECT_TABS.map((t) => (
                <TabButton
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  active={projectTab === t.id}
                  onClick={setProjectTab}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="w-full px-6 py-8 space-y-8 overflow-x-hidden">
        {mode === "home" ? renderHome() : renderProject()}
      </main>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="w-full px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span>© {new Date().getFullYear()} Your Name — All rights reserved.</span>
          <span>
            Built with React & Tailwind. Update this site as you progress through each module part.
          </span>
        </div>
      </footer>
    </div>
  );
}
