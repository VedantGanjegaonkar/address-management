import { Schema, model, Document } from 'mongoose';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface User extends Document {
  userId: number;
  userName: string;
  email: string;
  addresses: Address[];
}

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const UserSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  addresses: [AddressSchema],
});

const UserModel = model<User>('User', UserSchema);

export { UserModel, User };
