import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/cms/Dashboard';
import LanguageMenu from './components/pages/cms/LanguageMenu';
import CollectionMenu from './components/pages/cms/CollectionMenu';
import DatabaseMenu from './components/pages/cms/DatabaseMenu';
import Login from './components/pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/languages' element={<LanguageMenu />} />
      <Route path='/dashboard/collections' element={<CollectionMenu />} />
      <Route path='/dashboard/databases' element={<DatabaseMenu />} />
    </Routes>
  );
}

export default App;
