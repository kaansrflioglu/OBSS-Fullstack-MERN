import { useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  const filteredAndSortedStudents = useMemo(() => {
    return students
      .filter((s) =>
        `${s.name} ${s.surname}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const fullNameA = `${a.name} ${a.surname}`.toLowerCase();
        const fullNameB = `${b.name} ${b.surname}`.toLowerCase();
        return fullNameA.localeCompare(fullNameB, "tr");
      });
  }, [students, search]);

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">Öğrenci Listesi</h5>
            <span className="badge bg-light text-dark">
              {filteredAndSortedStudents.length} kişi
            </span>
          </div>

          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Ad veya Soyad ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="list-group list-group-flush">
          {filteredAndSortedStudents.map((s) => (
            <li
              key={s._id}
              className="list-group-item d-flex align-items-center position-relative"
            >
              {s.picture ? (
                <img
                  src={s.picture}
                  alt=""
                  className="rounded-circle me-3"
                  width={50}
                  height={50}
                />
              ) : (
                <div
                  className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: 50, height: 50 }}
                >
                  ?
                </div>
              )}

              <div>
                <strong>
                  {s.name} {s.surname}
                </strong>
                <div className="text-muted small">
                  {s.gradeLevel}
                  {s.gradeSection}
                </div>
              </div>

              <FaEdit
                size={18}
                style={{ position: "absolute", right: 15, cursor: "pointer" }}
                onClick={() => navigate(`/students/${s._id}`)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentList;