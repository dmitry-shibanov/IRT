import { Document, Model } from "mongoose"

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export interface UsareBaseDocument extends User, Document {

}

// export interface UserModel extends Model<UserDocument> {
//     findMyCompany(id: string): Promise<UserPopulatedDocument>
//   }