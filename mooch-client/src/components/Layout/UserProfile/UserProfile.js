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
  CardSubtitle,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import {
  BLACK,
  DIRTY_WHITE,
  LIGHT_GRAY,
  SLATE,
  WHITE,
  getCurrentUser,
} from "../../Utils/Constants";
import { authsignOut } from "../../Utils/authUtils";

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userMoochRequestDetails, setUserMoochRequestDetails] = useState([]);
  const [userMembershipsDetails, setUserMembershipsDetails] = useState([]);
  const [userMoochPostDetails, setUserMoochPostDetails] = useState([]);

  const currentUser = getCurrentUser()
  const navigate = useNavigate()

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7082/api/User/${currentUser.id}`);
        const userApiResponse = await response.json();
        console.log(userApiResponse);
        setUserInfo(userApiResponse);
        setUserMoochRequestDetails(userApiResponse["userMoochRequestDetails"]);
        setUserMembershipsDetails(userApiResponse["userMembershipsDetails"]);
        setUserMoochPostDetails(userApiResponse["userMoochPostDetails"]);
      };
      fetchData();
    },
    //testFunc,
    [] // When this array is empty, you are observing initial component state
  );
  return (
    <>
      <div
        className="d-flex"
        style={{
          position: "sticky",
          top: "112px",
          color: `${WHITE}`,
        }}
      >
        <Card
          style={{
            border: "1px solid #2A2B37",
            backgroundColor: `${SLATE}`,
            minWidth: "90%",
            margin: "10px 20px",
            minHeight: "90%",
            padding: "20px",
          }}
        >

          <CardBody>
            <CardTitle tag="h5">Profile Info</CardTitle>
            <CardSubtitle className="mb-2" tag="h6" style={{ color: `${LIGHT_GRAY}` }}>
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </CardSubtitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {`${userInfo.email}`}
            </CardSubtitle>
            <CardText>{`You have ${userMoochRequestDetails?.length} Mooch ${userMoochRequestDetails?.length > 1 ? "Requests!" : 'Request!'}`}</CardText>
            <div className="d-flex justify-content-between">
              <Button onClick={() => navigate("UserProfile")}>My Account</Button>
              <Button onClick={() => authsignOut()}>Sign Out</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
