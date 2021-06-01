import { Schema, model, Document, Types, Model } from "mongoose";
import { ITable } from "../models/Table";

export interface TableDocument extends ITable, Document {
  factors: {
    items: Types.Array<{ factorId: Types.ObjectId; result: number }>;
  };
  users: Types.Array<{ userId: Types.ObjectId; result: number }>;
}

interface TableModel extends Model<TableDocument> {}

const Table = new Schema<TableDocument, TableModel>({
  users: [
    {
      userId: {
        type: Types.ObjectId,
        required: true,
        ref: "students",
      },
      result: {
        type: Number,
      },
    },
  ],
  factors: {
    items: [
      {
        factorId: { type: Types.ObjectId, required: false },
        result: { type: Number, required: false },
      },
    ],
  },
});

export default model("Table", Table);
