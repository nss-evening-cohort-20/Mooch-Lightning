import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { PhotoUpload } from "../../Utils/PhotoUpload";
import { authsignOut } from "../../Utils/authUtils";
import "./Test.css"
import { useState } from "react";

export const HomeView = () => {
  let navigate = useNavigate();

  const onLogout = () => {
    authsignOut(navigate);
  };

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(current => !current);
  }

  return <>
    <div id="test" className="d-flex justify-content-around" onClick={
      handleClick
    }>
      <h1>A Blank Page!!</h1>


      <Button color="danger" className="test" style={{
        top: isActive ? "500px" : "50px",
        transition: "5s"
      }} onClick={onLogout}>Log Out</Button>
    </div>

    {/* move this component to where you want your PhotoUpload */}
    <PhotoUpload />
  </>
};
