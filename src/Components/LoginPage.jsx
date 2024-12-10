import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/SignupPage.css";
import { useAuthStore } from "../store/useAuthStore";
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useAuthStore();

    const handleLogin = async(e) => {
        try {
            e.preventDefault();
            const res = await axios.post('http://localhost:3001/api/auth/login',{
                username,
                password
            });
           
            console.log(res);
            //toast.success("Login Successful");
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
            

        } catch (error) {
            toast.error(error.response.data);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Please enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? "text" : "password"} id="password" placeholder="Please enter a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span
                        className="toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}> {showPassword ? "👁️‍🗨️" : "🙈"}
                    </span>
                </div>

                <button type="submit" className="signup-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
