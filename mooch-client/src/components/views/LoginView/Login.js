import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Utils/authUtils";
import "./Login.css";
import { EMAIL_SIGN_IN, GOOGLE_SIGN_IN } from "../../Utils/Constants";
import { Card, CardHeader, CardText, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap"
import { Register } from "../CreateAccountView/Register";
import { Creators } from "./Creators";


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

  const [displayLogin, setDisplayLogin] = useState(false)
  const [register, setRegister] = useState(false)


  const teamMembers = [
    { name: "Chase Burnett", url: "https://github.com/ChaseBurnett" },
    { name: "Cristi Neames", url: "https://github.com/crisneames" },
    { name: "Jeremy White", url: "https://github.com/JeremyWhiteDev" },
    { name: "Robert Stroud", url: "https://github.com/r-stroud" },
    { name: "Yogi", url: "https://github.com/chyogi" }]


  return (
    <main className="container--login"
      style={{
        // display: "flex",
        // justifyContent: "center",
        padding: "0px",
      }}>

      {/* <form className="form--login" onSubmit={(e) => handleAuthenticate(e, EMAIL_SIGN_IN)}> */}

      {/* title card */}
      <Card
        style={{
          border: "1px solid #2A2B37",
          backgroundColor: "#2A2B37",
          width: "100%",
          padding: "20px",
          borderRadius: "0",
          height: "100%",
          minHeight: "100vh"
        }}
      >
        <CardHeader
          style={{
            color: "grey",
            border: "none"
          }}>

          <CardText tag="h2"
            style={{
              fontFamily: 'Vina Sans, cursive',
              fontSize: "18vh",
              textAlign: "center"
            }}
          >
            Mooch
          </CardText>
        </CardHeader>
        <CardBody
          style={{
            fontFamily: 'Vina Sans, cursive',
            fontSize: "6vh",
            color: "white",
            textAlign: "center"
          }}  >
          <CardText
            style={{ marginTop: "5vh" }}>
            The one and only subscrition sharing web application.
          </CardText>
          <Button
            style={{
              fontSize: "25px",
              padding: "5px 20px",
              marginTop: "6vh"
            }}
            onClick={
              () => {
                setDisplayLogin(true)
              }
            }>
            Sign In
          </Button>
          <CardText
            style={{
              marginTop: "19vh",
              fontSize: "4vh"
            }}>
            Created By:
          </CardText>
          <CardBody
            className="d-flex"
            style={{
              justifyContent: "space-around",
              fontSize: "4vh",
              width: "60%",
              margin: "auto"
            }}>

            {teamMembers.map((x, index) => {
              return <Creators
                x={x}
                index={index} />
            })}
          </CardBody>
        </CardBody>
      </Card>

      {/* sign in card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          width: "100%",
          position: "fixed",
          top: "0",
          display: displayLogin ? "flex" : "none",
          justifyContent: "end"

        }}
        onClick={
          () => {
            setDisplayLogin(false)
            setTimeout(
              () => { setRegister(false) }, 1000)
          }
        }
      >
      </div>

      <div
        style={{
          position: "fixed",
          top: "0",
          right: displayLogin ? "0" : "-500px",
          transition: "1s",
          width: "350px"
        }}
      >
        {register ? <Register
          setRegister={setRegister}></Register> :
          <Card
            style={{
              border: "1px solid #2A2B37",
              backgroundColor: "black",
              minHeight: "100vh",
              height: "100%",
              padding: "20px",
              borderRadius: "0",
              transition: "1s"
            }}>
            <CardHeader
              style={{
                color: "grey",
                border: "none"
              }}>

              <CardText tag="h2"
                style={{
                  fontFamily: 'Vina Sans, cursive',
                  fontSize: "50px",
                  textAlign: "center"
                }}
              >
                Please sign in
              </CardText>
            </CardHeader>
            <CardBody
              style={{
                fontFamily: 'Vina Sans, cursive',
                fontSize: "25px",
                color: "white",
                textAlign: "center"
              }}  >
              <Form
                onSubmit={(e) => handleAuthenticate(e, EMAIL_SIGN_IN)}>
                <FormGroup>
                  <Label for="inputEmail"
                    style={{
                      width: "100%",
                      textAlign: "left"
                    }}>
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={login.email}
                    onChange={(evt) => updateLogin(evt)}
                    placeholder="Email address"
                    required
                    autoFocus
                    style={{
                      fontSize: "20px",
                      color: "grey"
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="inputPassword"
                    style={{
                      width: "100%",
                      textAlign: "left"
                    }}>
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={login.password}
                    onChange={(evt) => updateLogin(evt)}
                    placeholder="password"
                    required
                    autoFocus
                    style={{
                      fontSize: "20px",
                      color: "grey"
                    }} />

                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    style={{
                      fontSize: "20px",
                      padding: "5px 15px"
                    }}>
                    Sign In
                  </Button>
                </FormGroup>
              </Form>


              <h2
                style={{
                  marginTop: "6vh"
                }}>Login With Google?</h2>
              <Button type="submit"
                onClick={(e) => handleAuthenticate(e, GOOGLE_SIGN_IN)}
                style={{
                  fontSize: "20px",
                  padding: "5px 15px"
                }}>
                Let's Do It!
              </Button>
              <section style={{
                marginTop: "6vh"
              }}>
                <CardText
                  style={{
                    marginBottom: "0",
                    fontSize: "32px"
                  }}>New User?</CardText>
                {/* <Link to="/register"
                style={{
                  textDecoration: "none",
                  fontSize: "28px"
                }}>Register</Link> */}
                <CardText
                  style={{
                    fontSize: "28px",
                    color: "blue",
                    cursor: "pointer"
                  }}
                  onClick={
                    () => {
                      setRegister(true)
                    }
                  }>
                  Register
                </CardText>
              </section>
            </CardBody>
          </Card>
        }

      </div>

      {/* <fieldset>
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
      </button> */}
    </main>
  );
};
