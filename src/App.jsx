import React, { useState, useRef, useEffect } from "react";

/*
  All files live directly in /public:
    large.jpg
    March-Madness-Symbol.png
    court.jpg
    trophy.jpg
    blank-march-madness-bracket-1.png
    barttorvik.png
    scrape.png
    raw_data.png
    clean_data.png
    v1.png ... v10.png  (10 data visualizations)
    resume.pdf (optional)
*/

// ------------------------------------------------------------
// Personal Website — Two-level navigation
// ------------------------------------------------------------
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

/** Image with optional caption/credit */
function Image({ src, alt = "", caption, credit, creditUrl }) {
  return (
    <figure className="w-full rounded-xl bg-white shadow overflow-hidden">
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      {(caption || credit) && (
        <figcaption className="px-4 py-2 text-sm text-gray-600 text-center">
          {caption}
          {credit && (
            <>
              {" "}
              <span className="italic">
                —{" "}
                {creditUrl ? (
                  <a
                    className="underline"
                    href={creditUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {credit}
                  </a>
                ) : (
                  credit
                )}
              </span>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- Lightbox Gallery: thumbnails with captions → fullscreen modal ---------- */
function LightboxGallery({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const hasOpen = openIndex !== null;

  const close = () => setOpenIndex(null);
  const next = () => setOpenIndex((i) => (i === null ? 0 : (i + 1) % items.length));
  const prev = () => setOpenIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));

  useEffect(() => {
    if (!hasOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hasOpen, items.length]);

  return (
    <div className="w-full">
      {/* Thumbnails */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((it, i) => (
          <figure key={i} className="group rounded-xl overflow-hidden bg-white shadow">
            <button
              onClick={() => setOpenIndex(i)}
              className="relative w-full block"
              aria-label={`Open visualization: ${it.caption || it.alt || `Image ${i + 1}`}`}
            >
              <img
                src={it.src}
                alt={it.alt || it.caption || "Visualization"}
                className="w-full h-40 object-cover block"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            </button>
            {it.caption && (
              <figcaption className="px-3 py-2 text-xs text-gray-600 text-center">
                {it.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Modal */}
      {hasOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 rounded-full bg-white/10 text-white hover:bg-white/20 p-2"
            aria-label="Close"
          >
            ✕
          </button>
          <button
            onClick={prev}
            className="absolute left-2 md:left-6 rounded-full bg-white/10 text-white hover:bg-white/20 p-3"
            aria-label="Previous"
          >
            ‹
          </button>
          <figure className="max-w-[min(1200px,100%)] w-full text-center">
            <img
              src={items[openIndex].src}
              alt={items[openIndex].alt || items[openIndex].caption || "Visualization"}
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
            {items[openIndex].caption && (
              <figcaption className="mt-3 text-sm md:text-base text-gray-100">
                {items[openIndex].caption}
              </figcaption>
            )}
          </figure>
          <button
            onClick={next}
            className="absolute right-2 md:right-6 rounded-full bg-white/10 text-white hover:bg-white/20 p-3"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------
// HOME VIEWS
// -------------------------
function AboutMeContent() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <Image src={`${import.meta.env.BASE_URL}large.jpg`} alt="Portrait" />
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">Hi, I’m Ayush Khadka</h2>
          <p className="text-gray-600">
            I’m a student and builder interested in data science, machine learning, and
            turning real-world problems into simple, human-centered tools. This site collects
            my projects, notes, and experiments.
          </p>
        </div>
      </div>
      <SectionCard title="About Me">
        <p>Work in progress....</p>
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
        <button
          onClick={() => openProject("csci5612")}
          className="bg-white rounded-2xl shadow p-6 text-left hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">CSCI 5612: March Madness Bracket Buster</h3>
          <p className="text-gray-600 mt-2">
            A course project exploring how to predict the winner of the NCAA March Madness tournament.
          </p>
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
          Drop your <strong>resume.pdf</strong> into the public folder and link it here. Example:{" "}
          <a
            className="underline"
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Open my resume
          </a>.
        </p>
      </SectionCard>
    </div>
  );
}

// -------------------------
// PROJECT VIEWS — March Madness
// -------------------------
function IntroContent() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <Image
          src={`${import.meta.env.BASE_URL}March-Madness-Symbol.png`}
          alt="March Madness symbol"
        />
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Predicting the March Madness Tournament: What It Is and Why It Matters
          </h2>
          <p className="text-gray-600">
            Every March, people all around the world gather to watch one of the most captivating sports tournaments, March Madness.
          </p>
        </div>
      </div>

      <SectionCard title="Background & Motivation">
        <p>
          March Madness is a national college basketball tournament that captures attention well beyond sports pages. It turns ordinary
          weekdays into appointment television and transforms living rooms and cafeterias into watch parties. People talk about it in classrooms,
          group chats, and checkout lines because the stories feel immediate and human. The event blends tradition, school pride, and the thrill
          of single-elimination drama where one hot streak can change everything. Underdogs become household names overnight, and buzzer-beaters
          are replayed until they feel like shared memories. Brackets give everyone a simple way to participate even if they do not follow basketball
          all year. Friends compare picks, families tease one another, and coworkers bond over improbable runs. The chase for a “perfect bracket” is a
          playful myth that invites people to try anyway. The tournament also shines a light on campuses and communities that rarely get the spotlight.
          It brings together alumni who have moved far away and students who are just learning school traditions. The motivation for this project is to
          make the experience more understandable for anyone who wants to follow along with curiosity and joy.
        </p>
      </SectionCard>

      <SectionCard title="Who It Affects">
        <p>
          March Madness touches people with very different schedules, interests, and backgrounds. Students plan study breaks around tipoffs and share
          highlights in dorm lounges. Alumni dig out old sweatshirts and reconnect with classmates they have not seen in years. Casual viewers jump in
          because coworkers are filling out brackets and they do not want to be left out of the conversation. Local restaurants, bars, and delivery drivers
          feel rushes when games are close and crowds stay for another round. Campus bookstores and small shops sell gear that becomes part of the celebration.
          Teachers and managers notice small dips in attention on big game days and try to strike a friendly balance. City workers coordinate transit and
          gathering spaces when a nearby team advances. Families find it easy to watch together because the rules are simple and the stakes are easy to grasp.
          Broadcasters, writers, and photographers tell stories that keep people engaged between games. Even people who do not watch basketball hear the echoes
          through office chatter, neighborhood cheers, and school spirit days.
        </p>
      </SectionCard>

      <SectionCard title="Why It Matters">
        <p>
          The tournament matters because it turns statistics and schedules into stories that people can carry with them. It offers a shared calendar in early spring
          when many communities are ready for something hopeful. It creates small rituals like printing a bracket, choosing a surprise pick, and checking scores on a
          phone between tasks. It gives smaller schools a rare stage to show who they are beyond a headline. It strengthens ties between campuses and hometowns as people
          cheer for the same colors from far away. It gives families a reason to sit together and root for the same outcome across generations. It encourages friendly
          competition without demanding deep expertise or specialized language. It reminds everyone that uncertainty is part of life and that favorites can fail while
          unknowns can rise. It brings moments of joy that people revisit for years, especially when a local team goes further than expected. It also invites reflection
          about fairness, opportunity, and the value of preparation meeting luck. In short, it turns a busy month into a festival of shared attention and collective memory.
        </p>
      </SectionCard>

      <SectionCard title="What Has Been Tried">
        <p>
          People have tried many simple ways to guess winners long before the first tip. Some rely on seed lines because they are visible and easy to compare. Others look at
          recent momentum and whether a team is peaking at the right time. Fans trade folklore about common upsets and keep an eye on matchups that feel uncomfortable for
          favorites. Office pools blend loyalty, intuition, and a dash of superstition that keeps things light. Broadcasters gather former players and coaches to share insights
          from film rooms and locker rooms. Writers offer regional context about travel, venue vibes, and fan turnout that can shape nerves. Friends vote in group chats and
          create crowd picks that smooth out extreme opinions. Some people pick by mascots, colors, or coin flips just to stay in the game. Many follow bracket previews and
          interviews that frame each day like a set of mini-stories. All these approaches have a common goal: making the tournament more enjoyable by setting expectations without
          spoiling the surprise.
        </p>
      </SectionCard>

      <SectionCard title="What Can Still Be Done">
        <p>
          There is room to make predictions clearer and more welcoming for everyone who wants to play along. Explanations can use plain language that connects matchups to things
          people notice, like pace, experience, and how teams handle pressure. Visuals can be clean and focused so a reader understands the point at a glance. Confidence can be
          expressed honestly so close games are framed as close rather than as guarantees. Updates can follow a steady rhythm before each round so people know when to check back.
          Summaries can highlight not only who is favored but also what an underdog needs to pull an upset. Coverage can celebrate the joy of the women’s and men’s tournaments
          side by side so more fans find a team to love. Stories can respect student-athletes as people first and competitors second. Community voices can bring local color that
          national shows might miss. Simple recaps can show what was expected and what actually happened without blame, turning results into learning. With these steps, March
          Madness becomes easier to understand and even more fun to share.
        </p>
      </SectionCard>

      <div className="grid md:grid-cols-3 gap-6">
        <Image src={`${import.meta.env.BASE_URL}court.jpg`} alt="Court" />
        <Image src={`${import.meta.env.BASE_URL}trophy.jpg`} alt="Trophy" />
        <Image src={`${import.meta.env.BASE_URL}blank-march-madness-bracket-1.png`} alt="Blank March Madness bracket" />
      </div>
    </div>
  );
}

function ConclusionsContent() {
  return (
    <div className="space-y-6">
      <SectionCard title="Conclusions (Non-Technical)">
        <p>Work in progress...</p>
      </SectionCard>
      <div className="grid md:grid-cols-2 gap-6">
        <Image src="https://placehold.co/800x450" alt="Conclusion visual 1" caption="Conclusion visual 1" />
        <Image src="https://placehold.co/800x450" alt="Conclusion visual 2" caption="Conclusion visual 2" />
      </div>
    </div>
  );
}

function PlaceholderMethod({ name }) {
  return (
    <div className="space-y-8">
      <SectionCard title={`${name} — Overview`}>
        <p>
          Briefly describe the {name} method in plain language and state what you plan to do with it for this project.
          Consider adding a small diagram or illustration here to help readers visualize the idea.
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
          Discuss and visualize the results relevant to your topic. Explain parameter choices and what the outcomes mean for everyday understanding.
          Include charts or small images as needed.
        </p>
      </SectionCard>
    </div>
  );
}

function DataPrepEDA() {
  // 10-visualization gallery (all files in /public)
  const GALLERY_ITEMS = [
    { src: `${import.meta.env.BASE_URL}ADJDE.png`, alt: "Seed distribution histogram", caption: "Result in tournament vs mean ADJDE Bar Graph" },
    { src: `${import.meta.env.BASE_URL}adjoexadjde.png`, alt: "Win% by seed boxplot", caption: "ADJOE vs ADJDE, colored by round" },
    { src: `${import.meta.env.BASE_URL}correlation.png`, alt: "AdjO vs AdjD scatter", caption: "Correlation Heatmap between features" },
    { src: `${import.meta.env.BASE_URL}earlyvslate.png`, alt: "Pace histogram", caption: "Boxplot of BARTHAG for High Seeds" },
    { src: `${import.meta.env.BASE_URL}efgoxbarthag.png`, alt: "3PT% bar chart", caption: "EFG_O x BARTHAG" },
    { src: `${import.meta.env.BASE_URL}seedxoff.png`, alt: "Conference strength heatmap", caption: "Offensive Rating vs Tournament Seed" },
    { src: `${import.meta.env.BASE_URL}seedxresult.png`, alt: "Upset rate line plot", caption: "Tournament Seed vs Seed" },
    { src: `${import.meta.env.BASE_URL}torxresult.png`, alt: "Bracket path difficulty", caption: "Turnover rate vs Tournament Result" },
    { src: `${import.meta.env.BASE_URL}underdog.png`, alt: "Calibration curve", caption: "Lower seed tournament result distribution" },
    { src: `${import.meta.env.BASE_URL}Survival.png`, alt: "Feature importance", caption: "Proportion of lower seeds advancing" },
  ];

  return (
    <div className="space-y-8">
      <SectionCard title="Data Sources & Access">
        <div className="space-y-4">
          <p>
            This project currently draws on two primary data sources: the{" "}
            <a href="https://github.com/henrygd/ncaa-api?tab=readme-ov-file" target="_blank" rel="noreferrer" className="underline">
              NCAA API (henrygd/ncaa-api)
            </a>{" "}
            and team statistics scraped from{" "}
            <a href="https://barttorvik.com/trank.php?year=2025#" target="_blank" rel="noreferrer" className="underline">
              Barttorvik
            </a>.
            The project adhered to the website’s terms while collecting data. Python’s <em>BeautifulSoup</em> and <em>requests</em> libraries were used to
            scrape the site and assemble raw datasets that were generally clean. From Barttorvik, the dataset includes statistics for every team that made the
            NCAA March Madness Tournament from 2008 through 2025, excluding 2020 (the tournament was not held due to COVID-19). Selected features include Team,
            Conference, Games Played, Games Won and Lost, Adjusted Offensive Rating, Adjusted Defensive Rating, Effective Field Goal Percentage, and Defensive
            Effective Field Goal Percentage. The source data contained no notable missing values; the main cleaning steps involved standardizing college names for
            readability and manually imputing the “result” column when the scraper could not reliably capture how far a team advanced. A derived Win% column was
            also added, removing the need to carry separate Games Won, Games Played, and Games Lost columns.
          </p>

          <p>
            Barttorvik provided strong historical team data, but it lacked some recent updates, individual player metrics, and certain team shooting splits
            (e.g., three-point percentage and related analytics). To address these gaps, the project incorporates the{" "}
            <a href="https://github.com/henrygd/ncaa-api?tab=readme-ov-file" target="_blank" rel="noreferrer" className="underline">
              NCAA API
            </a>
            , which complements Barttorvik by offering more current information. In combination, these sources are expected to provide sufficient coverage for
            building accurate predictions, and additional APIs or datasets will be evaluated as the project progresses.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Raw vs Cleaned Snapshots">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Image src={`${import.meta.env.BASE_URL}barttorvik.png`} alt="Barttorvik.com website" caption="Barttorvik.com website" />
          <Image src={`${import.meta.env.BASE_URL}scrape.png`} alt="Web scraping code before cleaning" caption="Web scraping code before cleaning" />
          <Image src={`${import.meta.env.BASE_URL}raw_data.png`} alt="Raw Data" caption="Raw Data" />
          <Image src={`${import.meta.env.BASE_URL}clean_data.png`} alt="Clean Data" caption="Clean Data" />
        </div>
      </SectionCard>

      {/* 10 visualization thumbnails → fullscreen lightbox */}
      <SectionCard title="Visualization Gallery (click thumbnails to expand)">
        <LightboxGallery items={GALLERY_ITEMS} />
      </SectionCard>
      <SectionCard title="Exploration & Summaries">
        <p>
          The data highlights a consistent story: defensive strength is a key differentiator in March success. The Mean ADJDE by Result shows that teams advancing deeper in the tournament have stronger defenses on average, with champions consistently posting the lowest (best) defensive efficiency. Paired with the ADJOE vs. ADJDE scatter, the importance of balance becomes clear — elite teams often cluster in the bottom-right, combining high offensive efficiency with low defensive efficiency. This balance is reinforced by the correlation heatmap, where BARTHAG is strongly associated with both ADJOE and ADJDE, confirming it as a composite measure of team strength.
        </p>
        <p>
          Seed-based analysis provides further insight. The Distribution of Results by Seed shows the expected pattern of top seeds making deeper runs, but the BARTHAG comparison of high seeds that exited early vs. those advancing underscores that even among top seeds, weaker underlying efficiency (lower BARTHAG) often predicts vulnerability to upsets. Similarly, the EFG% vs. BARTHAG scatter demonstrates that shooting efficiency is strongly linked with overall team quality. Offensive and defensive boxplots by seed further show that higher seeds consistently have more efficient scoring and tougher defenses, while lower seeds are more variable.
        </p>
        <p>
          Tournament-wide dynamics also emerge. The Survival curves for double-digit seeds quantify the rarity of Cinderella runs: while most exit early, certain seeds (like 11s and 12s) have a non-negligible chance to reach the Sweet 16 or beyond. The Turnover Rate by Result visualization highlights another subtle factor — deeper teams tend to be more disciplined with the ball. Finally, the Underdog round progression counts give a clear picture of just how steep the uphill climb is for double-digit seeds, with Sweet 16 and Elite Eight runs being historically rare but impactful when they occur.
        </p>
      </SectionCard>
    </div>
  );
}

function ClusteringMethod() {
  const GALLERY_ITEMS = [
    { src: `${import.meta.env.BASE_URL}hclust.png`, alt: "Seed distribution histogram", caption: "Hierarchical Clustering Analysis" },
    { src: `${import.meta.env.BASE_URL}k elbow.png`, alt: "Win% by seed boxplot", caption: "AElbow Plot for Optimal K" },
    { src: `${import.meta.env.BASE_URL}k result.png`, alt: "AdjO vs AdjD scatter", caption: "K= 8 Means Analysis" },
    { src: `${import.meta.env.BASE_URL}Silhouette.png`, alt: "Pace histogram", caption: "Silhouette plot for optimal K" },
    { src: `${import.meta.env.BASE_URL}kmeans.png`, alt: "3PT% bar chart", caption: "K=8 Means Clustering with 2PCA" },
    { src: `${import.meta.env.BASE_URL}dendrogram.png`, alt: "Conference strength heatmap", caption: "Hierarchical Clustering Dendrogram" },
    { src: `${import.meta.env.BASE_URL}k=5.png`, alt: "Conference strength heatmap", caption: "K=5 Cluster" },
    { src: `${import.meta.env.BASE_URL}k=6.png`, alt: "Conference strength heatmap", caption: "k=6 Cluster" },

  ];
  return (
    <div className="space-y-8">
      {/* (a) Overview */}
      <SectionCard title="Clustering Overview">
  <p>
    Clustering is an <strong>unsupervised learning</strong> method that groups observations 
    into collections of similar items, called clusters, without requiring predefined labels. 
    Unlike supervised models, which learn from known outcomes, clustering is designed for 
    <em>exploration and discovery</em>. In this project, clustering allows us to uncover 
    natural groupings of basketball teams that share statistical profiles, and then examine 
    how those groups historically performed in the postseason.
  </p>

  <p>
    There are two main paradigms of clustering used here:
  </p>
  <ul className="list-disc pl-6 space-y-1">
    <li>
      <strong>Partitional clustering</strong> (e.g., K-Means): directly partitions the dataset 
      into <em>k</em> groups by iteratively assigning each point to the nearest cluster center 
      and updating centers to minimize within-cluster variance. This method is efficient and 
      produces non-overlapping, flat clusters. We applied K-Means in a reduced 
      <strong>6-dimensional PCA space</strong>, which ensures distances reflect the 
      most informative combinations of features while filtering noise and collinearity.
    </li>
    <li>
      <strong>Hierarchical clustering</strong>: constructs a tree-like structure (a dendrogram) 
      that represents nested levels of similarity. Agglomerative clustering starts with each 
      team as its own cluster and repeatedly merges the closest pairs until all teams are 
      in a single group. Cutting across the dendrogram at a given height yields a chosen 
      number of clusters. This approach not only produces a partition but also reveals the 
      relative similarity between clusters at multiple scales.
    </li>
  </ul>

  <p>
    A critical design choice is the <strong>distance metric</strong> used to quantify 
    similarity. For K-Means, Euclidean distance is standard since the algorithm relies 
    on geometric means. For hierarchical clustering, we used <strong>cosine similarity</strong>, 
    which measures the angle between feature vectors. Cosine distance emphasizes 
    the <em>pattern of features</em> (e.g., relative balance between offense and defense) 
    rather than absolute magnitude. This is particularly useful when comparing teams that 
    might differ in scale (pace, raw totals) but exhibit similar profiles in efficiency.
  </p>

  <p>
    The overall purpose of clustering here is discovery: to identify recurring 
    <em>archetypes of team styles</em> that persist across seasons. Once identified, 
    these clusters can be mapped to postseason outcomes, providing a data-driven way 
    to interpret current teams’ chances based on the historical performance of their 
    cluster peers.
  </p>

  {/* Replace with your overview images */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
    <Image src={`${import.meta.env.BASE_URL}kmeans.png`} alt="Kmeans clustering" caption="K=8 Clusters on Past Data" />
    <Image src={`${import.meta.env.BASE_URL}dendrogram.png`} alt="Hierarchical clustering" caption="Hierarchical Clustering Dendrogram" />
  </div>
</SectionCard>


      {/* (b) Data */}
      <SectionCard title="Data">
        <p>
          For the clustering analysis, we used the cleaned dataset from the Data Preparation & EDA section,
          focusing on key team statistics from Barttorvik. The dataset includes features such as Adjusted Offensive Rating (ADJOE),
          Adjusted Defensive Rating (ADJDE), Effective Field Goal Percentage (EFG_O and EFG_D), Turnover Rate (TOR), and some more key statistics.
          These features were selected for their relevance in capturing team performance and style. The dataset spans multiple seasons (2008-2025, excluding 2020)
          and includes all teams that participated in the NCAA March Madness tournament during this period.
          Prior to clustering, the data was standardized to ensure all features contributed equally to distance calculations.
          Dimensionality reduction via PCA was also applied to create a more manageable feature space for K-Means clustering. 
          The final dataset used for clustering consists of 6 principal components that capture the majority of variance (~90%) in the original features.
        </p>
        <div className="space-y-2 mt-2">
          <Image src={`${import.meta.env.BASE_URL}normalize.png`} alt="Numeric Features" caption="Numeric Features" />
          <p>
            <a href="https://github.com/ayushkhadka514/MarchMadness/tree/main/Project/Raw%20data" className="underline text-blue-600">
              Raw data
            </a>{" "}
            |{" "}
            <a href={`${import.meta.env.BASE_URL}pastCBB.csv`} className="underline text-blue-600">
              Clean data
            </a>
          </p>
        </div>
      </SectionCard>

      {/* (c) Code */}
      <SectionCard title="Code">
        <p>
          The clustering was implemented in <strong>Python</strong> using NumPy, pandas,
          scikit-learn, and SciPy. K-Means used Euclidean distance in PCA space; Hierarchical used
          cosine similarity with average linkage. The Silhouette method guided the choice of{" "}
          <em>k</em>.
        </p>
        <p>
          Link to the notebook or repository:{" "}
          <a href={`${import.meta.env.BASE_URL}Clustering-PCA.ipynb`} className="underline text-blue-600">
            Clustering-PCA.ipynb
          </a>{" "}
            |{" "}
          <a href="https://github.com/ayushkhadka514/MarchMadness/tree/main/Project" className="underline text-blue-600">
            GitHub Repository
          </a>
        </p>
      </SectionCard>

      {/* (d) Results */}
      <SectionCard title="Results">
        <p>
          Result wise, both methods of clustering were very similar. They were both able to produce clusters based on the past data, separating teams 
          into different archetypes. In my personal opinion, I found K-Means to be easier to undersand and analyze thought due to the cluster
          graphs being easier to read in comparision to the dendrogram. Both methods suggested around k=6 clusters, which gave me confidence in this number, however; 
          I did try othe rk values as well. I think that the clusters are good to use to see how far a team can go in the tournament
          based on how similar teams in their cluster have done in the past. The main drawback with these clustering methods is that they assign the current data directly to a cluster
          without accounting for uncertainty. A probabilistic clustering method, like Gaussian Mixture Models, could provide a more nuanced view by estimating the likelihood of cluster membership.
          In future work, I would like to explore this approach to better capture the uncertainty inherent in team performance and style.
        </p>
        <SectionCard title="Visualization Gallery (click thumbnails to expand)">
          <LightboxGallery items={GALLERY_ITEMS} />
        </SectionCard>
      </SectionCard>
      

      {/* (e) Conclusions */}
      <SectionCard title="Conclusions">
        <p>
          Clustering provided a clear, data-driven lens for describing team <em>archetypes</em>
          across seasons and relating those styles to postseason outcomes. Using standardized
          features and a 6-component PCA embedding (~90% variance retained), both K-Means
          (Euclidean) and agglomerative hierarchical clustering (cosine, average linkage)
          produced consistent, interpretable partitions. Diagnostics (silhouette, elbow and
          dendrogram inspection) repeatedly pointed to a compact solution around <strong>k ≈ 6</strong>,
          with similar structure observed for nearby values of <em>k</em>.
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Consistency across methods:</strong> K-Means clusters and hierarchical
            cuts identify near-matching groupings, increasing confidence that the structure
            reflects real signal rather than a method artifact.
          </li>
          <li>
            <strong>Interpretability:</strong> Clusters align with intuitive styles—e.g.,
            offense-first, defense-first, and balanced efficiency profiles—driven by patterns
            in ADJOE/ADJDE, EFG, and turnover metrics rather than raw magnitude.
          </li>
          <li>
            <strong>Practical value:</strong> Mapping a current team to its nearest centroid
            (in PCA space) yields an <em>archetype prior</em> for March outcomes based on how
            historically similar teams fared. This is useful as a first pass for bracket
            reasoning and for communicating style-based risk/ceiling.
          </li>
        </ul>

        <p className="mt-2">
          At the same time, there are important caveats. Hard assignments ignore uncertainty;
          K-Means favors roughly spherical clusters and can under-represent overlapping or
          elongated groups; PCA emphasizes variance, not necessarily predictiveness; and the
          tournament subset introduces selection bias. Exogenous factors (injuries, coaching
          changes, matchup effects) are also unmodeled.
        </p>

        <div className="mt-2">
          <p className="font-semibold">Recommended next steps</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              Adopt <strong>k = 6</strong> as the primary partition and publish “cluster cards”
              (centroid profile + key stats + historical round-advance distribution).
            </li>
            <li>
              Introduce <strong>probabilistic clustering</strong> (e.g., Gaussian Mixture Models)
              to obtain soft memberships and propagate membership uncertainty into round-probabilities.
            </li>
            <li>
              Perform <strong>season-out validation</strong>: fit on 2008–t, project season t+1,
              and evaluate whether cluster priors improve calibration vs. baselines (seed, betting
              lines, or simple Elo).
            </li>
            <li>
              Assess <strong>stability</strong> via bootstrapping / perturbing features and report
              ARI/NMI between runs; confirm the k≈6 solution is robust.
            </li>
            <li>
              Enrich features with tempo, shot mix (3PA rate, FT rate), OR/DR rebound rates, and
              schedule-adjusted variants; re-run PCA and clustering to test sensitivity.
            </li>
            <li>
              Combine cluster priors with a <strong>predictive model</strong> (e.g., logistic or
              gradient boosted trees) as features to forecast game/round outcomes.
            </li>
          </ol>
        </div>

        <p className="mt-2">
          In short, clustering uncovers stable, interpretable team styles and offers a useful prior
          for postseason expectations. With probabilistic assignments, stability checks, and proper
          validation, these clusters can become a principled component of a broader forecasting
          pipeline rather than a standalone heuristic.
        </p>
      </SectionCard>
    </div>
  );
}

function PCATab() {
  // 🔧 Replace the filenames below with your actual image assets.
  const GALLERY_ITEMS = [
    { src: `${import.meta.env.BASE_URL}pca_scree.png`, alt: "Scree plot of eigenvalues", caption: "Scree Plot (Explained Variance by PC)" },
    { src: `${import.meta.env.BASE_URL}pca_cumvar.png`, alt: "Cumulative explained variance", caption: "Cumulative Explained Variance" },
    { src: `${import.meta.env.BASE_URL}pca_biplot.png`, alt: "PC1 vs PC2 biplot", caption: "PC1–PC2 Biplot (Scores + Loadings)" },
    { src: `${import.meta.env.BASE_URL}pca_loadings_heatmap.png`, alt: "Loadings heatmap", caption: "Loadings Heatmap (Variables × PCs)" },
  ];

  return (
    <div className="space-y-8">
      {/* (a) Overview */}
      <SectionCard title="PCA Overview">
        <p>
          <strong>Principal Component Analysis (PCA)</strong> is a linear technique for
          <em> dimensionality reduction</em>: it re-expresses a dataset in terms of new,
          orthogonal axes (principal components) that capture maximal variance. Each component
          is a linear combination of the original variables.
        </p>

        <p>
          <strong>Eigenvalues</strong> quantify how much variance each principal component (PC)
          explains, and <strong>eigenvectors</strong> (component loadings) give the direction
          (weights on original variables) of each PC. If <code>S</code> is the covariance (or
          correlation) matrix, PCA solves <code>S v = \lambda v</code>, yielding eigenpairs
          <code>(\lambda, v)</code>. Sorting eigenvalues in descending order ranks the PCs by
          importance.
        </p>

        <p>
          <strong>Why reduce dimensionality?</strong> High-dimensional data can be noisy,
          redundant, and hard to visualize. PCA mitigates: (i) <em>noise</em> by concentrating
          signal into the first few PCs, (ii) <em>multicollinearity</em> by forming orthogonal
          axes, and (iii) <em>visualization</em> by enabling 2D/3D plots of complex datasets.
          This simplification aids downstream modeling and interpretation—especially when
          distances and clusters depend on the most informative variation.
        </p>

        {/* 👇 Drop in two overview figures (or more) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Image
            src={`${import.meta.env.BASE_URL}pca_geometry.png`}
            alt="Geometric view of PCA projection"
            caption="Geometric intuition: rotate axes to capture maximum variance"
          />
          <Image
            src={`${import.meta.env.BASE_URL}eigen_explainer.png`}
            alt="Eigenvalues and eigenvectors concept diagram"
            caption="Eigenvalues (variance explained) and eigenvectors (directions)"
          />
        </div>
      </SectionCard>

      {/* (b) Data Prep */}
      <SectionCard title="Data Prep">
        <p>
          PCA expects a <strong>numeric matrix</strong> (rows = observations, columns = features),
          with <strong>no missing values</strong>. To make variables comparable and prevent scale
          from dominating, data should be <strong>standardized</strong> (e.g., z-scores). If your
          variables are on very different scales or measured in different units, using the
          <strong> correlation matrix</strong> (i.e., standardized PCA) is recommended.
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Only numeric features (drop IDs, labels, text).</li>
          <li>Impute or remove missing values; verify no constant-variance columns.</li>
          <li>Standardize columns (mean 0, variance 1) before PCA.</li>
          <li>Optionally subset to curated features (e.g., efficiency metrics) to focus signal.</li>
        </ul>

        {/* 👇 Show a sample of the data + link to the file */}
        <div className="space-y-2 mt-2">
          <Image
            src={`${import.meta.env.BASE_URL}pca_datasample.png`}
            alt="Sample of the PCA input data matrix"
            caption="Sample of standardized input data (rows = teams, cols = features)"
          />
          <p>
            <a
              href={`${import.meta.env.BASE_URL}pca_input_sample.csv`}
              className="underline text-blue-600"
            >
              Download sample data (CSV)
            </a>{" "}
            |{" "}
            <a
              href="https://your-repo-or-drive-link-to-raw-data"
              className="underline text-blue-600"
            >
              Raw data source
            </a>
          </p>
        </div>
      </SectionCard>

      {/* (c) Code */}
      <SectionCard title="Code">
        <p>
          Implement PCA in <strong>Python</strong> (NumPy, pandas, scikit-learn) or{" "}
          <strong>R</strong> (stats, FactoMineR, prcomp). Below are links to your code artifacts.
        </p>
        <p>
          Python notebook:{" "}
          <a
            href={`${import.meta.env.BASE_URL}PCA.ipynb`}
            className="underline text-blue-600"
          >
            PCA.ipynb
          </a>{" "}
          | R script:{" "}
          <a
            href={`${import.meta.env.BASE_URL}pca.R`}
            className="underline text-blue-600"
          >
            pca.R
          </a>{" "}
          | Repository:{" "}
          <a
            href="https://github.com/your-username/your-project"
            className="underline text-blue-600"
          >
            GitHub
          </a>
        </p>

        {/* (Optional) Tiny reference of the core calls, keep or remove */}
        <div className="rounded-xl bg-gray-50 p-4 text-sm overflow-x-auto">
          <p className="font-semibold mb-1">Python (scikit-learn):</p>
          <pre className="whitespace-pre-wrap">
{`from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

X_std = StandardScaler().fit_transform(X)        # shape: (n_samples, n_features)
pca   = PCA(n_components=None, svd_solver="full")
Z     = pca.fit_transform(X_std)                 # scores
explained = pca.explained_variance_ratio_        # per-PC variance share
loadings  = pca.components_.T                    # variables × PCs`}
          </pre>

          <p className="font-semibold mt-3 mb-1">R (prcomp):</p>
          <pre className="whitespace-pre-wrap">
{`X_std <- scale(X)                               # center/scale
fit   <- prcomp(X_std, center = TRUE, scale. = TRUE)
scores    <- fit$x                               # PC scores
loadings  <- fit$rotation                        # variables × PCs
explained <- (fit$sdev^2)/sum(fit$sdev^2)        # variance ratio`}
          </pre>
        </div>
      </SectionCard>

      {/* (d) Results */}
      <SectionCard title="Results">
        <p>
          Report how many PCs you retained and why (e.g., elbow in the scree plot, cumulative
          explained variance threshold, or model performance downstream). Visualize both the
          <em> variance explained</em> and the <em>relationships</em> between variables and PCs.
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Scree plot</strong>: eigenvalues / variance explained by each PC.
          </li>
          <li>
            <strong>Cumulative variance</strong>: how many PCs reach your target threshold
            (e.g., 80–95%).
          </li>
          <li>
            <strong>Biplot (PC1–PC2)</strong>: points = observations (scores), arrows =
            variable loadings—reveals which metrics define each axis and how observations cluster.
          </li>
          <li>
            <strong>Loadings heatmap</strong>: variables × PCs—highlights which stats drive
            early components (interpretability).
          </li>
        </ul>

        {/* 👇 At least two visualizations; include more as desired */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
          <Image
            src={`${import.meta.env.BASE_URL}pca_scree.png`}
            alt="Scree plot"
            caption="Figure: Scree plot (drop-off suggests #PCs to keep)"
          />
          <Image
            src={`${import.meta.env.BASE_URL}pca_biplot.png`}
            alt="Biplot PC1-PC2"
            caption="Figure: PC1–PC2 biplot (scores + loadings)"
          />
        </div>

        <SectionCard title="Visualization Gallery (click thumbnails to expand)">
          <LightboxGallery items={GALLERY_ITEMS} />
        </SectionCard>

        {/* 👇 Guidance paragraph you can customize to your dataset */}
        <p className="mt-2">
          <em>Interpretation template:</em> PC1 loads positively on offensive efficiency
          measures (e.g., EFG_O, ADJOE) and negatively on turnover rate, suggesting a
          “shot quality / ball security” axis. PC2 loads strongly on defensive metrics
          (e.g., ADJDE, EFG_D), representing a “defensive pressure” axis. Teams in the
          upper-right of the biplot balance strong offense and defense; lower-right teams
          skew offense-first; upper-left skew defense-first. This aligns with the styles
          surfaced in clustering and provides orthogonal summaries for downstream models.
        </p>
      </SectionCard>

      {/* (e) Conclusions */}
      <SectionCard title="Conclusions">
        <p>
          Summarize what PCA revealed for your topic. Example talking points:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            How many PCs are needed to capture most variance (e.g., first 3 PCs explain ~85%)?
          </li>
          <li>
            What each early PC represents in plain language (offense-first vs defense-first, tempo, shot profile, etc.)?
          </li>
          <li>
            How PCA aided visualization/interpretation and supported your clustering or predictive steps.
          </li>
          <li>
            Any stability checks (e.g., across seasons) and limitations (linear, variance-oriented, sensitive to scaling/outliers).
          </li>
          <li>
            Next steps (robust PCA, sparse PCA, factor analysis, or integrating PCs as features in downstream models).
          </li>
        </ul>
        <p className="mt-2">
          In short, PCA distilled correlated metrics into a small set of orthogonal components that
          are easy to visualize and interpret, providing a compact foundation for subsequent
          clustering and forecasting.
        </p>
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
  const [mode, setMode] = useState("home");
  const [homeTab, setHomeTab] = useState("about");
  const [activeProject, setActiveProject] = useState(null);
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
        return <ClusteringMethod />;
      case "pca":
        return <PCATab />;
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
    <div className="min-h-screen bg-gray-50 w-screen">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="w-full px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => goHome("about")}>
            <div className="w-10 h-10 rounded-2xl bg-black text-white grid place-items-center font-bold">AK</div>
            <div>
              <h1 className="text-xl font-semibold">Ayush Khadka</h1>
              <p className="text-sm text-gray-500">CS and Math @ CU Boulder</p>
            </div>
          </div>

          <nav className="flex gap-2 items-center">
            <TabButton id="about" label="About Me" active={mode === "home" && homeTab === "about"} onClick={() => goHome("about")} />

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
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => openProject("csci5612")}>
                    CSCI 5612: March Madness Predictor
                  </button>
                </div>
              )}
            </div>

            <TabButton id="resume" label="Resume" active={mode === "home" && homeTab === "resume"} onClick={() => goHome("resume")} />
          </nav>
        </div>

        {mode === "project" && (
          <div className="w-full px-6 pb-4">
            <div className="text-sm text-gray-500 mb-2">
              <button className="underline" onClick={() => goHome("projects")}>Projects</button> <span className="mx-1">›</span> CSCI 5612: March Madness Predictor
            </div>
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap pr-2">
              {PROJECT_TABS.map((t) => (
                <TabButton key={t.id} id={t.id} label={t.label} active={projectTab === t.id} onClick={setProjectTab} />
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="w-full px-6 py-8 space-y-8 overflow-x-hidden">
        {mode === "home" ? renderHome() : renderProject()}
      </main>

      <footer className="border-t">
        <div className="w-full px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span>© {new Date().getFullYear()} Ayush Khadka — All rights reserved.</span>
          <span>Built with React & Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
