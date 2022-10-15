import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Modal from "./Modal";

const Layout = () => {
    const { signOut, username } = useAuth()
    console.log(username)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to='/' className="navbar-brand">Chat</Link>
                    {localStorage.getItem('name') && <button className="btn btn-primary" onClick={signOut}>Выход</button>}
                </div>
            </nav>
            <Outlet />
            <Modal />
        </>
    )
}

export default Layout