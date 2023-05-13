import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Utils/authUtils";
import "./Login.css";
import { EMAIL_SIGN_IN, GOOGLE_SIGN_IN } from "../../Utils/Constants";
import { Card, CardHeader, CardText, CardBody, Form, FormGroup, Label, Input, Button, CardTitle } from "reactstrap"
import { Register } from "../CreateAccountView/Register";
import { Creators } from "./Creators";
import { DARK_GRAY, SLATE, LIGHT_GRAY, WHITE, BLACK } from "../../Utils/Constants";
import { bottom } from "@popperjs/core";
import { CreateAccount } from "../CreateAccountView/CreateAccount";


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
  const [registerForm, setRegisterForm] = useState(false)
  const [bttnHover, setBttnHover] = useState({
    BTTN1: false,
    BTTN2: false,
    BTTN3: false
  })

  const title = ["M", "O", "O", "C", "H"]

  const teamMembers = [
    { name: "Chase Burnett", url: "https://github.com/ChaseBurnett" },
    { name: "Cristi Neames", url: "https://github.com/crisneames" },
    { name: "Jeremy White", url: "https://github.com/JeremyWhiteDev" },
    { name: "Robert Stroud", url: "https://github.com/r-stroud" },
    { name: "Yogi", url: "https://github.com/chyogi" }]

  const [hover, setHover] = useState(false)

  function displayCreators() {
    setTimeout(() => {
      document.getElementById("creatorsContainer").style.display = "flex"
    }, 2500)
  }

  displayCreators()
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
          backgroundColor: `${SLATE}`,
          width: "100%",
          padding: "20px",
          borderRadius: "0",
          height: "100%",
          minHeight: "100vh"
        }}
      >
        <CardHeader
          style={{
            color: `${LIGHT_GRAY}`,
            border: "none"
          }}>

          <CardText tag="h2"
            style={{
              fontFamily: 'Vina Sans, cursive',
              fontSize: "18vh",
              textAlign: "center",
              position: "relative",
              zIndex: "1"
            }}
          >
            <div
              style={{
                display: "flex",
                overflowY: "hidden",
                justifyContent: "center"
              }}>
              {title.map((x, index) => {
                return <div
                  style={{
                    animation: `displayTitle ${0.5 * (index + 1)}s ease-out 0s 1`,
                    position: "relative",
                  }}
                >
                  <CardText
                    style={{
                      position: "relative",
                      zIndex: "1"
                    }}>{x}</CardText>
                  <CardText tag="h2"
                    style={{
                      fontFamily: 'Vina Sans, cursive',
                      fontSize: "18vh",
                      textAlign: "center",
                      position: "relative",
                      zIndex: "0",
                      color: `${DARK_GRAY}`,
                      bottom: "198px",
                      left: "6px",
                      height: "0"
                    }}
                  >
                    {x}
                  </CardText>

                </div>
              })}
            </div>
          </CardText>
        </CardHeader>
        <CardBody
          style={{
            fontFamily: 'Vina Sans, cursive',
            fontSize: "6vh",
            color: `${WHITE}`,
            textAlign: "center"
          }}  >
          <CardText
            style={{ marginTop: "5vh" }}>
            The <span
              style={{ color: "orange" }}>one</span> and <span style={{ color: "orange" }}>only </span>subscrition sharing web application.
          </CardText>
          <Button
            style={{
              fontSize: "25px",
              padding: "5px 20px",
              marginTop: "6vh",
              color: bttnHover.BTTN3 ? `${WHITE}` : `${SLATE}`,
              backgroundColor: bttnHover.BTTN3 ? `${SLATE}` : `${LIGHT_GRAY}`
            }}
            onMouseEnter={
              () => {
                setBttnHover({ BTTN3: true })
              }
            }
            onMouseLeave={
              () => {
                setBttnHover({ BTTN3: false })
              }
            }
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
              fontSize: "4vh",
            }}>
            <div id="creatorsContainer" style={{
              display: "none",
              justifyContent: "space-around",
              width: "60%",
              margin: "auto"
            }}>
              {
                teamMembers.map((x, index) => {

                  return <Creators
                    x={x}
                    index={index} />
                })}
            </div>
          </CardBody>
        </CardBody>
      </Card>




      {/* clickable background to remove sign/register */}
      <div
        style={{
          width: "100%",
          height: "100%",
          width: "100%",
          position: "fixed",
          top: "0",
          display: displayLogin || registerForm ? "flex" : "none",
          justifyContent: "end",

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

      {/* register from */}

      <div style={{
        position: "fixed",
        top: "0",
        top: registerForm ? "0" : "100vh",
        transition: "1s",
        width: "350px",
        zIndex: "200"
      }} >
        <CreateAccount />
      </div>


      {/* register / sign in */}


      <div
        style={{
          position: "fixed",
          top: "0",
          right: displayLogin ? "0" : "-500px",
          transition: "1s",
          width: "350px",
          zIndex: "100"
        }}
      >
        {/* ternary statment to display register component */}

        {register ? <Register
          setRegister={setRegister} /> :
          <Card
            style={{
              border: "1px solid #2A2B37",
              backgroundColor: `${BLACK}`,
              minHeight: "100vh",
              height: "100%",
              padding: "20px",
              borderRadius: "0",
              transition: "1s"
            }}>
            <CardHeader
              style={{
                color: `${LIGHT_GRAY}`,
                border: "none"
              }}>

              <CardText tag="h2"
                style={{
                  fontFamily: 'Vina Sans, cursive',
                  fontSize: "50px",
                  textAlign: "center",
                  position: "relative",
                  zIndex: "1",
                  color: `${WHITE}`
                }}
              >
                Please <span style={{ color: "orange" }}> sign in</span>
              </CardText>
              <CardText
                style={{
                  fontFamily: 'Vina Sans, cursive',
                  fontSize: "50px",
                  color: `${LIGHT_GRAY}`,
                  position: "relative",
                  bottom: "73px",
                  left: "4px",
                  zIndex: "0",
                  height: "0"
                }}>
                Please sign in
              </CardText>
            </CardHeader>
            <CardBody
              style={{
                fontFamily: 'Vina Sans, cursive',
                fontSize: "25px",
                color: `${WHITE}`,
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
                    <span style={{ color: "orange" }}> Email</span> address
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
                      color: `${LIGHT_GRAY}`
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="inputPassword"
                    style={{
                      width: "100%",
                      textAlign: "left"
                    }}>
                    <span style={{ color: "orange" }}>Pass</span>word
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
                      color: `${LIGHT_GRAY}`
                    }} />

                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
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
                    }>
                    Sign In

                  </Button>
                </FormGroup>
              </Form>


              <h2
                style={{
                  marginTop: "6vh"
                }}>Login With <span style={{ color: "orange" }}>Google?</span></h2>
              <Button type="submit"
                onClick={(e) => handleAuthenticate(e, GOOGLE_SIGN_IN)}
                style={{
                  fontSize: "20px",
                  padding: "5px 15px",
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
              <section style={{
                marginTop: "6vh"
              }}>
                <CardText
                  style={{
                    marginBottom: "0",
                    fontSize: "32px"
                  }}><span style={{ color: "orange" }}>New</span> User?</CardText>
                {/* <Link to="/register"
                style={{
                  textDecoration: "none",
                  fontSize: "28px"
                }}>Register</Link> */}
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
                      setRegister(true)
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
                  }>
                  Register
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
                  }}>Register</CardText>
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
