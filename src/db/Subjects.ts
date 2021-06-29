import { Schema, model, Document, Model } from "mongoose";
import ISubject from "../models/Subject";

interface ISubjectDocument extends ISubject, Document {
  _doc?: any;
}

interface ISubjectModel extends Model<ISubjectDocument> {}

const Subjects = new Schema<ISubjectDocument, ISubjectModel>({
  name: {
    type: String,
    required: true,
  },
});

export default model("subjects", Subjects, "subjects");
