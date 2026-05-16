import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../validations/RegisterValidation";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/UserSlice";

import { useEffect } from "react";

const Register = () => {

  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RegisterValidation)
  });

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      username: data.username,
      password: data.password,
      profilepic: data.profilepic || "https://i.imgur.com/6VBx3io.png"
    };

    dispatch(addUser(userData));
  };

  useEffect(() => {
    if (message === "User Registered...") {
  navigate("/"); 
}
  }, [message]);

  return (
    <Container fluid>
      <Row className="vh-100">

        {/* LEFT SIDE */}
        <Col
          md="6"
          style={{
            background: "linear-gradient(135deg, #5f5cff, #7c3aed)",
            color: "white",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h1 style={{ fontWeight: "bold" }}>Vibe</h1>
            <p>Share your world. Connect with people who share your passion.</p>

            {/* CARD 1 */}
            <div style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "20px"
            }}>
              <h5>Alex Chen</h5>
              <p>Just shipped a new feature! 🚀</p>
              <span>❤️ 13 💬 7</span>
            </div>

            {/* CARD 2 */}
            <div style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "15px"
            }}>
              <h5>Maya Patel</h5>
              <p>Beautiful sunset today 🌅</p>
              <span>❤️ 48 💬 5</span>
            </div>

            {/* CARD 3 */}
            <div style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "15px"
            }}>
              <h5>Jordan Lee</h5>
              <p>Working on something exciting...</p>
              <span>❤️ 5 💬 3</span>
            </div>
          </div>

          <small>© 2026 Vibe · Share your world</small>
        </Col>

        {/* RIGHT SIDE */}
        <Col
          md="6"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f5f5"
          }}
        >
          <Card style={{
            width: "420px",
            padding: "10px",
            borderRadius: "12px"
          }}>
            <CardBody>

              <h2>Join Vibe</h2>
              <p>Create your account and start sharing</p>

              {/* TOP BUTTONS */}
              <div className="d-flex mb-3">
                <Link to="/" className="btn btn-light w-50 me-2">
                  Sign In
                </Link>

                <Button
                  className="w-50"
                  style={{
                    background: "linear-gradient(135deg, #5f5cff, #7c3aed)",
                    border: "none",
                    color: "white"
                  }}
                >
                  Register
                </Button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)}>

                <FormGroup>
                  <Label>Username</Label>
                  <input
                    className="form-control"
                    placeholder="@username"
                    {...register("username")}
                  />
                  <small style={{ color: "red" }}>
                    {errors.username?.message}
                  </small>
                </FormGroup>

                <FormGroup>
                  <Label>Email</Label>
                  <input
                    className="form-control"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  <small style={{ color: "red" }}>
                    {errors.email?.message}
                  </small>
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("password")}
                  />
                  <small style={{ color: "red" }}>
                    {errors.password?.message}
                  </small>
                </FormGroup>

                <FormGroup>
                  <Label>Confirm Password</Label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("confirmPassword")}
                  />
                  <small style={{ color: "red" }}>
                    {errors.confirmPassword?.message}
                  </small>
                </FormGroup>

                <FormGroup>
                  <Label>Profile Picture URL</Label>
                  <input
                    className="form-control"
                    placeholder="optional"
                    {...register("profilepic")}
                  />
                </FormGroup>

                <Button
                  type="submit"
                  className="w-100 mt-2"
                  style={{
                    background: "linear-gradient(135deg, #5f5cff, #7c3aed)",
                    border: "none",
                    color: "white"
                  }}
                >
                  Create Account
                </Button>

                <p className="text-center mt-3">
                  Already have an account? <Link to="/">Sign in</Link>
                </p>

              </form>

            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default Register;