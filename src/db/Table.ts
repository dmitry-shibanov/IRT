import { Schema, model, Document, Types, Model } from "mongoose";
import { ITable } from "../models/Table";

export interface TableDocument extends ITable, Document {
  factors: Types.Array<Types.ObjectId>;
  subjects: Types.Array<Types.ObjectId>;
  users: Types.Array<{ userId: Types.ObjectId; result: number }>;
  professionName: String;
  profession?: Types.ObjectId;
}

interface TableModel extends Model<TableDocument> {}

const TableResult = new Schema<TableDocument, TableModel>(
  {
    users: [
      {
        userId: {
          type: Types.ObjectId,
          required: true,
          ref: "students",
        },
        result: {
          type: Number,
          required: true,
        },
      },
    ],
    factors: [{ type: Types.ObjectId, required: true, ref: "factors" }],
    subjects: [
      {
        type: Types.ObjectId,
        required: true,
        ref: "subjects",
      },
    ],
    professionName: {
      type: String,
      required: true,
    },
    profession: {
      type: Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("Table", TableResult);
