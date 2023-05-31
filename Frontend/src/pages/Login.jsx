import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { updateToken } = useContext(AuthContext);
    const [loginData, setLoginData] = useState({
        userName: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:7777/api/users/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
            const data = await res.json();

            if (data.token) {   //if token was recieved
                updateToken(data.token); //gets token from data and runs it through updateToken function
            } else {    //if token wasn't recieved
                updateToken(null); //sends null to function which avoids it being a string "undefined" which can't be parsed
            }

            navigate("/products");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-form-box">
            <div className="login-title">
                <p>Admin Login</p>
                <div className="login-title-border" />
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input">
                    <div className="register-link">
                        <label htmlFor="userName">Username*</label>
                    </div>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        value={loginData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="login-input">
                    <div className="forgot-pw">
                        <label htmlFor="password">Password*</label>
                    </div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>
                <button className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
