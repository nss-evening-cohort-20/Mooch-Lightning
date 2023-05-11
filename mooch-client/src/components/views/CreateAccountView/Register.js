import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Utils/authUtils";
import "../LoginView/Login.css";
import { EMAIL_REGISTER } from "../../Utils/Constants";
import { Card, Form, FormGroup, Label, Input, Button, CardText, CardBody } from "reactstrap";

export const Register = ({ setRegister }) => {
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
    <Card style={{
      textAlign: "center",
      backgroundColor: "black",
      minHeight: "100vh",
      height: "100%",
      border: "1px solid #2A2B37",
      padding: "7px 20px 20px",
      borderRadius: "0",
      transition: "1s",
      fontFamily: 'Vina Sans, cursive',
      color: "white",
      fontSize: "25px"
    }}>
      <CardBody>
        <CardText
          style={{
            fontSize: "50px",
            color: "grey"
          }}>
          Please Register
        </CardText>
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label htmlFor="email"
              style={{
                width: "100%",
                textAlign: "left"
              }}> Email address </Label>
            <Input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              style={{
                fontSize: "20px",
                color: "grey"
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password"
              style={{
                width: "100%",
                textAlign: "left"
              }}> Password </Label>
            <Input
              onChange={updateUser}
              type="text"
              id="password"
              className="form-control"
              placeholder="Must Be 6 Characters"
              required
              autoFocus
              style={{
                fontSize: "20px",
                color: "grey"
              }}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit"
              style={{
                fontSize: "20px",
                padding: "5px 15px"
              }}> Register </Button>
          </FormGroup>
        </Form>
        <h2
          style={{ marginTop: "6vh" }}>Register With Google?</h2>
        <Button type="submit" onClick={handleRegister}
          style={{
            fontSize: "20px",
            padding: "5px 15px",
            width: "fit-content",
            margin: "0 auto"
          }}>
          Let's Do It!
        </Button>
        <CardText
          style={{
            marginTop: "8vh",
            fontSize: "32px"
          }}>
          Already a user?
        </CardText>
        <CardText
          style={{
            fontSize: "28px",
            color: "blue",
            cursor: "pointer"
          }}
          onClick={
            () => {
              setRegister(false)
            }
          }>
          Sign In
        </CardText>
      </CardBody>
    </Card>
  );
};
