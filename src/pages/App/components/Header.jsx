import { useState, useRef, useEffect } from "react"
import PropTypes from 'prop-types';

// Profile Dropdown
const ProfileDropDown = ({propClass, token}) => {
    const [state, setState] = useState(false)
    const profileRef = useRef()

    const navigation = [
        { title: "Settings", path: "/app/settings", icon: "fa-sliders" },
        { title: "Log out", path: "/app/logout", icon: "fa-right-from-bracket" },
    ]
    
    useEffect(() => {
        const handleDropDown = (e) => {
            // console.log('e.target', e.target);
            // console.log('profileRef.current', profileRef.current);
            if (!profileRef.current.contains(e.target)) setState(false)
        }
        document.addEventListener('click', handleDropDown)
    }, [])

    return (
        <div className={`relative ${propClass} mx-2`}>
            <div className="flex items-center space-x-4">
                <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                    onClick={() => setState(!state)}
                >
                    <img
                        src={token.user?.profile_picture ? token.user?.profile_picture : "/icons/user.png"}
                        className="w-full h-full rounded-full"
                    />
                </button>
                <div className="lg:hidden">
                    <span className="block">Micheal John</span>
                    <span className="block text-sm text-gray-500">john@gmail.com</span>
                </div>
            </div>
            <ul className={`bg-white z-50 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                {
                    navigation.map((item, idx) => (
                        <li key={idx}>
                            <a className="block text-gray-600 hover:bg-gray-50 hover:text-gray-800 lg:p-2.5" href={item.path}>
                                <i className={`fa-solid ${item.icon} me-2`}></i>
                                {item.title}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

// Validación de las propiedades
ProfileDropDown.propTypes = {
    propClass: PropTypes.string,  // Valida que children sea un nodo de React y sea requerido
    token: PropTypes.object.isRequired,
};

const Header = ({ token }) => {

    const [menuState, setMenuState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "Manual rastreador", path: "/app/manual" }
    ]
    // const navigation = []
    return (
        <nav className="bg-white border-b">
            <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">
                    <a href="/app">
                        <img
                            src="/icons/dark-favicon.svg" 
                            width={60} 
                            height={40}
                            alt="Cosmos Logo"
                        />
                    </a>
                </div>
                <div className="flex-1 flex items-center justify-between">
                    <div className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none lg:p-0 ${menuState ? '' : 'hidden'}`}>
                        <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="text-indigo-600 hover:text-indigo-400">
                                        <a href={item.path}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <ProfileDropDown 
                            propClass={"mt-5 pt-5 border-t lg:hidden"}
                            token={token}
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                        <ProfileDropDown 
                            propClass={"hidden lg:block"}
                            token={token}
                        />
                        <button 
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {
                                menuState ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

Header.propTypes = {
    token: PropTypes.object.isRequired,
};

export default Header;