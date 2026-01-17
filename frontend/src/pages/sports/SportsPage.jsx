import { useEffect, useState } from "react";
import axios from "../../api/axios";

const SportsPage = () => {
  const [sports, setSports] = useState([]);
  const [name, setName] = useState("");

  const fetchSports = async () => {
    const res = await axios.get("/sports");
    setSports(res.data);
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const addSport = async () => {
    if (!name) return;
    await axios.post("/sports", { name });
    setName("");
    fetchSports();
  };

  const deleteSport = async (id) => {
    await axios.delete(`/sports/${id}`);
    fetchSports();
  };

  return (
    <div>
      <h3>Sports Management</h3>

      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="New Sport Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addSport}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {sports.map((s) => (
          <li
            key={s._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {s.name}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteSport(s._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsPage;