import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/cms/Dashboard";
import LanguageMenu from "./components/pages/cms/LanguageMenu";
import CollectionMenu from "./components/pages/cms/CollectionMenu";
import DatabaseMenu from "./components/pages/cms/DatabaseMenu";
import Login from "./components/pages/Login";
import { LoginGuard } from "./utils/LoginGuard";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import NotFound from './components/pages/NotFound';

function App() {
  const { user } =  useContext(AuthContext)

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
      {/* <Route
        path="/dashboard/databases"
        element={
          <LoginGuard>
            <DatabaseMenu />
          </LoginGuard>
        }
      /> */}
      <Route 
        path='*'
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;
