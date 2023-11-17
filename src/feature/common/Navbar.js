import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'
import './Navbar.css'
import { useSelector } from 'react-redux';
import NavSidebar from './NavSidebar';
const Navbar = () => {

    const navigation = [
        { name: 'Home', to: '/home' },
        { name: 'Translate', to: '/translate' },
        { name: 'Resources', to: '/resources' },
        { name: 'Discussion', to: '/discussion' },
    ]
    const [active, setActive] = useState(false)

    const showMenu = () => {
        setActive(!active)
    }
    const [sidebaractive, setSidebarActive] = useState(false)

    const sidebarMenu = () => {
        setSidebarActive(!sidebaractive)
    }
    const { token } = useSelector(
        (state) => state.user
    );
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between  p-4 lg:p-6 lg:px-8" aria-label="Global">

                <div className="lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={sidebarMenu}
                    >
                        {/* <span className="sr-only">Open main menu</span> */}
                        <FiMenu className="lg:hidden block h-8 w-8 cursor-pointer mr-3 "
                        />
                    </button>
                    <NavSidebar sidebaractive={sidebaractive} sidebarMenu={sidebarMenu}></NavSidebar>
                </div>



                <div className="flex lg:flex-1">
                    <Link to="/">
                        <p className="text-2xl">Learnify App</p>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.to} className="text-md font-semibold leading-6 text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="ml-4">
                    {
                        token ? <div className="w-8 md:w-10 rounded-full">
                            <img src="" alt="profile" className="border p-1 rounded-full h-8 w-8" onClick={showMenu} />
                        </div> : <div className="hidden md:flex  gap-4 ">
                            <Link to="/login" className="text-md font-semibold leading-6 text-gray-900">
                                login
                            </Link>
                            <Link to="/register" className="text-md font-semibold leading-6 text-gray-900">
                                Register
                            </Link>
                        </div>
                    }
                </div>
            </nav>
            <ul className={active ? "navbar-ul p-2 shadow bg-base-100 rounded-box w-52" : "hidden"}>
                <li className="justify-between">
                    <Link to={"/app/settings-profile"}>
                        Profile Settings

                    </Link>
                </li>

                <hr />
                <li>
                    <a >Logout</a>
                </li>
            </ul>
        </header>
    );
};

export default Navbar;