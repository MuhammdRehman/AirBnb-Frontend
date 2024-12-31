import React, { useState } from "react";
import "../Styles/SignupPage.css"; // Import the external CSS file
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState();
    const navigate = useNavigate();
    const {setUser} = useAuthStore();
    const handleSignup = async (e) => {
        try {
            e.preventDefault();
            if (password !== confirmPassword) {
                alert("Confirm Password should be the same as Password");
                return;
            }
            const res = await axios.post('http://localhost:3001/api/auth/register', {
                username,
                password,
                role
            });
          
            toast.success("Successfully SignedUp");
            setUser(res.data.user);
            navigate("/");

        } catch (error) {
            toast.error(error.response.data);
        }
    };

    return (
        <div className="container">
            <h1>Signup Page</h1>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="role">Please select your role</label>
                    <select className="input" name="role" id="role" defaultValue={""} value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="" disabled>--Select-Role--</option>
                        <option value="host">Host</option>
                        <option value="guest">Guest</option>
                    </select>

                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="input" type="text" id="username" placeholder="Please enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="form-group">

                    <label htmlFor="password">Password</label>
                    <input className="input" type={showPassword ? "text" : "password"} id="password" placeholder="Please enter a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span
                        className="toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}> {showPassword ? "🙈" : "👁️‍🗨️"}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className="input" type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <span
                        className="toggle-icon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "🙈" : "👁️‍🗨️"}
                    </span>
                </div>

                <button type="submit" className="signup-button">
                    SignUp
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
