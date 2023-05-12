import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Utils/authUtils";
import "../LoginView/Login.css";
import { DIRTY_WHITE, EMAIL_REGISTER } from "../../Utils/Constants";
import { Card, Form, FormGroup, Label, Input, Button, CardText, CardBody } from "reactstrap";
import { DARK_GRAY, SLATE, LIGHT_GRAY, WHITE, BLACK } from "../../Utils/Constants";

export const Register = ({ setRegister }) => {

  const [hover, setHover] = useState(false)
  const [bttnHover, setBttnHover] = useState({
    BTTN1: false,
    BTTN2: false
  })

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
      backgroundColor: `${BLACK}`,
      minHeight: "100vh",
      height: "100%",
      border: "1px solid #2A2B37",
      padding: "7px 20px 20px",
      borderRadius: "0",
      transition: "1s",
      fontFamily: 'Vina Sans, cursive',
      color: `${WHITE}`,
      fontSize: "25px",

    }}>
      <CardBody>
        <CardText
          style={{
            fontSize: "50px",
            color: `${WHITE}`,
            position: `relative`,
            zIndex: "1"
          }}>
          Please <span style={{ color: "orange" }}>Register</span>
        </CardText>
        <CardText
          style={{
            fontSize: "50px",
            color: `${LIGHT_GRAY}`,
            position: "relative",
            bottom: "88px",
            left: "4px",
            zIndex: "0",
            height: "0"
          }}>
          Please Register
        </CardText>
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label htmlFor="email"
              style={{
                width: "100%",
                textAlign: "left"
              }}> <span style={{ color: "orange" }}>Email</span> address </Label>
            <Input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              style={{
                fontSize: "20px",
                color: `${LIGHT_GRAY}`
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password"
              style={{
                width: "100%",
                textAlign: "left"
              }}> <span style={{ color: "orange" }}>Pass</span>word </Label>
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
                color: `${LIGHT_GRAY}`
              }}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit"
              style={{
                fontSize: "20px",
                padding: "5px 15px",
                color: bttnHover.BTTN1 ? `${WHITE}` : `${SLATE}`,
                backgroundColor: bttnHover.BTTN1 ? `${SLATE}` : `${LIGHT_GRAY}`
              }}
              onMouseEnter={
                () => {
                  setBttnHover({ BTTN1: true })
                }
              }
              onMouseLeave={
                () => {
                  setBttnHover({ BTTN1: false })
                }
              }
            > Register </Button>
          </FormGroup>
        </Form>
        <h2
          style={{ marginTop: "6vh" }}>Register With <span style={{ color: "orange" }}>Google?</span></h2>
        <Button type="submit" onClick={handleRegister}
          style={{
            fontSize: "20px",
            padding: "5px 15px",
            width: "fit-content",
            margin: "0 auto",
            color: bttnHover.BTTN2 ? `${WHITE}` : `${SLATE}`,
            backgroundColor: bttnHover.BTTN2 ? `${SLATE}` : `${LIGHT_GRAY}`
          }}
          onMouseEnter={
            () => {
              setBttnHover({ BTTN2: true })
            }
          }
          onMouseLeave={
            () => {
              setBttnHover({ BTTN2: false })
            }
          }>
          Let's Do It!
        </Button>
        <CardText
          style={{
            marginTop: "8vh",
            fontSize: "32px"
          }}>
          Already a <span style={{ color: "orange" }}>user</span>?
        </CardText>
        <CardText
          style={{
            fontSize: "28px",
            color: hover ? `orange` : `${LIGHT_GRAY}`,
            cursor: "pointer",
            position: "relative",
            zIndex: "1"
          }}
          onClick={
            () => {
              setRegister(false)
            }
          }
          onMouseEnter={
            () => {
              setHover(true)
            }
          }
          onMouseLeave={
            () => {
              setHover(false)
            }
          }
        >
          Sign In
        </CardText>
        <CardText
          style={{
            fontSize: "28px",
            color: `${DARK_GRAY}`,
            cursor: "pointer",
            position: "relative",
            zIndex: "0",
            bottom: "55px",
            left: "3px"
          }}>Sign In</CardText>
      </CardBody>
    </Card>
  );
};
