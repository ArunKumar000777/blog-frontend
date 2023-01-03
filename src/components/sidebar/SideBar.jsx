import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Facebook, Twitter, Pinterest, Instagram, Search } from "@mui/icons-material";
import axios from "axios";

const SideBar = () => {
    const [cats , setCats] = useState([])
    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get('/categories')
            setCats(res.data)
        }
        getCats()
    },[])
    // console.log(cats);

    return (
        <div className="sidebar">
            <div className="sidebar__items">
                <span className="sidebar__title">ABOUT ME</span>
                <img
                    className="sidebar__image"
                    src="https://images.pexels.com/photos/1785493/pexels-photo-1785493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="sidebarimage"
                />
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum sit minima nobis nihil adipisci
                    distinctio doloremque corrupti beatae tenetur aliquid?
                </p>
            </div>
            <div className="sidebar__items">
                <span className="sidebar__title">CATEGORIES</span>
                <ul className="sidebarUl">
                    {cats.map(c=> (
                        <li key={c._id} className="sidebarLi__item">{c.name}</li>
                    ))}
                    
                    
                </ul>
            </div>
            <div className="sidebar__items">
                <span className="sidebar__title">FOLLOW US</span>
                <div className="sidebarSMI__container">
                    <Facebook className="sidebarSM__icon" />
                    <Twitter className="sidebarSM__icon" />
                    <Pinterest className="sidebarSM__icon" />
                    <Instagram className="sidebarSM__icon" />
                </div>
            </div>
        </div>
    );
};

export default SideBar;
