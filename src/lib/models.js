import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min:4,
        max:20,

    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password: {
        type : String,
        min:6
    },
    img: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference User
        ref: 'User', // The name of the model you are referencing
        required: true, // Make it required if necessary
      },
}, {timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema)