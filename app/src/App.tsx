import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import "@picocss/pico";

import Home from "./pages/Home";
const SignupForm = lazy(() => import("./pages/SignupForm"));
const UpdateForm = lazy(() => import("./pages/UpdateForm"));
import Loading from "./components/loding";
import LoginForm from "./pages/LoginForm";
import MovieForm from "./pages/MovieForm";
import User from "./pages/user";
import SingleMovie from "./pages/singleMovie";
import PrivateRoutes from "./components/PrivateRoutes.tsx";
import UpdateMovieForm from "./pages/updateMovieForm.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import ForgetPassword from "./pages/ForgetPassword.tsx";
import OtpPage from "./pages/OtpPage.tsx";
import UpdateNewPassword from "./pages/updateNewPassword.tsx";
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/otp/:id" element={<OtpPage />} />
          <Route path="/setpassword/:id" element={<UpdateNewPassword />} />
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/movies/:id" element={<SingleMovie />} />
            <Route path="/movie" element={<MovieForm />} />
            <Route path="/updatemovie/:id" element={<UpdateMovieForm />} />
            <Route path="/u" element={<User />} />
            <Route path="/update" element={<UpdateForm />} />
            <Route path="/reset/password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
