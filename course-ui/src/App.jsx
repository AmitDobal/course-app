import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Courses /> {/* Example protected route */}
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
