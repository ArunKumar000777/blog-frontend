import React from "react";
import { TailSpin } from "react-loader-spinner";
import "./loader.css";
const Loader = () => {
    return (
        <div className="spinner_loader">
            <div className="spinner">
                <TailSpin
                    height="80"
                    width="80"
                    color="rgb(0,128,128)"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </div>
    );
};

export default Loader;
