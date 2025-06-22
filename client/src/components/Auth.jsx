import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import Loader from "./Loader";

function Auth() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/user");
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    try {
      const res = await API.post(endpoint, form);
      localStorage.setItem("token", res.data.token);
      toast.success(isRegister ? "Registered" : "Logged in");
      navigate("/user");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          {isRegister && <input type="text" placeholder="Name" className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />}
          <input type="email" placeholder="Email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <Loader /> : isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button className="text-blue-600 ml-1" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
