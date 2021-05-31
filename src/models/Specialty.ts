import { Document, Model } from "mongoose"

export interface Speciality {
  group: string,
  faculty: string
}


export interface SpecialityBaseDocument extends Speciality, Document {

}
