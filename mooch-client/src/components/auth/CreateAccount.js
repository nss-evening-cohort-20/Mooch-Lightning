import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../helpers/googleAuth";
import { emailAuth } from "../helpers/emailAuth";
import "./Login.css";

export const CreateAccount = () => {
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    FirebaseUid: "",
    subscriptionLevelId: 0,
    imageUrl: ""
  });
  let navigate = useNavigate();

  // Register with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    emailAuth.register(user, navigate);
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
          <label htmlFor="firstName">First Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="firstName"
            className="form-control"
            placeholder="FirstName"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Must Be 6 Characters"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="imageUrl"> Image URL </label>
          <input
            onChange={updateUser}
            type="text"
            id="imageUrl"
            className="form-control"
            placeholder="Must Be 6 Characters"
            autoFocus
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Create Account </button>
        </fieldset>
      </form>
    </main>
  );
};
