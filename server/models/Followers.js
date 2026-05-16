import mongoose from "mongoose";

const FollowerSchema = mongoose.Schema({

  followerEmail: {
    type: String,
    required: true
  },

  followingEmail: {
    type: String,
    required: true
  },

  isFollowing: {
    type: Boolean,
    default: true
  }

},
{
  timestamps: true
});

const FollowerModel = mongoose.model(
  "followers",
  FollowerSchema,
  "followers"
);

export default FollowerModel;