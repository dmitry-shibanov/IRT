import { Schema, model, Types, Model, Document } from "mongoose";
import IUser from "../models/User";
import bcrypt from "bcrypt";

import { IFactorDocument } from "./Factors";
import { ISubjectDocument } from "./Subjects";

export interface IStudent extends IUser {
  course: number;
  group: string;
  subjects: Array<
    | { id: Schema.Types.ObjectId; mark: Schema.Types.String }
    | { subject: IFactorDocument; mark: Schema.Types.String }
  >;
  factors: Array<
    | { id: Schema.Types.ObjectId; result: Schema.Types.String }
    | { factor: IFactorDocument; result: Schema.Types.String }
  >;
}

interface StudentBaseDocument extends IStudent, Document {
  fullName: String;
}

export interface StudentDocument extends StudentBaseDocument {
  factors: Array<{ id: IFactorDocument["_id"]; result: Schema.Types.String }>;
  subjects: Array<{ id: ISubjectDocument["_id"]; mark: Schema.Types.String }>;
}

export interface StudentDocumentPopulated extends StudentBaseDocument {
  subjects: Array<{ subject: ISubjectDocument; mark: Schema.Types.String }>;
  factors: Array<{ factor: IFactorDocument; result: Schema.Types.String }>;
}

interface ISkipProperties {
  [prop: string]: Number;
}

export interface IStudentModel extends Model<StudentDocument> {
  populateAll(
    id: string,
    skipProperties?: ISkipProperties
  ): Promise<StudentDocumentPopulated>;
}

const StudentSchema = new Schema<StudentDocument, IStudentModel>({
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
  subjects: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "subjects",
        required: false,
      },
      mark: {
        type: Schema.Types.String,
        required: false,
      },
    },
  ],

  factors: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "factors",
        required: false,
      },
      result: {
        type: Schema.Types.String,
        required: false,
      },
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

StudentSchema.virtual("fullName").get(function (this: StudentBaseDocument) {
  return `${this.firstName} ${this.lastName}`;
});

StudentSchema.methods.changePassword = function (newPassword: string) {
  this.updateOne({
    password: newPassword,
  });
};

StudentSchema.statics.populateAll = async function (
  this: Model<StudentDocument>,
  id: string,
  skipProperties: ISkipProperties
) {

  console.log(`populated Doc id is ${id}`);
  
  const populatedDoc = await this.findById(id, skipProperties)
    .lean()
    .populate("factors.id")
    .populate("subjects.id");

  console.log(`populatedDoc is ${populatedDoc!.subjects[0].id}`);
  return populatedDoc;
};

StudentSchema.pre<StudentDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

export default model<StudentDocument, IStudentModel>(
  "Students",
  StudentSchema,
  "students"
);
