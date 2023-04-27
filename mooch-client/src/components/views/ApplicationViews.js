import { Route, Routes, useNavigate } from "react-router-dom";
import { CreateAccount } from "../auth/CreateAccount";
import { HomeView } from "./HomeView";

export const ApplicationViews = () => {

  return (
    <Routes>

      <Route path="/" element={<HomeView />} />
      <Route path="createUser" element={<CreateAccount />}/>

    </Routes>
  );
};
