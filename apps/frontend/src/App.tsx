import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import Signup from "./pages/signup-page";
import { NavbarSection } from "./components/navbar/navbar";
import { Toaster } from "sonner";
import Workflow from "./pages/workflow/workflow-list";
import WorkflowDetail from "./pages/workflow/[id]/workflow-detail";
import CredentialPage from "./pages/credential/credential-page";
import LoginPage from "./pages/login/login-page";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter basename="/">
        <NavbarSection />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="credentials" element={<CredentialPage />} />
          <Route path="workflows" element={<Workflow />} />
          <Route path="workflow/:id" element={<WorkflowDetail />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
