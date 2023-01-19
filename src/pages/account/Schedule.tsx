import React, { useState, useEffect } from "react";
import WebLayout from "@layouts/web/WebLayout";
import HeaderComponent from "@components/head/Header";
import ModalComponent from "@components/modal/ModalComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@states/modalState";
import useAxios from "@/hooks/useAxios";
import { userState } from "@/states/userState";
import { ScheduleInterface } from "@/interfaces/scheduleInterface";

const Schedule = () => {
    const api = useAxios();
    const user = useRecoilValue(userState);
    let userRegMonth = Number(user.userRegDate?.slice(5,7));
    let userRegYear = Number(user.userRegDate?.slice(0,4));
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
    weekday[0] = "일";
    weekday[1] = "월";
    weekday[2] = "화";
    weekday[3] = "수";
    weekday[4] = "목";
    weekday[5] = "금";
    weekday[6] = "토";

    const [yearList, setYearList] = useState<string[]>([]);
    const [monthList, setMonthList] = useState(Array.from({length: 12}, (v, i)=>i+1));
    const [selectYear, setSelectYear] = useState(String(todayYear));
    const [selectMonth, setSelectMonth] = useState(String(todayMonth));
    const [scheduleList, setScheduleList] = useState<ScheduleInterface[]>([]);

    useEffect(() => {
        if (todayYear - userRegYear > 5) {
            setYearList(Array.from({length: 6}, (v, i) => String(todayYear - 5 + i)).reverse());
        }
        else {
            setYearList(Array.from({length: 2024 - userRegYear + 1}, (v, i) => String(userRegYear + i)).reverse());
        }
        
        getSchedule();
    }, [])

    useEffect(()=>{
        getSchedule();
    },[selectYear, selectMonth])

    const getSchedule = () => {
        const requestMonth = selectMonth.length === 1 ? '0'+selectMonth : selectMonth;

        api
            .get(`/usr/plans/monthly-schedule?year=${selectYear}&month=${requestMonth}`, {headers:{Authorization: `Bearer ${user.accessToken}`}})
            .then((res) => {
                setScheduleList(res.data.body);
                console.log(res.data.body);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const day = weekday[today.getDay()];
    const [displayMonth, setDisplayMonth] = useState(todayMonth);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;

        if (name === 'year') {
            if (value !== yearList[0]) setMonthList(Array.from({length: 12}, (v, i) => i+1))
            if (Number(value) === userRegYear) setMonthList(Array.from({length: 12 - userRegMonth + 1}, (v, i) => userRegMonth + i));
            else if (Number(value) === userRegYear) setMonthList(Array.from({length: userRegMonth}, (v, i) => i+1));
            else setMonthList(Array.from({length: 12}, (v, i) => i+1));
            setSelectYear(value);
        }
        else {
            setSelectMonth(value);
        }
    };

    return (
        <WebLayout>
            <HeaderComponent />
            <div className="scheduleBox">
                <p>일정관리</p>
                <div className="schedulDate">
                    <select name="year" id="" className="year selectBox" onChange={handleChange}>
                        {yearList.map((elem, idx) => (
                            Number(elem) === todayYear ?
                            (<option key={elem} value={elem} selected>{elem}년</option>) :
                            (<option key={elem} value={elem}>{elem}년</option>)
                        ))}
                    </select>
                    <select name="month" id="" className="month selectBox" onChange={(e) => setSelectMonth(e.target.value)}>
                        {monthList.map((elem, idx) => (
                            elem === todayMonth ?
                            (<option key={elem} value={elem} selected>{elem}월</option>) :
                            (<option key={elem} value={elem}>{elem}월</option>)
                        ))}
                    </select>
                </div>
                {scheduleList.map((elem, idx) => (
                <div className="programSchedul">
                    {( todayYear === Number(selectYear)
                        && todayMonth === Number(selectMonth)
                        && todayDate === Number(elem.date.slice(0, 10).split('-')[2])) ? (
                    <div className="toDay">
                        <span>
                            {todayMonth}/{todayDate}
                            <br />
                            {day}
                        </span>
                    </div>
                    )
                    :
                    (<div className="roundDate">
                        <span>
                            {selectMonth}/{elem.date.slice(0, 10).split('-')[2]}
                            <br />
                            ({weekday[new Date(elem.date).getDay()]})
                        </span>
                    </div>
                    )}

                    <div className="programInfo">
                        <span className="name goodBye">{elem.type === 'goodBye' ? '굿바이 피로' : '웰컴 굿잠'}</span>
                        <span className="round">{elem.round}회차</span>
                        <span className="time">{elem.startTime} ~ {elem.endTime}</span>
                    </div>
                    { new Date(today) > new Date(elem.date) && (<span className="badge">완료</span>)}
                </div>
                ))}
            </div>
            <button type="button" onClick={handleModal}></button>
            <ModalComponent />
        </WebLayout>
    );
};

export default Schedule;
