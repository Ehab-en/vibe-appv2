import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../features/PostSlice";

const CommentSection = ({ post }) => {

  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleComment = () => {
    if (!text.trim()) return;
    if (!user) return;

    dispatch(addComment({
      postId: post._id,
      userEmail: user.email,
      username: user.username,
      profilepic: user.profilepic,
      text
    }));

    setText("");
  };

  return (
    <div style={{ marginTop: "10px" }}>

      {/* INPUT */}
      <div className="d-flex mb-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="form-control me-2"
        />

        <button onClick={handleComment} className="btn btn-primary">
          Send
        </button>
      </div>

      {/* COMMENTS LIST */}
      {post.comments?.map((c, i) => (
        <div key={i} style={{ display: "flex", marginBottom: "8px" }}>
          <img
            src={c.profilepic || "https://i.imgur.com/6VBx3io.png"}
            alt="profile"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "8px"
            }}
          />

          <div>
            <strong style={{ fontSize: "13px" }}>{c.username}</strong>
            <div style={{ fontSize: "13px" }}>{c.text}</div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default CommentSection;