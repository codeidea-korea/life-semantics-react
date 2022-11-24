import React, {useEffect, useState} from "react";
import useAxios from "@hooks/useAxios";
import {ProgramInterface} from "@interfaces/programInterface";
import {useNavigate} from "react-router-dom";
import {userState} from '@states/userState';
import {useRecoilValue} from "recoil";

const BookComponent = () => {
    const navigate = useNavigate();
    const api = useAxios();
    const [programs, setPrograms] = useState<ProgramInterface[]>();
    const user = useRecoilValue(userState);
    const [requestData, setRequestData] = useState({
        pgType: "",
        pgStatus: "",
        order: "",
        myStatus: "",
    });

    const getProgramList = async () => {
        await api
            .post("/programs/list", requestData)
            .then((res) => {
                if (res.data.result === "success") setPrograms(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDayCount = (endDay: string) => {
        const nowDate = new Date();
        const endDate = new Date(endDay);
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

    const moveProgramPage = (pgIdx: string) => {
        navigate('/programView', {state: {pgIdx: pgIdx}});
    }

    const moveLoginPage = () => {
        navigate('/login');
    }

    useEffect(() => {
        (async () => {
            await getProgramList();
        })();
    }, []);

    return (
        <React.Fragment>
            <div className="program-wrap">
                {programs?.map((item, index) => {
                    return (
                        <div className="prg prg-01" key={index}>
                            <div className="ready-prg">
                                {item.type === "goodBye" && (
                                    <div className="prg-head unBook unLog">
                                        {item.pgIsApply === "1" &&
                                        getMaker(item.pgSttDate, item.pgEndDate)}
                                        <p>{item.pgTitle}</p>
                                        {item.pgStatus === "applying" && (
                                            <span className="d-day">
                        D-{getDayCount(item.pgAppEndDate)}
                                                <span>예약마감까지</span>
                      </span>
                                        )}
                                    </div>
                                )}
                                {item.type === "goodNight" && (
                                    <div className="prg-head unBook sky">
                                        {item.pgIsApply === "1" &&
                                        getMaker(item.pgSttDate, item.pgEndDate)}
                                        <p>{item.pgTitle}</p>
                                        {item.pgStatus === "applying" && (
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
                                    {item.pgStatus === "inOper" && (
                                        <li className="red">참여인원: {item.pgAppNow}명</li>
                                    )}
                                    {item.pgStatus === "endApply" && (
                                        <li className="red">참여인원: {item.pgAppNow}명</li>
                                    )}
                                    {item.pgStatus === "applying" && (
                                        <li className="red">
                                            잔여인원:{" "}
                                            {parseInt(item.pgAppLimit) - parseInt(item.pgAppNow)}명
                                            (모집인원: {item.pgAppLimit})
                                        </li>
                                    )}
                                    <li className="">장소: {item.pgPlace}</li>
                                </ul>
                            </div>
                            {
                                user.accessToken &&
                                <React.Fragment>
                                    {item.pgIsApply === "1" && item.pgStatus === "inOper" && (
                                        <button type="button" className="btn-02 ">
                                            운영중
                                        </button>
                                    )}
                                    {item.pgIsApply === "1" && item.pgStatus === "endApply" && (
                                        <button type="button" className="btn-02 gray-btn">
                                            취소불가
                                        </button>
                                    )}
                                    {item.pgIsApply === "1" && item.pgStatus === "applying" && (
                                        <button type="button" className="btn-02 active" onClick={(event) => moveProgramPage(item.pgIdx)}>
                                            <span className="cancel">취소하기</span>
                                        </button>
                                    )}
                                    {item.pgIsApply === "0" && item.pgStatus === "inOper" && (
                                        <button type="button" className="btn-02 ">
                                            운영중
                                        </button>
                                    )}
                                    {item.pgIsApply === "0" && item.pgStatus === "endApply" && (
                                        <button type="button" className="btn-02 gray-btn">
                                            예약마감
                                        </button>
                                    )}
                                    {item.pgIsApply === "0" && item.pgStatus === "applying" && (
                                        <button type="button" className="btn-02 active"
                                                onClick={(event) => moveProgramPage(item.pgIdx)}>
                                            예약하기
                                        </button>
                                    )}
                                </React.Fragment>
                            }
                            {
                                !user.accessToken &&
                                <React.Fragment>
                                    {item.pgStatus === "inOper" && (
                                        <button type="button" className="btn-02 ">
                                            운영중
                                        </button>
                                    )}
                                    {item.pgStatus === "endApply" && (
                                        <button type="button" className="btn-02 gray-btn">
                                            예약마감
                                        </button>
                                    )}
                                    {item.pgStatus === "applying" && (
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
