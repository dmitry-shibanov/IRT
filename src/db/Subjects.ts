import { Schema, model, Document, Model } from "mongoose";
import ISubject from "../models/Subject";

export interface ISubjectDocument extends ISubject, Document {

}

interface ISubjectModel extends Model<ISubjectDocument> {}

const Subjects = new Schema<ISubjectDocument, ISubjectModel>({
  name: {
    type: String,
    required: true,
  },
});

export default model("subjects", Subjects, "subjects");
