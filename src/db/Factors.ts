import { Schema, model, Document, Model } from "mongoose";
import  IFactor from '../models/Factors'

interface IFactorDocument extends IFactor, Document {

}

interface IFactorModel extends Model<IFactorDocument> {

}

const Factors = new Schema<IFactorDocument, IFactorModel>({
  name: {
    type: String,
    required: true,
  },
});

export default model("factors", Factors, "factors");
