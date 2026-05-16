import {

  Col,

  Card,

  CardBody,

  Button

} from "reactstrap";

import {

  useDispatch,

  useSelector

} from "react-redux";

import {

  toggleFollow,

  getFollowers

} from "../features/FollowersSlice";

const RightSideBar = ({

  darkMode,

  users,

  user

}) => {

  const dispatch =
    useDispatch();

  const {

    following

  } = useSelector(

    (state) =>

      state.followers

  );

  //  FOLLOW BUTTON
  const handleFollow =
    async (followingEmail) => {

      await dispatch(

        toggleFollow({

          followerEmail:
            user?.email,

          followingEmail

        })

      );

      dispatch(

        getFollowers(
          user?.email
        )

      );

    };

  return (

    <Col

      md="3"

      style={{

        borderLeft:
          darkMode

            ? "1px solid #374151"

            : "1px solid #eee",

        minHeight:
          "100vh",

        padding:
          "25px",

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

      {/* TRENDING */}
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

              : "#fff",

          color:
            darkMode

              ? "white"

              : "black",

          boxShadow:
            darkMode

              ? "none"

              : "0 1px 4px rgba(0,0,0,0.04)"

        }}
      >

        <CardBody>

          <h3
            style={{

              fontWeight:
                "700",

              marginBottom:
                "18px"

            }}
          >
            Trending
          </h3>

          <p
            style={{

              color:
                darkMode

                  ? "#cbd5e1"

                  : "#777",

              fontSize:
                "14px",

              marginBottom:
                "0"

            }}
          >
            No trending hashtags yet.
          </p>

        </CardBody>

      </Card>

      {/* WHO TO FOLLOW */}
      <Card

        style={{

          borderRadius:
            "18px",

          border:
            "none",

          background:
            darkMode

              ? "#1e293b"

              : "#fff",

          color:
            darkMode

              ? "white"

              : "black",

          boxShadow:
            darkMode

              ? "none"

              : "0 1px 4px rgba(0,0,0,0.04)"

        }}
      >

        <CardBody>

          <h3
            style={{

              fontWeight:
                "700",

              marginBottom:
                "22px"

            }}
          >
            Who to Follow
          </h3>

          {users

            .filter(

              (u) =>

                u.email !==
                user?.email

            )

            .slice(0, 5)

            .map((u) => {

              //  CHECK IF FOLLOWING
              const isFollowing =
                following.some(

                  (f) =>

                    f.followingEmail ===
                    u.email

                );

              return (

                <div

                  key={u._id}

                  className="d-flex align-items-center justify-content-between"

                  style={{
                    marginBottom:
                      "22px"
                  }}
                >

                  {/* USER */}
                  <div className="d-flex align-items-center gap-3">

                    <img

                      src={
                        u.profilepic ||
                        "https://i.imgur.com/6VBx3io.png"
                      }

                      alt="profile"

                      style={{

                        width:
                          "48px",

                        height:
                          "48px",

                        borderRadius:
                          "50%",

                        objectFit:
                          "cover"

                      }}
                    />

                    <div>

                      <div
                        style={{

                          fontWeight:
                            "700",

                          fontSize:
                            "16px"

                        }}
                      >
                        {u.username}
                      </div>

                      <div
                        style={{

                          fontSize:
                            "13px",

                          color:
                            darkMode

                              ? "#94a3b8"

                              : "#777"

                        }}
                      >
                        @{u.username}
                      </div>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <Button

                    size="sm"

                    color={
                      isFollowing

                        ? "secondary"

                        : "primary"
                    }

                    style={{

                      borderRadius:
                        "12px",

                      padding:
                        "7px 16px",

                      fontWeight:
                        "600",

                      border:
                        "none"

                    }}

                    onClick={() =>
                      handleFollow(
                        u.email
                      )
                    }
                  >

                    {isFollowing

                      ? "Following"

                      : "Follow"}

                  </Button>

                </div>

              );

            })}

        </CardBody>

      </Card>

    </Col>

  );

};

export default RightSideBar;