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
  { id: "xgboost", label: "XGBoost" },
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
  // 🔧 Replace the filenames/links below with your actual assets if different.
  const GALLERY_ITEMS = [
    { src: `${import.meta.env.BASE_URL}PCA Elbow.png`, alt: "Scree plot of eigenvalues", caption: "Scree Plot (Explained Variance by PC)" },
    { src: `${import.meta.env.BASE_URL}biplot.png`, alt: "PC1 vs PC2 biplot", caption: "PC1–PC2 Biplot (Scores + Loadings)" },
    { src: `${import.meta.env.BASE_URL}loadings.png`, alt: "Loadings heatmap", caption: "Loadings Heatmap (Variables × PCs)" },
  ];

  return (
    <div className="space-y-8">
      {/* (a) Overview */}
      <SectionCard title="PCA Overview">
        <p>
          <strong>Principal Component Analysis (PCA)</strong> is a linear technique for
          <em> dimensionality reduction</em>. It rotates the original feature space to new,
          orthogonal axes (principal components, PCs) that capture maximal variance. Each PC
          is a weighted combination of the original variables (its <em>loadings</em>).
        </p>
        <p>
          Let <code>S</code> be the covariance (or correlation) matrix. PCA solves
          <code> S v = λ v </code> for eigenpairs <code>(λ, v)</code>. The eigenvalue <code>λ</code>
          equals the variance explained by that PC, and the eigenvector <code>v</code> gives the
          direction (loadings). Sorting eigenvalues descending ranks PCs by importance.
        </p>
        <p>
          <strong>Why PCA here?</strong> High-dimensional team metrics are correlated and noisy.
          PCA (i) concentrates signal into a small set of components, (ii) removes
          multicollinearity via orthogonal axes, and (iii) enables clear 2D/3D visualization.
          These properties make distances more meaningful for downstream clustering.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Image
            src={`${import.meta.env.BASE_URL}pca.png`}
            alt="Geometric view of PCA projection"
            caption="Rotate axes to capture the directions of maximal variance"
          />
          <Image
            src={`${import.meta.env.BASE_URL}eigen.png`}
            alt="Eigenvalues and eigenvectors concept diagram"
            caption="Eigenvalues = variance explained; eigenvectors = loading directions"
          />
        </div>
      </SectionCard>

      {/* (b) Data Prep */}
      <SectionCard title="Data Prep">
        <p>
          PCA expects a <strong>numeric matrix</strong> (rows = observations, columns = features)
          with <strong>no missing values</strong>. Variables should be on comparable scales.
          In practice we standardize columns (z-scores) and often use the correlation matrix.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Keep only numeric features (drop IDs/labels/text).</li>
          <li>Impute or remove missing values; remove constant-variance columns.</li>
          <li>Standardize features before computing PCA.</li>
          <li>Optionally curate features to emphasize signal (e.g., efficiency, shooting, rebounding).</li>
        </ul>
        <div className="space-y-2 mt-2">
          <p>
            <a href={`${import.meta.env.BASE_URL}pastCBB.csv`} className="underline text-blue-600">
              Download sample data (CSV)
            </a>{" "}
            |{" "}
            <a href="https://barttorvik.com/trank.php?year=2025#" className="underline text-blue-600">
              Raw data source
            </a>
          </p>
        </div>
      </SectionCard>

      {/* (c) Code */}
      <SectionCard title="Code">
        <p>
          Implemented in <strong>Python</strong> with <em>NumPy</em> and <em>pandas</em>;
          visualizations via <em>matplotlib</em>/<em>seaborn</em>. Workflow:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Standardize matrix (fit scaler on historical data; apply consistently to new data).</li>
          <li>Compute PCA on standardized matrix; extract scores (obs × PCs) and loadings (vars × PCs).</li>
          <li>Use scree/cumulative variance to choose the number of PCs.</li>
          <li>Export PC scores for downstream clustering and analysis.</li>
        </ul>
        <p className="mt-2">
          Background reading:&nbsp;
          <a
            href="https://www.geeksforgeeks.org/data-analysis/principal-component-analysis-pca/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GeeksforGeeks: PCA Overview
          </a>
        </p>
        <p>
          Notebook / Repo:&nbsp;
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
          We retained <strong>6 principal components</strong>. The cumulative variance curve
          indicates a clear elbow and surpasses a &gt;90% threshold by 6 PCs—additional
          components contribute marginal gains.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <Image
            src={`${import.meta.env.BASE_URL}cumvar.png`}
            alt="Cumulative variance explained"
            caption="Cumulative Explained Variance: &gt;90% by 6 PCs, diminishing returns thereafter"
          />
          <Image
            src={`${import.meta.env.BASE_URL}biplot.png`}
            alt="PC1 vs PC2 biplot"
            caption="Biplot: teams (scores) with variable loadings over PC1–PC2"
          />
        </div>

        <p className="mt-3">
          <strong>Biplot interpretation:</strong> PC1 behaves like a <em>team strength</em> axis—
          it contrasts higher-efficiency teams (left, aligned with BARTHAG/WAB) against weaker-seeded
          teams (right, aligned with Seed). PC2 functions as a <em>style</em> axis—positive loadings
          on 3P%, EFG_O, 2P%, and 3PR highlight perimeter/offensive-shooting orientation near the
          top, while negative association with DRB pulls rebounding-driven profiles downward. ADJOE
          and ADJDE load across both axes, indicating combined offense/defense contributions.
        </p>

        <SectionCard title="Visualization Gallery (click thumbnails to expand)">
          <LightboxGallery items={GALLERY_ITEMS} />
        </SectionCard>
      </SectionCard>

      {/* (e) Conclusions */}
      <SectionCard title="Conclusions">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            The first <strong>six PCs</strong> capture <strong>&gt;90% of variance</strong>,
            yielding a compact, information-rich representation.
          </li>
          <li>
            <strong>PC1 = strength</strong> (efficiency and seed contrast);{" "}
            <strong>PC2 = style</strong> (shooting/perimeter emphasis vs rebounding/defense).
          </li>
          <li>
            The 6D PCA space removes redundancy and stabilizes distances, providing a clean
            foundation for downstream clustering and postseason profiling.
          </li>
          <li>
            Next steps: check stability across seasons, consider robust/sparse PCA, and feed PC
            scores into clustering or predictive models.
          </li>
        </ul>
        <p className="mt-2">
          In short, PCA distilled correlated team metrics into a small set of orthogonal components
          that are easy to interpret and highly useful for the clustering stages that follow.
        </p>
      </SectionCard>
    </div>
  );
}

function NaiveBayesTab() {
  // 🔧 Replace filenames/links with your actual assets & paths.
  const GALLERY_ITEMS = [
    { src: `${import.meta.env.BASE_URL}sample.png`, alt: "Sample of labeled data", caption: "Sample of Labeled Data (features + target)" },
    { src: `${import.meta.env.BASE_URL}train.png`, alt: "Training set preview", caption: "Training Set Preview (X_train, y_train)" },
    { src: `${import.meta.env.BASE_URL}test.png`, alt: "Testing set preview", caption: "Testing Set Preview (X_test, y_test)" },
  ];

  const RESULTS_ITEMS = [
    { src: `${import.meta.env.BASE_URL}BayesConfusion.png`, alt: "Confusion Matrix", caption: "Confusion Matrix (Predicted vs Actual)" },
    { src: `${import.meta.env.BASE_URL}bayes_importance.png`, alt: "Accuracy plot", caption: "Feature Importance" },
    { src: `${import.meta.env.BASE_URL}bayes_result.jpeg`, alt: "Class conditional probabilities", caption: "Predicted bracket from Naive Bayes" },
  ];

  return (
    <div className="space-y-8">
      {/* (a) Overview */}
      <SectionCard title="Naïve Bayes Overview">
  <p>
    <strong>Naïve Bayes (NB)</strong> is a family of probabilistic classifiers that apply Bayes’ rule
    with a <em>conditional independence</em> assumption between features given the class. Despite the
    “naïve” assumption, NB is fast, robust, and often highly competitive on <strong>high-dimensional,
    sparse data</strong> (e.g., text). In classification form, Bayes’ rule can be written as
    <code> P(C | x) ∝ P(x | C) · P(C) </code>, and under the naïve assumption
    <code> P(x | C) = ∏<sub>j=1..d</sub> P(x<sub>j</sub> | C) </code>.
  </p>

  <div className="grid sm:grid-cols-2 gap-4 mt-4">
    <Image
      src={`${import.meta.env.BASE_URL}bayes.jpg`}
      alt="Bayes rule diagram"
      caption="Bayes: P(C|x) ∝ P(x|C)·P(C). NB assumes x₁…x_d are conditionally independent given C."
    />
    <Image
      src={`${import.meta.env.BASE_URL}variant.jpg`}
      alt="NB variants"
      caption="Common variants: MultinomialNB (counts), BernoulliNB (binary), GaussianNB (continuous)."
    />
  </div>

  <p className="mt-3">
    <strong>What it’s good for:</strong> spam filtering, topic and sentiment classification,
    document tagging, and quick baselines for wide/tabular data. It’s simple, fast to train/predict,
    and interpretable via class priors and feature likelihoods.
  </p>

  <p className="mt-3">
    <strong>Multinomial Naïve Bayes:</strong> Assumes features are non-negative
    <em> counts or frequency-like</em> values (e.g., bag-of-words counts, TF, nonnegative TF-IDF).
    It estimates how often each feature occurs per class. In log-space:
    <code> log P(C|x) ∝ log P(C) + Σ<sub>j</sub> x<sub>j</sub> · log P(x<sub>j</sub>|C) </code>.
    Additive smoothing (<code>α</code>) prevents zeros and usually improves accuracy.
  </p>

  <p className="mt-3">
    <strong>Bernoulli Naïve Bayes:</strong> Assumes <em>binary</em> features
    (present/absent). Often created by binarizing counts (e.g., “word appears at least once”).
    Useful for very short texts or when <em>occurrence matters more than frequency</em>.
  </p>

  <p className="mt-3">
    <strong>Strengths:</strong> extremely fast, handles many features well, works with limited data.
    <strong> Limitations:</strong> independence assumption may be violated; probabilities can be
    poorly calibrated without post-processing.
  </p>
</SectionCard>


      {/* (b) Data Prep */}
      <SectionCard title="Data Prep">
  <p>
    To use <strong>Naïve Bayes</strong> you need a clean, labeled dataset and a leak-free
    preprocessing pipeline. NB is a <strong>supervised</strong> classifier, so each row must have a
    target class label. You’ll split this labeled data into a <strong>Training Set</strong>
    (used to fit all preprocessing steps and the model) and a <strong>Testing Set</strong> (held out
    for final evaluation). These sets must be <em>disjoint</em> to avoid leakage and overfitting.
  </p>

  <p className="mt-2">
    <strong>High-level steps we followed</strong> (you can swap in your own assets/links below):
  </p>
  <ol className="list-decimal pl-6 space-y-1">
    <li>
      <strong>Collect &amp; label:</strong> Assemble rows (documents / examples) with a single
      ground-truth class per row. Remove obvious duplicates and fix malformed rows.
    </li>
    <li>
      <strong>Train/Test split:</strong> Create an 80/20 (or 70/30) split with{" "}
      <em>stratification</em> so class proportions are preserved. Set a{" "}
      <code>random_state</code> for reproducibility.
    </li>
    <li>
      <strong>Fit transforms on <em>train only</em>:</strong> Any preprocessing that learns from
      the data (e.g., vocabulary, IDF weights, feature selection) must be <em>fit on the
      training set</em> and then <em>applied to the test set</em>. Never peek at test data when
      building the vectorizer or selecting features.
    </li>
    <li>
      <strong>Vectorize features:</strong> For text, convert raw text to numeric features:
      <ul className="list-disc pl-6 mt-1 space-y-1">
        <li>
          <em>MultinomialNB</em> (what we use): non-negative <strong>counts</strong> or frequency-like
          features (e.g., CountVectorizer, TF or non-negative TF-IDF). Keep all values ≥ 0.
        </li>
        <li>
          <em>BernoulliNB</em>: <strong>binary</strong> features (present/absent). Binarize
          counts with a threshold (e.g., &gt; 0 → 1).
        </li>
      </ul>
    </li>
    <li>
      <strong>Text cleaning (if applicable):</strong> normalize case, remove/limit punctuation,
      optionally remove stopwords, choose n-grams (e.g., unigrams/bigrams), cap vocabulary
      size, and drop extremely rare tokens to reduce noise.
    </li>
    <li>
      <strong>Handle missing/invalid values:</strong> Drop or impute rows/fields that can’t be
      vectorized. Ensure the final feature matrix has no NaNs and satisfies each NB variant’s
      requirements (non-negative for Multinomial, binary for Bernoulli).
    </li>
    <li>
      <strong>Optional feature selection:</strong> Apply chi-square or mutual information
      (fit on train only) to keep the most informative features and reduce dimensionality.
    </li>
    <li>
      <strong>Class imbalance check:</strong> Inspect label distribution. If heavily imbalanced,
      consider stratified split (already done), decision thresholds, or reporting per-class
      metrics in addition to overall accuracy.
    </li>
  </ol>

  <ul className="list-disc pl-6 space-y-1 mt-3">
    <li>
      <strong>MultinomialNB (sklearn):</strong> features must be non-negative counts / TF / TF-IDF.
      Do <em>not</em> standardize/center to negative values.
    </li>
    <li>
      <strong>BernoulliNB:</strong> binarize features (e.g., count &gt; 0 → 1) or construct boolean
      indicators directly.
    </li>
    <li>
      Keep preprocessing steps identical between train and test by using a single pipeline
      object (vectorizer → selector → classifier) fit on <em>train</em>, then applied to <em>test</em>.
    </li>
  </ul>

  <div className="space-y-2 mt-3">
    <p>
      {/* 🔗 Replace these with your actual assets/links */}
      <a href={`${import.meta.env.BASE_URL}newPastCBB.csv`} className="underline text-blue-600">
        Download sample data (CSV)
      </a>{" "}
      |{" "}
      <a href={`https://www.kaggle.com/competitions/march-machine-learning-mania-2025/overview`} className="underline text-blue-600">
        Data source
      </a>
    </p>
  </div>

  <SectionCard title="Data Previews">
    {/* 🖼️ Provide small screenshots: raw labeled sample, train head, test head */}
    <LightboxGallery items={GALLERY_ITEMS} />
  </SectionCard>

  <p className="mt-3">
    <strong>Why this matters:</strong> NB’s assumptions (counts ≥ 0 for Multinomial; binary for
    Bernoulli) dictate the <em>feature format</em>, and leak-free preprocessing preserves a fair
    estimate of generalization. With this prep in place, the model’s smoothing (<code>α</code>) and
    variant choice become meaningful levers rather than fixes for data issues.
  </p>
</SectionCard>


{/* (c) Code */}
<SectionCard title="Code">
  <p>
    Implemented in <strong>Python</strong> with <em>NumPy</em>, <em>pandas</em>, and <em>scikit-learn</em>; plots via <em>matplotlib</em>. The project uses
    <strong> Gaussian Naive Bayes</strong> on fully numeric, pairwise features.
  </p>
  <ul className="list-disc pl-6 space-y-1">
    <li>
      <strong>Dataset build (head-to-head):</strong> From <code>newPastCBB.csv</code>, create game-level rows by joining each team to the opponent
      using <code>LostTo == Team</code>.
    </li>
    <li>
      <strong>Numeric features only:</strong> For each numeric stat (excluding outcomes like <code>Result</code>), compute
      differences <code>diff_stat = stat_team − stat_opp</code>. This yields a numeric matrix suitable for Naive Bayes.
    </li>
    <li>
      <strong>Labels:</strong> Original direction (team vs opponent) is a loss → label <code>0</code>. Add a flipped copy (opponent vs team) so the
      winner appears first → label <code>1</code>.
    </li>
    <li>
      <strong>Preprocessing:</strong> Median imputation with <code>SimpleImputer</code> inside a <code>Pipeline</code> so missing values are handled
      consistently during CV and inference.
    </li>
    <li>
      <strong>Naive Bayes (NB):</strong> Train <code>GaussianNB</code> on the <code>diff_*</code> features. 
    </li>
    <li>
      <strong>Evaluation:</strong> 5-fold stratified cross-validation for accuracy and an out-of-fold confusion matrix using
      <code> cross_val_predict</code>.
    </li>
    <li>
      <strong>Visualization:</strong> Confusion matrix (counts), ROC/PR curves from OOF probabilities, and calibration (reliability) plot.
    </li>
    <li>
      <strong>Inference helper:</strong> Website-facing function
      <code> predict_match_winner_nb(current_df, teamA, teamB, nb_model, features)</code> that returns symmetric probabilities and enforces a 50/50
      result for same-team comparisons.
    </li>
  </ul>
  <p className="mt-2">
    Notebook / Code:&nbsp;
    <a href={`${import.meta.env.BASE_URL}NaiveBayes.ipynb`} className="underline text-blue-600">
      CBB_HeadToHead_NaiveBayes.ipynb
    </a>
    {" "} | {" "}
    <a href="https://github.com/ayushkhadka514/MarchMadness/tree/main/Project" className="underline text-blue-600">
      GitHub Repository
    </a>
  </p>
</SectionCard>



      {/* (d) Results */}
      <SectionCard title="Results">

        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <Image
            src={`${import.meta.env.BASE_URL}BayesConfusion.png`}
            alt="Confusion Matrix"
            caption="Confusion Matrix (rows: actual, columns: predicted)"
          />
          <Image
            src={`${import.meta.env.BASE_URL}scores.png`}
            alt="Accuracy Summary"
            caption="Accuracy and (optional) cross-validated accuracy"
          />
        </div>

        <SectionCard title="More Visuals (click to expand)">
          <LightboxGallery items={RESULTS_ITEMS} />
        </SectionCard>

        <p className="mt-3">
          <strong>Interpretation:</strong> Naive Bayes achieved <em>99.8%</em> accuracy according to ESPN when predicting the 2025 tournament (1730/1920 score). 
          The confusion matrix shows very few misclassifications, indicating strong performance. Feature importance analysis highlights which predictors most influenced the model's decisions.
        </p>
      </SectionCard>

      {/* (e) Conclusions */}
      <SectionCard title="Conclusions">
  <ul className="list-disc pl-6 space-y-1">
    <li>
      Gaussian Naive Bayes delivered a fast, transparent baseline on the pairwise <code>diff_*</code> features, producing stable, order-invariant
      head-to-head probabilities after symmetrization.
    </li>
    <li>
      Feature engineering was decisive: constructing numeric differences and removing leaky statistics (e.g., <code>G</code>) reduced label leakage
      and improved face validity of the signals.
    </li>
    <li>
      Permutation-importance and class-separation analyses highlighted a small set of metrics driving predictions, while error patterns suggested value
      in adding richer opponent-adjusted stats and season-aware splits.
    </li>
    <li>
      Next steps include probability calibration, smoothing (<code>alpha</code>) tuning, explicit year-based holdouts, and comparisons with calibrated
      logistic regression or tree-based ensembles for robustness.
    </li>
  </ul>
  <p className="mt-2">
    Overall, the model can predict <em>game winners in head-to-head college basketball matchups</em> with reasonable fidelity on this representation;
    further gains are likely from tighter control of leakage, improved calibration, and expanded feature context.
  </p>
</SectionCard>
    </div>
  );
}

function XGBoostTab() {
  // 🔧 Replace filenames/links with your actual assets & paths.
  const GALLERY_ITEMS = [
    { src: `${import.meta.env.BASE_URL}clean_data.png`, alt: "Sample of labeled data", caption: "Sample of Labeled Data (features + target)" },
    { src: `${import.meta.env.BASE_URL}train_tree.png`, alt: "Training set preview", caption: "Training Set Preview (X_train, y_train)" },
    { src: `${import.meta.env.BASE_URL}test_tree.png`, alt: "Testing set preview", caption: "Testing Set Preview (X_test, y_test)" },
  ];

  const RESULTS_ITEMS = [
    { src: `${import.meta.env.BASE_URL}h2hconfusion.png`, alt: "Confusion Matrix", caption: "Confusion Matrix (Predicted vs Actual)" },
    { src: `${import.meta.env.BASE_URL}h2hfeatures.png`, alt: "Feature importance", caption: "Feature Importance from XGBoost" },
    { src: `${import.meta.env.BASE_URL}h2haccuracy.png`, alt: "Accuracy Scores", caption: "Accuracy across learning rates / estimators / depths" },
    { src: `${import.meta.env.BASE_URL}bracketboost.jpg`, alt: "Accuracy Scores", caption: "Predicted bracket from XGBoost model" },
  ];

  return (
    <div className="space-y-8">
      {/* (a) Overview */}
      <SectionCard title="Boosting & XGBoost Overview">
        <p>
          <strong>Boosting</strong> is an ensemble technique that builds a strong classifier by
          combining many <em>weak learners</em>—typically shallow decision trees—that perform only
          slightly better than random guessing on their own. The core idea is to train these weak
          learners <em>sequentially</em>, where each new model focuses on examples that previous
          models struggled with.
        </p>

        <p className="mt-3">
  In general, boosting can be viewed as iteratively minimizing a loss function. At step{" "}
  <code>t</code>, we add a new weak learner{" "}
  <code>h<sub>t</sub>(x)</code> with weight{" "}
  <code>η<sub>t</sub></code> to form an updated ensemble:{" "}
  <code>
    F<sub>t</sub>(x) = F<sub>t-1</sub>(x) + η<sub>t</sub> · h<sub>t</sub>(x)
  </code>
  . The ensemble prediction comes from{" "}
  <code>F<sub>T</sub>(x)</code> after <code>T</code> rounds. Different boosting
  algorithms differ in how they define the loss, how they weight samples, and how they
  update the model.
</p>


        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Image
            src={`${import.meta.env.BASE_URL}weaklearners.png`}
            alt="Weak vs strong learners"
            caption="Many weak trees (slightly better than random) combine into a strong predictor."
          />
          <Image
            src={`${import.meta.env.BASE_URL}xgboost.png`}
            alt="Residual updates in boosting"
            caption="XGBoost"
          />
        </div>

        <p className="mt-3">
          <strong>AdaBoost:</strong> Reweights training examples at each round. Misclassified points
          get higher weight so the next weak learner focuses on them. The final model is a weighted
          majority vote of all trees. It works well with clean, low-noise data and shallow trees
          (decision stumps).
        </p>

        <p className="mt-3">
          <strong>Gradient Boosting:</strong> Views boosting as gradient descent in function space.
          Each new tree fits the <em>negative gradient</em> of the loss (often residuals) w.r.t. the
          current ensemble. This generalizes boosting to many loss functions (squared error,
          logistic loss, etc.) and supports both regression and classification.
        </p>

        <p className="mt-3">
          <strong>XGBoost (Extreme Gradient Boosting):</strong> A highly optimized, regularized
          version of gradient boosting. It adds:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Regularization</strong> on tree complexity (L1/L2 on leaf weights) to combat
            overfitting.
          </li>
          <li>
            <strong>Efficient tree building</strong> (histogram-based splits, sparsity-aware
            algorithms, column subsampling).
          </li>
          <li>
            <strong>Handling of missing values</strong> via learned “default” directions in splits.
          </li>
          <li>
            Native support for parallelization and out-of-core training.
          </li>
        </ul>

        <p className="mt-3">
          Key hyperparameters across boosting methods:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Learning rate (η / <code>learning_rate</code>):</strong> Scales the contribution
            of each tree. Smaller values usually improve generalization but require more trees.
          </li>
          <li>
            <strong>Number of estimators (<code>n_estimators</code>):</strong> How many trees in the
            ensemble. Too few → underfitting; too many → potential overfitting without proper
            regularization.
          </li>
          <li>
            <strong>Tree depth (<code>max_depth</code>):</strong> Controls the complexity of each
            weak learner. Shallow trees (depth 2–4) are common for boosting.
          </li>
          <li>
            <strong>Subsampling (<code>subsample</code>, <code>colsample_bytree</code>):</strong>{" "}
            Randomly subsample rows/columns per tree to reduce variance and overfitting.
          </li>
        </ul>

        <p className="mt-3">
          <strong>Big picture:</strong> boosting methods iteratively reduce <em>bias</em> by fitting
          better to the data at each step, while careful regularization and subsampling help control
          <em> variance</em> and overfitting. XGBoost wraps these ideas into a fast, robust package
          well-suited for tabular data like our basketball features.
        </p>
      </SectionCard>

      {/* (b) Data Prep */}
      <SectionCard title="Data Preparation">
        <p>
          Boosting methods are <strong>supervised</strong> learning algorithms: they require a
          labeled dataset with clear input features <code>X</code> and a target variable{" "}
          <code>y</code>. In this project, we work with a college basketball dataset of team-season
          statistics and transform it into <strong>head-to-head matchups</strong> so XGBoost can
          directly learn to predict the winner of a specific game.
        </p>

        <p className="mt-2">
          <strong>Dataset selection:</strong> We start from a season-level dataset containing one row
          per team per season (e.g., efficiency metrics, shooting percentages, seed, etc.). Using a
          column like <code>LostTo</code>, we construct game-level examples where each row represents
          a matchup between two teams.
        </p>

        <ol className="list-decimal pl-6 space-y-1 mt-2">
          <li>
            <strong>Identify the target:</strong> For each matchup, we define the label as{" "}
            <code>y = 1</code> if the <em>first</em> team in the pair wins and <code>y = 0</code> if
            it loses. This gives a clean binary classification target.
          </li>
          <li>
            <strong>Create features:</strong> For each numeric stat (e.g., <code>ADJOE</code>,{" "}
            <code>ADJDE</code>, <code>EFG_O</code>, <code>Seed</code>), we construct{" "}
            <code>diff_stat = stat_team − stat_opp</code>. The model then learns how score
            differentials in these metrics relate to win probability.
          </li>
          <li>
            <strong>Train/Test split:</strong> We perform a stratified split (e.g., 80/20) into a{" "}
            <strong>Training Set</strong> and <strong>Testing Set</strong>, making sure they are
            disjoint. The model and all learned preprocessing (like imputers) are fitted on{" "}
            <em>training data only</em> and then evaluated on the held-out test data.
          </li>
          <li>
            <strong>Handling missing values:</strong> We use a simple strategy (e.g., median
            imputation) to fill missing numeric values, implemented inside a{" "}
            <code>Pipeline</code> so that cross-validation and inference stay consistent.
          </li>
          <li>
            <strong>Encoding & scaling:</strong> In this tab, we primarily work with numeric stats,
            so no one-hot encoding is required. For general tabular data, categorical features would
            be one-hot encoded and all features passed as a numeric matrix to XGBoost.
          </li>
        </ol>

        <p className="mt-3">
          {/* 🔗 Replace these with your actual assets/links */}
          <a
            href={`${import.meta.env.BASE_URL}newPastCBB.csv`}
            className="underline text-blue-600"
          >
            Download sample dataset (CSV)
          </a>{" "}
          |{" "}
          <a
            href="https://barttorvik.com/trank.php?year=2025#"
            className="underline text-blue-600"
          >
            Original data source
          </a>
        </p>

        <SectionCard title="Data Previews">
          {/* 🖼️ Provide small screenshots: raw labeled sample, train head, test head */}
          <LightboxGallery items={GALLERY_ITEMS} />
        </SectionCard>

        <p className="mt-3">
          <strong>Why it matters:</strong> Boosting is powerful but sensitive to data leakage and
          feature quality. Carefully defining the target, building matchup-level features, and
          keeping train/test preprocessing leak-free ensures that the reported performance reflects
          how the model will behave on truly unseen games.
        </p>
      </SectionCard>

      {/* (c) Code */}
      <SectionCard title="Code">
        <p>
          The model is implemented in <strong>Python</strong> using <em>NumPy</em>,{" "}
          <em>pandas</em>, and <em>xgboost</em>, with visualization via <em>matplotlib</em>. We use
          <strong> XGBoost</strong> as our main boosting method, applied to the numeric{" "}
          <code>diff_*</code> matchup features.
        </p>

        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            <strong>Matchup construction:</strong> Starting from team-season rows, we join each team
            to its tournament opponent using a column like <code>LostTo</code>. For each game, we
            create a pair of examples:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>
                <code>(team − opp, y = 0)</code> for the direction where the listed team lost.
              </li>
              <li>
                <code>(opp − team, y = 1)</code> for the flipped direction where the winner appears
                first.
              </li>
            </ul>
          </li>
          <li>
            <strong>Features:</strong> Only numeric, game-agnostic stats (e.g.,{" "}
            <code>ADJOE</code>, <code>ADJDE</code>, <code>BARTHAG</code>, shooting percentages,
            tempo) are used. Outcome-like fields (such as final tournament result) are excluded to
            avoid label leakage.
          </li>
          <li>
            <strong>Pipeline:</strong> A <code>Pipeline</code> wraps a{" "}
            <code>SimpleImputer(strategy="median")</code> followed by an{" "}
            <code>XGBClassifier</code>. This keeps preprocessing and model training tightly coupled
            and safe to use in cross-validation.
          </li>
          <li>
            <strong>Model configuration (classification):</strong>{" "}
            <code>XGBClassifier</code> with a logistic objective for binary classification, e.g.:
            <pre className="mt-1 bg-slate-900 text-slate-100 p-2 rounded text-xs overflow-x-auto">
{`xgb_model = XGBClassifier(
    n_estimators=200,
    max_depth=4,
    learning_rate=0.05,
    subsample=0.9,
    colsample_bytree=0.9,
    objective="binary:logistic",
    eval_metric="logloss",
    tree_method="hist",
    random_state=42,
)`}
            </pre>
          </li>
          <li>
            <strong>Order-invariant prediction:</strong> At inference time, we evaluate the model on{" "}
            <code>(teamA − teamB)</code> and <code>(teamB − teamA)</code>, then combine the two
            probabilities so the final win probability is symmetric and does not depend on the input
            order.
          </li>
          <li>
            <strong>Validation:</strong> We use a held-out test set and, optionally, cross-validation
            to estimate performance across different hyperparameter settings (learning rate, number
            of estimators, max depth, subsampling).
          </li>
        </ul>

        <p className="mt-2">
          Notebook / Code:{" "}
          {/* 🔗 Replace these with your actual notebook / repo links */}
          <a
            href={`${import.meta.env.BASE_URL}XGBoostHeadToHead.ipynb`}
            className="underline text-blue-600"
          >
            CBB_HeadToHead_XGBoost.ipynb
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/ayushkhadka514/MarchMadness"
            className="underline text-blue-600"
          >
            GitHub Repository
          </a>
        </p>
      </SectionCard>

      {/* (d) Results */}
      <SectionCard title="Results">
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <Image
            src={`${import.meta.env.BASE_URL}boostconfusion.png`}
            alt="Confusion Matrix"
            caption="Confusion Matrix (rows: actual, columns: predicted)"
          />
          <Image
            src={`${import.meta.env.BASE_URL}boostfeature.png`}
            alt="Feature importance bar chart"
            caption="Feature importance from the trained XGBoost model"
          />
        </div>

        <SectionCard title="More Visuals (click to expand)">
          <LightboxGallery items={RESULTS_ITEMS} />
        </SectionCard>

        <p className="mt-3">
          <strong>Performance summary:</strong> XGBoost achieves strong accuracy on the held-out test
          set for predicting game winners. The confusion matrix shows that the model correctly
          classifies most matchups, with relatively few false positives/negatives. By sweeping over
          hyperparameters such as <code>learning_rate</code>, <code>n_estimators</code>, and{" "}
          <code>max_depth</code>, we can observe the trade-off between bias and variance:
        </p>

        <ul className="list-disc pl-6 space-y-1 mt-1">
          <li>
            Smaller <code>learning_rate</code> and more trees often yield smoother, more robust
            predictions.
          </li>
          <li>
            Deeper trees can capture more complex interactions between stats but may overfit if not
            regularized.
          </li>
          <li>
            Subsampling rows and columns (<code>subsample</code>, <code>colsample_bytree</code>)
            tends to improve generalization by injecting randomness.
          </li>
        </ul>

        <p className="mt-3">
          <strong>Feature importance:</strong> The importance plot highlights which metrics (e.g.,
          offensive efficiency, defensive efficiency, shooting percentages, tempo, seed) contribute
          most to the model’s decisions. In practice, a small subset of features often dominates the
          predictive signal, revealing which aspects of a team’s profile matter most in head-to-head
          games.
        </p>
      </SectionCard>

      {/* (e) Conclusions */}
      <SectionCard title="Conclusions">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Boosting impact:</strong> XGBoost substantially improves predictive performance
            over simple baselines by aggregating many shallow trees and focusing successive trees on
            the “hard” matchups.
          </li>
          <li>
            <strong>Hyperparameters matter:</strong> Learning rate, number of estimators, and tree
            depth strongly influence both accuracy and overfitting. Careful tuning (and early
            stopping) is crucial for getting the most out of the model.
          </li>
          <li>
            <strong>Interpretability:</strong> Feature importance scores and partial error patterns
            reveal which statistics are driving win probabilities, providing basketball-relevant
            insights beyond raw accuracy numbers.
          </li>
          <li>
            <strong>Future work:</strong> Possible extensions include adding more contextual
            features (e.g., recency effects, injuries, home/away adjustments), calibrating output
            probabilities, and comparing XGBoost to calibrated logistic regression, Random Forests,
            or deep learning approaches.
          </li>
        </ul>

        <p className="mt-2">
          Overall, XGBoost provides a flexible, high-performing framework for modeling{" "}
          <em>head-to-head college basketball matchups</em>, turning team-level season stats into
          accurate game-level predictions while remaining reasonably interpretable and tunable.
        </p>
      </SectionCard>
    </div>
  );
}

function DecisionTreesTab() {
  // 🔧 Replace filenames/links with your actual asset paths.
  const GALLERY_ITEMS = [
    { src: `${import.meta.env.BASE_URL}sample_tree.png`, alt: "Sample of labeled pairwise data", caption: "Sample of Labeled Pairwise Data (features + target)" },
    { src: `${import.meta.env.BASE_URL}train_tree.png`, alt: "Training set preview", caption: "Training Set Preview (X_train, y_train)" },
    { src: `${import.meta.env.BASE_URL}test_tree.png`, alt: "Testing set preview", caption: "Testing Set Preview (X_test, y_test)" },
  ];

  const RESULTS_ITEMS = [
    { src: `${import.meta.env.BASE_URL}confusion.png`, alt: "Confusion Matrix", caption: "Confusion Matrix (Predicted vs Actual)" },
    { src: `${import.meta.env.BASE_URL}features.png`, alt: "Feature importance", caption: "Top Gini Feature Importances" },
    { src: `${import.meta.env.BASE_URL}tree.png`, alt: "Tree visualization", caption: "Decision Tree (first few levels)" },
    { src: `${import.meta.env.BASE_URL}trees_result.jpeg`, alt: "Tree visualization", caption: "Decision Tree Prediction Bracket" },

  ];

  return (
    <div className="space-y-8">
      {/* (a) Overview */}
      <SectionCard title="Decision Trees Overview">
        <p>
          <strong>Decision Trees (DTs)</strong> are nonparametric, supervised models that split the feature space with
          interpretable if–else rules. Internal nodes choose a feature and threshold to reduce class impurity; leaves store
          predicted class probabilities. DTs capture nonlinearities and interactions, train quickly, and are easy to explain.
          In <strong>scikit-learn</strong>, inputs must be <em>numeric</em> (categoricals must be encoded or omitted).
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Image
            src={`${import.meta.env.BASE_URL}decision-tree-template.jpg`}
            alt="Decision tree schematic"
            caption="A decision tree recursively partitions the space; each leaf holds a class distribution."
          />
          <Image
            src={`${import.meta.env.BASE_URL}gini.png`}
            alt="Impurity measures"
            caption="Gini and Entropy quantify node 'mixedness'; splits are chosen to reduce impurity the most."
          />
        </div>

        <h4 className="mt-4 font-semibold">What DTs can be used for</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Classification:</strong> predict discrete labels (e.g., matchup winner).</li>
          <li><strong>Regression:</strong> predict continuous targets (e.g., margin).</li>
          <li><strong>Feature insight:</strong> importances and rules highlight which variables matter.</li>
          <li><strong>Rule extraction:</strong> convert paths root→leaf to human-readable policies.</li>
        </ul>

        <h4 className="mt-4 font-semibold">Gini, Entropy, and Information Gain</h4>
        <p className="mt-1">
          Trees select splits that <em>reduce impurity</em>:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Gini (CART):</strong> <code>Gini = 1 - \u2211_k p_k^2</code> (lower = purer).</li>
          <li><strong>Entropy (ID3/C4.5):</strong> <code>H = -\u2211_k p_k \u22c5 log2 p_k</code> (higher = more uncertain).</li>
          <li><strong>Information Gain:</strong> impurity reduction after a split. For entropy,
            <code> IG = H(parent) - \u2211_i w_i H(child_i)</code>, with <code>w_i</code> = fraction to child <code>i</code>.
          </li>
        </ul>

        <h4 className="mt-4 font-semibold">Mini example (Entropy &amp; Gini)</h4>
        <div className="bg-neutral-50 rounded-lg p-3 text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`Parent: 10 samples → 6 positive, 4 negative
Entropy(parent) = -(0.6 log2 0.6 + 0.4 log2 0.4) ≈ 0.97095
Gini(parent)    = 1 - (0.6^2 + 0.4^2) = 0.48

Split X → Left (5): 4+,1-  | Right (5): 2+,3-
Entropy(left)=0.72193, Entropy(right)=0.97095
Weighted entropy = 0.5·0.72193 + 0.5·0.97095 = 0.84644
Information Gain = 0.97095 - 0.84644 = 0.12451 bits

Gini(left)=0.32, Gini(right)=0.48
Weighted Gini = 0.5·0.32 + 0.5·0.48 = 0.40
Gini decrease = 0.48 - 0.40 = 0.08`}
          </pre>
        </div>

        <h4 className="mt-4 font-semibold">Why there are (practically) infinite trees</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Continuous thresholds:</strong> myriad valid split points on real-valued features.</li>
          <li><strong>Hyperparameters:</strong> depth/leaf-size/criterion/pruning change structure.</li>
          <li><strong>Stochasticity:</strong> bootstrapping &amp; feature subsampling (RF) produce alternative trees.</li>
          <li><strong>Tie-breaks:</strong> near-equal impurity reductions lead to different choices across runs.</li>
        </ul>
        <p className="mt-2">
          Ensembles (Random Forests, Gradient Boosting) leverage this diversity by averaging many trees for stability and accuracy.
        </p>
      </SectionCard>

      {/* (b) Data Prep */}
      <SectionCard title="Data Prep">
        <p>
          We train on <strong>pairwise head-to-head</strong> rows from <code>newPastCBB.csv</code>. Each row joins a team to its opponent
          via <code>LostTo == Team</code>. For every numeric stat (excluding outcomes like <code>Result</code>), we compute
          <code> diff_stat = stat_team − stat_opp</code>. The loser-first direction is labeled <code>0</code>; a flipped copy (winner-first) is
          labeled <code>1</code>. We optionally drop leaky stats (e.g., <code>G</code>, <code>W</code>, <code>Win%</code>).
        </p>

        <SectionCard title="Data Previews" className="mt-3">
          <LightboxGallery items={GALLERY_ITEMS} />
        </SectionCard>
      </SectionCard>

      {/* (c) Code */}
      <SectionCard title="Code">
        <p>
          Implemented in <strong>Python</strong> with <em>NumPy</em>, <em>pandas</em>, and <em>scikit-learn</em>; plots via <em>matplotlib</em>.
          We impute missing values and fit a <code>DecisionTreeClassifier</code> inside a single <code>Pipeline</code>. Below also computes an
          out-of-fold confusion matrix.
        </p>
        
        <p className="mt-2">
          Notebook / Code:&nbsp;
          <a href={`${import.meta.env.BASE_URL}CBB_HeadToHead_SymmetricStable.ipynb`} className="underline text-blue-600">
            CBB_HeadToHead_SymmetricStable.ipynb
          </a>{" "}
          |{" "}
          <a href="https://github.com/ayushkhadka514/MarchMadness/tree/main/Project" className="underline text-blue-600">
            GitHub Repository
          </a>
        </p>
      </SectionCard>

      {/* (d) Results */}
      <SectionCard title="Results">
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <Image
            src={`${import.meta.env.BASE_URL}confusion.png`}
            alt="Confusion Matrix"
            caption="Confusion Matrix (rows: actual, columns: predicted)"
          />
          <Image
            src={`${import.meta.env.BASE_URL}tree_score.png`}
            alt="Accuracy Summary"
            caption="Cross-validated accuracy summary (5-fold)"
          />
        </div>

        <SectionCard title="More Visuals (click to expand)">
          <LightboxGallery items={RESULTS_ITEMS} />
        </SectionCard>

        <p className="mt-3">
          <strong>Interpretation:</strong> The tree yields transparent rules; Gini importances highlight which <code>diff_*</code>
          features drive splits. If overfitting appears (high train, lower CV), reduce <code>max_depth</code>, increase
          <code> min_samples_leaf</code>, or consider ensembles for stability.
        </p>
      </SectionCard>

      {/* (e) Conclusions */}
      <SectionCard title="Conclusions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Decision Trees provide an interpretable baseline on pairwise features with quick training and inference.</li>
          <li>Feature engineering (differences, leakage control) strongly affects split quality and generalization.</li>
          <li>CV diagnostics and importances guide targeted improvements to features and regularization.</li>
          <li>Next: tune depth/leaf size, calibrate probabilities, and compare with calibrated logistic regression and ensembles.</li>
        </ul>
        <p className="mt-2">
          Overall, DTs can predict <em>head-to-head winners</em> with transparent decision paths; careful regularization and richer features
          further improve robustness and calibration.
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
        return <NaiveBayesTab/>;
      case "dectrees":
        return <DecisionTreesTab/>;
      case "xgboost":
        return <XGBoostTab/>;
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
