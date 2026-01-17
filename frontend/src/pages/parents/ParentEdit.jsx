import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ParentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [sports, setSports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");

  useEffect(() => {
    axios.get("/sports").then((res) => setSports(res.data));

    axios.get("/parents").then((res) => {
      const found = res.data.find((p) => p._id === id);
      if (!found) {
        alert("Veli bulunamadı");
        navigate("/parents");
        return;
      }

      setForm({
        name: found.name || "",
        surname: found.surname || "",
        phone: found.phone || "",
        height: found.height ?? null,
        sportsBackground: found.sportsBackground || [],
        relation: found.relation || ""
      });
    });
  }, [id, navigate]);

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

  const confirmAction = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "update") {
      if (!form.name.trim() || !form.surname.trim()) {
        alert("Ad ve soyad zorunludur");
        setShowModal(false);
        return;
      }

      await axios.put(`/parents/${id}`, form);
      navigate("/parents");
    }

    if (modalAction === "delete") {
      await axios.delete(`/parents/${id}`);
      navigate("/parents");
    }

    setShowModal(false);
  };

  if (!form) return null;

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 3));
    if (digits.length > 3) parts.push(digits.slice(3, 6));
    if (digits.length > 6) parts.push(digits.slice(6, 8));
    if (digits.length > 8) parts.push(digits.slice(8, 10));

    return parts.join("-");
  };


  return (
    <div className="container py-4">
      <h4>Veli Düzenle</h4>

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
            height: e.target.value === "" ? null : parseFloat(e.target.value)
          })
        }
      />

      <input
        className="form-control mb-3"
        placeholder="Yakınlık Derecesi (Anne, Baba, Vasi...)"
        value={form.relation}
        onChange={(e) => setForm({ ...form, relation: e.target.value })}
      />

      <strong>Spor Geçmişi</strong>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {sports.map((s) => (
          <span
            key={s._id}
            className={`badge ${form.sportsBackground.some((x) => x._id === s._id)
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

      <div className="d-flex gap-2">
        <button
          className="btn btn-success"
          onClick={() => confirmAction("update")}
        >
          Güncelle
        </button>

        <button
          className="btn btn-danger"
          onClick={() => confirmAction("delete")}
        >
          Sil
        </button>
      </div>

      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalAction === "update"
                    ? "Güncellemeyi Onayla"
                    : "Silme Onayı"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <p>
                  {modalAction === "update"
                    ? "Veliyi güncellemek istediğinizden emin misiniz?"
                    : "Veliyi silmek istediğinizden emin misiniz?"}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  İptal
                </button>
                <button
                  className={`btn ${modalAction === "update"
                    ? "btn-success"
                    : "btn-danger"
                    }`}
                  onClick={handleModalConfirm}
                >
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

export default ParentEdit;