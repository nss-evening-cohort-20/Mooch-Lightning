import { useNavigate } from "react-router-dom";

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
        <button type="submit" onClick={onLogout}>
        Logout
        </button>
        {/* move this component to where you want your PhotoUpload */}
        <PhotoUpload />
        </>
  };
  