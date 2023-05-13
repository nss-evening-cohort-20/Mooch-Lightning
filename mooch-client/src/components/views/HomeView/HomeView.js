import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  CardTitle,
  CardBody,
  CardHeader,
  CardText,
} from 'reactstrap';
import { PhotoUpload } from '../../Utils/PhotoUpload';
import { authsignOut } from '../../Utils/authUtils';
import { useState, useEffect } from 'react';
import { MoochPostContainer } from './MoochPostContainer';
import { SearchResultsContainer } from './SearchResultsContainer';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  BLACK,
  DIRTY_WHITE,
  LIGHT_GRAY,
  SLATE,
  WHITE,
} from '../../Utils/Constants';

const url = 'https://localhost:7082/api/OrganizationType';

export const HomeView = () => {
  // let navigate = useNavigate();

  // const onLogout = () => {
  //   authsignOut(navigate);
  // };
  const getOrganizationTypes = async () => {
    const fetchData = await fetch(url);
    const fetchJson = await fetchData.json();
    setOrganizationTypes(fetchJson);
  };

  const [organizationTypes, setOrganizationTypes] = useState([]);

  useEffect(() => {
    getOrganizationTypes();
  }, []);

  const [searchValue, setSearchValue] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  //checks if suggestion is selected on searchbar or if search matches items in database
  const [madeSelection, setMadeSelection] = useState(false);

  //check if button is hovered over
  const [buttonHover, setButtonHover] = useState(false);
  //sets background
  const [background, setBackground] = useState({
    idNo: 0,
    img: 'none',
  });

  return <>
    <div>
      <img
        style={{
          objectFit: "contain",
          height: "200px",
          width: "200px",
          textAlign: "center",
          marginLeft: "40%",
        }}
        alt="profile image"
        src="/images/mooch-logo.png"
      />
    </div>

    <div className=" position-fixed py-3"
      style={{
        height: "70px", top: "0px", zIndex: "100", width: "100vw",
        backgroundColor: `${BLACK}`
        // boxShadow: "0px 2px 5px 0px #14213D"
      }}>
      <Form
        style={{
          alignSelf: "center",
          position: "relative",
          bottom: "10px"
        }}>
        <FormGroup>

          <div className="d-flex mx-4">
            <div
              style={{
                minWidth: "70vw",
                maxWidth: "95vw"
              }}>
              <div
                style={{
                  position: "relative"
                }}>
                <Input
                  style={{
                    width: "100%",
                    color: `${WHITE}`,
                    backgroundColor: `${SLATE}`,
                    fontFamily: 'Vina Sans, cursive',
                    fontSize: "28px",
                    letterSpacing: "1px",
                    padding: "7px 0px 7px 50px",
                    height: "fit-content",
                    fontWeight: "100"
                  }}
                  id="searchBar"
                  name="search-bar"
                  placeholder="Search MoochPosts"
                  type="text"
                  onChange={
                    //sends value to SearchResults component
                    (e) => (setSearchValue(e.target.value)
                    )

                  }
                />
                <Card
                  className="overflow-hidden"
                  style={{
                    boxShadow: madeSelection === false ? "none" : "0px 2px 1px 2px #BAD9FB",
                    borderWidth: madeSelection === false ? "0px" : "0px 20px 20x",
                    borderColor: "#BAD9FB",
                    position: "relative",
                    bottom: "1px",
                    width: "100%"
                  }}>


                  <SearchResultsContainer
                    key={`sr--1`}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setMadeSelection={setMadeSelection}
                    madeSelection={madeSelection}
                  />
                </Card>

                {searchValue !== "" ?
                  <FontAwesomeIcon
                    className="fa-2x"
                    icon={faMagnifyingGlass}
                    beat
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "10px",
                      color: `${WHITE}`,
                    }} /> :
                  <FontAwesomeIcon
                    className="fa-2x"
                    icon={faMagnifyingGlass}
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "10px",
                      color: `${LIGHT_GRAY}`,
                    }} />}
              </div>

              {/* autofill for suggested search results */}


            </div>
            <Button
              className="px-3 py-1 mx-5"
              style={{
                height: "fit-content",
                minWidth: "200px",
                backgroundColor: buttonHover ? `${SLATE}` : `${WHITE}`,
                color: buttonHover ? `${WHITE}` : `${SLATE}`,
                fontFamily: 'Vina Sans, cursive',
                fontSize: "25px",
                letterSpacing: "0.7px",
                border: "1px solid #2A2B37",
                position: "relative",
                top: "5px"
              }}
              // color="primary"
              onClick={
                () => {
                  setIsClicked(!isClicked)
                }
              }
              onMouseEnter={
                () => {
                  setButtonHover(true)
                }
              }
              onMouseLeave={
                () => {
                  setButtonHover(false)
                }
              }
            >
              Find Mooches!
            </Button>

          </div>

        </FormGroup>

      </Form>

    </div>

    {/* posts by organization type and welcome message */}

    <div
      style={{
        width: '101%',
        position: 'absolute',
        top: '112px',
      }}
    >
      <div
        style={{
          fontFamily: 'Vina Sans, cursive',
          fontSize: '35px',
          position: 'sticky',
          paddingLeft: '10px',
          top: '65px',
          color: `${WHITE}`,
          // zIndex: "00"
        }}
      >
        Welcome Robert
      </div>
      {/* welcome message */}
      <div
        className="d-flex"
        style={{
          position: 'sticky',
          top: '112px',
        }}
      >
        <Card
          style={{
            border: '1px solid #2A2B37',
            backgroundColor: `${SLATE}`,
            width: 'fit-content',
            margin: '10px 20px',
            height: 'fit-content',
            padding: '20px',
            fontWeight: `100`
          }}
        >
          <CardHeader
            style={{
              color: `${LIGHT_GRAY}`,
              border: 'none',
            }}
          >
            <CardText
              tag="h2"
              style={{
                fontFamily: 'Vina Sans, cursive',
                fontSize: '40px',
              }}
            >
              Welcome To Mooch!
            </CardText>
          </CardHeader>
          <CardBody
            style={{
              fontFamily: 'Vina Sans, cursive',
              fontSize: '25px',
              color: `${DIRTY_WHITE}`
            }}
          >
            <CardText>
              A subscrition sharing web application made with you in mind.
            </CardText>
            <CardText>
              Search posts to find something that catches your interest or
              share a post to spread the love.
            </CardText>
          </CardBody>
        </Card>
        <Card
          style={{
            border: '1px solid #2A2B37',
            backgroundColor: `${SLATE}`,
            width: 'fit-content',
            margin: '10px 20px',
            height: 'fit-content',
            padding: '20px',
            fontWeight: `100`
          }}
        >
          <CardHeader
            style={{
              color: `${LIGHT_GRAY}`,
              border: 'none',
            }}
          >
            <CardText
              tag="h2"
              style={{
                fontFamily: 'Vina Sans, cursive',
                fontSize: '40px',
              }}
            >
              Welcome To Mooch!
            </CardText>
          </CardHeader>
          <CardBody
            style={{
              fontFamily: 'Vina Sans, cursive',
              fontSize: '25px',
              color: `${DIRTY_WHITE}`,
            }}
          >
            <CardText>
              A subscrition sharing web application made with you in mind.
            </CardText>
            <CardText>
              Search posts to find something that catches your interest or
              share a post to spread the love.
            </CardText>
          </CardBody>
        </Card> */}
        <UserProfile />
      </div>

      {/* shows posts by organization type */}

      {organizationTypes.map((type) => (
        <>
          <div
            style={{
              position: 'sticky',
              top: `${114}px`,
              minWidth: 'fit-content',
              backgroundImage:
                background.idNo === type.id
                  ? `url(${background.img})`
                  : 'none',
              backgroundPosition: 'center',
              backgroundSize: '200px',
            }}
          >
            <Card
              inverse
              className="rounded-0"
              style={{
                width: '101%',
                position: 'relative',
                right: '0.5%',
                backgroundColor:
                  background.idNo === type.id
                    ? `rgba(9,9,11,0.8)`
                    : `rgba(9,9,11,1)`,
              }}
            >
              <CardTitle
                tag="h3"
                className="mb-0"
                style={{
                  backgroundColor: `${BLACK}`,
                  color: `${DIRTY_WHITE}`,
                  borderTop: '1px solid #E5E5E5',
                  padding: '10px 30px',
                  fontFamily: 'Vina Sans, cursive',
                  fontSize: '40px',
                }}
              >
                {type.description}
              </CardTitle>
              <div
                className="d-flex justify-content-start"
                style={{
                  padding: '0px 20px 10px',
                }}
              >
                <MoochPostContainer
                  key={`mpc--${type.id}`}
                  orgType={type.description}
                  isClicked={isClicked}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  setBackground={setBackground}
                />
              </div>
            </Card>
          </div>
        </>
      ))}
      <Card
        style={{
          border: '1px solid #2A2B37',
          backgroundColor: `${BLACK}`,
          width: 'fit-content',
          margin: '10px 20px',
          height: 'fit-content',
          padding: '20px',
        }}
      >
        <CardHeader
          style={{
            color: `${LIGHT_GRAY}`,
            border: 'none',
          }}
        >
          <CardText
            tag="h2"
            style={{
              fontFamily: 'Vina Sans, cursive',
              fontSize: '40px',
            }}
          >
            More Mooches added every day!!!
          </CardText>
        </CardHeader>
        <CardBody
          style={{
            fontFamily: 'Vina Sans, cursive',
            fontSize: '25px',
            color: `${DIRTY_WHITE}`,
          }}
        >
          <CardText>More text</CardText>
          <CardText>texty text</CardText>
        </CardBody>
      </Card>
    </div>

    {/* move this component to where you want your PhotoUpload */}
    {/* <PhotoUpload /> */}
  </>

};
