import { model, Schema } from 'mongoose';


const OrganizationSchema = new Schema(
  {
    avatarUrl: { type: String, trim: true, required: true },
    description: { type: String, trim: true, maxlength: 500, minlength: 3  },
    email: { type: String, trim: true, maxlength: 120, minlength: 3 },
    location: { type: String, trim: true, maxlength: 120, minlength: 3 },
    login: { type: String, trim: true, required: true, unique: true, maxlength: 120, minlength: 3 },
    name: { type: String, trim: true, maxlength: 120, minlength: 3 },
    people: [{ _id: Schema.Types.ObjectId, ref: String }],
    url: { type: String, trim: true, required: true, maxlength: 500, minlength: 5 },
    websiteUrl: { type: String, trim: true, maxlength: 500, minlength: 5 },
    __typename: { type: String, default: 'Organization' },
  },
  { timestamps: true }
);
export const Organization = model('organizations', OrganizationSchema);
