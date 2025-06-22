import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import Loader from "./Loader";

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [form, setForm] = useState({ title: "", value: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await API.get("/stats");
      setStats(res.data);
    } catch {
      toast.error("Unauthorized");
      navigate("/");
    }
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/stats/${editId}`, form);
        toast.success("Stat updated");
      } else {
        await API.post("/stats", form);
        toast.success("Stat added");
      }
      setForm({ title: "", value: "" });
      setEditId(null);
      loadStats();
    } catch {
      toast.error("Error saving stat");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = stat => {
    setForm({ title: stat.title, value: stat.value });
    setEditId(stat._id);
  };

  const remove = async id => {
    if (confirm("Delete this stat?")) {
      setLoading(true);
      try {
        await API.delete(`/stats/${id}`);
        toast.success("Deleted");
        loadStats();
      } catch {
        toast.error("Error deleting");
      } finally {
        setLoading(false);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{editId ? "Edit Stat" : "Add Stat"}</h2>
          <button className="text-red-500 hover:underline" onClick={logout}>
            Logout
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Stat Title"
            className="input"
            required
          />
          <input
            name="value"
            type="number"
            value={form.value}
            onChange={e => setForm({ ...form, value: e.target.value })}
            placeholder="Stat Value"
            className="input"
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <Loader /> : editId ? "Update" : "Add"}
          </button>
        </form>

        <ul className="mt-6 space-y-2">
          {stats.length === 0 && <li className="text-center text-gray-500">No stats yet!</li>}
          {stats.map(s => (
            <li key={s._id} className="p-3 bg-gray-50 rounded flex justify-between items-center">
              <span>
                <strong>{s.title}</strong>: {s.value}
              </span>
              <div className="space-x-3">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => startEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => remove(s._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
