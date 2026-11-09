export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "In progress" | "Completed";
  year: string;
  tags: string[];
  featured: boolean;
  highlight?: string; // only claims from your documents; verify against repo before publishing
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "gridpinn",
    title: "GridPINN",
    summary:
      "Physics-informed neural network that predicts generator dispatch and bus voltages for AC optimal power flow, with power-balance and constraint terms in the loss.",
    status: "In progress",
    year: "2025-2026",
    tags: ["PyTorch", "pandapower", "CVXPY", "PINN"],
    featured: true,
    // No metrics yet: add real results when you have them.
  },
  {
    slug: "aura",
    title: "AURA",
    summary:
      "LLM-powered research agent with planner, researcher and critic roles that retrieves evidence from documents and writes citation-backed reports.",
    status: "In progress", // [CONFIRM] what actually runs today
    year: "2026",
    tags: ["Python", "LLM APIs", "FastAPI", "Docker"],
    featured: true,
  },
  {
    slug: "federated-healthcare",
    title: "Privacy-Preserving Federated Learning for Healthcare",
    summary:
      "Federated averaging framework with epsilon-delta differential privacy guarantees for healthcare prediction.",
    status: "Completed",
    year: "2025",
    tags: ["TensorFlow Federated", "Differential Privacy", "Python"],
    featured: true,
    highlight: "Accuracy within 2% of the centralized baseline", // [CONFIRM] evidence
  },
  {
    slug: "federated-video-analytics",
    title: "Privacy-Preserving Video Analytics",
    summary:
      "Distributed CNN + LSTM anomaly detection under federated learning and Gaussian-noise differential privacy.",
    status: "Completed",
    year: "2025",
    tags: ["TensorFlow Federated", "CNN", "LSTM"],
    featured: false,
    highlight: "Accuracy within 3% of the centralized baseline", // [CONFIRM]
  },
  {
    slug: "tinyml-lstm",
    title: "TinyML LSTM Compression",
    summary:
      "INT8 quantization, structured pruning and knowledge distillation applied to an LSTM time-series model for edge deployment.",
    status: "Completed",
    year: "2025",
    tags: ["TensorFlow Lite", "PyTorch", "ONNX"],
    featured: false,
    highlight: "4x compression with under 2% accuracy loss", // [CONFIRM]
  },
  {
    slug: "drug-side-effects",
    title: "Drug Side-Effect Prediction",
    summary:
      "Predicts drug side effects on the SIDER dataset from molecular fingerprint features using XGBoost and neural networks.",
    status: "Completed",
    year: "2024-2025",
    tags: ["XGBoost", "Scikit-Learn", "RDKit"],
    featured: false,
    highlight: "87% accuracy, 0.89 AUC-ROC on SIDER", // [CONFIRM] split method
  },
];