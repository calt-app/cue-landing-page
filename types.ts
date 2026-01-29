export interface FeatureProps {
  title: string;
  description: string;
  visual: React.ReactNode;
  reversed?: boolean;
}

export interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  buttonText?: string;
}

export interface FaqItemProps {
  question: string;
  answer: string;
}
