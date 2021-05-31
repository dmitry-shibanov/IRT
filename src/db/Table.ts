import { Schema, model, Document, Types, Model } from "mongoose";
import { ITable } from "../models/Table";

export interface TableDocument extends ITable, Document {
  professions: {
    items: Types.Array<{ professionId: Types.ObjectId; result: number }>;
  };
}

interface TableModel extends Model<TableDocument> {}

const Table = new Schema<TableDocument, TableModel>({
  date: {
    type: String,
    required: true,
  },
  professions: {
    items: [
      {
        professionId: { type: Types.ObjectId, required: false },
        result: { type: Number, required: false },
      },
    ],
  },
});

export default model("Table", Table);
