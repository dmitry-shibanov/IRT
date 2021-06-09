import { Document, Model } from "mongoose";

export interface Professions {
  name: string;
}

export interface ProfessionsDocument extends Professions, Document {}