import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [sports, setSports] = useState([]);
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");

  useEffect(() => {
    axios.get("/sports").then((res) => setSports(res.data));
    axios.get("/parents").then((res) => setParents(res.data));

    axios.get("/students").then((res) => {
      const found = res.data.find((s) => s._id === id);
      if (!found) {
        alert("Öğrenci bulunamadı");
        navigate("/students");
        return;
      }

      setFormData({
        name: found.name || "",
        surname: found.surname || "",
        weight: found.weight ?? null,
        height: found.height ?? null,
        pace: found.pace ?? null,
        leap: found.leap ?? null,
        armStrength: found.armStrength ?? null,
        legStrength: found.legStrength ?? null,
        muscleAnatomy: found.muscleAnatomy || "",
        gradeLevel: found.gradeLevel || "",
        gradeSection: found.gradeSection || "",
        picture: found.picture || "",
        preferredSports: found.preferredSports || [],
        suitableSports: found.suitableSports || [],
        parents: found.parents || []
      });
    });
  }, [id, navigate]);

  const toggleItem = (field, item) => {
    const exists = formData[field].some((x) => x._id === item._id);
    setFormData({
      ...formData,
      [field]: exists
        ? formData[field].filter((x) => x._id !== item._id)
        : [...formData[field], item]
    });
  };

  const confirmAction = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "update") {
      if (!formData.name.trim() || !formData.surname.trim()) {
        alert("İsim ve soyisim zorunludur");
        setShowModal(false);
        return;
      }
      await axios.put(`/students/${id}`, formData);
      navigate("/students");
    } else if (modalAction === "delete") {
      await axios.delete(`/students/${id}`);
      navigate("/students");
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  if (!formData) return null;

  return (
    <div className="container py-4">
      <h4>Öğrenci Düzenle</h4>

      <input
        className="form-control mb-2"
        placeholder="İsim"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Soyisim"
        value={formData.surname}
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
      />

      {/* Sınıf ve Şube */}
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

      <input className="form-control mb-2" type="number" placeholder="Kilo (kg)"
        value={formData.weight ?? ""} onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
      />
      <input className="form-control mb-2" type="number" placeholder="Boy (cm)"
        value={formData.height ?? ""} onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
      />
      <input className="form-control mb-2" type="number" placeholder="Hız"
        value={formData.pace ?? ""} onChange={(e) => setFormData({ ...formData, pace: parseFloat(e.target.value) })}
      />
      <input className="form-control mb-2" type="number" placeholder="Sıçrama"
        value={formData.leap ?? ""} onChange={(e) => setFormData({ ...formData, leap: parseFloat(e.target.value) })}
      />
      <input className="form-control mb-2" type="number" placeholder="Kol Gücü"
        value={formData.armStrength ?? ""} onChange={(e) => setFormData({ ...formData, armStrength: parseFloat(e.target.value) })}
      />
      <input className="form-control mb-2" type="number" placeholder="Bacak Gücü"
        value={formData.legStrength ?? ""} onChange={(e) => setFormData({ ...formData, legStrength: parseFloat(e.target.value) })}
      />

      <input className="form-control mb-2" placeholder="Kas Anatomisi"
        value={formData.muscleAnatomy} onChange={(e) => setFormData({ ...formData, muscleAnatomy: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="Resim URL"
        value={formData.picture || ""} onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
      />

      <strong>Tercih Edilen Sporlar</strong>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {sports.map((s) => (
          <span key={s._id} className={`badge ${formData.preferredSports.some(x => x._id === s._id) ? "bg-danger" : "bg-secondary"}`}
            style={{ cursor: "pointer" }} onClick={() => toggleItem("preferredSports", s)}
          >{s.name}</span>
        ))}
      </div>

      <strong>Uygun Sporlar</strong>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {sports.map((s) => (
          <span key={s._id} className={`badge ${formData.suitableSports.some(x => x._id === s._id) ? "bg-success" : "bg-secondary"}`}
            style={{ cursor: "pointer" }} onClick={() => toggleItem("suitableSports", s)}
          >{s.name}</span>
        ))}
      </div>

      <strong>Veliler</strong>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {parents.map((p) => (
          <span key={p._id} className={`badge ${formData.parents.some(x => x._id === p._id) ? "bg-primary" : "bg-secondary"}`}
            style={{ cursor: "pointer" }} onClick={() => toggleItem("parents", p)}
          >{p.name} {p.surname}</span>
        ))}
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={() => confirmAction("update")}>Güncelle</button>
        <button className="btn btn-danger" onClick={() => confirmAction("delete")}>Sil</button>
      </div>

      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalAction === "update" ? "Güncellemeyi Onayla" : "Silme Onayı"}</h5>
                <button type="button" className="btn-close" onClick={handleModalCancel}></button>
              </div>
              <div className="modal-body">
                <p>{modalAction === "update" ? "Öğrenciyi güncellemek istediğinizden emin misiniz?" : "Öğrenciyi silmek istediğinizden emin misiniz?"}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleModalCancel}>İptal</button>
                <button className={`btn ${modalAction === "update" ? "btn-success" : "btn-danger"}`} onClick={handleModalConfirm}>
                  {modalAction === "update" ? "Güncelle" : "Sil"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEdit;