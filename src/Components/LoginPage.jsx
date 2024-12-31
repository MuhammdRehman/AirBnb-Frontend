import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/SignupPage.css";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState(""); 
    const { setUser } = useAuthStore();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            if (!role) {
                toast.error("Please select a role (Host or Guest) before logging in.");
                return;
            }

            const res = await axios.post('http://localhost:3001/api/auth/login', {
                username,
                password,
                role, 
            });

            console.log(res);
            toast.success("Login Successful");
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            toast.error(error.response?.data || "An error occurred while logging in.");
        }
    };

    return (
        <div className="container">
            <h1 style={{color:"rgb(190, 109, 109)"}}>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="role">Select Role</label>
                    <select className="input" id="role" value={role} onChange={(e) => setRole(e.target.value)} required >
                        <option value="" disabled>--Select-Role--</option>
                        <option value="admin">Admin</option>
                        <option value="host">Host</option>
                        <option value="guest">Guest</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="input"
                        type="text"
                        id="username"
                        placeholder="Please enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="input"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Please enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️‍🗨️"}
                    </span>
                </div>

                <button type="submit" className="button">
                    Login
                </button>
            </form>
            <br />
            <br />
            <label htmlFor="Signup">
                Click here to <a href="/signup">Create New Account</a>
            </label>
        </div>
    );
};

export default LoginPage;
