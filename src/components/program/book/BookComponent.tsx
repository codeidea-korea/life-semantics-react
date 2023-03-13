import React, {useEffect, useState} from "react";
import useAxios from "@hooks/useAxios";
import {ProgramInterface} from "@interfaces/programInterface";
import { ProgramFilterInterface } from "@/interfaces/programFilterInterface";
import {useNavigate} from "react-router-dom";
import {userState} from '@states/userState';
import {useRecoilValue} from "recoil";
import { useQuery } from "react-query";

function dateFormat(date: Date) {
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    let hour: string | number = date.getHours();
    let minute: string | number = date.getMinutes();
    let second: string | number = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '/' + month + '/' + day;
}

const BookComponent = ({programFilter}: {programFilter?: ProgramFilterInterface}) => {
    const navigate = useNavigate();
    const api = useAxios();
    const [programs, setPrograms] = useState<ProgramInterface[]>([]);
    const [programsOrigin, setProgramsOrigin] = useState<ProgramInterface[]>([]);
    const user = useRecoilValue(userState);
    const [requestData, setRequestData] = useState({
        pgType: programFilter?.type,
        pgApply: "",
        ing: 0,
        userNo: user.userNo || 0,
        orderBy: "",
    });

    const getProgramList = async () => {
        console.log(requestData);
        await api
            .post("/usr/programs/list", requestData)
            .then((res) => {
                console.log(res.data.body);
                if (res.status === 200) {
                    setPrograms(res.data.body);
                    setProgramsOrigin(res.data.body);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const result = useQuery(['programList', requestData], () => getProgramList());

    const getDayCount = (endDay: string) => {
        // const nowDate = new Date();
        // const endDate = new Date(endDay);
        // const dateDiff = endDate.getTime() - nowDate.getTime();
        // return Math.ceil(dateDiff / 1000 / 60 / 60 / 24);

        const tmpDate = dateFormat(new Date());
        const tmpDate2 = endDay.replace(/\./g, '/');
        const nowDate = new Date(tmpDate);
        const endDate = new Date(tmpDate2);
        const dateDiff = endDate.getTime() - nowDate.getTime();
        return Math.ceil(dateDiff / 1000 / 60 / 60 / 24);
    };

    const getMaker = (startDay: string, endDay: string) => {
        const nowDate = new Date();
        const startDate = new Date(startDay);
        const endDate = new Date(endDay);
        if (user.accessToken) {
            if (nowDate > startDate && nowDate < endDate) {
                return <span className="participate">참여 중</span>;
            } else {
                return <span className="reserve">예약 중</span>;
            }
        }
    };

    const moveProgramPage = (pgNo: string) => {
        navigate('/programView', {state: {pgNo: pgNo}});
    }

    const moveLoginPage = () => {
        navigate('/login');
    }

    useEffect(() => {
        (async () => {
            await getProgramList();
        })();
    }, []);
    
    useEffect(()=>{
        setRequestData({
            pgType: programFilter?.type || '',
            pgApply: programFilter?.status || '',
            ing: programFilter?.ing || 0,
            userNo: user.userNo || 0,
            orderBy: programFilter?.orderBy || '',
        });
    }, [programFilter]);

    return (
        <React.Fragment>
            <div className="program-wrap">
                {programs?.map((item, index) => {
                    return (
                        <div className="prg prg-01" key={index}>
                            <div className="ready-prg">
                                {item.pgType === "goodBye" && (
                                    <div className="prg-head unBook unLog">
                                        {(item.pgApply === "inOperApplied" || item.pgApply === "uncancellable" || item.pgApply === "cancellable") &&
                                        getMaker(item.pgSttDate, item.pgEndDate)}
                                        <p>{item.pgTitle}</p>
                                        {(item.pgApply === "reservable" || item.pgApply === "cancellable") && (
                                            <span className="d-day">
                                                D-{getDayCount(item.pgAppEndDate)}
                                                <span>예약마감까지</span>
                                            </span>
                                        )}
                                    </div>
                                )}
                                {item.pgType === "goodNight" && (
                                    <div className="prg-head unBook sky">
                                        {(item.pgApply === "inOperApplied" || item.pgApply === "uncancellable" || item.pgApply === "cancellable") &&
                                        getMaker(item.pgSttDate, item.pgEndDate)}
                                        <p>{item.pgTitle}</p>
                                        {(item.pgApply === "reservable" || item.pgApply === "cancellable") && (
                                            <span className="d-day">
                                                D-{getDayCount(item.pgAppEndDate)}
                                                <span>예약마감까지</span>
                                            </span>
                                        )}
                                    </div>
                                )}
                                <ul className="term">
                                    <li className="red">
                                        예약기간: {item.pgAppSttDate} ~ {item.pgAppEndDate}
                                    </li>
                                    <li className="">
                                        진행기간: {item.pgSttDate} ~ {item.pgEndDate}
                                    </li>
                                    {(item.pgApply === "inOperNotApplied" || item.pgApply === "inOperApplied") && (
                                        <li className="red">참여인원: {item.pgAppAll - item.pgLeftOver}명</li>
                                    )}
                                    {(item.pgApply === "endApply" || item.pgApply === "uncancellable") && (
                                        <li className="red">참여인원: {item.pgAppAll - item.pgLeftOver}명</li>
                                    )}
                                    {(item.pgApply === "reservable" || item.pgApply === "cancellable") && (
                                        <li className="red">
                                            잔여인원:{" "}
                                            {item.pgLeftOver}명
                                            (모집인원: {item.pgAppAll}명)
                                        </li>
                                    )}
                                    {/* <li className="">장소: {item.pgPlace === "etc" ? item.pgPlaceText : item.pgPlace}</li> */}
                                    <li className="">장소: {item.pgPlace === "etc" ? item.pgPlaceText : item.pgPlaceText}</li>
                                </ul>
                            </div>
                            {
                                user.accessToken &&
                                <React.Fragment>
                                    {(item.pgApply === "inOperApplied" || item.pgApply === "inOperNotApplied") && (
                                        <button type="button" className="btn-02 " onClick={() => moveProgramPage(String(item.pgNo))}>
                                            운영중
                                        </button>
                                    )}
                                    {item.pgApply === "uncancellable" && (
                                        <button type="button" className="btn-02 gray-btn" onClick={() => moveProgramPage(String(item.pgNo))}>
                                            취소불가
                                        </button>
                                    )}
                                    {item.pgApply === "cancellable" && (
                                        <button type="button" className="btn-02 active" onClick={() => moveProgramPage(String(item.pgNo))}>
                                            <span className="cancel">취소하기</span>
                                        </button>
                                    )}
                                    {item.pgApply === "endApply" && (
                                        <button type="button" className="btn-02 gray-btn">
                                            예약마감
                                        </button>
                                    )}
                                    {item.pgApply === "reservable" && (
                                        <button type="button" className="btn-02 active"
                                                onClick={() => moveProgramPage(String(item.pgNo))}>
                                            예약하기
                                        </button>
                                    )}
                                </React.Fragment>
                            }
                            {
                                !user.accessToken &&
                                <React.Fragment>
                                    {item.pgApply === "inOperNotApplied" && (
                                        <button type="button" className="btn-02 " onClick={moveLoginPage}>
                                            운영중
                                        </button>
                                    )}
                                    {item.pgApply === "endApply" && (
                                        <button type="button" className="btn-02 gray-btn">
                                            예약마감
                                        </button>
                                    )}
                                    {item.pgApply === "reservable" && (
                                        <button type="button" className="btn-02 active"
                                                onClick={moveLoginPage}>
                                            예약하기
                                        </button>
                                    )}
                                </React.Fragment>
                            }
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default BookComponent;
