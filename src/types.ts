export type ScreenId = 'home' | 'consultation' | 'forum' | 'sleep' | 'emergency';

export type FidelityMode = 'low-fi' | 'high-fi' | 'annotated';

export interface DvcPrincipleNote {
  principle: 'Contrast' | 'Repetition' | 'Alignment' | 'Proximity' | 'Hierarki' | 'Ruang Kosong' | 'Aksesibilitas' | 'Etika & HCD' | 'Copywriting Visual';
  target: string;
  rationale: string;
  researchLink: string;
  lessonRef: string;
}

export interface ScreenData {
  id: ScreenId;
  number: number;
  title: string;
  purpose: string;
  userGoal: string;
  keyComponents: string[];
  dvcNotes: DvcPrincipleNote[];
  testingChecklist: {
    question: string;
    passed: boolean;
    explanation: string;
  }[];
}

export interface UserFlowStep {
  stepNumber: number;
  screenTitle: string;
  userAction: string;
  systemResponse: string;
  decisionPoint?: string;
  researchEvidence: string;
}
