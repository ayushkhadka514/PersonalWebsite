import React, { useState, useRef, useEffect } from "react";

// ------------------------------------------------------------
// Personal Website — Two-level navigation
// Top nav: About Me, Projects (dropdown), Resume
// Project: CSCI 5612: March Madness
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
          Work in progress....
        </p>
      </SectionCard>
    </div>
  );
}

function ProjectsLanding({ openProject }) {
  return (
    <div className="space-y-8">
      <SectionCard title="Projects">
        <p>Choose a project to view details.</p>
      </SectionCard>
      <div className="grid md:grid-cols-3 gap-6">
        <button onClick={() => openProject("csci5612")}
          className="bg-white rounded-2xl shadow p-6 text-left hover:shadow-md transition">
          <h3 className="text-lg font-semibold">CSCI 5612: March Madness Bracket Buster</h3>
          <p className="text-gray-600 mt-2">A course project exploring how to predict the winner of the NCAA March Madness tournament.</p>
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
// PROJECT VIEWS — March Madness (NON‑TECHNICAL INTRO)
// -------------------------
function IntroContent() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <Image
          src={`${import.meta.env.BASE_URL}/March-Madness-Symbol.png`}
          alt="Portrait"
        />
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Predicting the March Madness Tournament: What It Is and Why It Matters</h2>
          <p className="text-gray-600">
            Every March, people all around the world gather to watch one of the most cultivating sports tournaments, March Madness. 
          </p>
        </div>
      </div>

      {/* Paragraph 1: Background & Motivation — 10+ sentences, non‑technical */}
      <SectionCard title="Background & Motivation">
        <p>
          March Madness is a national college basketball tournament that captures attention well beyond sports pages. It turns ordinary weekdays into appointment television and transforms living rooms and cafeterias into watch parties. People talk about it in classrooms, group chats, and checkout lines because the stories feel immediate and human. The event blends tradition, school pride, and the thrill of single-elimination drama where one hot streak can change everything. Underdogs become household names overnight, and buzzer-beaters are replayed until they feel like shared memories. Brackets give everyone a simple way to participate even if they do not follow basketball all year. Friends compare picks, families tease one another, and coworkers bond over improbable runs. The chase for a “perfect bracket” is a playful myth that invites people to try anyway. The tournament also shines a light on campuses and communities that rarely get the spotlight. It brings together alumni who have moved far away and students who are just learning school traditions. The motivation for this project is to make the experience more understandable for anyone who wants to follow along with curiosity and joy.
        </p>

      </SectionCard>

      {/* Paragraph 2: Who It Affects — 10+ sentences */}
      <SectionCard title="Who It Affects">
        <p>
          March Madness touches people with very different schedules, interests, and backgrounds. Students plan study breaks around tipoffs and share highlights in dorm lounges. Alumni dig out old sweatshirts and reconnect with classmates they have not seen in years. Casual viewers jump in because coworkers are filling out brackets and they do not want to be left out of the conversation. Local restaurants, bars, and delivery drivers feel rushes when games are close and crowds stay for another round. Campus bookstores and small shops sell gear that becomes part of the celebration. Teachers and managers notice small dips in attention on big game days and try to strike a friendly balance. City workers coordinate transit and gathering spaces when a nearby team advances. Families find it easy to watch together because the rules are simple and the stakes are easy to grasp. Broadcasters, writers, and photographers tell stories that keep people engaged between games. Even people who do not watch basketball hear the echoes through office chatter, neighborhood cheers, and school spirit days.
        </p>

      </SectionCard>

      {/* Paragraph 3: Why It Matters — 10+ sentences */}
      <SectionCard title="Why It Matters">
        <p>
          The tournament matters because it turns statistics and schedules into stories that people can carry with them. It offers a shared calendar in early spring when many communities are ready for something hopeful. It creates small rituals like printing a bracket, choosing a surprise pick, and checking scores on a phone between tasks. It gives smaller schools a rare stage to show who they are beyond a headline. It strengthens ties between campuses and hometowns as people cheer for the same colors from far away. It gives families a reason to sit together and root for the same outcome across generations. It encourages friendly competition without demanding deep expertise or specialized language. It reminds everyone that uncertainty is part of life and that favorites can fail while unknowns can rise. It brings moments of joy that people revisit for years, especially when a local team goes further than expected. It also invites reflection about fairness, opportunity, and the value of preparation meeting luck. In short, it turns a busy month into a festival of shared attention and collective memory.
        </p>

      </SectionCard>

      {/* Paragraph 4: What Has Been Tried — 10+ sentences */}
      <SectionCard title="What Has Been Tried">
        <p>
          People have tried many simple ways to guess winners long before the first tip. Some rely on seed lines because they are visible and easy to compare. Others look at recent momentum and whether a team is peaking at the right time. Fans trade folklore about common upsets and keep an eye on matchups that feel uncomfortable for favorites. Office pools blend loyalty, intuition, and a dash of superstition that keeps things light. Broadcasters gather former players and coaches to share insights from film rooms and locker rooms. Writers offer regional context about travel, venue vibes, and fan turnout that can shape nerves. Friends vote in group chats and create crowd picks that smooth out extreme opinions. Some people pick by mascots, colors, or coin flips just to stay in the game. Many follow bracket previews and interviews that frame each day like a set of mini-stories. All these approaches have a common goal: making the tournament more enjoyable by setting expectations without spoiling the surprise.
        </p>

      </SectionCard>

      {/* Paragraph 5: What Can Still Be Done — 10+ sentences */}
      <SectionCard title="What Can Still Be Done">
        <p>
          There is room to make predictions clearer and more welcoming for everyone who wants to play along. Explanations can use plain language that connects matchups to things people notice, like pace, experience, and how teams handle pressure. Visuals can be clean and focused so a reader understands the point at a glance. Confidence can be expressed honestly so close games are framed as close rather than as guarantees. Updates can follow a steady rhythm before each round so people know when to check back. Summaries can highlight not only who is favored but also what an underdog needs to pull an upset. Coverage can celebrate the joy of the women’s and men’s tournaments side by side so more fans find a team to love. Stories can respect student-athletes as people first and competitors second. Community voices can bring local color that national shows might miss. Simple recaps can show what was expected and what actually happened without blame, turning results into learning. With these steps, March Madness becomes easier to understand and even more fun to share.
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
            <div className="w-10 h-10 rounded-2xl bg-black text-white grid place-items-center font-bold">AK</div>
            <div>
              <h1 className="text-xl font-semibold">Ayush Khadka</h1>
              <p className="text-sm text-gray-500">CS and Math@ CU Boulder</p>
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
                    CSCI 5612: March Madness Predictor
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
