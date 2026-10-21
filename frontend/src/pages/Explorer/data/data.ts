export type JobListing = {
  id: string
  title: string
  standardTitle: string
  level: string
  company: string
  companyInitials: string
  companyMeta: string
  type: string
  seen: string
  featured?: boolean
  tags: string[]
  compensation: string
  description: string
  descriptionChars: number
  linkedinUrl: string
  jobKey: string
  srcId: string
  dateKey: string
  searchTerm: string
}

export const listings: JobListing[] = [
  {
    id: "senior-data-engineer-approvalmax",
    title: "Senior Data Engineer",
    standardTitle: "Data Engineer",
    level: "Mid-Senior level",
    company: "ApprovalMax",
    companyInitials: "AM",
    companyMeta: "Software Development · 132 staff · 40,544 followers",
    type: "Full-time",
    seen: "07 Jun",
    featured: true,
    tags: ["Zürich", "Full-time", "Mid-Senior", "Information Technology"],
    compensation: "not published",
    description:
      "About ApprovalMax — a fast-growing B2B SaaS company that helps businesses automate their approval workflows and financial controls. With a global team of over 100 people spanning the UK, Europe, North America, Australia and South Africa, we build software that matters and we are scaling quickly…",
    descriptionChars: 7135,
    linkedinUrl: "#",
    jobKey: "9f2c…a41d",
    srcId: "4420956438",
    dateKey: "20260607",
    searchTerm: "data_engineer",
  },
  {
    id: "principal-software-engineer-search-scaling-canonical",
    title: "Principal Software Engineer — Search Scaling",
    standardTitle: "Search Engineer",
    level: "level not stated",
    company: "Canonical",
    companyInitials: "CN",
    companyMeta: "Computer Software · 1,900 staff · 612,000 followers",
    type: "Full-time",
    seen: "07 Jun",
    tags: ["Remote", "Full-time", "Information Technology"],
    compensation: "not published",
    description:
      "Canonical is a growing, international software company that publishes Ubuntu, one of the most important open-source projects in the world. We are hiring a Principal Software Engineer to lead search infrastructure scaling efforts across our platform…",
    descriptionChars: 5820,
    linkedinUrl: "#",
    jobKey: "7a11…c930",
    srcId: "4420911022",
    dateKey: "20260607",
    searchTerm: "software_engineer",
  },
  {
    id: "software-engineer-machine-learning-google",
    title: "Software Engineer, Machine Learning",
    standardTitle: "Software Engineer",
    level: "level not stated",
    company: "Google",
    companyInitials: "GO",
    companyMeta: "Internet · 190,000 staff · 29,000,000 followers",
    type: "Full-time",
    seen: "30 May",
    tags: ["Zürich", "Full-time", "Information Technology"],
    compensation: "not published",
    description:
      "As a software engineer, you will work on specific projects critical to Google's needs with opportunities to switch teams as you and our fast-paced business grow and evolve…",
    descriptionChars: 4310,
    linkedinUrl: "#",
    jobKey: "1cd4…77be",
    srcId: "4420899871",
    dateKey: "20260530",
    searchTerm: "machine_learning_engineer",
  },
  {
    id: "devops-engineer-micro1",
    title: "DevOps Engineer",
    standardTitle: "DevOps Engineer",
    level: "Mid-Senior level",
    company: "micro1",
    companyInitials: "M1",
    companyMeta: "Staffing & Recruiting · 410 staff · 22,000 followers",
    type: "Contract",
    seen: "30 May",
    tags: ["Remote", "Contract", "Mid-Senior", "Information Technology"],
    compensation: "not published",
    description:
      "We're looking for a DevOps Engineer to join a fast-moving client team, owning CI/CD pipelines, infrastructure-as-code, and production reliability across a growing set of services…",
    descriptionChars: 3490,
    linkedinUrl: "#",
    jobKey: "e60a…1f3d",
    srcId: "4420877644",
    dateKey: "20260530",
    searchTerm: "devops_engineer",
  },
  {
    id: "backend-engineer-ranking-constructor",
    title: "Backend Engineer: Ranking",
    standardTitle: "Back End Developer",
    level: "level not stated",
    company: "Constructor",
    companyInitials: "CO",
    companyMeta: "Software Development · 260 staff · 18,500 followers",
    type: "Full-time",
    seen: "30 May",
    tags: ["Zürich", "Full-time", "Information Technology"],
    compensation: "not published",
    description:
      "Constructor builds search and recommendations infrastructure for the world's largest retailers. We're hiring a backend engineer to work on ranking systems that serve billions of requests…",
    descriptionChars: 4985,
    linkedinUrl: "#",
    jobKey: "b382…90ac",
    srcId: "4420860215",
    dateKey: "20260530",
    searchTerm: "backend_engineer",
  },
  {
    id: "data-scientist-crossing-hurdles",
    title: "Data Scientist",
    standardTitle: "Data Scientist",
    level: "Mid-Senior level",
    company: "Crossing Hurdles",
    companyInitials: "CH",
    companyMeta: "Human Resources Services · 45 staff · 3,200 followers",
    type: "Contract",
    seen: "30 May",
    tags: ["Zürich", "Contract", "Mid-Senior", "Information Technology"],
    compensation: "not published",
    description:
      "Our client, a global financial services firm, is looking for a Data Scientist to join a contract engagement focused on risk modeling and portfolio analytics…",
    descriptionChars: 2860,
    linkedinUrl: "#",
    jobKey: "44fe…2c18",
    srcId: "4420842390",
    dateKey: "20260530",
    searchTerm: "data_scientist",
  },
  {
    id: "java-developer-financial-platforms-experis",
    title: "Java Developer — Financial Platforms",
    standardTitle: "Java Software Engineer",
    level: "Director",
    company: "Experis",
    companyInitials: "EX",
    companyMeta: "Staffing & Recruiting · 3,100 staff · 410,000 followers",
    type: "Full-time",
    seen: "24 May",
    tags: ["Zürich", "Full-time", "Director", "Information Technology"],
    compensation: "not published",
    description:
      "On behalf of our client, a leading financial platform provider, Experis is hiring a senior Java Developer to lead a team delivering trading infrastructure…",
    descriptionChars: 3675,
    linkedinUrl: "#",
    jobKey: "09d7…b644",
    srcId: "4420803357",
    dateKey: "20260524",
    searchTerm: "java_developer",
  },
  {
    id: "telco-cloud-field-engineer-canonical",
    title: "Telco Cloud Field Engineer",
    standardTitle: "Field Engineer",
    level: "Mid-Senior level",
    company: "Canonical",
    companyInitials: "CN",
    companyMeta: "Computer Software · 1,900 staff · 612,000 followers",
    type: "Full-time",
    seen: "24 May",
    tags: ["Remote", "Full-time", "Mid-Senior", "Information Technology"],
    compensation: "not published",
    description:
      "Canonical is looking for a Telco Cloud Field Engineer to work directly with telecom customers deploying Ubuntu-based cloud infrastructure for 5G and edge workloads…",
    descriptionChars: 4120,
    linkedinUrl: "#",
    jobKey: "6b1a…fd02",
    srcId: "4420788129",
    dateKey: "20260524",
    searchTerm: "field_engineer",
  },
  {
    id: "ai-engineer-applied-research-proxify",
    title: "AI Engineer, Applied Research",
    standardTitle: "Artificial Intelligence Engineer",
    level: "Associate",
    company: "Proxify",
    companyInitials: "PX",
    companyMeta: "IT Services and IT Consulting · 220 staff · 41,000 followers",
    type: "Contract",
    seen: "24 May",
    tags: ["Remote", "Contract", "Associate", "Information Technology"],
    compensation: "not published",
    description:
      "Proxify connects vetted engineers with companies building ambitious products. We're sourcing an AI Engineer for an applied research contract focused on LLM evaluation pipelines…",
    descriptionChars: 3012,
    linkedinUrl: "#",
    jobKey: "f725…8e91",
    srcId: "4420771903",
    dateKey: "20260524",
    searchTerm: "ai_engineer",
  },
]

export function getJobById(id: string): JobListing | undefined {
  return listings.find((job) => job.id === id)
}
