import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import UserModel from "./models/Users.js";
import PostModel from "./models/Posts.js";
import FollowerModel from "./models/Followers.js";
import NotificationModel from "./models/Notifications.js";

const app = express();

app.use(cors());
app.use(express.json());

//SERVER 

app.listen(3002, () => {
  console.log("Server Connected at port 3002");
});

//  DATABASE

const conStr =
  "mongodb+srv://admin:admin1234@cluster0.ved14bf.mongodb.net/vibeDB?retryWrites=true&w=majority";

mongoose.connect(conStr)

  .then(() =>
    console.log("Database Connected")
  )

  .catch((error) =>
    console.log("DB Error: " + error)
  );

//USERS

//  GET USERS
app.get("/getUsers", async (req, res) => {

  try {

    const users = await UserModel.find({});

    res.send(users);

  }

  catch (error) {

    res.send("Error: " + error);

  }

});

//  GET ALL USERS
app.get("/users", async (req, res) => {

  try {

    const users = await UserModel.find({});

    res.send({ users });

  }

  catch (error) {

    res.send("Error: " + error);

  }

});

// REGISTER

app.post("/register", async (req, res) => {

  try {

    const {
      email,
      username,
      password,
      profilepic
    } = req.body;

    const user = await UserModel.findOne({
      email: email
    });

    if (user) {

      res.send({
        message: "User Exists"
      });

    }

    else {

      const hpwd =
        await bcrypt.hash(
          password,
          10
        );

      const newuser =
        new UserModel({

          email,

          username,

          password:
            hpwd,

          profilepic:
            profilepic ||
            "https://i.imgur.com/6VBx3io.png"

        });

      await newuser.save();

      res.send({
        message:
          "User Registered..."
      });

    }

  }

  catch (error) {

    res.send(
      "Read Error.." + error
    );

  }

});

//LOGIN

app.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await UserModel.findOne({
        email: email
      });

    if (user) {

      const match =
        await bcrypt.compare(
          password,
          user.password
        );

      if (match) {

        res.send({

          user: user,

          message:
            "success"

        });

      }

      else {

        res.send({
          message:
            "Invalid Credentials"
        });

      }

    }

    else {

      res.send({
        message:
          "Invalid Credentials"
      });

    }

  }

  catch (error) {

    res.send(
      "Read Error.." + error
    );

  }

});

//POSTS

//CREATE POST
app.post("/posts", async (req, res) => {

  try {

    const newPost =
      new PostModel(
        req.body
      );

    await newPost.save();

    res.send({
      message:
        "Post Created"
    });

  }

  catch (error) {

    res.send(
      "Error: " + error
    );

  }

});

//GET POSTS
app.get("/posts", async (req, res) => {

  try {

    const posts =
      await PostModel.aggregate([

        {
          $lookup: {

            from:
              "users",

            localField:
              "email",

            foreignField:
              "email",

            as:
              "user"

          }
        },

        {
          $sort: {
            createdAt: -1
          }
        }

      ]);

    res.send({
      posts
    });

  }

  catch (error) {

    res.send(
      "Error: " + error
    );

  }

});

// DELETE POST
app.delete(

  "/deletePost/:id",

  async (req, res) => {

    try {

      await PostModel.findByIdAndDelete(

        req.params.id

      );

      res.send({

        message:
          "Post Deleted"

      });

    }

    catch (error) {

      res.send(

        "Delete Error: " + error

      );

    }

  }

);

// LIKES

app.post("/like", async (req, res) => {

  try {

    const {
      postId,
      userEmail
    } = req.body;

    const post =
      await PostModel.findById(
        postId
      );

    if (!post) {

      return res.send({
        message:
          "Post not found"
      });

    }

    const email =
      userEmail.toLowerCase();

    const alreadyLiked =
      post.likes.includes(email);

    //  UNLIKE
    if (alreadyLiked) {

      post.likes =
        post.likes.filter(
          (u) => u !== email
        );

    }

    //  LIKE
    else {

      post.likes.push(email);

      //  CREATE LIKE NOTIFICATION
      if (
        post.email !== email
      ) {

        const newNotification =
          new NotificationModel({

            senderEmail:
              email,

            receiverEmail:
              post.email,

            type:
              "like",

            postId:
              post._id

          });

        await newNotification.save();

      }

    }

    await post.save();

    res.send({
      likes:
        post.likes
    });

  }

  catch (err) {

    res.send(
      "Error: " + err
    );

  }

});

// COMMENTS

app.post("/comment", async (req, res) => {

  try {

    const {

      postId,

      userEmail,

      username,

      profilepic,

      text

    } = req.body;

    const post =
      await PostModel.findById(
        postId
      );

    if (!post) {

      return res.send({
        message:
          "Post not found"
      });

    }

    const newComment = {

      userEmail,

      username,

      profilepic,

      text,

      createdAt:
        new Date()

    };

    post.comments.push(
      newComment
    );

    // CREATE COMMENT NOTIFICATION
    if (
      post.email !== userEmail
    ) {

      const newNotification =
        new NotificationModel({

          senderEmail:
            userEmail,

          receiverEmail:
            post.email,

          type:
            "comment",

          postId:
            post._id

        });

      await newNotification.save();

    }

    await post.save();

    res.send({
      comments:
        post.comments
    });

  }

  catch (err) {

    res.send(
      "Error: " + err
    );

  }

});

//UPDATE PROFILE

app.put("/updateProfile", async (req, res) => {

  try {

    const {

      email,

      newEmail,

      currentPassword,

      newPassword,

      username,

      profilepic,

      bio,

      country,

      showBio

    } = req.body;

    //  FIND USER
    const existingUser =
      await UserModel.findOne({

        email: email

      });

    //  USER NOT FOUND
    if (!existingUser) {

      return res.send({

        message:
          "User not found"

      });

    }

    //  PASSWORD VALIDATION
    if (newPassword) {

      const match =
        await bcrypt.compare(

          currentPassword,

          existingUser.password

        );

      //  WRONG PASSWORD
      if (!match) {

        return res.send({

          message:
            "Current password incorrect"

        });

      }

    }

    //  HASH NEW PASSWORD
    let updatedPassword =
      existingUser.password;

    if (newPassword) {

      updatedPassword =
        await bcrypt.hash(

          newPassword,

          10

        );

    }

    //  UPDATE USER
    const updatedUser =
      await UserModel.findOneAndUpdate(

        {
          email: email
        },

        {

          email:
            newEmail,

          password:
            updatedPassword,

          username,

          profilepic,

          bio,

          country,

          showBio

        },

        {
          new: true
        }

      );

    res.send({

      message:
        "Profile Updated",

      user:
        updatedUser

    });

  }

  catch (error) {

    res.send(

      "Update Error: " + error

    );

  }

});

// FOLLOW SYSTEM 

//  FOLLOW / UNFOLLOW
app.post("/follow", async (req, res) => {

  try {

    const {

      followerEmail,

      followingEmail

    } = req.body;

    //  CANNOT FOLLOW YOURSELF
    if (
      followerEmail ===
      followingEmail
    ) {

      return res.send({

        message:
          "Cannot follow yourself"

      });

    }

    //  CHECK EXISTING
    const existingFollow =
      await FollowerModel.findOne({

        followerEmail,

        followingEmail

      });

    // UNFOLLOW
    if (existingFollow) {

      await FollowerModel.deleteOne({

        _id:
          existingFollow._id

      });

      return res.send({

        following:
          false

      });

    }

    //  FOLLOW
    const newFollow =
      new FollowerModel({

        followerEmail,

        followingEmail

      });

    await newFollow.save();

    //  FOLLOW NOTIFICATION
    const newNotification =
      new NotificationModel({

        senderEmail:
          followerEmail,

        receiverEmail:
          followingEmail,

        type:
          "follow"

      });

    await newNotification.save();

    res.send({

      following:
        true

    });

  }

  catch (error) {

    res.send(

      "Follow Error: " + error

    );

  }

});

//  GET FOLLOWERS WITH LOOKUP
app.get("/followers/:email", async (req, res) => {

  try {

    const email =
      req.params.email;

    //  FOLLOWERS
    const followers =
      await FollowerModel.aggregate([

        {
          $match: {
            followingEmail:
              email
          }
        },

        {
          $lookup: {

            from:
              "users",

            localField:
              "followerEmail",

            foreignField:
              "email",

            as:
              "user"

          }
        }

      ]);

    //  FOLLOWING
    const following =
      await FollowerModel.aggregate([

        {
          $match: {
            followerEmail:
              email
          }
        },

        {
          $lookup: {

            from:
              "users",

            localField:
              "followingEmail",

            foreignField:
              "email",

            as:
              "user"

          }
        }

      ]);

    res.send({

      followersCount:
        followers.length,

      followingCount:
        following.length,

      followers,

      following

    });

  }

  catch (error) {

    res.send(

      "Followers Error: " + error

    );

  }

});

// NOTIFICATIONS

//  GET NOTIFICATIONS 
app.get("/notifications/:email", async (req, res) => {

  try {

    const email =
      req.params.email;

    const notifications =
      await NotificationModel.aggregate([

        {
          $match: {
            receiverEmail:
              email
          }
        },

        {
          $lookup: {

            from:
              "users",

            localField:
              "senderEmail",

            foreignField:
              "email",

            as:
              "user"

          }
        },

        {
          $sort: {
            createdAt: -1
          }
        }

      ]);

    res.send({
      notifications
    });

  }

  catch (error) {

    res.send(

      "Notification Error: " + error

    );

  }

});

//  DELETE NOTIFICATION
app.delete(

  "/deleteNotification/:id",

  async (req, res) => {

    try {

      await NotificationModel.findByIdAndDelete(

        req.params.id

      );

      res.send({

        message:
          "Notification Deleted"

      });

    }

    catch (error) {

      res.send(

        "Delete Error: " + error

      );

    }

  }

);