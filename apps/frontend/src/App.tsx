import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/page";
import Signup from "./pages/auth/signup/page";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
