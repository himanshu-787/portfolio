export type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { category: "Programming Languages", items: ["Python", "C", "C++", "SQL", "JavaScript"] },
  { category: "AI and Machine Learning", items: ["Scikit-Learn", "XGBoost", "LightGBM", "Feature Engineering", "PCA", "Cross-Validation"] },
  { category: "Deep Learning", items: ["PyTorch", "TensorFlow", "Keras", "CNN", "RNN", "LSTM", "Transfer Learning", "Physics-Informed Neural Networks"] },
  { category: "Privacy and Distributed ML", items: ["Federated Learning", "TensorFlow Federated", "Differential Privacy"] },
  { category: "Generative AI and LLMs", items: ["LLM APIs", "Retrieval-Augmented Generation", "Embeddings", "Semantic Search", "Prompt Engineering"] },
  { category: "Computer Vision and NLP", items: ["OpenCV", "scikit-image", "YOLOv5", "Segmentation", "Super-Resolution", "TF-IDF"] },
  { category: "Edge AI", items: ["INT8 Quantization", "Pruning", "Knowledge Distillation", "TensorFlow Lite", "ONNX"] },
  { category: "Scientific Computing", items: ["pandapower", "CVXPY", "AC/DC Optimal Power Flow", "Pandas", "NumPy", "SciPy"] },
  { category: "Backend and Tools", items: ["FastAPI", "Docker", "Git", "Linux", "Jupyter", "TensorBoard"] },
];