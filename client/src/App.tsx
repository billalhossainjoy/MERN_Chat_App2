import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";
import HomePage from "./pages/home.page";
import SignUpPage from "./pages/singUp.page";
import LoginPage from "./pages/login.page";
import SettingsPage from "./pages/settings.page";
import ProfilePage from "./pages/profile.page";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <div>
        <Toaster />
      </div>
    </div>
  );
};
export default App;
