import React, { useContext, useEffect, useRef, useState } from "react";
import "./topbar.css";
import { Facebook, Twitter, Pinterest, Instagram, Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import dp from "../../utils/defaultProfile.png";
const TopBar = () => {
    const { user, dispatch } = useContext(Context);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    const ref = useRef(null);

    const location = useLocation();

    useEffect(() => {
        // function to run on route change
        setMenuOpen(false);
    }, [location]);
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            setMenuOpen(false);
        }
    }

    return (
        <div className="topBar">
            <div className="topBar__left">
                <Facebook className="socialMedia__icons" />
                <Twitter className="socialMedia__icons" />
                <Pinterest className="socialMedia__icons" />
                <Instagram className="socialMedia__icons" />
            </div>
            <div className="menu__icon">
                <MenuIcon style={{ fontSize: 30 }} onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            {user ? (
                <Link to="/settings">
                    <div className="mobile__dp">
                        <img className="userImage" src={user?.profilePic ? user?.profilePic : dp} alt="DP" />
                    </div>
                </Link>
            ) : null}
            <div className="navlinks__container" id={menuOpen ? "" : "hidden"} ref={ref}>
                <div className="topBar__center">
                    <ul className="topList">
                        <div className="close__icon">
                            <CloseIcon style={{ fontSize: 28 }} onClick={() => setMenuOpen(!menuOpen)} />
                        </div>
                        <li className="topList__item">
                            <Link className="link" to={"/"}>
                                HOME
                            </Link>
                        </li>
                        <li className="topList__item">
                            <Link className="link" to={"write"}>
                                WRITE
                            </Link>
                        </li>
                        <li className="topList__item">
                            <Link className="link" to={"/"}>
                                ABOUT
                            </Link>
                        </li>
                        <li className="topList__item">
                            <Link className="link" to={"settings"}>
                                SETTINGS
                            </Link>
                        </li>
                        <li className="topList__item link" onClick={handleLogout}>
                            {user && "LOGOUT"}
                        </li>
                    </ul>
                </div>

                <div className="topBar__right">
                    {/* //?implement defualt profile picture */}
                    {user ? (
                        <Link to="/settings">
                            <div className="topBar__image__container">
                                <img className="userImage" src={user?.profilePic ? user?.profilePic : dp} alt="DP" />
                            </div>
                        </Link>
                    ) : (
                        <ul className="topList auth__container" id={menuOpen ? "" : "hidden"}>
                            <li className="topList__item">
                                <Link className="link" to={"login"}>
                                    LOGIN
                                </Link>
                            </li>
                            <li className="topList__item">
                                <Link className="link" to={"register"}>
                                    REGISTER
                                </Link>
                            </li>
                        </ul>
                    )}
                    <div className="searchIcon">
                        <Search />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
