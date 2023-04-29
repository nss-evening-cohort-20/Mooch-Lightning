import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { PhotoUpload } from "../photoStorage/PhotoUpload";
import { authsignOut } from "../Utils/authUtils";

export const HomeView = () => {
    let navigate = useNavigate();

    const onLogout = () => {
        authsignOut(navigate);
      };
    
    return <>

        <h1>A Blank Page!!</h1>
        {/* logout button */}
        <Button  color="danger" onClick={onLogout}>Log Out</Button>

        {/* move this component to where you want your PhotoUpload */}
        <PhotoUpload />
        </>
  };
  