import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { PhotoUpload } from '../../Utils/PhotoUpload';
import { authsignOut } from '../../Utils/authUtils';
import './Test.css';
import { useState, useEffect } from 'react';
import { MoochPost } from './MoochPost';

const url = 'https://localhost:7082/api/MoochPost/search_results?search=';

export const HomeView = () => {
  // let navigate = useNavigate();

  // const onLogout = () => {
  //   authsignOut(navigate);
  // };
  const getMoochPostsBySearch = async () => {
    const fetchData = await fetch(url);
    const fetchJson = await fetchData.json();
    setSearchedPosts(fetchJson);
  };

  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    getMoochPostsBySearch();
  }, []);

  // const [sortSearchedPosts, setSortSearchedPosts] = useState([])

  // useEffect(
  //   () => {
  //     searchedPosts.filter((post => post.type))
  //   },
  // )

  return (
    <>
      <Form className="d-flex justify-content-around">
        <FormGroup className="w-75 mt-5">
          <Label for="exampleEmail">Search MoochPosts</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Placeholder"
            type="email"
            className=" py-4"
          />
        </FormGroup>
      </Form>

      {searchedPosts.map((post) => (
        <>
          {/* fetch request to get all organization types */}
          <div>
            <div className="h3">{post.type}</div>
            <div>
              <MoochPost
                type={post.type}
                id={post.id}
                organizationName={post.organizationName}
              ></MoochPost>
            </div>
          </div>
        </>
      ))}

      {/* move this component to where you want your PhotoUpload */}
      {/* <PhotoUpload /> */}
    </>
  );
};
