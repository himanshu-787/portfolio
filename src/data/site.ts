const url =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  url,
  name: "Himanshu Yadav",
  headline: "AI/ML Engineer | Applied AI Researcher | Software Developer",
  tagline:
    "B.Tech CSE student at IIIT Raichur building ML systems in deep learning, federated learning and LLM agents.",
  email: "himanshudvp6s@gmail.com", // [CONFIRM] public email
  github: "https://github.com/himanshu-787", // [CONFIRM] which GitHub account
  linkedin: "https://linkedin.com/in/himanshu-yadav-442a51359", // [CONFIRM] which LinkedIn
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Research", href: "/research" },
    { label: "Experience", href: "/experience" },
    { label: "Blog", href: "/blog" },
    { label: "Assistant", href: "/assistant" },
    { label: "Contact", href: "/contact" },
  ],
};