import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { token, updateToken } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("http://localhost:7777/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data) {
                    setUser(data);
                }
                setIsLoggedIn(!!token);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [token]);

    const handleLogout = () => {
        updateToken(null);
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-div">
                <ul className="nav-links">
                    <li>
                        {!isLoggedIn && (
                            <NavLink to="/">Login</NavLink>
                        )}
                    </li>
                    <li>
                        {isLoggedIn && (
                            <NavLink to="/products">Products</NavLink>
                        )}
                    </li>
                    <li>
                        {isLoggedIn && (
                            <NavLink to="/orders">Orders</NavLink>
                        )}
                    </li>
                    <li>
                        {isLoggedIn && (
                            <NavLink to="/" onClick={handleLogout}>Logout {user?.userName}</NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;