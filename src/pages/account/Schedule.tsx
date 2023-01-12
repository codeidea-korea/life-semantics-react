import React, { useState } from "react";
import WebLayout from "@layouts/web/WebLayout";
import HeaderComponent from "@components/head/Header";
import ModalComponent from "@components/modal/ModalComponent";
import { useRecoilState } from "recoil";
import { modalState } from "@states/modalState";

const Schedule = () => {
    const [modal, setModal] = useRecoilState(modalState);
    const handleModal = () => {
        setModal({
            ...modal,
            show: true,
            title: "안내",
            content: "아이디 또는 비밀번호를 다시 확인해 주세요.",
        });
    };

    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    const todayYear = today.getFullYear();
    const weekday = new Array(7);
    weekday[0] = "일요일";
    weekday[1] = "월요일";
    weekday[2] = "화요일";
    weekday[3] = "수요일";
    weekday[4] = "목요일";
    weekday[5] = "금요일";
    weekday[6] = "토요일";

    const day = weekday[today.getDay()];
    const [displayMonth, setDisplayMonth] = useState(todayMonth);

    const handleChange = (index: number) => {
        let temp = displayMonth + index;
        if (temp > 9 && temp < 13) setDisplayMonth(temp);
    };

    return (
        <WebLayout>
            <HeaderComponent />
            <div className="scheduleBox">
                <p>일정관리</p>
                <div className="schedulDate">
                    <select name="" id="" className="year selectBox">
                        <option value="">2022년</option>
                        <option value="">2021년</option>
                        <option value="">2020년</option>
                    </select>
                    <select name="" id="" className="month selectBox">
                        <option value="">8월</option>
                        <option value="">7월</option>
                        <option value="">6월</option>
                    </select>
                    {/* <span className="fullYear">{todayYear}년</span>
                    <div className="date">
                        <button type="button" onClick={(event) => handleChange(-1)}></button>
                        <span className="month">{displayMonth}월</span>
                        <button type="button" onClick={(event) => handleChange(1)}></button>
                    </div> */}
                </div>
                <div className="programSchedul">
                    <div className="toDay">
                        <span>
                            {displayMonth}/{todayDate}
                            <br />
                            {day}
                        </span>
                    </div>
                    <div className="programInfo">
                        <span className="name goodBye">굿바이 피로</span>
                        <span className="round">3회차</span>
                        <span className="time">10:00 ~ 11:00</span>
                    </div>
                </div>
                <div className="programSchedul ">
                    <div className="roundDate">
                        <span>
                            8/22
                            <br />
                            (월)
                        </span>
                    </div>
                    <div className="programInfo">
                        <span className="name goodBye">굿바이 피로</span>
                        <span className="round">3회차</span>
                        <span className="time">10:00 ~ 11:00</span>
                    </div>
                </div>
                <div className="programSchedul programType">
                    <div className="roundDate">
                        <span>
                            8/22
                            <br />
                            (월)
                        </span>
                    </div>
                    <div>
                        <div className="programInfo">
                            <span className="name goodBye">굿바이 피로</span>
                            <span className="round">3회차</span>
                            <span className="time">10:00 ~ 11:00</span>
                        </div>
                        <div className="programInfo">
                            <span className="name welcome">굿바이 피로</span>
                            <span className="round">3회차</span>
                            <span className="time">10:00 ~ 11:00</span>
                        </div>
                    </div>
                    <span className="badge">완료</span>
                </div>
            </div>
            <button type="button" onClick={handleModal}></button>
            <ModalComponent />
        </WebLayout>
    );
};

export default Schedule;
