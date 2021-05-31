import { Schema, model, Types, Model } from "mongoose";
import { UsareBaseDocument } from "../models/User";
import bcrypt from "bcrypt";

export interface IStudent extends UsareBaseDocument {
  _doc?: any;
  subjects: Types.Array<{ id: Schema.Types.ObjectId, mark: Schema.Types.String }>;
  factors: Types.Array<{ id: Schema.Types.ObjectId, result: Schema.Types.String }>;
  course: number;
  group: string;
}

export interface IUserModel extends Model<IStudent> {
  changePassword(): boolean;
}

const Student = new Schema<IStudent, IUserModel>({
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
  subjects:  [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "subjects",
          required: false,
        },
        mark: {
          type: Schema.Types.String,
          required: false
        }
      },
    ],

    factors:  [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "factors",
          required: false,
        },
        result: {
          type: Schema.Types.String,
          required: false
        }
      },
    ],
  course: {
    type: Number,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
});

Student.methods.changePassword = function (newPassword: string) {
  this.update({
    password: newPassword,
  });
};

Student.pre<UsareBaseDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

export default model<IStudent, IUserModel>("Students", Student, "students");
