export const getProjectTldr = (projectId: string): string => {
  const tldrs: Record<string, string> = {
    'pricepal': "Built an AR shopping assistant for the Mentra Hackathon that prevents overpaying. Uses computer vision and AI to instantly recognize products and compare prices across retailers through voice commands on smart glasses. Gained major social media traction and recognition from Mentra's leadership.",
    'wattsonai': "Built an AI assistant for Bitcoin mining optimization at the MARA hackathon. Uses real-time data to recommend resource allocation between mining, inference, and battery storage. Features voice commands and natural language processing.",
    'ricedatathon2024': "Developed a neural network to predict peak oil production rates for Chevron. Used TensorFlow/Keras with hyperparameter tuning and achieved high accuracy through feature engineering and regularization techniques.",
    'greenwings': "Created a flight route optimizer for HackRice 13 that finds carbon-efficient paths using a modified Dijkstra's algorithm. Integrates real-time flight data for environmentally conscious travel planning.",
    'chevron-renewable': "Built a predictive model for Chevron's 2023 Rice Datathon to forecast renewable energy investments by state. Used Linear, Lasso, and Ridge regression to optimize accuracy and identify collaboration opportunities.",
    'flowbreak': "A productivity web app inspired by the Pomodoro Technique with customizable timers, automatic distraction blocking, and a gamified reward system. Built to address digital distraction challenges during remote learning."
  };

  return tldrs[projectId] || "A comprehensive project showcasing technical skills and innovative problem-solving approaches.";
};