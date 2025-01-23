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
import { useThemeStore } from "./store/theme.store";

const App: React.FC = () => {
  const { authUser, checkAuth, isCheckingAuth, socket } = useAuthStore();

  const { theme } = useThemeStore();

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
    <div data-theme={theme} className="h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
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
