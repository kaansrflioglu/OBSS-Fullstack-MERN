import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const StudentCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    weight: null,
    height: null,
    pace: null,
    leap: null,
    armStrength: null,
    legStrength: null,
    muscleAnatomy: "",
    gradeLevel: "",
    gradeSection: "",
    picture: "",
    preferredSports: [],
    suitableSports: [],
    parents: []
  });

  const [sports, setSports] = useState([]);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    axios.get("/sports").then((res) => setSports(res.data));
    axios.get("/parents").then((res) => setParents(res.data));
  }, []);

  const toggleItem = (field, item) => {
    const exists = formData[field].some((x) => x._id === item._id);
    setFormData({
      ...formData,
      [field]: exists
        ? formData[field].filter((x) => x._id !== item._id)
        : [...formData[field], item]
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.surname.trim()) {
      alert("İsim ve soyisim zorunludur");
      return;
    }

    if (!window.confirm("Öğrenci eklensin mi?")) return;

    await axios.post("/students", formData);
    navigate("/students");
  };

  return (
    <div className="container py-4">
      <h4>Yeni Öğrenci</h4>

      <input
        className="form-control mb-2"
        placeholder="Ad"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Soyad"
        value={formData.surname}
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
      />

      <div className="row mb-2">
        <div className="col">
          <select
            className="form-select"
            value={formData.gradeLevel}
            onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
          >
            <option value="">Sınıf</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            value={formData.gradeSection}
            onChange={(e) => setFormData({ ...formData, gradeSection: e.target.value })}
          >
            <option value="">Şube</option>
            {["A", "B", "C", "D", "E", "F", "G", "H"].map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>
      </div>

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Kilo (kg)"
        value={formData.weight}
        onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
      />

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Boy (cm)"
        value={formData.height}
        onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
      />

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Hız"
        value={formData.pace}
        onChange={(e) => setFormData({ ...formData, pace: parseFloat(e.target.value) })}
      />

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Sıçrama"
        value={formData.leap}
        onChange={(e) => setFormData({ ...formData, leap: parseFloat(e.target.value) })}
      />

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Kol Gücü"
        value={formData.armStrength}
        onChange={(e) => setFormData({ ...formData, armStrength: parseFloat(e.target.value) })}
      />

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Bacak Gücü"
        value={formData.legStrength}
        onChange={(e) => setFormData({ ...formData, legStrength: parseFloat(e.target.value) })}
      />

      <input
        className="form-control mb-2"
        placeholder="Kas Anatomisi"
        value={formData.muscleAnatomy}
        onChange={(e) => setFormData({ ...formData, muscleAnatomy: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Resim URL"
        value={formData.picture}
        onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
      />

      <strong>Tercih Edilen Sporlar</strong>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {sports.map((s) => (
          <span
            key={s._id}
            className={`badge ${formData.preferredSports.some(x => x._id === s._id)
              ? "bg-danger"
              : "bg-secondary"}`}
            style={{ cursor: "pointer" }}
            onClick={() => toggleItem("preferredSports", s)}
          >
            {s.name}
          </span>
        ))}
      </div>

      <strong>Uygun Sporlar</strong>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {sports.map((s) => (
          <span
            key={s._id}
            className={`badge ${formData.suitableSports.some(x => x._id === s._id)
              ? "bg-success"
              : "bg-secondary"}`}
            style={{ cursor: "pointer" }}
            onClick={() => toggleItem("suitableSports", s)}
          >
            {s.name}
          </span>
        ))}
      </div>

      <strong>Veliler</strong>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {parents.map((p) => (
          <span
            key={p._id}
            className={`badge ${formData.parents.some(x => x._id === p._id)
              ? "bg-primary"
              : "bg-secondary"}`}
            style={{ cursor: "pointer" }}
            onClick={() => toggleItem("parents", p)}
          >
            {p.name} {p.surname}
          </span>
        ))}
      </div>

      <button className="btn btn-success mt-3" onClick={handleSave}>
        Kaydet
      </button>
    </div>
  );
};

export default StudentCreate;