import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import Admin from './components/Admin';
import AdminCategories from './components/AdminCategories';
import AdminWords from './components/AdminWords';
import Categories from './components/Categories';
import Game from './components/Game';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import './index.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak } from './authentication/keycloak';
import PrivateRoute from './authentication/PrivateRoute';

function App() {
  return (
    <div className="App bg-gradient-to-r from-purple-200 ">
      <ReactKeycloakProvider authClient={keycloak}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/game/:catid" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/words"
            element={
              <PrivateRoute>
                <AdminWords />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/cat"
            element={
              <PrivateRoute>
                <AdminCategories />
              </PrivateRoute>
            }
          />
        </Routes>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
