import React from "react";
import WebLayout from "@layouts/web/WebLayout";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import {Link, useNavigate} from "react-router-dom";

const ModifyInformation = () => {
    const navigate = useNavigate();
    const handleNavigate = (url: string, step: number) => {
        navigate(url, {state: {step: step}});
    };
    return (
        <WebLayout>
            <TitleHeadComponent name="내 정보 수정" targetUrl= ""/>
            <div className="modifyList">
                <ul>
                    <li onClick={event => handleNavigate("/joinModify", 1)}>회원정보 수정</li>
                    <li onClick={event => handleNavigate("/joinModify", 2)}>개인정보 수정</li>
                    <li onClick={event => handleNavigate("/joinModify", 3)}>암 건강정보 수정</li>
                </ul>
            </div>
        </WebLayout>
    );
};

export default ModifyInformation;
