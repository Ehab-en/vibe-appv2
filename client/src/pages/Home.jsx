import { useEffect, useState } from "react";

import axios from "axios";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input
} from "reactstrap";

import {
  FaMoon
} from "react-icons/fa";

import {
  getPosts,
  createPost
} from "../features/PostSlice";

import {
  getFollowers
} from "../features/FollowersSlice";

import PostCard from "./PostCard";
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";

const Home = () => {

  const dispatch =
    useDispatch();

  const { posts } =
    useSelector(
      (state) =>
        state.posts
    );

  const user =
    useSelector(
      (state) =>
        state.user.user
    );

  const [postMsg, setPostMsg] =
    useState("");

  const [postImage, setPostImage] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem(
        "darkMode"
      ) === "true"

    );

  const [users, setUsers] =
    useState([]);

  //  GET POSTS + USERS
  useEffect(() => {

    dispatch(
      getPosts()
    );

    getUsers();

    if (user?.email) {

      dispatch(
        getFollowers(
          user.email
        )
      );

    }

  }, []);

  //  SAVE DARK MODE
  useEffect(() => {

    localStorage.setItem(

      "darkMode",

      darkMode

    );

  }, [darkMode]);

  //  GET LOCATION
  useEffect(() => {

    getLocation();

  }, []);

  //  GET USERS
  const getUsers =
    async () => {

      try {

        const res =
          await axios.get(
            "https://vibe-appv2.onrender.com/users"
          );

        setUsers(
          res.data.users
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  //  GET LOCATION
  const getLocation = () => {

    if (
      !navigator.geolocation
    ) return;

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        try {

          const res =
            await axios.get(

              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

            );

          setAddress(
            res.data.display_name
          );

        }

        catch (error) {

          console.log(error);

        }

      }

    );

  };

  //  CREATE POST
  const handlePost = () => {

    if (
      !postMsg.trim()
    ) return;

    dispatch(

      createPost({

        email:
          user.email,

        postMsg,

        postImage,

        address

      })

    );

    setPostMsg("");

    setPostImage("");

    setTimeout(() => {

      dispatch(
        getPosts()
      );

    }, 500);

  };

  return (

    <Row className="m-0">

      <SideBar
        darkMode={darkMode}
      />

      <Col
        md="7"

        style={{

          padding:
            "20px",

          background:
            darkMode
              ? "#0f172a"
              : "#f8fafc",

          minHeight:
            "100vh",

          color:
            darkMode
              ? "white"
              : "black"

        }}
      >

        {/* TOP NAVBAR */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          {/* SEARCH */}
          <Input
            type="text"

            placeholder="Search Vibe..."

            className={
              darkMode
                ? "darkInput"
                : ""
            }

            style={{

              width:
                "70%",

              borderRadius:
                "20px",

              padding:
                "10px",

              backgroundColor:
                darkMode
                  ? "#1e293b"
                  : "white",

              color:
                darkMode
                  ? "white"
                  : "black",

              WebkitTextFillColor:
                darkMode
                  ? "white"
                  : "black",

              border:
                darkMode
                  ? "1px solid #374151"
                  : "1px solid #ddd",

              caretColor:
                darkMode
                  ? "white"
                  : "black"

            }}
          />

          {/* USER INFO */}
          <div

            className="d-flex align-items-center"

            style={{
              gap: "18px"
            }}
          >

            <FaMoon
              size={18}

              style={{

                cursor:
                  "pointer",

                color:
                  darkMode
                    ? "white"
                    : "black"

              }}

              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
            />

            <img
              src={
                user?.profilepic ||
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

                objectFit:
                  "cover"

              }}
            />

            <strong>
              {user?.username}
            </strong>

          </div>

        </div>

        {/* CREATE POST */}
        <Card
          style={{

            borderRadius:
              "18px",

            marginBottom:
              "20px",

            border:
              "none",

            background:
              darkMode
                ? "#1e293b"
                : "white",

            color:
              darkMode
                ? "white"
                : "black"

          }}
        >

          <CardBody>

            <div className="d-flex gap-3">

              <img
                src={
                  user?.profilepic ||
                  "https://i.imgur.com/6VBx3io.png"
                }

                alt="profile"

                style={{

                  width:
                    "45px",

                  height:
                    "45px",

                  borderRadius:
                    "50%",

                  objectFit:
                    "cover"

                }}
              />

              <div
                style={{
                  width:
                    "100%"
                }}
              >

                {/* IMAGE INPUT */}
                <Input
                  type="text"

                  value={postImage}

                  onChange={(e) =>
                    setPostImage(
                      e.target.value
                    )
                  }

                  placeholder="Paste image URL..."

                  className={`mb-3 ${darkMode
                      ? "darkInput"
                      : ""
                    }`}

                  style={{

                    borderRadius:
                      "12px",

                    backgroundColor:
                      darkMode
                        ? "#0f172a"
                        : "white",

                    color:
                      darkMode
                        ? "white"
                        : "black",

                    WebkitTextFillColor:
                      darkMode
                        ? "white"
                        : "black",

                    border:
                      darkMode
                        ? "1px solid #374151"
                        : "1px solid #ddd",

                    caretColor:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

                {/* MESSAGE */}
                <Input
                  type="text"

                  value={postMsg}

                  onChange={(e) =>
                    setPostMsg(
                      e.target.value
                    )
                  }

                  placeholder="What's on your mind?"

                  className={`mb-3 ${darkMode
                      ? "darkInput"
                      : ""
                    }`}

                  style={{

                    borderRadius:
                      "12px",

                    backgroundColor:
                      darkMode
                        ? "#0f172a"
                        : "white",

                    color:
                      darkMode
                        ? "white"
                        : "black",

                    WebkitTextFillColor:
                      darkMode
                        ? "white"
                        : "black",

                    border:
                      darkMode
                        ? "1px solid #374151"
                        : "1px solid #ddd",

                    caretColor:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

                {/*LOCATION*/} 
                {address && (

                  <p
                    style={{

                      fontSize:
                        "12px",

                      marginBottom:
                        "10px",

                      color:
                        darkMode
                          ? "#cbd5e1"
                          : "#555"

                    }}
                  >
                    📍 {address}
                  </p>

                )}

                <div className="d-flex justify-content-end">

                  <Button
                    color="primary"

                    onClick={handlePost}

                    style={{
                      borderRadius:
                        "10px"
                    }}
                  >
                    Post
                  </Button>

                </div>

              </div>

            </div>

          </CardBody>

        </Card>

        {/* POSTS */}
       {/* POSTS */}
{posts

  .filter(

    (post) =>

      post.isPublic !== false

  )

  .map((post) => (

    <PostCard
      key={post._id}
      post={post}
      darkMode={darkMode}
    />

))}
      </Col>

      <RightSideBar

        darkMode={darkMode}

        users={users}

        user={user}

      />

    </Row>

  );

};

export default Home;