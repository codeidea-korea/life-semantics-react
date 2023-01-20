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
            .get(`/usr/surveys/daily-history?week=${week}`, { headers: { Authorization: `Bearer ${user.accessToken}` } })
            .then((res) => {
                console.log(res)
                if (res.data.result) setSurveyList(res.data.body);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const weekHandle = (event: React.MouseEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
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
    const options: object = {
        scales: {
            y: {
                ticks: {
                    min: 0,
                    max: 10,
                    stepSize: 1, // this will set the tick interval to 1
                },
            },
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    };

    const handleSetWeek = (week: number) => {
        setWeek(week)
    }

    return (
        <React.Fragment>
            <TitleHeadComponent name="일일 설문 내역" targetUrl="" />
            {surveyList.map((elem, idx) => (elem.history.length && (
                <div className="surveyList" key={elem.pgNo}>
                    <div className="surveyList_title">
                        <h3>{elem.pgTitle}</h3>
                        <p>{elem.pgType === 'goodBye' ? '피로도 점수 추이' : '수면 만족도 점수 추이'}</p>
                    </div>
                    {idx === 0 &&
                        <div className="weekBtn">
                            <span>
                                <input checked={week === 2} type="radio" id={`1week_${elem.week}`} name={`week_${elem.pgNo}`} value={`${elem.pgNo}`} onClick={() => { setWeek(2) }} ref={(element) => (radioRef.current[idx] = element as HTMLInputElement)}></input>
                                <label htmlFor={`1week_${elem.week}`}>2주</label>
                            </span>
                            <span>
                                <input checked={week === 4} type="radio" id={`2week_${elem.week}`} name={`week_${elem.pgNo}`} value={`${elem.pgNo}`} onClick={() => { setWeek(4) }}></input>
                                <label htmlFor={`2week_${elem.week}`}>4주</label>
                            </span>
                            <span>
                                <input checked={week === 8} type="radio" id={`3week_${elem.week}`} name={`week_${elem.pgNo}`} value={`${elem.pgNo}`} onClick={() => { setWeek(8) }}></input>
                                <label htmlFor={`3week_${elem.week}`}>8주</label>
                            </span>
                        </div>
                    }
                    <div style={{
                        overflowX: "auto",
                        width: "100%"
                    }} className="chartScroller">
                        {/* 그래프 들어가는 곳 */}
                        <Line style={{
                            marginLeft: "20px"
                        }} options={options} data={{
                            labels: elem.history.map((survey, idx) => `${survey.dt?.split('-')[2]}일`),
                            datasets: [
                                {
                                    type: 'line',
                                    label: 'Dataset 1',
                                    borderColor: '#41b946',
                                    borderWidth: 2,
                                    data: elem.history.map((survey, idx) => survey.answer),
                                },
                            ],
                        }}
                        />
                    </div>
                </div>
            )))}
        </React.Fragment>
    );
};
export default SurveyList;