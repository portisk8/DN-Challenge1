import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/NoAuth/SignUp";
import SignIn from "./pages/NoAuth/SignIn";
import Main from "./components/Layout/Main";
import Dashboard from "./pages/Auth/Dashboard";
import { useEffect, useState } from "react";
import MainNoAuth from "./components/Layout/MainNoAuth";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(localStorage.getItem("token") != null);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index path="/" element={<Dashboard />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<MainNoAuth />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
