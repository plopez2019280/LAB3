import mongoose from 'mongoose';

const administratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is a required parameter"],
    },
    email: {
        type: String,
        required: [true, "The email is a required parameter"],
    },
    password: {
        type: String,
        required: [true, "The password is a required parameter"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

administratorSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
};

const Admin = mongoose.model('Admin', administratorSchema);

export default Admin;
