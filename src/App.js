import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        {/* <Login /> */}
        <BrowserRouter>
          <Routes>
            <Route index path="register" element={<Login />} />
            <Route path="*" element={<Login />} />
            <Route path="/" element={<Home />} />
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
              background: "var(--primary-color)",
              border: "1px solid #a3b18a",
              color: '#3a5a40',
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
