import { Schema, model, Types, Model } from "mongoose";
import { UsareBaseDocument } from '../models/User'

export interface IHeadOfDepratemnt extends UsareBaseDocument {

}

interface IUserModel extends Model<IHeadOfDepratemnt> {
  changePassword(): boolean;
}

const HeadOfDepartment = new Schema<IHeadOfDepratemnt, IUserModel>({
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
});

export default model("HeadOfDepartment", HeadOfDepartment);
