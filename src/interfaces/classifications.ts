import { ModelInterface } from "./model-comments";

export interface Classification {
  id: string;
  input: string;
  prediction: "positive review" | "neutral review" | "negative review";
  confidence: number;
  confidences: Confidence[];
  labels: Record<string, Confidence>;
}

export interface Confidence {
  option: string;
  confidence: number;
}

export interface ReqClassifyProps {
  truncate: "START" | "END";
  model: "small" | "large";
  inputs: string[];
  examples: ModelInterface[];
}

export interface ResClassifyPros {
  classifications: Classification[];
}
