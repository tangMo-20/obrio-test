import { THEME } from '@/constants';

export type Theme = keyof typeof THEME;

export interface Question {
  id: string;
  type: string;
  prev: string | null;
  next: string | Record<string, string> | null;
  title: string;
  answers: string[];
  subtitle?: string;
}

export interface Questionnaire {
  id: string;
  questions: Record<string, Question>;
}

export type Answers = Record<string, string | number>;

export interface UserAnswers {
  userId: string;
  questionnaireId: string;
  answers: Answers;
}
