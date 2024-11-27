import { useState } from "react";
import axiosInstance from "../services/api-users"; // Importing from the services folder
import { useNavigate } from "react-router-dom";


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        // Use axiosInstance to make the API call
        const response = await axiosInstance.post("/auth/register", {
          username,
          email,
          password,
        });
        console.log(response.data); // Response from backend
        navigate("/"); // Redirect to the login page
      } catch (error: any) {
        setError(error.response?.data || "Registration failed.");
      }
    };


  return (

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="registerButtons">
        <div className="btn-margin">
          <button type="submit" className="btn btn-warning">
            Register
          </button>
        </div>
        <div className="btn-margin">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
