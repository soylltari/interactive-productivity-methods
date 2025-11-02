export interface ProductivityMethod {
  id: string;
  icon: string;
  name: string;
  description: string;
  howToUse: string;
  tags: string[];
}

export interface QuizAnswer {
  text: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
}
