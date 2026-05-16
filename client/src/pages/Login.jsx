import { Button, FormGroup, Label } from "reactstrap";
import { LoginValidation } from "../validations/LoginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

  //  useState (same pattern as register)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginValidation)
  });

  //  handle login
  const handleLogin = (data) => {
    console.log("LOGIN DATA:", data);

    const udata = {
      email: data.email,
      password: data.password
    };

    dispatch(login(udata));
  };

  //  redirect after success
  useEffect(() => {
    if (isSuccess && user) {
      navigate("/home");
    }
  }, [isSuccess, user]);

  return (
    <div className="d-flex vh-100">

      {/* LEFT SIDE (same design as register) */}
      <div
        className="text-white d-flex flex-column justify-content-between p-5"
        style={{
          width: "50%",
          background: "linear-gradient(135deg, #5f5cff, #7c3aed)",
        }}
      >
        <div>
          <h1 className="fw-bold mb-3">Vibe</h1>
          <p>
            Share your world. Connect with people who share your passion.
          </p>
        </div>

        <div>
          {["Alex Chen", "Maya Patel", "Jordan Lee"].map((name, i) => (
            <div
              key={i}
              className="p-3 mb-3"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
              }}
            >
              <strong>{name}</strong>
              <p className="mb-1">Just shipped a new feature! 🚀</p>
              <small>❤️ 13 💬 7</small>
            </div>
          ))}
        </div>

        <small>© 2026 Vibe · Share your world</small>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: "50%", background: "#f5f5f5" }}
      >
        <div style={{ width: "380px" }}>

          <h2 className="fw-bold">Welcome back</h2>
          <p className="text-muted">Sign in to continue</p>

          {/* Tabs */}
          <div className="d-flex mb-3">
            <Button
              className="w-50 text-white me-2"
              style={{
                background: "linear-gradient(135deg, #5f5cff, #7c3aed)",
                border: "none",
              }}
            >
              Sign In
            </Button>

            <Link to="/register" className="btn w-50 border">
              Register
            </Link>
          </div>

          <form onSubmit={submitForm(handleLogin)}>

            {/* Message */}
            {message && (
              <p className="text-danger text-center">{message}</p>
            )}

            {/* Email */}
            <FormGroup>
              <Label>Email</Label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                {...register("email", {
                  onChange: (e) => setEmail(e.target.value)
                })}
              />
              <small className="text-danger">{errors.email?.message}</small>
            </FormGroup>

            {/* Password */}
            <FormGroup>
              <Label>Password</Label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                {...register("password", {
                  onChange: (e) => setPassword(e.target.value)
                })}
              />
              <small className="text-danger">{errors.password?.message}</small>
            </FormGroup>

            <Button
              type="submit"
              className="w-100 mt-2 text-white"
              style={{
                background: "linear-gradient(135deg, #5f5cff, #7c3aed)",
                border: "none",
              }}
            >
              Sign In
            </Button>

          </form>

          <p className="text-center mt-3">
            No account? <Link to="/register">Sign Up</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;