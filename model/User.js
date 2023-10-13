import mongoose from 'mongoose';


let db;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

// const getUserModel = async (tenantId) => {
//   const usedDb = await getTenantDB(tenantId);
//   return usedDb.model('User', userSchema);
// };
export default userSchema;

// module.exports = mongoose.model("StaffOnboardingForms", StaffOnboardingFormsSchema);
