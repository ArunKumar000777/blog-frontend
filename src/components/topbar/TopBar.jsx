import React, { useContext } from "react";
import "./topbar.css";
import { Facebook, Twitter, Pinterest, Instagram, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { LS } from "../../config";

const TopBar = () => {
    const { user, dispatch } = useContext(Context);
    console.log(user);
    // const PF = "http://localhost:5000/images/"
    const serverPublic = LS;
    // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log(serverPublic);
    // http://localhost:5000/images
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    return (
        <div className="topBar">
            <div className="topBar__left">
                <Facebook className="socialMedia__icons" />
                <Twitter className="socialMedia__icons" />
                <Pinterest className="socialMedia__icons" />
                <Instagram className="socialMedia__icons" />
            </div>
            <div className="topBar__center">
                <ul className="topList">
                    <li className="topList__item">
                        <Link className="link" to={"/"}>
                            HOME
                        </Link>
                    </li>
                    <li className="topList__item">
                        <Link className="link" to={"/"}>
                            ABOUT
                        </Link>
                    </li>
                    <li className="topList__item">
                        <Link className="link" to={"/"}>
                            CONTACT
                        </Link>
                    </li>
                    <li className="topList__item">
                        <Link className="link" to={"write"}>
                            WRITE
                        </Link>
                    </li>
                    <li className="topList__item" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topBar__right">
                {/* <ul className="topList">
                    <li className="topList__item">REGISTER</li>  
                </ul> */}
                {/* //?implement defualt profile picture */}
                {user ? (
                    <Link to="/settings">
                        <img
                            className="userImage"
                            src={user?.profilePic}
                            alt="DP"
                        />
                        {/* <img className="userImage" src={serverPublic + "defaultProfile.png"} alt="profile image" /> */}
                    </Link>
                ) : (
                    <ul className="topList">
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

                <Search className="searchIcon" />
            </div>
        </div>
    );
};

export default TopBar;
