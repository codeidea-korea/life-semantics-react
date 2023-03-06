import React, { useEffect, useState } from "react";
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
import useAxios from "@/hooks/useAxios";

const Program = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const [, setPolicy] = useRecoilState(joinPolicyState);
    const policyAllReset = useRecoilValue(joinPolicyAllReset);
    const api = useAxios();
    const [showSurvey, setShowSurvey] = useState(false);

    const getMorePrograms = () => {
        navigate("/program");
    };

    useEffect(() => {
        setPolicy(policyAllReset);
        if (user.accessToken) {
            api
                .post(`/usr/programs/myList?paUserNo=${user.userNo}`, null, {headers: {Authorization: `Bearer: ${user.accessToken}`}})
                .then((res) => {
                    console.log(res.data)
                    if (!res.data.body.length) setShowSurvey(false);
                    else setShowSurvey(true);
                })
                .catch((err) => console.log(err))
        }
        console.log(user);
    }, []);

    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="programName">
                {showSurvey && <BookProgram />}
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
                    고객센터 : <span>032-820-4209</span> <br />
                    문의하실 내용이 있으면, 고객센터로 연락바랍니다.
                </p>
                <Link to="/agreement">이용약관</Link>
                <Link to="/policy">개인정보 처리방침</Link>
            </div>
        </React.Fragment>
    );
};

export default Program;
