import { model, Schema } from 'mongoose';


const UserSchema = new Schema(
  {
    avatarUrl: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 500, minlength: 3  },
    company: { type: String, trim: true, maxlength: 120, minlength: 3 },
    email: { type: String, trim: true, maxlength: 120, minlength: 3 },
    followers: [{ _id: Schema.Types.ObjectId }],
    isOrganization: { type: Boolean, default: false },
    location: { type: String, trim: true, maxlength: 120, minlength: 3 },
    login: { type: String, trim: true, required: true, unique: true, maxlength: 120, minlength: 3 },
    name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
    organizations: [{ _id: Schema.Types.ObjectId }],
    url: { type: String, trim: true, required: true, maxlength: 500, minlength: 5 },
    websiteUrl: { type: String, trim: true, maxlength: 500, minlength: 5 },
  },
  { timestamps: true }
);
export const User = model('users', UserSchema);
