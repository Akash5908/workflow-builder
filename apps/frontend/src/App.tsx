import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import Signup from "./pages/signup-page";
import { NavbarSection } from "./components/navbar/navbar";
import Login from "./pages/login-page";
import { Toaster } from "sonner";
import Workflow from "./pages/workflow/workflow-list";
import WorkflowDetail from "./pages/workflow/[id]/workflow-detail";
import CredentialPage from "./pages/credential/credential-page";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <NavbarSection />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="workflows" element={<Workflow />} />
          <Route path="workflow/:id" element={<WorkflowDetail />} />
          <Route path="credentials" element={<CredentialPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
