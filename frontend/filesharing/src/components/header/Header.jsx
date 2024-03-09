import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context';

function Header() {
    const { loginStatus
        ,updateLoginStatus } = useAuth()
    // console.log(loginStatus)
    const navitem = [
        {
            "name": "Home",
            "target": "/"
        },
        {
            "name": "AllDoc",
            "target": "/AllDoc"
        },
        // {
        //     "name": "Created Doc",
        //     "target": "/created"
        // },
    ];
    // console.log(authStatus)
    const logout=()=>{
        localStorage.removeItem('token')
        updateLoginStatus(false)

    }
    return (
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 flex justify-between items-center  shadow-lg  w-full top-0">
            <ul className="flex justify-center space-x-4">
                {navitem.map((item, index) => (
                    <li key={index} className="text-white cursor-pointer hover:text-gray-300 px-4 py-2 rounded transition duration-300 transform hover:scale-105">
                        <Link 
                        to={item.target}
                        onClick={()=>{changeDocStatus(false)}}
                        >{item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex items-center">
                {!loginStatus ?<><Link to="/signup">
                    <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded
                     hover:bg-blue-600 mr-4"
                     onClick={()=>{changeDocStatus(false)}}
                     >
                        Sign Up
                    </button>
                </Link>
                <Link to="/login">
                    <button
                    className="bg-green-500 text-white px-4 py-2 
                    rounded hover:bg-green-600"
                    onClick={()=>{changeDocStatus(false)}}
                    >
                        Login
                    </button>
                </Link> </>:
                    <button 
                    className="bg-red-500 text-white px-4 py-2
                    rounded hover:bg-green-600"
                    onClick={logout}
                    >
                        Logout
                    </button>
                }

            </div>
        </div>
    );
}

export default Header;
