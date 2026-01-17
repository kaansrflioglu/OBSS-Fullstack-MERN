import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

const ParentCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    height: null,
    sportsBackground: [],
    relation: ""
  });

  const [sports, setSports] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios.get("/sports").then((res) => setSports(res.data));
  }, []);

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 3));
    if (digits.length > 3) parts.push(digits.slice(3, 6));
    if (digits.length > 6) parts.push(digits.slice(6, 8));
    if (digits.length > 8) parts.push(digits.slice(8, 10));

    return parts.join("-");
  };

  const toggleSport = (sport) => {
    const exists = form.sportsBackground.some(
      (s) => s._id === sport._id
    );

    setForm({
      ...form,
      sportsBackground: exists
        ? form.sportsBackground.filter((s) => s._id !== sport._id)
        : [...form.sportsBackground, sport]
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.surname.trim()) {
      setError("Ad ve soyad zorunludur.");
      return;
    }

    try {
      await axios.post("/parents", form);
      setSuccess("Veli başarıyla eklendi.");
      setTimeout(() => navigate("/parents"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Bir hata oluştu");
    }
  };

  return (
    <div className="container py-4">
      <h4>Veli Ekle</h4>

      <Alert type="danger" message={error} onClose={() => setError("")} />
      <Alert type="success" message={success} onClose={() => setSuccess("")} />

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Ad"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Soyad"
          value={form.surname}
          onChange={(e) => setForm({ ...form, surname: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Telefon"
          inputMode="numeric"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: formatPhoneNumber(e.target.value)
            })
          }
        />

        <input
          className="form-control mb-2"
          type="number"
          placeholder="Boy (cm)"
          value={form.height ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              height:
                e.target.value === ""
                  ? null
                  : parseFloat(e.target.value)
            })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Yakınlık Derecesi (Anne, Baba, Vasi...)"
          value={form.relation}
          onChange={(e) => setForm({ ...form, relation: e.target.value })}
        />

        {/* Spor Geçmişi */}
        <strong>Spor Geçmişi</strong>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {sports.map((s) => (
            <span
              key={s._id}
              className={`badge ${
                form.sportsBackground.some((x) => x._id === s._id)
                  ? "bg-success"
                  : "bg-secondary"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleSport(s)}
            >
              {s.name}
            </span>
          ))}
        </div>

        <button className="btn btn-success">Kaydet</button>
      </form>
    </div>
  );
};

export default ParentCreate;