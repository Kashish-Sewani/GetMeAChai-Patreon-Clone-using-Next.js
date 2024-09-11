import mongoose from "mongoose";
const { Schema,model } = mongoose;

const UserSchema = new Schema({
    name: { type: String},
    email: { type: String, required: true},
    username: { type: String, required: true},
    profilePicture: { type: String},
    coverPicture: { type: String},
    razorpayid: {type: String},
    razorpaysecret: {type: String}
});


export default  mongoose.models.User ||  model("User",UserSchema);