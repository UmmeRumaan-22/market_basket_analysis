import { useState } from "react";

import API from "../api/axios";

import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/signup",
        form
      );

      alert("Signup Successful");

      navigate("/");
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
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          className="form-control mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

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
          Signup
        </button>

        <p className="mt-3">
          Already have account?
          {" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;