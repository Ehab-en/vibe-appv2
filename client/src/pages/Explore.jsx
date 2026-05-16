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
  Input,
  Button
} from "reactstrap";

import {
  FaSearch,
  FaHeart,
  FaComment
} from "react-icons/fa";

import {
  getPosts
} from "../features/PostSlice";

import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";

const Explore = () => {

  const dispatch =
    useDispatch();

  const [search,
    setSearch] =
    useState("");

  //  USERS STATE
  const [users,
    setUsers] =
    useState([]);

  const darkMode =
    localStorage.getItem(
      "darkMode"
    ) === "true";

  const user =
    useSelector(
      (state) =>
        state.user.user
    );

  const posts =
    useSelector(
      (state) =>
        state.posts.posts
    );

  //  LOAD POSTS + USERS
  useEffect(() => {

    dispatch(
      getPosts()
    );

    getUsers();

  }, []);

  //  GET USERS
  const getUsers =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:3002/users"
          );

        setUsers(
          res.data.users
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  //  FILTER POSTS
  const filteredPosts =
    posts.filter((p) => {

      const textMatch =

        p.postMsg
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const usernameMatch =

        p.user?.[0]?.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        textMatch ||
        usernameMatch
      );

    });

  return (

    <Row className="m-0">

      <SideBar
        darkMode={darkMode}
      />

      <Col
        md="7"

        style={{

          minHeight:
            "100vh",

          padding:
            "20px",

          background:
            darkMode
              ? "#0f172a"
              : "#f8fafc",

          color:
            darkMode
              ? "white"
              : "black"

        }}
      >

        {/* SEARCH */}
        <Card
          style={{

            border:
              "none",

            borderRadius:
              "16px",

            marginBottom:
              "20px",

            background:
              darkMode
                ? "#1e293b"
                : "white"

          }}
        >

          <CardBody>

            <div className="d-flex gap-2">

              <div className="flex-grow-1 position-relative">

                <FaSearch
                  style={{

                    position:
                      "absolute",

                    left:
                      "15px",

                    top:
                      "13px",

                    color:
                      "#9ca3af"

                  }}
                />

                <Input
                  value={search}

                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }

                  placeholder="Search posts, people..."

                  style={{

                    paddingLeft:
                      "40px",

                    borderRadius:
                      "12px",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#fff",

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

              </div>

              <Button
                color="primary"

                style={{
                  borderRadius:
                    "12px"
                }}
              >
                Search
              </Button>

            </div>

          </CardBody>

        </Card>

        {/* TRENDING */}
        <Card
          style={{

            border:
              "none",

            borderRadius:
              "16px",

            marginBottom:
              "20px",

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

            <h5
              style={{
                fontWeight:
                  "bold"
              }}
            >
              Trending Hashtags
            </h5>

            <p
              style={{
                color:
                  darkMode
                    ? "#9ca3af"
                    : "#777"
              }}
            >
              No trending hashtags yet
            </p>

          </CardBody>

        </Card>

        {/* POSTS */}
        <h5
          style={{

            marginBottom:
              "20px",

            fontWeight:
              "bold"

          }}
        >
          Recent Posts
        </h5>

        {filteredPosts.map((post) => {

          const userData =
            post.user?.[0];

          return (

            <Card
              key={post._id}

              style={{

                border:
                  "none",

                borderRadius:
                  "16px",

                marginBottom:
                  "20px",

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

                {/* USER */}
                <div className="d-flex align-items-center gap-2 mb-3">

                  <img
                    src={
                      userData?.profilepic ||
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

                  <div>

                    <strong>
                      {userData?.username}
                    </strong>

                    <div
                      style={{

                        fontSize:
                          "13px",

                        color:
                          darkMode
                            ? "#9ca3af"
                            : "#777"

                      }}
                    >
                      @{userData?.username}
                    </div>

                  </div>

                </div>

                {/* POST */}
                <p>
                  {post.postMsg}
                </p>

                {/* IMAGE */}
                {post.postImage && (

                  <img
                    src={post.postImage}

                    alt="post"

                    style={{

                      width:
                        "100%",

                      borderRadius:
                        "12px",

                      marginBottom:
                        "15px"

                    }}
                  />

                )}

                {/* LOCATION */}
                {post.address && (

                  <p
                    style={{
                      color:
                        darkMode
                          ? "#9ca3af"
                          : "#777"
                    }}
                  >
                    📍 {post.address}
                  </p>

                )}

                {/* ACTIONS */}
                <div className="d-flex gap-4">

                  <div>
                    <FaHeart />{" "}
                    {post.likes?.length || 0}
                  </div>

                  <div>
                    <FaComment />{" "}
                    {post.comments?.length || 0}
                  </div>

                </div>

              </CardBody>

            </Card>

          );

        })}

      </Col>

      {/* RIGHT */}
      <RightSideBar

        darkMode={darkMode}

        users={users}

        user={user}

      />

    </Row>

  );

};

export default Explore;