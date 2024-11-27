import { useState } from "react";
import axiosInstance from "../services/api-users"; 
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          // Use axiosInstance to make the API call
          const response = await axiosInstance.post("/auth/login", { email, password });
          console.log(response.data); // Response from backend
          navigate("/profile"); // Navigate to the profile page after login
        } catch (error: any) {
          setError(error.response?.data || "Login failed.");
        }
      };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="loginButtons">
        <div className="btn-margin">
          <button type="submit" className="btn btn-warning">
            Login
          </button>
        </div>
        <div className="btn-margin">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
