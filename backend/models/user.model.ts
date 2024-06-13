import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressSchema: Schema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

export interface IUser extends Document {
  userId: number;
  userName: string;
  email: string;
  addresses: IAddress[];
}

const UserSchema: Schema = new Schema({
  userId: { type: Number, required: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  addresses: [AddressSchema],
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);