import { UserView } from './UserView/UserView';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CreateAccount } from './CreateAccountView/CreateAccount';
import { HomeView } from './HomeView/HomeView';
import { CreateMoochPostView } from './CreateMoochPostView/CreateMoochPostView';
import { OrganizationView } from './OrganizationView/OrganizationView';

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="createUser" element={<CreateAccount />} />
      <Route path="UserProfile" element={<UserView />} />

      <Route path="createMoochPostView" element={<CreateMoochPostView />} />
      <Route path="organizationView" element={<OrganizationView />} />
    </Routes>
  );
};
