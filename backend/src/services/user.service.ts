import { UserModel, User } from '../models/user.model';

const createUser = async (user: User) => {
  const newUser = new UserModel(user);
  return await newUser.save();
};

const getUserById = async (userId: number) => {
  return await UserModel.findOne({ userId });
};

const updateUser = async (userId: number, user: Partial<User>) => {
  return await UserModel.findOneAndUpdate({ userId }, user, { new: true });
};

const deleteUser = async (userId: number) => {
  return await UserModel.findOneAndDelete({ userId });
};

export { createUser, getUserById, updateUser, deleteUser };
