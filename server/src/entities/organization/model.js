import { model, Schema } from 'mongoose';


const OrganizationSchema = new Schema(
  {
    avatarUrl: { type: String, trim: true },
    login: { type: String, trim: true, required: true, unique: true, maxlength: 120, minlength: 3 },
    name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
    url: { type: String, trim: true, required: true, maxlength: 500, minlength: 5 },
  },
  { timestamps: true }
);
export const Organization = model('organization', OrganizationSchema);