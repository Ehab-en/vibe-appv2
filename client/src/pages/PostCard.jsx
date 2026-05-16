import {
  FaHeart,
  FaRegComment,
  FaTrash
} from "react-icons/fa";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  toggleLike,
  addComment,
  getPosts
} from "../features/PostSlice";

import { useState } from "react";

import axios from "axios";

const PostCard = ({
  post,
  darkMode
}) => {

  const dispatch =
    useDispatch();

  const user =
    useSelector(
      (state) => state.user.user
    );

  const userData =
    post.user?.[0];

  const [text, setText] =
    useState("");

  const [showComments,
    setShowComments] =
    useState(false);

  //  LIKE
  const handleLike = () => {

    if (!user) return;

    dispatch(toggleLike({

      postId:
        post._id,

      userEmail:
        user.email.toLowerCase()

    }));

  };

  const isLiked =
    post.likes?.includes(

      user?.email?.toLowerCase()

    );

  //  COMMENT
  const handleComment = () => {

    if (!text.trim()) return;

    if (!user) return;

    dispatch(addComment({

      postId:
        post._id,

      userEmail:
        user.email,

      username:
        user.username,

      profilepic:
        user.profilepic,

      text

    }));

    setText("");

    setShowComments(true);

  };

  //  DELETE POST
  const handleDelete =
    async () => {

      try {

        await axios.delete(

          `http://localhost:3002/deletePost/${post._id}`

        );

        dispatch(
          getPosts()
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div
      style={{

        border:
          darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb",

        padding:
          "15px",

        marginBottom:
          "15px",

        borderRadius:
          "16px",

        background:
          darkMode
            ? "#1e293b"
            : "#fff",

        color:
          darkMode
            ? "white"
            : "black"

      }}
    >

      {/* TOP */}
      <div className="d-flex justify-content-between align-items-center mb-2">

        <div className="d-flex align-items-center">

          <img
            src={
              userData?.profilepic ||
              "https://i.imgur.com/6VBx3io.png"
            }

            alt="profile"

            style={{

              width:
                "40px",

              height:
                "40px",

              borderRadius:
                "50%",

              marginRight:
                "10px",

              objectFit:
                "cover"

            }}
          />

          <div>

            <strong>
              {userData?.username || post.email}
            </strong>

            <div
              style={{

                fontSize:
                  "12px",

                color:
                  darkMode
                    ? "#cbd5e1"
                    : "#777"

              }}
            >
              just now
            </div>

          </div>

        </div>

        {/* DELETE BUTTON */}
        {
          user?.email ===
          post.email && (

            <div
              onClick={handleDelete}

              style={{

                cursor:
                  "pointer",

                color:
                  "#ef4444",

                fontSize:
                  "18px"

              }}
            >
              <FaTrash />
            </div>

          )
        }

      </div>

      {/* MESSAGE */}
      <p>{post.postMsg}</p>

      {/* IMAGE */}
      {post.postImage && (

        <img
          src={post.postImage}

          alt="post"

          style={{

            width:
              "100%",

            borderRadius:
              "14px",

            marginBottom:
              "12px",

            maxHeight:
              "500px",

            objectFit:
              "cover"

          }}
        />

      )}

      {/* LOCATION */}
      {post.address && (

        <p
          style={{

            fontSize:
              "12px",

            color:
              darkMode
                ? "#cbd5e1"
                : "#555"

          }}
        >
          📍 {post.address}
        </p>

      )}

      <div
        style={{

          display:
            "flex",

          gap:
            "15px",

          marginBottom:
            "10px"

        }}
      >

        {/* LIKE */}
        <div
          onClick={handleLike}

          style={{

            cursor:
              "pointer",

            color:
              isLiked
                ? "red"
                : darkMode
                  ? "white"
                  : "#333"

          }}
        >
          <FaHeart />{" "}
          {post.likes?.length || 0}
        </div>

        {/* COMMENTS */}
        <div
          onClick={() =>
            setShowComments(
              !showComments
            )
          }

          style={{
            cursor:
              "pointer"
          }}
        >
          <FaRegComment />{" "}
          {post.comments?.length || 0}
        </div>

      </div>

      {/* COMMENT SECTION */}
      {showComments && (

        <>

          {/* INPUT */}
          <div className="d-flex mb-2">

            <input
              value={text}

              onChange={(e) =>
                setText(
                  e.target.value
                )
              }

              placeholder="Write a comment..."

              className="form-control me-2"

              style={{

                background:
                  darkMode
                    ? "#0f172a"
                    : "white",

                color:
                  darkMode
                    ? "white"
                    : "black",

                border:
                  darkMode
                    ? "1px solid #374151"
                    : "1px solid #ddd"

              }}
            />

            <button
              onClick={handleComment}

              className="btn btn-primary"
            >
              Send
            </button>

          </div>

          {/* COMMENTS */}
          {post.comments?.map((c, i) => (

            <div
              key={i}

              style={{

                display:
                  "flex",

                marginBottom:
                  "8px"

              }}
            >

              <img
                src={
                  c.profilepic ||
                  "https://i.imgur.com/6VBx3io.png"
                }

                alt="profile"

                style={{

                  width:
                    "30px",

                  height:
                    "30px",

                  borderRadius:
                    "50%",

                  marginRight:
                    "8px",

                  objectFit:
                    "cover"

                }}
              />

              <div>

                <strong
                  style={{
                    fontSize:
                      "13px"
                  }}
                >
                  {c.username}
                </strong>

                <div
                  style={{

                    fontSize:
                      "13px",

                    color:
                      darkMode
                        ? "#e2e8f0"
                        : "#333"

                  }}
                >
                  {c.text}
                </div>

              </div>

            </div>

          ))}

        </>

      )}

    </div>

  );

};

export default PostCard;