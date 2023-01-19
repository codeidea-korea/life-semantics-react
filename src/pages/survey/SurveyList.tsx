import React, { useState, useEffect, useRef } from "react";
import TitleHeadComponent from "@/components/head/TitleHeadComponent";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

const SurveyList = () => {
    const user = useRecoilValue(userState);
    const api = useAxios();
    const [week, setWeek] = useState(2);
    const radioRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        radioRef.current?.click();
    }, [])

    useEffect(() => {
        getDailyHistory(week);
    }, [week]);

    const getDailyHistory = async (week: number) => {
        await api
            .get(`/usr/surveys/daily-history?week=${week}`, {headers: {Authorization: `Bearer ${user.accessToken}`}})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const weekHandle = (event: React.MouseEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        console.log(name, value)
    };
    
    return (
        <React.Fragment>
            <TitleHeadComponent name="일일 설문 내역" targetUrl="" />
            <div className="surveyList">
                <div className="surveyList_title">
                    <h3>굿바이 피로 1기</h3>
                    <p>피로도 점수 추이</p>
                </div>
                <div className="weekBtn">
                    <span>
                        <input type="radio" id="week2" name="week" value='2' onClick={() => setWeek(2)} ref={radioRef}></input>
                        <label htmlFor="week2">2주</label>
                    </span>
                    <span>
                        <input type="radio" id="week4" name="week" value={week} onClick={() => setWeek(4)}></input>
                        <label htmlFor="week4">4주</label>
                    </span>
                    <span>
                        <input type="radio" id="week8" name="week" value={week} onClick={() => setWeek(8)}></input>
                        <label htmlFor="week8">8주</label>
                    </span>
                </div>
                <div>{/* 그래프 들어가는 곳 */}</div>
            </div>
        </React.Fragment>
    );
};

export default SurveyList;
