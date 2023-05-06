import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input } from 'reactstrap';
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
    <div className="d-flex justify-content-around"
      style={{ height: "200px" }}>
      <Form
        style={{ width: "95rem", alignSelf: "center" }}>
        <FormGroup>
          <Label
            for="exampleEmail">
            Search MoochPosts
          </Label>
          <Input
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
        </FormGroup>
      </Form>

      <Button
        style={{
          height: "50px",
          alignSelf: "center"
        }}
        color="primary"
        onClick={
          () => {
            setIsClicked(!isClicked)
          }
        }>
        Click Me
      </Button>
    </div>
    {/* autofill for search results */}
    <SearchResults
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />

    {/* populates organization types */}
    {organizationTypes.map((type) => (
      <>
        <section style={{ margin: "20px 0px 0px 20px" }}>
          <div className="h3">{type.description}</div>
          <div className="d-flex justify-content-start">
            <MoochPostContainer
              key={`mpc--${type.id}`}
              orgType={type.description}
              isClicked={isClicked}
              searchValue={searchValue}
              setSearchValue={setSearchValue} />
          </div>
        </section>


      </>
    ))}




    {/* move this component to where you want your PhotoUpload */}
    {/* <PhotoUpload /> */}
  </>
};
