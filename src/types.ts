export type InspectionStatus = 'ok' | 'normal' | 'attention' | 'immediate' | 'na';

export interface VehicleInfo {
  vin: string;
  year: string;
  make: string;
  model: string;
  mileage: string;
}

export interface ChecklistItemAssessment {
  status: InspectionStatus | string;
  comment: string;
}

export interface MockInspection {
  vehicleInfo: VehicleInfo;
  results: Record<string, ChecklistItemAssessment>;
  notes: string;
  photosCount: number;
}

export interface ChecklistSection {
  name: string;
  items: string[];
}

export interface Benefit {
  title: string;
  description: string;
  badge: string;
  points: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}
