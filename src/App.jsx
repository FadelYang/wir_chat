import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/cms/Dashboard";
import LanguageMenu from "./components/pages/cms/LanguageMenu";
import CollectionMenu from "./components/pages/cms/CollectionMenu";
import UserMenu from "./components/pages/cms/UserMenu";
// import DatabaseMenu from "./components/pages/cms/DatabaseMenu";
import Login from "./components/pages/Login";
import { LoginGuard } from "./utils/LoginGuard";
import { AdminGuard } from "./utils/AdminGuard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NotFound from "./components/pages/NotFound";
import ForgotPassword from "./components/pages/ForgotPassword";
import UserProfile from "./components/pages/cms/UserProfile";
import { MeGuard } from "./utils/MeGuard";

function App() {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <LoginGuard>
            <Dashboard />
          </LoginGuard>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard/languages"
        element={
          <LoginGuard>
            <LanguageMenu />
          </LoginGuard>
        }
      />
      <Route
        path="/dashboard/collections"
        element={
          <LoginGuard>
            <CollectionMenu />
          </LoginGuard>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <AdminGuard>
            <UserMenu />
          </AdminGuard>
        }
      />
      <Route
        path="/dashboard/users/:uid"
        element={
          <MeGuard>
            <UserProfile />
          </MeGuard>
        }
      />
      {/* <Route
        path="/dashboard/databases"
        element={
          <LoginGuard>
            <DatabaseMenu />
          </LoginGuard>
        }
      /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
