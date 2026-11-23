export type RouteName =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'webinar'
  | 'webinarDetail'
  | 'webinarSession'
  | 'course'
  | 'courseDetail'
  | 'courseLearn'
  | 'courseEvaluation'
  | 'history'
  | 'certificates'
  | 'certificateDetail'
  | 'profile';

export interface RouteParams {
  webinarId?: number;
  courseId?: number;
  certificateId?: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  roleLabel: string;
  institution?: string;
}

export interface Webinar {
  id: number;
  title: string;
  category: string;
  instructor: string;
  instructorRole: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  priceLabel: string;
  isFree: boolean;
  points: number;
  participants: number;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  accent: 'powder' | 'coral' | 'truffle';
  agenda: string[];
  outcomes: string[];
}

export interface CourseLesson {
  id: string;
  title: string;
  type: 'VIDEO' | 'MATERI';
  duration: string;
  summary: string;
  keyPoints: string[];
}

export interface EvaluationQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  instructorRole: string;
  level: string;
  scheduleLabel: string;
  duration: string;
  priceLabel: string;
  isFree: boolean;
  points: number;
  description: string;
  lessons: CourseLesson[];
  questions: EvaluationQuestion[];
}

export interface CourseEvaluationRecord {
  courseId: number;
  score: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
}

export interface ActivityHistoryItem {
  id: string;
  activityType: 'Webinar' | 'Course';
  activityId: number;
  title: string;
  category: string;
  instructor: string;
  completedAt: string;
  dateDisplay: string;
  pointsEarned: number;
  statusLabel: string;
  score?: number;
  certificateId: string;
}

export interface CertificateRecord {
  id: string;
  certificateCode: string;
  activityType: 'Webinar' | 'Course';
  activityId: number;
  title: string;
  category: string;
  instructor: string;
  recipientName: string;
  issuedAt: string;
  dateDisplay: string;
  pointsEarned: number;
  score?: number;
}
