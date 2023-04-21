import { Mooch } from "./components/Mooch";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app"; // Import Firebase!!
import { firebaseConfig } from "./FirebaseConfig";

firebase.initializeApp(firebaseConfig);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Mooch />
  </BrowserRouter>
);
