import React from 'react';
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
const NavSidebar = ({ sidebaractive, sidebarMenu }) => {
    const navigation = [
        { name: 'Home', to: '/home' },
        { name: 'Translate', to: '/translate' },
        { name: 'Resources', to: '/resources' },
        { name: 'Discussion', to: '/discussion' },
    ]
    return (
        <div>
            <ul className={sidebaractive ? 'flex-col flex fixed inset-0 right-1/4 lg:left-3/4 uppercase   gap-6  md: lg:block bg-white text-black text-start  ' : 'hidden'}>
                <div className="grid grid-cols-2 md:gap-96">
                    <RxCross1 className="text-xl ml-5 mt-5 text-black" onClick={sidebarMenu}></RxCross1>

                </div>
                <div className="flex flex-col ">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.to} className="text-md font-semibold leading-6 text-gray-900 mt-4">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default NavSidebar;