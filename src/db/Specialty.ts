import { model, Model, Schema } from "mongoose";
import { SpecialityBaseDocument } from "../models/Specialty";


interface ISpecialityDocument extends SpecialityBaseDocument {}

interface SpecialityModel extends Model<ISpecialityDocument> {}

const Speciality = new Schema<ISpecialityDocument, SpecialityModel>({
    
});

export default model<ISpecialityDocument, SpecialityModel>(
  "Speciality",
  Speciality,
  "speciality"
);
