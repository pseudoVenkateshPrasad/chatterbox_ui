import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import MainLayout from './layouts/mainLayout/MainLayout';
import WordRotate from "./components/magicui/word-rotate";
import ProtectedRoute from './layouts/ProtectedRoutes';

import Home from './components/home/Home';
import Profile from './components/profile/Profile';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>

      <>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: "#081c15",
              border: "1px solid #a3b18a",
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </>
    </>
  );
}

export default App;