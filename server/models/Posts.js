import mongoose from "mongoose";

const PostSchema = mongoose.Schema({

  email: { type: String, required: true },

  postMsg: { type: String, required: true },

  postImage: { type: String },

  address: { type: String },
  
  isPublic: {
  type: Boolean,
  default: true
},

  lat: { type: Number },

  lng: { type: Number },

  likes: {
    type: [String],
    default: []
  },

  comments: {
    type: [
      {
        userEmail: String,
        username: String,
        profilepic: String,
        text: String,
        createdAt: Date
      }
    ],
    default: []
  }

},
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  });

const PostModel = mongoose.model(
  "PostsTbl",
  PostSchema,
  "PostsTbl"
);

export default PostModel;