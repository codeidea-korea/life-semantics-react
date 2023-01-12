import React from "react";
import TitleHeadComponent from "@/components/head/TitleHeadComponent";

const SurveyList = () => {
    const weekHandle = () => {};
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
                        <input type="radio" id="week2" name="week"></input>
                        <label htmlFor="week2">2주</label>
                    </span>
                    <span>
                        <input type="radio" id="week4" name="week"></input>
                        <label htmlFor="week4">4주</label>
                    </span>
                    <span>
                        <input type="radio" id="week8" name="week"></input>
                        <label htmlFor="week8">8주</label>
                    </span>
                </div>
                <div>{/* 그래프 들어가는 곳 */}</div>
            </div>
        </React.Fragment>
    );
};

export default SurveyList;
