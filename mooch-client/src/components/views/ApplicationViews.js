import { Route, Routes, useNavigate } from "react-router-dom";
import { CreateAccount } from "./CreateAccountView/CreateAccount";
import { HomeView } from "./HomeView/HomeView";
import { UserView } from "./UserView/UserView";

export const ApplicationViews = () => {

  return (
    <Routes>

      <Route path="/" element={<HomeView />} />
      <Route path="createUser" element={<CreateAccount />} />
      <Route path="UserProfile" element={<UserView/>} />

    </Routes>
  );
};
