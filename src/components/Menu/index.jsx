import styles from "./styles.module.css";
import React from "react";

import { Link } from 'react-router-dom';

const Todo = () => {
    const Token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        window.location.reload();
    };

    return (
        <div className={styles.menu}>
            <div className="Bigcontainer">
                <nav className={styles.navbar}>
                    <Link to="/"><h1>To DO</h1></Link>

                    {Token && (
                        
                        <button className={styles.link} onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                    {!Token && (
                        <ul>
                            <li className={styles.link}>
                                <Link to="/login">Login</Link>
                            </li>

                            <li className={styles.link}>
                                <Link to="/singup">Sign up</Link>
                            </li>
                        </ul>
                    )}

                </nav>
            </div>
        </div>
    );
};

export default Todo;