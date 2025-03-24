import mongoose, { Schema , Document } from "mongoose";

interface IUser extends Document {
  name : string,
  email : string,
  password : string,
  age : number,
  createdAt ?: Date,
}

const UserSchema = new Schema<IUser>( {
  name : String,
  email : String,
  password : String,
  age : Number,
  createdAt : { type : Date, default : Date.now }
});

const User = mongoose.model<IUser>('User', UserSchema);

export {User , IUser };