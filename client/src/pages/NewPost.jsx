import { useState, useEffect } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

import {
  Container,
  Card,
  CardBody,
  Input,
  Button
} from "reactstrap";

import {
  createPost,
  getPosts
} from "../features/PostSlice";

const NewPost = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    user
  } = useSelector(
    (state) => state.user
  );

  const [postMsg,
    setPostMsg] =
    useState("");

  const [postImage,
    setPostImage] =
    useState("");

  const [address,
    setAddress] =
    useState("");

  //PUBLIC / PRIVATE
  const [isPublic,
    setIsPublic] =
    useState(true);

  // LOCATION
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        async (pos) => {

          const lat =
            pos.coords.latitude;

          const lng =
            pos.coords.longitude;

          try {

            const res =
              await fetch(

                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=87cd1a4424d84515ad3f67d9224dfedd`

              );

            const data =
              await res.json();

            const comp =
              data.results[0]?.components;

            const place =

              comp?.suburb ||

              comp?.neighbourhood ||

              comp?.road ||

              comp?.city ||

              "";

            const city =

              comp?.city ||

              comp?.town ||

              comp?.state ||

              "";

            const country =
              comp?.country || "";

            let location = "";

            if (place && city) {

              location =
                `${place}, ${city}`;

            }

            else if (
              city &&
              country
            ) {

              location =
                `${city}, ${country}`;

            }

            else {

              location =

                place ||

                city ||

                country ||

                "Unknown location";

            }

            setAddress(location);

          }

          catch (err) {

            console.log(
              "Geocode error:",
              err
            );

          }

        },

        () => {

          console.log(
            "Location denied"
          );

        }

      );

    }

  }, []);

  // CREATE POST
  const handlePost =
    async () => {

      if (!postMsg.trim())
        return;

      if (
        !user ||
        !user.email
      ) {

        alert(
          "Please login again"
        );

        return;

      }

      await dispatch(

        createPost({

          email:
            user.email,

          username:
            user.username,

          profilepic:
            user.profilepic,

          postMsg,

          postImage,

          address:
            address || "",

          // PUBLIC / PRIVATE
          isPublic,

          lat: 0,

          lng: 0

        })

      );

      dispatch(
        getPosts()
      );

      navigate("/home");

    };

  return (

    <div
      style={{

        minHeight:
          "100vh",

        background:
          "#f5f5f5",

        padding:
          "40px 20px"

      }}
    >

      <Container>

        {/* MAIN CARD */}
        <Card
          style={{

            maxWidth:
              "950px",

            margin:
              "auto",

            border:
              "none",

            borderRadius:
              "20px",

            boxShadow:
              "0 2px 10px rgba(0,0,0,0.05)"

          }}
        >

          <CardBody
            style={{
              padding:
                "40px"
            }}
          >

            <h2
              style={{

                fontWeight:
                  "600",

                marginBottom:
                  "35px"

              }}
            >
              Create a Post
            </h2>

            {/* USER */}
            <div className="d-flex align-items-center mb-4">

              <img
                src={
                  user?.profilepic ||
                  "https://i.imgur.com/6VBx3io.png"
                }

                alt="profile"

                style={{

                  width:
                    "60px",

                  height:
                    "60px",

                  borderRadius:
                    "50%",

                  objectFit:
                    "cover",

                  marginRight:
                    "15px"

                }}
              />

              <div>

                <h5
                  style={{
                    margin:
                      "0",

                    fontWeight:
                      "600"
                  }}
                >
                  {user?.username}
                </h5>

                <p
                  style={{
                    margin:
                      "0",

                    color:
                      "#777"
                  }}
                >
                  @{user?.username}
                </p>

              </div>

            </div>

            {/* POST CONTENT */}
            <div className="mb-4">

              <p
                style={{

                  fontWeight:
                    "500",

                  marginBottom:
                    "10px"

                }}
              >
                Post Content
              </p>

              <Input
                type="textarea"

                value={postMsg}

                onChange={(e) =>
                  setPostMsg(
                    e.target.value
                  )
                }

                placeholder="What's happening?"

                maxLength={280}

                style={{

                  height:
                    "180px",

                  borderRadius:
                    "14px",

                  padding:
                    "20px",

                  resize:
                    "none",

                  fontSize:
                    "16px"

                }}
              />

              <div
                style={{

                  textAlign:
                    "right",

                  color:
                    "#777",

                  marginTop:
                    "10px"

                }}
              >
                {postMsg.length}/280
              </div>

            </div>

            {/* IMAGE */}
            <div className="mb-4">

              <p
                style={{

                  fontWeight:
                    "500",

                  marginBottom:
                    "10px"

                }}
              >
                Attach Image (optional)
              </p>

              <Input
                type="text"

                value={postImage}

                onChange={(e) =>
                  setPostImage(
                    e.target.value
                  )
                }

                placeholder="Paste image URL..."

                style={{

                  height:
                    "50px",

                  borderRadius:
                    "12px"

                }}
              />

              {/* PREVIEW */}
              {postImage && (

                <img
                  src={postImage}

                  alt="preview"

                  style={{

                    width:
                      "100%",

                    marginTop:
                      "20px",

                    borderRadius:
                      "16px",

                    maxHeight:
                      "450px",

                    objectFit:
                      "cover"

                  }}
                />

              )}

            </div>

            {/* LOCATION */}
            <div className="mb-5">

              <p
                style={{

                  fontWeight:
                    "500",

                  marginBottom:
                    "10px"

                }}
              >
                Location (optional)
              </p>

              <Input
                value={address}

                readOnly

                style={{

                  height:
                    "50px",

                  borderRadius:
                    "12px"

                }}
              />

            </div>

            {/* PUBLIC POST */}
            <div className="mb-5 d-flex align-items-center">

              <Input
                type="checkbox"

                checked={isPublic}

                onChange={() =>
                  setIsPublic(
                    !isPublic
                  )
                }

                style={{
                  marginRight:
                    "10px"
                }}
              />

              <span>
                Public post
              </span>

            </div>

            {/* BUTTONS */}
            <div className="d-flex justify-content-end gap-3">

              <Button
                color="light"

                onClick={() =>
                  navigate("/home")
                }

                style={{

                  padding:
                    "10px 25px"

                }}
              >
                Cancel
              </Button>

              <Button
                color="primary"

                onClick={handlePost}

                style={{

                  padding:
                    "10px 25px",

                  borderRadius:
                    "10px",

                  background:
                    "#6366f1",

                  border:
                    "none"

                }}
              >
                Post
              </Button>

            </div>

          </CardBody>

        </Card>

      </Container>

    </div>

  );

};

export default NewPost;