export type AccentColor = 'blue' | 'pink' | 'amber' | 'cyan';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface DeepArchitecture {
  summary: string;
  executionFlow: string[];
  privacyGuarantees: string[];
  benchmarkOrSpec?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  headline: string;
  category: string;
  statusBadge: string;
  description: string;
  architecture: string[];
  techStack: string[];
  accentColor: AccentColor;
  metrics: ProjectMetric[];
  deepArchitecture: DeepArchitecture;
  iconName: string;
}
