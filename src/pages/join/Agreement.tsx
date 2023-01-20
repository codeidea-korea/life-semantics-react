import React from "react";
import WebLayout from "@layouts/web/WebLayout";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "@components/head/Header";

const Agreement = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <HeaderComponent />
            <WebLayout>
                <div className="headerSpace"></div>
                <div className="policy">
                    <h3>이용약관</h3>
                </div>
            </WebLayout>
        </React.Fragment>
    );
};

export default Agreement;
