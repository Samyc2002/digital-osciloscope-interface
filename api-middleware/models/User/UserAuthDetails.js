import { model, Schema } from "mongoose";

const UserDetailSchema= new Schema({
  name: { type: String, required: false, default: "" },
  avatar: { type: String, required: false },
  work_mail: { type: String, required: false, default: "" },
  phone: { type: Number, required: false, default: 0 },
  created_at: { type: Date, required: false, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
  password: { type: String, required: false, default: "" },
  isActive: { type: Boolean, required: false, default: false }
});

const UserDetail = model("UserDetail", UserDetailSchema);
export default UserDetail;
