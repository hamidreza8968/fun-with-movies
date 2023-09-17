import Logo from "../logo";
import {useRef} from "react";

function NavBar({movies, error, children}) {
    console.log(error)
    const watched = JSON.parse(localStorage.getItem("watched"))
    let condition = useRef(false)

    if (watched?.length > 0 || movies?.length > 0) {
        condition.current = true;
    }
    return condition.current ?
        <nav className="nav-bar">
            <Logo/>
            {children}
        </nav> :
        <div className="full-screen-nav">
            <div className="logo-inside">
                <Logo/>
            </div>
            <div className="nav-inside">
                {children}
                {error && <p className="nav-inside-message">🚫&nbsp;{error} </p>}

            </div>

        </div>
}

export default NavBar