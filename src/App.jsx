import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Dashboard from './pages/cms/Dashboard';
import LanguageMenu from './pages/cms/LanguageMenu';
import CollectionMenu from './pages/cms/CollectionMenu';
import DatabaseMenu from './pages/cms/DatabaseMenu';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/languages' element={<LanguageMenu />} />
      <Route path='/dashboard/collections' element={<CollectionMenu />} />
      <Route path='/dashboard/databases' element={<DatabaseMenu />} />
    </Routes>
  );
}

export default App;
