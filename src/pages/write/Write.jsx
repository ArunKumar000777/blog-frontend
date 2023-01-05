import React, { useContext, useState } from "react";
import "./write.css";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethods";
const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.photo = fileName;

            try {
                await publicRequest.post("/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await publicRequest.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="write">
            {file && <img className="write__img" src={URL.createObjectURL(file)} alt="" />}

            <form action="" className="write__form" onSubmit={handleSubmit}>
                <div className="write__formGroup">
                    <label htmlFor="fileInput">
                        <div className="write__addIcon">
                            <AddIcon />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="write__input"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="write__formGroup">
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="write__input write__text"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="write__submit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Write;
