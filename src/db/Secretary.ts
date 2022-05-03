import { Schema, model, Model, Document } from "mongoose";
import IUser from "../models/User";

interface ISecretary extends IUser {}

interface ISecretaryBaseDocument extends ISecretary, Document {
  fullName: String;
}

interface ISecretaryDocument extends ISecretaryBaseDocument {
  // addTable(): IStudent;
}

interface SecretaryModel extends Model<ISecretaryDocument> {}

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
  },
  resetToken: {
    type: String,
    required: false,
  },
  resetDate: {
    type: Schema.Types.Date,
    required: false,
  },
});

Secretary.virtual("fullName").get(function (this: ISecretaryBaseDocument) {
  return `${this.firstName} ${this.lastName}`;
});

export default model<ISecretaryDocument, SecretaryModel>(
  "Secretary",
  Secretary,
  "secretary"
);
