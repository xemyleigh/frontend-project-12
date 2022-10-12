import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
    const { signOut, username } = useAuth()
    console.log(useAuth())
    console.log(username)
    console.log(signOut)
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
            <div className='container-fliud'>
                <div className='row align-content-center justify-content-center'>
                    <div className='col-6'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout