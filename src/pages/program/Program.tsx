import React, { useEffect } from "react";
import BookComponent from "@components/program/book/BookComponent";
import GoodByeComponent from "@components/program/GoodByeProgramComponent";
import GoodSleepComponent from "@components/program/GoodSleepProgramComponent";
import BannerComponent from "@components/program/banner/BannerComponent";
import BookProgram from "./BookProgram";
import HeaderComponent from "@components/head/Header";
import { userState } from "@states/userState";
import { useRecoilState, useRecoilValue } from "recoil";
import BannerComponent02 from "@/components/program/banner/BannerComponent02";
import { Link, useNavigate } from "react-router-dom";
import { joinPolicyAllReset, joinPolicyState } from "@states/joinPolicyState";

const Program = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const [, setPolicy] = useRecoilState(joinPolicyState);
    const policyAllReset = useRecoilValue(joinPolicyAllReset);

    const getMorePrograms = () => {
        navigate("/program");
    };

    useEffect(() => {
        setPolicy(policyAllReset);
    }, []);
    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="programName">
                {user.accessToken && <BookProgram />}
                <GoodByeComponent />
                <GoodSleepComponent />
            </div>
            <BannerComponent />
            <div className="cancerProgram">
                암경험자를 위한
                <br />
                산림치유 프로그램
            </div>
            <BookComponent />
            <button type="button" className="borderButton02" onClick={getMorePrograms}>
                프로그램 더보기
            </button>
            <BannerComponent02 />

            <div className="customerBox">
                <p>
                    고객센터 : <span>02 - 123 - 4567</span> <br />
                    문의하실 내용이 있으면, 고객센터로 연락바랍니다.
                </p>
                <Link to="/agreement">이용약관</Link>
                <Link to="/policy">개인정보 처리방침</Link>
            </div>
        </React.Fragment>
    );
};

export default Program;
