import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginView/Login.css";
import { ROUTE_CONSTANTS, getCurrentUser } from "../../Utils/Constants";

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

  const localUser = getCurrentUser();



  // Register with email and password
  const handleRegister = async (e) => {

    const userCopy = { ...user }
    userCopy.FirebaseUid = localUser.uid;
    userCopy.email = localUser.email;
    e.preventDefault();
    fetch(`${ROUTE_CONSTANTS.API_URL}/user`, {
      method: "POST",
      body: JSON.stringify(userCopy),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localUser.accessToken}`
      }
    })
      .then(resp => resp.json())
      .then(jsonResp => {
        userCopy.id = jsonResp.id;
        localStorage.setItem("mooch_user", JSON.stringify(userCopy));
        navigate("/");
      })
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };



  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Create an Account</h1>
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
          <label htmlFor="userName">User Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="userName"
            className="form-control"
            placeholder="User name"
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
          <label htmlFor="subscriptionLevelId"> Subscription Level </label>
          <input
            onChange={updateUser}
            type="number"
            id="subscriptionLevelId"
            className="form-control"
            placeholder="1-3"
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
