import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";

import {
  FaHome,
  FaCompass,
  FaBell,
  FaUser
} from "react-icons/fa";

import {
  getFollowers
} from "../features/FollowersSlice";

import PostCard from "./PostCard";

const Profile = () => {

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

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

  const {

    followersCount,

    followingCount,

    followers,

    following

  } = useSelector(

    (state) =>
      state.followers

  );

  //  DARK MODE
  const darkMode =
    localStorage.getItem(
      "darkMode"
    ) === "true";

  //  MODALS
  const [showFollowers,
    setShowFollowers] =
    useState(false);

  const [showFollowing,
    setShowFollowing] =
    useState(false);

  // USER POSTS
  const userPosts =
    posts.filter(
      (p) =>
        p.email ===
        user?.email
    );

  //  GET FOLLOWERS
  useEffect(() => {

    if (user?.email) {

      dispatch(
        getFollowers(
          user.email
        )
      );

    }

  }, []);

  return (

    <Row
      className="m-0"
      style={{

        background:
          darkMode
            ? "#030712"
            : "#f8fafc",

        minHeight:
          "100vh",

        color:
          darkMode
            ? "white"
            : "black"

      }}
    >

      {/* LEFT SIDEBAR */}
      <Col
        md="2"
        style={{

          borderRight:
            darkMode
              ? "1px solid #374151"
              : "1px solid #ddd",

          minHeight:
            "100vh",

          padding:
            "20px",

          background:
            darkMode
              ? "#030712"
              : "white"

        }}
      >

        <h1
          style={{

            color:
              "#5f5cff",

            fontWeight:
              "bold",

            marginBottom:
              "50px"

          }}
        >
          Vibe
        </h1>

        {/* HOME */}
        <div
          className="d-flex align-items-center gap-3 mb-4"

          style={{
            cursor:
              "pointer"
          }}

          onClick={() =>
            navigate("/home")
          }
        >

          <FaHome
            size={22}
          />

          <h4
            style={{
              margin: 0
            }}
          >
            Home
          </h4>

        </div>

        {/* EXPLORE */}
        <div
          className="d-flex align-items-center gap-3 mb-4"

          style={{
            cursor:
              "pointer"
          }}

          onClick={() =>
            navigate("/explore")
          }
        >

          <FaCompass
            size={22}
          />

          <h4
            style={{
              margin: 0
            }}
          >
            Explore
          </h4>

        </div>

        {/* NOTIFICATIONS */}
        <div
          className="d-flex align-items-center gap-3 mb-4"

          style={{

            cursor:
              "pointer",

            color:
              darkMode
                ? "white"
                : "black"

          }}

          onClick={() =>
            navigate("/notifications")
          }
        >

          <FaBell
            size={22}

            style={{
              minWidth:
                "22px"
            }}
          />

          <h4
            style={{

              margin: 0,

              fontWeight:
                "500"

            }}
          >
            Notifications
          </h4>

        </div>

        {/* PROFILE */}
        <div
          className="d-flex align-items-center gap-3 mb-4"

          style={{

            color:
              "#5f5cff",

            fontWeight:
              "bold"

          }}
        >

          <FaUser
            size={22}
          />

          <h4
            style={{
              margin: 0
            }}
          >
            Profile
          </h4>

        </div>

        <Button
          color="primary"
          className="w-100 mt-4"

          style={{

            borderRadius:
              "14px",

            padding:
              "14px",

            fontWeight:
              "bold",

            fontSize:
              "20px"

          }}
        >
          + New Post
        </Button>

      </Col>

      <Col
        md="10"

        style={{
          padding:
            "20px"
        }}
      >

        {/* PROFILE CARD */}
        <Card
          style={{

            borderRadius:
              "20px",

            overflow:
              "hidden",

            marginBottom:
              "20px",

            border:
              darkMode
                ? "1px solid #374151"
                : "1px solid #ddd",

            background:
              darkMode
                ? "#111827"
                : "white",

            color:
              darkMode
                ? "white"
                : "black"

          }}
        >

          {/* COVER */}
          <div
            style={{

              height:
                "180px",

              background:
                "linear-gradient(90deg, #5f5cff, #a855f7)"

            }}
          />

          <CardBody>

            <div className="d-flex justify-content-between">

              <div>

                {/* PROFILE PIC */}
                <img
                  src={
                    user?.profilepic ||
                    "https://i.imgur.com/6VBx3io.png"
                  }

                  alt="profile"

                  style={{

                    width:
                      "110px",

                    height:
                      "110px",

                    borderRadius:
                      "50%",

                    border:
                      "4px solid white",

                    marginTop:
                      "-70px",

                    objectFit:
                      "cover",

                    background:
                      "#fff"

                  }}
                />

                <h2 className="mt-3">
                  {user?.username}
                </h2>

                <p
                  style={{
                    color:
                      darkMode
                        ? "#9ca3af"
                        : "#777"
                  }}
                >
                  @
                  {user?.username?.toLowerCase()}
                </p>

                {
                  user?.showBio &&
                  user?.bio && (

                    <p
                      style={{

                        color:
                          darkMode
                            ? "#d1d5db"
                            : "#555",

                        marginTop:
                          "-5px",

                        maxWidth:
                          "500px",

                        fontSize:
                          "16px",

                        lineHeight:
                          "24px"

                      }}
                    >
                      {user.bio}
                    </p>

                  )
                }

              </div>

              {/* EDIT BUTTON */}
              <div>

                <Button

                  color={
                    darkMode
                      ? "dark"
                      : "light"
                  }

                  className="border"

                  onClick={() =>
                    navigate(
                      "/editprofile"
                    )
                  }
                >
                  Edit Profile
                </Button>

              </div>

            </div>

            <div
              className="d-flex gap-4 mt-3"
            >

              <div>

                <strong>
                  {userPosts.length}
                </strong>{" "}

                Posts

              </div>

              {/* FOLLOWERS */}
              <div
                style={{
                  cursor:
                    "pointer"
                }}

                onClick={() =>
                  setShowFollowers(true)
                }
              >

                <strong>
                  {followersCount}
                </strong>{" "}

                Followers

              </div>

              {/* FOLLOWING */}
              <div
                style={{
                  cursor:
                    "pointer"
                }}

                onClick={() =>
                  setShowFollowing(true)
                }
              >

                <strong>
                  {followingCount}
                </strong>{" "}

                Following

              </div>

              {/* LIKES */}
              <div>

                <strong>

                  {userPosts.reduce(

                    (acc, p) =>

                      acc +
                      (
                        p.likes?.length || 0
                      ),

                    0

                  )}

                </strong>{" "}

                Likes

              </div>

            </div>

          </CardBody>

        </Card>

        {/* POSTS */}
        <h3
          className="mb-4"

          style={{
            fontWeight:
              "bold"
          }}
        >
          Posts
        </h3>

        {userPosts.map((post) => (

          <PostCard
            key={post._id}
            post={post}
            darkMode={darkMode}
          />

        ))}

      </Col>

      {/* FOLLOWERS MODAL */}
      <Modal
        isOpen={showFollowers}

        toggle={() =>
          setShowFollowers(false)
        }
      >

        <ModalHeader
          toggle={() =>
            setShowFollowers(false)
          }
        >
          Followers
        </ModalHeader>

        <ModalBody>

          {followers.map((f, i) => {

            const userData =
              f.user?.[0];

            return (

              <div
                key={i}
                className="d-flex align-items-center gap-3 mb-3"
              >

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

                <strong>
                  {userData?.username}
                </strong>

              </div>

            );

          })}

        </ModalBody>

      </Modal>

      {/* FOLLOWING MODAL */}
      <Modal
        isOpen={showFollowing}

        toggle={() =>
          setShowFollowing(false)
        }
      >

        <ModalHeader
          toggle={() =>
            setShowFollowing(false)
          }
        >
          Following
        </ModalHeader>

        <ModalBody>

          {following.map((f, i) => {

            const userData =
              f.user?.[0];

            return (

              <div
                key={i}
                className="d-flex align-items-center gap-3 mb-3"
              >

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

                <strong>
                  {userData?.username}
                </strong>

              </div>

            );

          })}

        </ModalBody>

      </Modal>

    </Row>

  );

};

export default Profile;