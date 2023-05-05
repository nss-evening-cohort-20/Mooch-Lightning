import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Utils/authUtils";
import "./Login.css";
import { EMAIL_SIGN_IN, GOOGLE_SIGN_IN } from "../../Utils/Constants";


export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const updateLogin = (evt) => {
    const copy = { ...login };
    copy[evt.target.id] = evt.target.value;
    setLogin(copy);
  };

  // Login 
  const handleAuthenticate = async (e, signInMethod) => {
    e.preventDefault();
    authenticate(login, navigate, signInMethod);
  };


  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={(e) => handleAuthenticate(e, EMAIL_SIGN_IN)}>
          <h1>Project Name</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={login.email}
              id="email"
              onChange={(evt) => updateLogin(evt)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              value={login.password}
              id="password"
              onChange={(evt) => updateLogin(evt)}
              className="form-control"
              placeholder="password"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
      <h2>Login With Google?</h2>
      <button type="submit" onClick={(e) => handleAuthenticate(e, GOOGLE_SIGN_IN)}>
        Let's Do It!
      </button>
    </main>
  );
};
