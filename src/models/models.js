import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: String,
  defaultValue: String,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  properties: Map,
});

const ListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  properties: [PropertySchema],
  users: [UserSchema],
});

const List = mongoose.model('List', ListSchema);

export default {List};
