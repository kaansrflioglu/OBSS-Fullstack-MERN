import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Kullanıcı adı veya şifre hatalı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg border-0" style={{ width: "380px" }}>
        <div className="card-body p-4">
          <h4 className="text-center fw-bold mb-4">Giriş Yap</h4>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            {/* USERNAME */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Kullanıcı adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">Kullanıcı adı</label>
            </div>

            {/* PASSWORD */}
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Şifre</label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Giriş yapılıyor...
                </>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;