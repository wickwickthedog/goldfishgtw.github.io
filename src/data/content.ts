// ============================================================
// 👋 EDIT THIS FILE to update all your portfolio content!
// ============================================================

export const personal = {
  name: "Harvey Tan",
  title: "Software Engineer",
  tagline: "Low effort, high impact… shhh—quietly plotting my exit when the stocks hit right 📈",
  location: "Selangor, Malaysia",
  email: "tan.harveyshyanyih@gmail.com",
  github: "https://github.com/wickwickthedog",
  linkedin: "https://www.linkedin.com/in/harvey-tan",
  blog: "https://wickwickthedog.github.io",
  resumeUrl: "/harvey-tan-resume.pdf", // drop your PDF into the /public folder
  available: true, // set to false to hide the "open to work" badge
};

export const about = {
  bio: [
    "I'm a software engineer who enjoys digging into messy, complex problems and finding ways to improve efficiency—sometimes for work, sometimes just for fun. I especially love crafting frontend experiences that feel so smooth and effortless you almost forget there's serious engineering behind them, often powered by tools like ChatGPT and Claude.",
    "When I'm not writing code, I'm usually keeping an eye on the stock market, trying to figure out smarter ways to grow wealth and eventually work toward full-time freedom. I used to write a blog during my uni years where I shared what I was learning along the way—maybe I'll get back into it again… who knows?",
    "Right now, I'm leveling up on React, TypeScript, and a mix of interesting, possibly work-relevant or random tech topics, along with working on a few certifications. I'm looking for exciting roles where I can grow quickly, ship meaningful work, and build products that genuinely improve people's efficiency and day-to-day experience.",
  ],
  funFacts: ["☕ Fuelled by $$$", "🐕 Dog person", "📈 Long term investor"],
};

export type Skill = {
  category: string;
  items: string[];
};

export const skills: Skill[] = [
  { category: "Languages",   items: ["JavaScript", "GatewayScript", "Python"] },
  { category: "Frontend",    items: ["React", "Vite", "Tailwind CSS"] },
  { category: "Backend",     items: ["Node.js", "Express", "REST APIs"] },
  { category: "Database",    items: ["PostgreSQL", "MongoDB", "MySQL"] },
  { category: "DevOps",      items: ["Git", "GitHub Actions", "Netlify"] },
  { category: "Integration & Middleware",      items: ["IBM Datapower", "API Gateway"] },
  { category: "Monitoring & Observability",      items: ["ELK", "Kibana"] },
  { category: "Others",     items: ["Odoo ERP", "Odoo Framework"] },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    name: "WickWick Blog",
    description: "Personal blog built with Jekyll, migrating to React + TypeScript. Writing about software engineering, learnings, and tech opinions.",
    tags: ["React", "TypeScript", "GitHub Pages"],
    github: "https://github.com/wickwickthedog/wickwickthedog.github.io",
    live: "https://wickwickthedog.github.io",
    featured: true,
  },
  {
    name: "Portfolio v2",
    description: "This site! Built from scratch with React, TypeScript, Tailwind CSS, and deployed on Netlify. Fully open source.",
    tags: ["React", "TypeScript", "Tailwind", "Netlify"],
    github: "https://github.com/wickwickthedog",
    featured: true,
  },
  {
    name: "Project Three",
    description: "Add your next project here. Edit src/data/content.ts to update everything!",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    featured: true,
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Developer",
    company: "Maybank",
    period: "2023 — Present",
    description: "Built and maintained API integrations with IBM DataPower, connecting internal and external services seamlessly. Streamlined deployments with GitHub Actions, cutting release time from hours to minutes. Developed an internal Swagger/OpenAPI tool to standardise API documentation, and set up ELK dashboards to keep a close eye on performance, errors, and system health. Handled production support end-to-end—investigating incidents, troubleshooting issues, and being part of on-call rotations—while working closely with cross-functional teams to improve reliability. Recognised with a “Pin of Excellence” for strong performance and impact.",
    tags: ["JavaScript", "GatewayScript", "IBM Datapower", "API Gateway", "Node.js", "GitHub Actions", "ELK", "Kibana", "Swagger/OpenAPI", "Production Support"],
  },
  {
    role: "L3 Support Software Engineer",
    company: "OZB Group",
    period: "2021 — 2023",
    description: "Supported a production Odoo-based ERP system for an eCommerce environment, resolving issues quickly to minimize downtime. Collaborated with frontend and backend teams to fix bugs, contributed to feature improvements, and worked with L2 support to handle escalations and reduce recurring incidents—helping keep client systems stable and reliable.",
    tags: ["Python", "JavaScript", "PostgreSQL", "Odoo ERP", "Odoo Framework"],
  },
  {
    role: "Bachelor of Computer Science",
    company: "University of New South Wales (UNSW), Sydney, Australia",
    period: "2017 — 2020",
    description: "Graduated with a Bachelor of Computer Science, gaining a decent foundation in algorithms, data structures, and cybersecurity. Completed coursework in Java programming, web development, and database systems, while also engaging in projects that honed problem-solving skills and practical coding experience.",
    tags: ["Algorithms", "Data Structures", "Java", "Cybersecurity"],
  },
];

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  tag: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Why I'm learning TypeScript in 2025",
    excerpt: "Static types aren't just for Java devs. Here's why TypeScript changed how I think about code quality.",
    date: "Apr 2025",
    url: "https://wickwickthedog.github.io",
    tag: "TypeScript",
  },
  {
    title: "Building my portfolio from scratch",
    excerpt: "Ditching Jekyll for React + Vite + Tailwind. What I learnt setting up a modern dev workflow.",
    date: "Mar 2025",
    url: "https://wickwickthedog.github.io",
    tag: "React",
  },
  {
    title: "A dog-dad's guide to deep work",
    excerpt: "How I learned to code productively with a very energetic shiba constantly demanding attention.",
    date: "Feb 2025",
    url: "https://wickwickthedog.github.io",
    tag: "Life",
  },
];

export const nowPage = {
  updated: "April 2025",
  items: [
    "🔨 Building this portfolio — learning React + TypeScript in public",
    "📖 Reading: Designing Data-Intensive Applications",
    "🌱 Exploring: Netlify edge functions and Supabase",
    "🎯 Goal: Land a senior frontend or fullstack role by end of 2025",
    "🐕 Fostering a rescue dog named Wickwick (yes, really)",
  ],
};
