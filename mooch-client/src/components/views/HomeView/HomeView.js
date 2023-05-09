import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText
} from 'reactstrap';
import { PhotoUpload } from "../../Utils/PhotoUpload";
import { authsignOut } from "../../Utils/authUtils";
import { useState, useEffect } from "react";
import { MoochPostContainer } from "./MoochPostContainer";
import { SearchResultsContainer } from "./SearchResultsContainer";

const url = "https://localhost:7082/api/OrganizationType"

export const HomeView = () => {
  // let navigate = useNavigate();

  // const onLogout = () => {
  //   authsignOut(navigate);
  // };
  const getOrganizationTypes = async () => {
    const fetchData = await fetch(url)
    const fetchJson = await fetchData.json()
    setOrganizationTypes(fetchJson)
  }

  const [organizationTypes, setOrganizationTypes] = useState([])

  useEffect(
    () => {
      getOrganizationTypes()
    }, []
  )

  const [searchValue, setSearchValue] = useState([])
  const [isClicked, setIsClicked] = useState(false)

  //checks if suggestion is selected on searchbar or if search matches items in database
  const [madeSelection, setMadeSelection] = useState(false)


  return <>
    <div className=" position-fixed py-3"
      style={{
        height: "150px", top: "0px", zIndex: "100", width: "100vw",
        backgroundColor: "#E5E5E5",
        boxShadow: "0px 2px 5px 0px #14213D"
      }}>
      <Form
        style={{ alignSelf: "center" }}>
        <FormGroup>

          <div className="d-flex justify-content-between mx-5">
            <div
              style={{
                minWidth: "70vw",
                maxWidth: "95vw"
              }}>
              <Label
                className="pb-1"
                for="searchBar"
                style={{ color: "#14213D" }}>
                Search MoochPosts
              </Label>
              <Input
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#14213D"
                }}
                id="searchBar"
                name="search-bar"
                placeholder="Placeholder"
                type="text"
                className=" py-4"
                onChange={
                  //sends value to SearchResults component
                  (e) => (setSearchValue(e.target.value)
                  )

                }
              />
              {/* autofill for suggested search results */}
              <Card
                className="overflow-hidden"
                style={{
                  boxShadow: madeSelection === false ? "none" : "0px 0px 0px 3px #BAD9FB",
                  borderWidth: madeSelection === false ? "0px" : "0px 1px 1px",
                  position: "relative",
                  bottom: "2px"
                }}>
                <SearchResultsContainer
                  key={`sr--1`}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  setMadeSelection={setMadeSelection}
                  madeSelection={madeSelection}
                />
              </Card>
            </div>
            <Button
              className="px-3"
              style={{
                height: "50px",
                marginTop: "30px",
                minWidth: "200px",
                backgroundColor: "#FCA311"
              }}
              // color="primary"
              onClick={
                () => {
                  setIsClicked(!isClicked)
                }
              }>
              Find Mooches!
            </Button>

          </div>

        </FormGroup>

      </Form>

    </div>




    {/* populates organization types */}

    <div
      style={{
        // marginTop: "160px",
        // marginBottom: "800px",
        position: "absolute",
        top: "150px",
        width: "101%"
      }}>

      {organizationTypes.map((type) => (
        <>

          <div
            style={{
              position: "sticky",
              top: `${type.id * 150}px`,
              minWidth: "fit-content",
            }}>

            <Card inverse
              className="rounded-0"
              style={{
                width: "101%",
                position: "relative",
                right: "0.5%",
                // border: "15px solid #E5E5E5",
                boxShadow: "0px 0px 5px 3px black",
              }}>
              <CardImg
                className="rounded-0"
                alt=""
                style={{
                  height: 535,
                  backgroundImage: "url(https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg)",
                  backgroundPosition: "center"
                }}
                width="100%"
              />
              <CardImgOverlay
                className="py-0 px-0">
                <CardTitle tag="h2" className="mb-0"
                  style={{
                    background: "linear-gradient(45deg,#FCA311,#FDC466)",
                    // backgroundColor: "#FCA311",
                    color: "#E5E5E5",
                    border: "1px solid #E5E5E5",
                    padding: "15px 30px",
                  }}>
                  {type.description}
                </CardTitle>
                <div className="d-flex justify-content-start"
                  style={{
                    backgroundColor: "#14213D",
                    padding: "20px",
                    opacity: "0.90",
                  }}>
                  <MoochPostContainer
                    key={`mpc--${type.id}`}
                    orgType={type.description}
                    isClicked={isClicked}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue} />
                </div>
                {/* <CardText>
                  <small className="text-muted">
                    Last updated 3 mins ago
                  </small>
                </CardText> */}
              </CardImgOverlay>
            </Card>
          </div>

        </>
      ))}

    </div>


    {/* move this component to where you want your PhotoUpload */}
    {/* <PhotoUpload /> */}
  </>
};
