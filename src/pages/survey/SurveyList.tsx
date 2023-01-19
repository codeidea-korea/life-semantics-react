import React, { useState, useEffect, useRef } from "react";
import TitleHeadComponent from "@/components/head/TitleHeadComponent";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import Chart from 'chart.js/auto';
import { DailySurveyHistoryInterface } from "@/interfaces/dailySurveyHistoryInterface";
// import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";
  
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const SurveyList = () => {
    const user = useRecoilValue(userState);
    const api = useAxios();
    const [week, setWeek] = useState(2);
    const radioRef = useRef<HTMLInputElement[]>([]);
    const [surveyList, setSurveyList] = useState<DailySurveyHistoryInterface[]>([]);
    
    useEffect(() => {
        radioRef.current.map(elem => elem.click());
    }, [])

    useEffect(() => {
        getDailyHistory(week);
        console.log(surveyList)
    }, [week]);

    const getDailyHistory = async (week: number) => {
        await api
            .get(`/usr/surveys/daily-history?week=${week}`, {headers: {Authorization: `Bearer ${user.accessToken}`}})
            .then((res) => {
                console.log(res)
                if (res.data.result) setSurveyList(res.data.body);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const weekHandle = (event: React.MouseEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        console.log(name, value)
    };

    const data: any = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [1, 2, 3, 4, 5],
          },
        ],
    };
    
    return (
        <React.Fragment>
            <TitleHeadComponent name="일일 설문 내역" targetUrl="" />
            {surveyList.map((elem, idx) => (elem.history.length && ( 
                <div className="surveyList" key={elem.pgNo}>
                    <div className="surveyList_title">
                        <h3>{elem.pgTitle}</h3>
                        <p>{elem.pgType === 'goodBye' ? '피로도 점수 추이' : '수면 만족도 점수 추이'}</p>
                    </div>
                    <div className="weekBtn">
                        <span>
                            <input type="radio" id={`${elem.week}`} name={`${elem.pgNo}`} value={`${elem.pgNo}`} onClick={() => setWeek(2)} ref={(element) => (radioRef.current[idx] = element as HTMLInputElement)}></input>
                            <label htmlFor="week2">2주</label>
                        </span>
                        <span>
                            <input type="radio" id={`${elem.week}`} name={`${elem.pgNo}`} value={`${elem.pgNo}`} onClick={() => setWeek(4)}></input>
                            <label htmlFor="week4">4주</label>
                        </span>
                        <span>
                            <input type="radio" id={`${elem.week}`} name={`${elem.pgNo}`} value={`${elem.pgNo}`} onClick={() => setWeek(8)}></input>
                            <label htmlFor="week8">8주</label>
                        </span>
                    </div>
                    <div>
                        {/* 그래프 들어가는 곳 */}
                        <Line data={{
                                labels: elem.history.map((survey, idx) => `${survey.dt?.split('-')[2]}일`),
                                datasets: [
                                {
                                    type: 'line',
                                    label: 'Dataset 1',
                                    borderColor: 'rgb(54, 162, 235)',
                                    borderWidth: 2,
                                    data: elem.history.map((survey, idx) => survey.answer),
                                },
                                ],
                                
                            }}
                            options={
                                responsive: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: -10;
                                            max: 25;
                                            fontSize : 14,
                                        }
                                    }]
                                }
                            }
                        />
                    </div>
                    {/* <span>{elem.history[0].dt?.split('-')[1]}월</span> */}
                </div>
            )))}

            {/* <div className="surveyList">
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
                <div>
                    
                </div>
                </div> 
            */}
        </React.Fragment>
    );
};

export default SurveyList;
