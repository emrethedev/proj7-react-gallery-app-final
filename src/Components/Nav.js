import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ( props ) => {
    
    return (

        <nav className="main-nav">
            <ul>
                <li><NavLink to="/search/toast">Toast</NavLink></li>
                <li><NavLink to="/search/ketchup">Ketchup</NavLink></li>
                <li><NavLink to="/search/olives">Olives</NavLink></li>
            </ul>
        </nav>
    
    );
};

export default Nav;