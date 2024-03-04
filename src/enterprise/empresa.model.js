import mongoose from "mongoose";

const levelin = ['High', 'Medium', 'Low'];
const categories = ['Entertainment', 'Food', 'Transport']

const EnterpriseSchema = mongoose.Schema({
    nameEnterprise: {
        type: String,
        required: [true, "The name is obligatory"],
    },
    levelImpact: {
        type: String,
        enum: levelin,
        required: [true],
    },
    experienceYear: {
        type: Number,
        required: [true, "The years of experience are obligatory"],
    },
    categoryEnterprise: {
        type: String,
        enum: categories,
        required: [true, "The categories are obligatory"],
    }
});

EnterpriseSchema.methods.toJSON = function () {
    const { __v, _id, ...enterprise } = this.toObject();
    enterprise.uid = _id;
    return enterprise;
}

export default mongoose.model('Enterprise', EnterpriseSchema)