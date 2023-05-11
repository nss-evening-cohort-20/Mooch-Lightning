import { Mooch } from "./components/Mooch";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app"; // Import Firebase!!
import { createContext } from "react";
import { UserProfileProvider } from "./components/Utils/UserProfileProvider";
import { firebaseConfig } from "./components/Utils/FirebaseConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "reactstrap";
import { DARK_GRAY } from "./components/Utils/Constants";

firebase.initializeApp(firebaseConfig);
document.body.style = `background: ${DARK_GRAY}`;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <div style={{}}>
      <UserProfileProvider>
        <Mooch />
      </UserProfileProvider>
    </div>
  </BrowserRouter>
);
