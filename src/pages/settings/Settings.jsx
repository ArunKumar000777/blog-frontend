import React, { useState } from "react";
import "./settings.css";
import Sidebar from "../../components/sidebar/SideBar";
import UserIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethods";
import { LS } from "../../config";
const Settings = () => {
    const { user, dispatch } = useContext(Context);
    // console.log(user);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    // const [password, setPassword] = useState(null);
    const [success, setSuccess] = useState(false);
    const PF = LS;

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            // password,
            email,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            updatedUser.profilePic = fileName;

            try {
                await publicRequest.post("/upload", data);
            } catch (error) {
                // console.log(error);
            }
        }
        try {
            const res = await publicRequest.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className="settings">
            <div className="settings__wrapper">
                <div className="settings__title">
                    <span className="settings__updateTitle">Update Your Account</span>
                    <span className="settings__deleteTitle">Delete Account</span>
                </div>
                <form action="" className="settings__form" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settings__pp">
                        <img className="settings__ppImg" src={file ? URL.createObjectURL(file) : PF + user.profilePic} />
                        <label htmlFor="fileInput">
                            <div className="settings__ppIcon">
                                <UserIcon className="userIcon" sx={{ fontSize: "35px" }} />
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {/* <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} /> */}
                    <button className="settings__submit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span style={{ textAlign: "center", color: "green", marginTop: "20px" }}>
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>
            <Sidebar />
        </div>
    );
};

export default Settings;
