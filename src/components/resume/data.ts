export const PERSON = {
  name: "Purvai Mamoriya",
  email: "mamoriya30@gmail.com",
  linkedin: "https://www.linkedin.com/search/results/all/?keywords=Purvai%20Mamoriya",
};

export const OBJECTIVE = [
  "Objective: To pursue a rigorous management education... Aspiring to develop strong leadership, strategic thinking, and decision-making capabilities while contributing meaningfully to a diverse learning environment.",
  "My long-term goal is to become an ethical and impactful business leader who creates sustainable value for organizations and society.",
];

export type RootNode = { id: string; tag: string; title: string; lines: string[] };

export const ROOT_NODES: RootNode[] = [
  {
    id: "venus",
    tag: "Academics",
    title: "Class XII · 2025",
    lines: [
      "Venus Public School, Gwalior (12th, CBSE, 2025) – 74.80%",
      "Major Subjects: Biology, Physics, Chemistry, English & Physical Education.",
    ],
  },
  {
    id: "dps",
    tag: "Academics",
    title: "Class X · 2023",
    lines: [
      "Delhi Public School, Gwalior (10th, CBSE, 2023) – 80.33%",
      "Major Subjects: Mathematics, Physics, Chemistry, Biology, English & Physical Education.",
    ],
  },
  {
    id: "global",
    tag: "Global Awareness",
    title: "100% · Paryavaran",
    lines: [
      "Achieved 100% score in the All India School Paryavaran Competition (2021).",
      "Participated in the 6th Korean-India Friendship Online Quiz Competition (2021).",
    ],
  },
  {
    id: "aptitude",
    tag: "Aptitude",
    title: "TOEFL iBT 92/120",
    lines: [
      "Secured 3rd position in Mental Reasoning (2021-22).",
      "Scored 92/120 in TOEFL iBT (2023), demonstrating strong proficiency in English communication.",
    ],
  },
];

export const OFFERS = [
  { name: "IIM Sambalpur" },
  { name: "IIM Bangalore", note: "BBA DBE" },
  { name: "IIM Sirmaur" },
  { name: "IIM Rohtak", note: "IPL" },
  { name: "NFSU" },
  { name: "NIFT Jodhpur" },
  { name: "Delhi University", note: "English Hons." },
];

export const INTERVIEWS = [
  { name: "IIM Indore" },
  { name: "IIM Kozhikode", note: "BMS" },
  { name: "IIM Ranchi" },
  { name: "IIM Kochi" },
  { name: "Manipal" },
];

export type LeafItem = { id: string; tag: string; title: string; body: string };

export const LEAVES: LeafItem[] = [
  {
    id: "goonj",
    tag: "NGO Work",
    title: "Green by Goonj",
    body: "Volunteering with NGO Goonj: Crafting B2B marketing strategies for the 'Green by Goonj' upcycled product line and studying circular economy models.",
  },
  {
    id: "ssg",
    tag: "Social Service",
    title: "Social Service Group",
    body: "Active participation in the Social Service Group (SSG), integrating Triple Bottom Line principles into business practice.",
  },
  {
    id: "handloom",
    tag: "Cultural Advocacy",
    title: "Sambalpuri Handloom",
    body: "Advocating for the preservation, global representation, and artisan support of traditional Sambalpuri handloom weaving.",
  },
];

export type FruitKind = "project" | "athletic" | "skill" | "hobby";

export type FruitItem = { label: string; detail?: string; kind: FruitKind };

export const FRUIT_KINDS: Record<FruitKind, { label: string; radius: number; colorVar: string }> = {
  project: { label: "Project", radius: 66, colorVar: "var(--fruit-project)" },
  athletic: { label: "Athletics", radius: 60, colorVar: "var(--fruit-athletic)" },
  skill: { label: "Skill", radius: 46, colorVar: "var(--fruit-skill)" },
  hobby: { label: "Hobby", radius: 42, colorVar: "var(--fruit-hobby)" },
};

export const FRUITS: FruitItem[] = [
  { kind: "project", label: "Zero-Waste Smart Mess Campus Prototype" },
  {
    kind: "project",
    label: "Decentralized On-Device Verification for Hospitality",
    detail: "Track #2 Policy & Regulation",
  },
  {
    kind: "athletic",
    label: "Varsity Basketball Captain",
    detail: "Leading inter-house and inter-school girls' teams.",
  },
  { kind: "skill", label: "Strong Communication" },
  { kind: "skill", label: "Cross-functional Leadership" },
  { kind: "skill", label: "Adaptability" },
  { kind: "skill", label: "Rapid Learning" },
  { kind: "skill", label: "Time Management" },
  { kind: "skill", label: "Systems Thinking" },
  { kind: "skill", label: "Empathy Mapping" },
  { kind: "hobby", label: "Reading Books" },
  { kind: "hobby", label: "Watching Movies" },
  { kind: "hobby", label: "Exploring food experiences" },
  { kind: "hobby", label: "Discovering new destinations" },
  { kind: "hobby", label: "Racquet sports (Tennis)" },
];
