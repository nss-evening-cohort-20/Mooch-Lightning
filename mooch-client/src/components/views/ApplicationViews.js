import { Route, Routes, useNavigate } from "react-router-dom";
import { CreateAccount } from "./CreateAccountView/CreateAccount";
import { HomeView } from "./HomeView/HomeView";
import { MoochPostView } from "./MoochPostView/MoochPostView";

export const ApplicationViews = () => {

  return (
    <Routes>

      <Route path="/" element={<HomeView />} />
      <Route path="createUser" element={<CreateAccount />} />
      <Route path="mooch-details" element={<MoochPostView />} />

    </Routes>
  );
};
