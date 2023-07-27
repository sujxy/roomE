import "./App.css";
import Layout from "./layout";
import HomePage from "./scenes/homepage";
import AuthPage from "./scenes/authpage";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./components/userContext";
import AccountPage from "./scenes/accountpage";

axios.defaults.baseURL = "http://127.0.0.1:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
