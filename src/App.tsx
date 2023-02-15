import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar, ScrollToTop } from "./components";
import {
  Login,
  ContactPage,
  Register,
  TagsPage,
  ContactUpdatePage,
  Main,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>

        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Main />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/contacts/:id" element={<ContactUpdatePage />} />
        </Route>

        {/* ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
      <ScrollToTop />
    </>
  );
};

export default App;
