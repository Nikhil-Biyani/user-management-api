import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  properties: { type: Map, of: String },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  unsubscribed: { type: Boolean, default: false }
});

const User = mongoose.model('User', UserSchema);

export default User;
