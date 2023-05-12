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
} from "../../Utils/Constants";

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userMoochRequestDetails, setUserMoochRequestDetails] = useState([]);
  const [userMembershipsDetails, setUserMembershipsDetails] = useState([]);
  const [userMoochPostDetails, setUserMoochPostDetails] = useState([]);

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7082/api/User/1`);
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
        // style={{
        //   fontFamily: "Vina Sans, cursive",
        //   fontSize: "35px",
        //   position: "sticky",
        //   paddingLeft: "10px",
        //   top: "65px",
        //   color: `${WHITE}`,
        //   // zIndex: "00"
        // }}
      >
        <Card
          //   style={{
          //     width: "18rem",
          //   }}
          style={{
            border: "1px solid #2A2B37",
            backgroundColor: `${SLATE}`,
            minWidth: "90%",
            margin: "10px 20px",
            minHeight: "90%",
            padding: "20px",
          }}
        >
          <img
            style={{ objectFit: "contain", height: "100px", width: "100px" }}
            alt="profile image"
            src={`${userInfo.imageUrl}`}
          />
          <CardBody>
            <CardTitle tag="h5">Profile Info</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </CardSubtitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {`${userInfo.email}`}
            </CardSubtitle>
            <CardText>{`You have ${userMoochRequestDetails?.length} Mooch Request(s)!`}</CardText>
            <Button>Sign Out</Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
