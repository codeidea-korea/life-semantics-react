import React, { useState, useEffect } from "react";
import WebLayout from "@layouts/web/WebLayout";
import HeaderComponent from "@components/head/Header";
import { useRecoilState, useRecoilValue } from "recoil";
import useAxios from "@/hooks/useAxios";
import { userState } from "@/states/userState";
import { ScheduleInterface, NewScheduleInterface } from "@/interfaces/scheduleInterface";
import { Navigate, useNavigate } from "react-router-dom";

const Schedule = () => {
    const api = useAxios();
    const navigate = useNavigate();
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    const todayYear = today.getFullYear();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'];
    const day = weekday[today.getDay()];
    const user = useRecoilValue(userState);
    const userRegMonth = Number(user.userRegDate?.slice(5,7));
    const userRegYear = Number(user.userRegDate?.slice(0,4));
    const [yearList, setYearList] = useState<string[]>([]);
    const [monthList, setMonthList] = useState(Array.from({length: 12}, (v, i)=>i+1));
    const [selectYear, setSelectYear] = useState(todayYear);
    const [selectMonth, setSelectMonth] = useState(todayMonth);
    const [scheduleList, setScheduleList] = useState<ScheduleInterface[]>([]);
    const [noScheduleState, SetNoScheduleState] = useState<string[]>([]);
    const [scheduleList1, setScheduleList1] = useState<NewScheduleInterface[]>([]);

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
        const requestMonth = String(selectMonth).padStart(2, '0');
        api
            .get(`/usr/plans/monthly-schedule?year=${selectYear}&month=${requestMonth}`, {headers:{Authorization: `Bearer ${user.accessToken}`}})
            .then((res) => {
                if (!res.data.body.length) {
                    if (Number(selectYear) > todayYear || (Number(selectYear) === todayYear && Number(selectMonth) > todayMonth)) {
                        SetNoScheduleState(['아직 등록된','프로그램의 일정이 없습니다.'])
                    }
                    else SetNoScheduleState(['진행한 프로그램이','없습니다.'])
                    setScheduleList1([]);
                }
                else {
                    let data = res.data.body;
                    data.sort((a: ScheduleInterface, b: ScheduleInterface) => {
                        if (new Date(a.date) > new Date(b.date)) return -1
                        else if (new Date(a.date) < new Date(b.date)) return 1
                        else {
                            if (a.startTime < b.startTime) return 1
                            else if (a.startTime > b.startTime) return -1
                            return 0
                        }
                    });
                    const date = Array.from(new Set(res.data.body.map((elem: ScheduleInterface) => elem.date.slice(0, 10))));
                    let newScheduleList: NewScheduleInterface[] = [];
                    date.map(elem => newScheduleList.push({['date']: String(elem), ['pg']: []}))
                    // Array.from({length: date.length}, (v, i)=>{return { 'date': date[i], 'pg': []}})
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < newScheduleList.length; j++) {
                            let obj = {
                                ['type']: String(data[i].type), 
                                ['round']: data[i].round,
                                ['startTime']: String(data[i].startTime),
                                ['endTime']: String(data[i].endTime)
                            }
                            if (data[i].date.slice(0, 10) === newScheduleList[j].date) newScheduleList[j].pg.push(obj);
                        }
                        
                    }
                    setScheduleList1(newScheduleList);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;

        if (name === 'year') {
            let newMonthList = [];
            if (value === yearList[yearList.length-1] && Number(value) === userRegYear) newMonthList = Array.from({length: 12 - userRegMonth + 1}, (v, i) => userRegMonth + i);
            else newMonthList = Array.from({length: 12}, (v, i) => i+1);
            setSelectMonth(newMonthList[0]);
            setMonthList(newMonthList);
            setSelectYear(Number(value));
        }
        else {
            setSelectMonth(Number(value));
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
                    <select name="month" id="" className="month selectBox" onChange={handleChange}>
                        {monthList.map((elem, idx) => (
                            elem === todayMonth ?
                            (<option key={elem} value={elem} selected>{elem}월</option>) :
                            (<option key={elem} value={elem}>{elem}월</option>)
                        ))}
                    </select>
                </div>
                {
                scheduleList1 && (
                scheduleList1.map((elem, idx) => (
                <div className="programSchedul">
                    {( todayYear === Number(selectYear)
                        && todayMonth === Number(selectMonth)
                        && todayDate === Number(elem.date.split('-')[2])) ? (
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
                            {selectMonth}/{elem.date.split('-')[2]}
                            <br />
                            ({weekday[new Date(elem.date).getDay()]})
                        </span>
                    </div>
                    )}
                    <div>
                        {elem.pg.map((pg: { type: string; round: number; startTime: string; endTime: string; }, idx: number) => (
                            <div className="programInfo">
                                <span className="name goodBye">{pg.type === 'goodBye' ? '굿바이 피로' : '웰컴 굿잠'}</span>
                                <span className="round">{pg.round}회차</span>
                                <span className="time">{pg.startTime} ~ {pg.endTime}</span>
                            </div>
                        ))}
                        { new Date(today) > new Date(elem.date) && (<span className="badge">완료</span>)}
                    </div>
                </div>
                ))
                )}
                {!!scheduleList.length || (
                <div className="noSchedule">
                    {noScheduleState[0]}<br/>
                    {noScheduleState[1]}
                    <button type="button" className="btn-02 active" onClick={() => navigate('/program')}>프로그램 예약하기</button>
                </div>
                )}
            </div>
        </WebLayout>
    );
};

export default Schedule;
