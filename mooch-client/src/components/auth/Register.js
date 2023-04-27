import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../Utils/authUtils";
import "./Login.css";
import { EMAIL_REGISTER } from "../Utils/Constants";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  // Register with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    authenticate(user, navigate, EMAIL_REGISTER);
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };


  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password </label>
          <input
            onChange={updateUser}
            type="text"
            id="password"
            className="form-control"
            placeholder="Must Be 6 Characters"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
      <h2>Register With Google?</h2>
      <button type="submit" onClick={handleRegister}>
        Let's Do It!
      </button>
    </main>
  );
};
