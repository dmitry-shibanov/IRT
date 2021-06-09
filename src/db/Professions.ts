import { Schema, model, Types, Model } from "mongoose";
import { ProfessionsDocument } from "../models/Professions";

export interface IProfession extends ProfessionsDocument {
  _doc?: any;
  subjects: Types.Array<Schema.Types.ObjectId>;
}

export interface IProfessionModel extends Model<IProfession> {}

const Profession = new Schema<IProfession, IProfessionModel>({
  name: {
    type: String,
    requireed: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subjects",
      required: true,
    },
  ],
});

export default model<IProfession, IProfessionModel>(
  "Professions",
  Profession,
  "professions"
);
