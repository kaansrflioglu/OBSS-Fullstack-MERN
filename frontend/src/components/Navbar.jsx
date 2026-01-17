import React, { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const isAuth = !!localStorage.getItem("token");

  const toggleNavbar = () => setCollapsed(!collapsed);

  const studentsMatch = useMatch({ path: "/students", end: true });
  const studentsAddMatch = useMatch({ path: "/students/new", end: true });
  const parentsMatch = useMatch({ path: "/parents", end: true });
  const parentsAddMatch = useMatch({ path: "/parents/new", end: true });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(isAuth ? "/" : "/login")}
        >
          Öğrenci Yönetimi
        </span>

        {isAuth && (
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {isAuth && (
          <div
            className={`collapse navbar-collapse ${
              collapsed ? "" : "show"
            }`}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${
                    studentsMatch && !studentsAddMatch ? "active" : ""
                  }`}
                  onClick={() => navigate("/students")}
                >
                  Öğrenciler
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${
                    parentsMatch && !parentsAddMatch ? "active" : ""
                  }`}
                  onClick={() => navigate("/parents")}
                >
                  Veliler
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${
                    studentsAddMatch ? "active" : ""
                  }`}
                  onClick={() => navigate("/students/new")}
                >
                  Öğrenci Ekle
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${
                    parentsAddMatch ? "active" : ""
                  }`}
                  onClick={() => navigate("/parents/new")}
                >
                  Veli Ekle
                </button>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span
                  className="nav-link logout-link"
                  onClick={logout}
                >
                  Çıkış Yap
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;