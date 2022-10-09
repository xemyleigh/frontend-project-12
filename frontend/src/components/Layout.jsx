import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link to='/' className="navbar-brand">Chat</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li class="nav-item">
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