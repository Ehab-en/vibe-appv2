import { Col, Button } from "reactstrap";

import {

  FaHome,

  FaCompass,

  FaBell,

  FaUser,

  FaSignOutAlt

} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const SideBar = ({

  darkMode,

  handleLogout

}) => {

  const navigate =
    useNavigate();

  return (

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
            "#5f5cff",

          fontWeight:
            "bold",

          marginBottom:
            "40px",

          fontSize:
            "50px"

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

          fontWeight:
            "bold",

          color:
            "#5f5cff",

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

        onClick={() =>
          navigate("/explore")
        }
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

        onClick={() =>
          navigate("/notifications")
        }
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
            "18px"

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

      {/* NEW POST BUTTON */}
      <Button

        color="primary"

        className="w-100 mt-3"

        style={{

          borderRadius:
            "12px",

          background:
            "#5f5cff",

          border:
            "none",

          padding:
            "12px"

        }}

        onClick={() =>
          navigate("/newpost")
        }
      >
        + New Post
      </Button>

      {/* SIGN OUT */}
      <div

        onClick={handleLogout}

        style={{

          marginTop:
            "28px",

          color:
            "#ef4444",

          fontWeight:
            "600",

          display:
            "flex",

          alignItems:
            "center",

          gap:
            "10px",

          fontSize:
            "16px",

          opacity:
            "0.7",

          cursor:
            "pointer"

        }}
      >

        <FaSignOutAlt />

        Sign out

      </div>
    </Col>

  );

};

export default SideBar;