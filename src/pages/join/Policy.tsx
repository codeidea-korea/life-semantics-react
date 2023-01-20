import React from "react";
import WebLayout from "@layouts/web/WebLayout";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "@components/head/Header";

const Policy = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <HeaderComponent />
            <WebLayout>
                <div className="headerSpace"></div>
                <div className="policy">
                    <h3>개인정보처리방침</h3>
                </div>
            </WebLayout>
        </React.Fragment>
    );
};

export default Policy;
