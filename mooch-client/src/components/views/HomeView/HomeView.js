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
import { SearchResults } from "./SearchResults";

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

  return <>
    <div className=" position-fixed py-3"
      style={{ height: "150px", top: "0px", zIndex: "100", width: "100vw", backgroundColor: "#dceafa", }}>
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
                for="searchBar">
                Search MoochPosts

              </Label>
              <Input
                style={{ width: "100%" }}
                id="searchBar"
                name="search-bar"
                placeholder="Placeholder"
                type="text"
                className=" py-4"
                onChange={
                  //sends value to SearchResults component
                  (e) => (setSearchValue(e.target.value))
                }
              />
              {/* autofill for suggested search results */}
              <SearchResults
                key={`sr--1`}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
            <Button
              className="px-3"
              style={{
                height: "50px",
                // alignSelf: "center",
                marginTop: "30px",
                minWidth: "200px"
              }}
              color="primary"
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

    <div
      style={{ marginTop: "150px" }}>
      {/* populates organization types */}
      {organizationTypes.map((type) => (
        <>

          <div>

            <Card inverse
              className="rounded-0">
              <CardImg
                className="rounded-0"
                alt=""
                src={type.organizationTypeImageUrl}
                style={{
                  height: 550
                }}
                width="100%"
              />
              <CardImgOverlay
                className="py-0 px-0">
                <CardTitle tag="h2" className="mb-4 py-2"
                  style={{
                    backgroundColor: "white",
                    color: "#0C0067"
                  }}>
                  {type.description}
                </CardTitle>
                <div className="d-flex justify-content-start mb-4">
                  <MoochPostContainer
                    key={`mpc--${type.id}`}
                    orgType={type.description}
                    isClicked={isClicked}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue} />
                </div>
                <CardText>
                  <small className="text-muted">
                    Last updated 3 mins ago
                  </small>
                </CardText>
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
