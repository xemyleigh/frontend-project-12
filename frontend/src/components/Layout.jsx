import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
    const { signOut, username } = useAuth()
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">Chat</Link>
                    {username && <button className="btn btn-primary" onClick={signOut}>Выход</button>}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='container my-4 rounded shadow'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout