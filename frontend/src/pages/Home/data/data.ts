const headline: { value: string; suffix?: string; label: string; accent?: boolean }[] = [
  { value: "176", label: "Unique postings" },
  { value: "107", label: "Companies tracked" },
  { value: "4", label: "Cities surveyed" },
  { value: "10.8", suffix: "%", label: "Disclose salary", accent: true },
]

const titleCounts: { rank: string; title: string; count: number; active?: boolean }[] = [
  { rank: "01", title: "Software Engineer", count: 35 },
  { rank: "02", title: "DevOps Engineer", count: 13 },
  { rank: "03", title: "Back End Developer", count: 13 },
  { rank: "04", title: "Artificial Intelligence Engineer", count: 11 },
  { rank: "05", title: "Data Engineer", count: 10, active: true },
  { rank: "06", title: "Machine Learning Engineer", count: 6 },
  { rank: "07", title: "Full Stack Engineer", count: 6 },
  { rank: "08", title: "Senior Software Engineer", count: 5 },
]

const cities: { name: string; count: number; pct: number; accent?: boolean }[] = [
  { name: "Zürich", count: 88, pct: 100, accent: true },
  { name: "Geneva", count: 37, pct: 42 },
  { name: "Basel", count: 31, pct: 35 },
  { name: "Bern", count: 20, pct: 23 },
]

const movers: { name: string; industry: string; headcount: string; followers: string; delta: string }[] = [
  { name: "Crossing Hurdles", industry: "Staffing & Recruiting", headcount: "172", followers: "4,095,658", delta: "+303,491" },
  { name: "Jobgether", industry: "Technology & Internet", headcount: "451", followers: "3,046,156", delta: "+80,084" },
  { name: "Google", industry: "Software Development", headcount: "342,347", followers: "41,731,879", delta: "+39,622" },
  { name: "micro1", industry: "Software Development", headcount: "6,806", followers: "578,512", delta: "+9,927" },
  { name: "Deel", industry: "Human Resources", headcount: "9,627", followers: "777,789", delta: "+8,824" },
  { name: "CERN", industry: "Research Services", headcount: "7,882", followers: "584,758", delta: "+1,540" },
  { name: "Canonical", industry: "Software Development", headcount: "1,994", followers: "758,465", delta: "+4,186" },
]

const pipelineStages = [
  {
    step: "01 · Source",
    accent: false,
    models: ["linkedin_raw.job_postings"],
    note: "JSONL in S3, Hive-partitioned by city / search / date_hour.",
  },
  {
    step: "02 · Staging",
    accent: false,
    models: ["stg_job_postings"],
    note: "Casts types, splits pipe-delimited fields into arrays, lifts partition keys out of the path.",
  },
  {
    step: "03 · Intermediate",
    accent: false,
    models: ["int_job_postings_deduped", "int_companies"],
    note: "One row per job; one row per company per day. Latest run wins.",
  },
  {
    step: "04 · Marts",
    accent: true,
    models: ["fct_job_postings", "fct_company_snapshots", "dim_job · dim_company", "dim_date · dim_job_type"],
    note: "Kimball star. Facts are incremental; dimensions rebuild.",
  },
]

export { headline, titleCounts, cities, movers, pipelineStages }