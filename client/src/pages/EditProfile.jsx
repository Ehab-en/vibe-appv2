import { useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label
} from "reactstrap";

import {
  FaHome,
  FaCompass,
  FaBell,
  FaUser
} from "react-icons/fa";

import { setUser } from "../features/UserSlice";

const EditProfile = () => {

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const darkMode =
    localStorage.getItem("darkMode") === "true";

  const user =
    useSelector(
      (state) => state.user.user
    );

  // STATES

  const [username,
    setUsername] =
    useState(
      user?.username || ""
    );

  const [profilepic,
    setProfilepic] =
    useState(
      user?.profilepic || ""
    );

  const [bio,
    setBio] =
    useState(
      user?.bio || ""
    );

  const [country,
    setCountry] =
    useState(
      user?.country || ""
    );

  const [showBio,
    setShowBio] =
    useState(
      user?.showBio ?? true
    );

  const [newEmail,
    setNewEmail] =
    useState(
      user?.email || ""
    );

  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  //SAVE

  const handleSave =
    async () => {

      try {

        if (
          newPassword &&
          newPassword !== confirmPassword
        ) {

          alert(
            "Passwords do not match"
          );

          return;

        }

        const res =
          await axios.put(

            "http://localhost:3002/updateProfile",

            {

              email:
                user.email,

              newEmail,

              currentPassword,

              newPassword,

              username,

              profilepic,

              bio,

              country,

              showBio

            }

          );

        dispatch(
          setUser(
            res.data.user
          )
        );

        localStorage.setItem(

          "user",

          JSON.stringify(
            res.data.user
          )

        );

        navigate("/profile");

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <Row className="m-0">

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
              ? "#111827"
              : "#fff",

          color:
            darkMode
              ? "white"
              : "black"

        }}
      >

        {/* LOGO */}
        <h2
          style={{

            color:
              "#6d5dfc",

            fontWeight:
              "bold",

            marginBottom:
              "40px"

          }}
        >
          Vibe
        </h2>

        {/* HOME */}
        <div
          className="mb-4"

          style={{

            cursor:
              "pointer",

            fontSize:
              "18px"

          }}

          onClick={() =>
            navigate("/home")
          }
        >

          <FaHome
            style={{
              marginRight:
                "10px"
            }}
          />

          Home

        </div>

        {/* EXPLORE */}
        <div
          className="mb-4"

          style={{

            cursor:
              "pointer",

            fontSize:
              "18px"

          }}
        >

          <FaCompass
            style={{
              marginRight:
                "10px"
            }}
          />

          Explore

        </div>

        {/* NOTIFICATIONS */}
        <div
          className="mb-4"

          style={{

            cursor:
              "pointer",

            fontSize:
              "18px"

          }}
        >

          <FaBell
            style={{
              marginRight:
                "10px"
            }}
          />

          Notifications

        </div>

        {/* PROFILE */}
        <div
          className="mb-4"

          style={{

            cursor:
              "pointer",

            fontSize:
              "18px",

            color:
              "#6d5dfc",

            fontWeight:
              "bold"

          }}

          onClick={() =>
            navigate("/profile")
          }
        >

          <FaUser
            style={{
              marginRight:
                "10px"
            }}
          />

          Profile

        </div>

        {/* NEW POST */}
        <Button
          color="primary"

          className="w-100 mt-3"

          style={{

            borderRadius:
              "14px",

            background:
              "#2563eb",

            border:
              "none",

            padding:
              "12px"

          }}
        >
          + New Post
        </Button>

      </Col>

      {/* CENTER */}
      <Col
        md="8"

        style={{

          padding:
            "30px",

          background:
            darkMode
              ? "#0f172a"
              : "#f5f5f5",

          minHeight:
            "100vh",

          color:
            darkMode
              ? "white"
              : "black"

        }}
      >

        <Card
          style={{

            borderRadius:
              "30px",

            padding:
              "25px 35px",

            background:
              darkMode
                ? "#1e293b"
                : "#fff",

            color:
              darkMode
                ? "white"
                : "black",

            border:
              darkMode
                ? "1px solid #374151"
                : "1px solid #e5e7eb",

            boxShadow:
              darkMode
                ? "none"
                : "0 2px 10px rgba(0,0,0,0.04)"

          }}
        >

          <CardBody>

            {/* TITLE */}
            <h1
              style={{

                fontWeight:
                  "700",

                marginBottom:
                  "45px",

                fontSize:
                  "52px"

              }}
            >
              Edit Profile
            </h1>

            {/* PROFILE PICTURE */}
            <div className="mb-5">

              <h3
                style={{

                  fontWeight:
                    "600",

                  marginBottom:
                    "35px"

                }}
              >
                Profile Picture
              </h3>

              <div className="d-flex align-items-center gap-4">

                <img
                  src={
                    profilepic ||
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

                    objectFit:
                      "cover"

                  }}
                />

                <div style={{ width: "100%" }}>

                  <p
                    style={{

                      color:
                        "#6d5dfc",

                      fontWeight:
                        "600",

                      marginBottom:
                        "3px",

                      fontSize:
                        "15px"

                    }}
                  >
                    Upload new photo
                  </p>

                  <p
                    style={{

                      color:
                        darkMode
                          ? "#cbd5e1"
                          : "#777",

                      fontSize:
                        "13px"

                    }}
                  >
                  </p>

                  <Input
                    value={profilepic}

                    onChange={(e) =>
                      setProfilepic(
                        e.target.value
                      )
                    }

                    placeholder="Paste image URL..."

                    style={{

                      marginTop:
                        "10px",

                      height:
                        "55px",

                      borderRadius:
                        "12px",

                      border:
                        "1px solid #e5e7eb",

                      background:
                        darkMode
                          ? "#0f172a"
                          : "#fff",

                      color:
                        darkMode
                          ? "white"
                          : "black"

                    }}
                  />

                </div>

              </div>

            </div>

            {/* BASIC INFORMATION */}
            <div className="mb-5">

              <h3
                style={{

                  fontWeight:
                    "600",

                  marginBottom:
                    "30px"

                }}
              >
                Basic Information
              </h3>

              {/* FULL NAME */}
              <div className="mb-4">

                <Label>
                  Full Name
                </Label>

                <Input
                  value={username}

                  placeholder="Full name"

                  style={{

                    height:
                      "55px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid #e5e7eb",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#fff",

                    color:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

              </div>

              {/* USERNAME */}
              <div className="mb-4">

                <Label>
                  Username
                </Label>

                <Input
                  value={username}

                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }

                  placeholder="Username"

                  style={{

                    height:
                      "55px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid #e5e7eb",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#fff",

                    color:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

              </div>

              {/* BIO */}
              <div className="mb-4">

                <Label>
                  Bio
                </Label>

                <Input
                  type="textarea"

                  rows="5"

                  value={bio}

                  onChange={(e) =>
                    setBio(
                      e.target.value
                    )
                  }

                  placeholder="Tell us about yourself..."

                  style={{

                    borderRadius:
                      "12px",

                    border:
                      "1px solid #e5e7eb",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#fff",

                    color:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

              </div>

              {/* COUNTRY */}
<div className="mb-4">

  <Label>
    Country
  </Label>

  <Input
    type="select"

    value={country}

    onChange={(e) =>
      setCountry(
        e.target.value
      )
    }

    style={{

      height:
        "55px",

      borderRadius:
        "12px",

      border:
        "1px solid #e5e7eb",

      background:
        darkMode
          ? "#0f172a"
          : "#fff",

      color:
        darkMode
          ? "white"
          : "black"

    }}
  >

    <option value="">
      Select Country
    </option>

    <option value="Oman">
      Oman
    </option>

    <option value="UAE">
      UAE
    </option>

    <option value="Saudi Arabia">
      Saudi Arabia
    </option>

    <option value="Qatar">
      Qatar
    </option>

    <option value="Kuwait">
      Kuwait
    </option>

    <option value="Bahrain">
      Bahrain
    </option>

  </Input>

</div>
            </div>

            {/* ACCOUNT SETTINGS */}
            <div className="mb-5">

              <h3
                style={{

                  fontWeight:
                    "600",

                  marginBottom:
                    "30px"

                }}
              >
                Account Settings
              </h3>

              {/* EMAIL */}
              <div className="mb-4">

                <Label>
                  Email
                </Label>

                <Input
                  value={newEmail}

                  disabled

                  placeholder="Email"

                  style={{

                    height:
                      "55px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid #e5e7eb",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#f3f4f6",

                    color:
                      darkMode
                        ? "#9ca3af"
                        : "#6b7280",

                    cursor:
                      "not-allowed"

                  }}
                />
              </div>

              {/* CURRENT PASSWORD */}
              <div className="mb-4">

                <Label>
                  Current Password
                </Label>

                <Input
                  type="password"

                  value={currentPassword}

                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }

                  placeholder="Enter current password"

                  style={{

                    height:
                      "55px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid #e5e7eb",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#fff",

                    color:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

              </div>

              {/* NEW PASSWORD */}
              <div className="mb-4">

                <Label>
                  New Password
                </Label>

                <Input
                  type="password"

                  value={newPassword}

                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }

                  placeholder="Enter new password"

                  style={{

                    height:
                      "55px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid #e5e7eb",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#fff",

                    color:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-4">

                <Label>
                  Confirm Password
                </Label>

                <Input
                  type="password"

                  value={confirmPassword}

                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }

                  placeholder="Confirm new password"

                  style={{

                    height:
                      "55px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid #e5e7eb",

                    background:
                      darkMode
                        ? "#0f172a"
                        : "#fff",

                    color:
                      darkMode
                        ? "white"
                        : "black"

                  }}
                />

              </div>

            </div>

            {/* PRIVACY */}
            <div className="mb-5">

              <h3
                style={{

                  fontWeight:
                    "600",

                  marginBottom:
                    "25px"

                }}
              >
                Privacy & Notifications
              </h3>

              <div className="d-flex align-items-center gap-3">

                <Input
                  type="checkbox"

                  checked={showBio}

                  onChange={() =>
                    setShowBio(
                      !showBio
                    )
                  }
                />

                <span
                  style={{
                    fontSize:
                      "16px"
                  }}
                >
                  Show bio
                </span>

              </div>

            </div>

            {/* BUTTONS */}
            <div
              className="d-flex justify-content-end gap-3"

              style={{
                marginTop:
                  "50px"
              }}
            >

              <Button

                color={
                  darkMode
                    ? "dark"
                    : "light"
                }

                className="border"

                style={{

                  padding:
                    "10px 28px",

                  borderRadius:
                    "12px"

                }}

                onClick={() =>
                  navigate("/profile")
                }
              >
                Cancel
              </Button>

              <Button
                color="primary"

                style={{

                  padding:
                    "10px 28px",

                  borderRadius:
                    "12px",

                  background:
                    "#6d5dfc",

                  border:
                    "none"

                }}

                onClick={handleSave}
              >
                Save Changes
              </Button>

            </div>

          </CardBody>

        </Card>

      </Col>

      {/* RIGHT */}
      <Col
        md="2"

        style={{

          borderLeft:
            darkMode
              ? "1px solid #374151"
              : "1px solid #ddd",

          minHeight:
            "100vh",

          background:
            darkMode
              ? "#111827"
              : "#fff"

        }}
      />

    </Row>

  );

};

export default EditProfile;