import Forgot_Password from "./Login/Forgot_Password";
import Placeholder from "./Login/Placeholder";
import MainPage from "./MainPage/MainPage";
import Change_UN from "./Login/Change_UN";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reset_Username from "./Reset/Reset_Username";
import Reset_Password from "./Reset/Reset_Password";

function App() {
  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Placeholder />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/forgot_password" element={<Forgot_Password />} />
          <Route path="/change_username" element={<Change_UN />} />
          <Route
            path="/reset_Username/:uid/:token"
            element={<Reset_Username />}
          />
          <Route
            path="/reset_password/:uid/:token"
            element={<Reset_Password />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
