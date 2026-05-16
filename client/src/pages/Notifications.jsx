import { useEffect } from "react";

import axios from "axios";

import {

  useDispatch,

  useSelector

} from "react-redux";

import {

  Row,

  Col,

  Card,

  CardBody

} from "reactstrap";

import {

  FaHeart,

  FaComment,

  FaUserPlus,

  FaTimes

} from "react-icons/fa";

import {

  getNotifications

} from "../features/NotificationsSlice";

import SideBar from "./SideBar";

const Notifications = () => {

  const dispatch =
    useDispatch();

  const user =
    useSelector(

      (state) =>

        state.user.user

    );

  const {

    notifications

  } = useSelector(

    (state) =>

      state.notifications

  );

  const darkMode =
    localStorage.getItem(

      "darkMode"

    ) === "true";

  //  LOAD NOTIFICATIONS
  useEffect(() => {

    if (user?.email) {

      dispatch(

        getNotifications(
          user.email
        )

      );

    }

  }, []);

  //  DELETE NOTIFICATION
  const deleteNotification =
    async (id) => {

      try {

        await axios.delete(

          `https://vibe-appv2.onrender.com/deleteNotification/${id}`

        );

        dispatch(

          getNotifications(
            user.email
          )

        );

      }

      catch (error) {

        console.log(error);

      }

    };

  //  ICONS
  const getIcon = (type) => {

    if (type === "like") {

      return (

        <FaHeart
          color="red"
        />

      );

    }

    if (type === "comment") {

      return (

        <FaComment
          color="#5f5cff"
        />

      );

    }

    return (

      <FaUserPlus
        color="#5f5cff"
      />

    );

  };

  //  TEXT
  const getText = (type) => {

    if (type === "like") {

      return "liked your post";

    }

    if (type === "comment") {

      return "commented on your post";

    }

    return "started following you";

  };

  return (

    <Row className="m-0">

      <SideBar
        darkMode={darkMode}
      />

      <Col

        md="10"

        style={{

          minHeight:
            "100vh",

          padding:
            "30px",

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

        <h1
          style={{

            fontWeight:
              "700",

            marginBottom:
              "30px",

            fontSize:
              "48px"

          }}
        >
          Notifications
        </h1>

        {/* NOTIFICATIONS */}
        {notifications.map((n, i) => {

          const userData =
            n.user?.[0];

          return (

            <Card

              key={i}

              style={{

                marginBottom:
                  "20px",

                border:
                  "none",

                borderRadius:
                  "18px",

                background:
                  darkMode

                    ? "#1e293b"

                    : "white",

                color:
                  darkMode

                    ? "white"

                    : "black",

                boxShadow:
                  darkMode

                    ? "none"

                    : "0 2px 8px rgba(0,0,0,0.04)"

              }}
            >

              <CardBody
                style={{
                  padding:
                    "22px"
                }}
              >

                <div className="d-flex justify-content-between">

                  
                  <div className="d-flex gap-3">

                    {/* PROFILE */}
                    <img

                      src={
                        userData?.profilepic ||

                        "https://i.imgur.com/6VBx3io.png"
                      }

                      alt="profile"

                      style={{

                        width:
                          "52px",

                        height:
                          "52px",

                        borderRadius:
                          "50%",

                        objectFit:
                          "cover"

                      }}
                    />

                    <div>

                      <div

                        className="d-flex align-items-center gap-2"

                        style={{
                          marginBottom:
                            "4px"
                        }}
                      >

                        {getIcon(n.type)}

                        <strong
                          style={{
                            fontSize:
                              "20px"
                          }}
                        >
                          {userData?.username}
                        </strong>

                        <span
                          style={{
                            fontSize:
                              "18px"
                          }}
                        >
                          {getText(n.type)}
                        </span>

                      </div>

                      {/* TIME */}
                      <div
                        style={{

                          color:
                            darkMode

                              ? "#94a3af"

                              : "#777",

                          fontSize:
                            "15px"

                        }}
                      >

                        {new Date(

                          n.createdAt

                        ).toLocaleString()}

                      </div>

                    </div>

                  </div>

                  {/* CLOSE */}
                  <FaTimes

                    onClick={() =>
                      deleteNotification(
                        n._id
                      )
                    }

                    style={{

                      color:
                        "#9ca3af",

                      cursor:
                        "pointer"

                    }}
                  />

                </div>

              </CardBody>

            </Card>

          );

        })}

      </Col>

    </Row>

  );

};

export default Notifications;