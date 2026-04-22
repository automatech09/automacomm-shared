import type { Team } from "./team";

export type VisualType = "Résultat" | "Classement" | "Affiche" | "Score en direct";

export type TemplateFormat = "Post" | "Story";

export type TemplateCreationStep = 1 | 2 | 3;

export interface Template {
  id: number;
  name: string;
  visualType: VisualType;
  format: TemplateFormat;
  team: Team | null;
  urlArrierePlan: string | null;
  thumbnail: string;
  lastUsed?: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateModele{
  id: number;
  visualType: VisualType;
  format: TemplateFormat;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTemplatePayload {
  visualType: VisualType;
  team: Team;
  startFromScratch: boolean;
}
