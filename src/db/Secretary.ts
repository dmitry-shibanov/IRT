import { Schema, model, Model } from "mongoose";
import { UsareBaseDocument } from '../models/User';
import { IStudent } from './Student';

interface ISecretaryDocument extends UsareBaseDocument {
    // addTable(): IStudent;
}

interface SecretaryModel extends Model<ISecretaryDocument> {

}

const Secretary = new Schema<ISecretaryDocument, SecretaryModel>({
  firstName: {
    type: String,
    requireed: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


export default model<ISecretaryDocument, SecretaryModel>("Secretary", Secretary, "secretary");