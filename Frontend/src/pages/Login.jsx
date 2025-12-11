import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api.js";
import { setAuthToken, setUser } from "../utils/auth.js";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin"); // admin or doctor
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
     const res = await authAPI.login(formData.email, formData.password, role);

      // Save token & user info
      setAuthToken(res.data.token);
      setUser(res.data.user);

      // Redirect based on role
      if (res.data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/doctor/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 w-96 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <select
          className="w-full border p-2 rounded mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
        </select>

        <input
          className="w-full border p-2 mb-3 rounded"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        {error && <p className="text-red-600">{error}</p>}

        <button className="bg-indigo-600 w-full py-2 text-white rounded mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
