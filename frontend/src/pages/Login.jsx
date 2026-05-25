import { useState } from "react";

import API from "../api/axios";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>
          Login To Continue
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button className="btn btn-primary w-100">
          Login
        </button>

        <p className="mt-3">
          No account?
          {" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;