export type Role = { role: string; org: string; period: string; points: string[] };

// Full Stack and Cybersecurity roles appear only in your CV. Add them here after you [CONFIRM].
export const roles: Role[] = [
  {
    role: "Machine Learning Researcher",
    org: "IIIT Raichur",
    period: "2023 - Present",
    points: [
      "Built ML projects covering data preparation, feature engineering, model training and metric-based evaluation.",
      "Applied INT8 quantization, structured pruning and distillation to deploy models on NVIDIA Jetson Nano and MCU targets.",
    ],
  },
  {
    role: "Teaching Assistant",
    org: "IIIT Raichur",
    period: "2024 - Present",
    points: [
      "Designed and evaluated lab assignments for 60+ students in Engineering Mathematics, DBMS, OS and Java OOP.",
    ],
  },
];

export const education = {
  school: "IIIT Raichur",
  degree: "B.Tech Computer Science and Engineering",
  period: "Aug 2023 - May 2027",
  // cgpa: "[CONFIRM]" 7.0 / 7.1 / 7.5 appear in your documents; add the real one
  coursework: ["Data Structures and Algorithms", "Machine Learning", "Deep Learning", "Computer Vision", "DBMS", "Operating Systems", "OOP", "Computer Networks"],
};