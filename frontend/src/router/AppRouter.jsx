import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import StudentList from "../pages/students/StudentList";
import StudentCreate from "../pages/students/StudentCreate";
import StudentEdit from "../pages/students/StudentEdit";
import SportsPage from "../pages/sports/SportsPage";
import ParentList from "../pages/parents/ParentList";
import ParentCreate from "../pages/parents/ParentCreate";
import ParentEdit from "../pages/parents/ParentEdit";
import MainPage from "../pages/MainPage";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <>
      {!isLogin && <Navbar />}
      {isLogin ? (
        children
      ) : (
        <div className="container mt-4">{children}</div>
      )}
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students/new"
            element={
              <ProtectedRoute>
                <StudentCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <StudentEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parents"
            element={
              <ProtectedRoute>
                <ParentList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parents/new"
            element={
              <ProtectedRoute>
                <ParentCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parents/:id"
            element={
              <ProtectedRoute>
                <ParentEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sports"
            element={
              <ProtectedRoute>
                <SportsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;