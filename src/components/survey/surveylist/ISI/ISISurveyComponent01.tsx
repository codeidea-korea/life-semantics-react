import React, { useEffect, useState } from "react";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import RangeComponent from "../../todaySurvey/RangeComponent";
import RangeArrowComponent from "../../todaySurvey/RangeArrowComponent ";
import $ from "jquery";

const ISISurveyComponent01 = () => {
  return (
    <React.Fragment>
      <h2>시작전 설문 - 불면(ISI)</h2>

      <div className="surveyList isi">
        <p>
          1. <span className="line">당신의 불면증에 관한 문제들의 현재(최근2주간) 심한 정도를 표시해 주세요</span>
        </p>
        <ul>
          <li className="surveyContent">
            <p className="survey_text">a.잠들기 어렵다.</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna1"
                />
                <label htmlFor="">없음</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna1"
                />
                <label htmlFor="">약간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna1"
                />
                <label htmlFor="">중간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna1"
                />
                <label htmlFor="">심한</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna1"
                />
                <label htmlFor="">매우 심한</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p className="survey_text">b.잠을 유지하기 어렵다.</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna2"
                />
                <label htmlFor="">없음</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna2"
                />
                <label htmlFor="">약간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna2"
                />
                <label htmlFor="">중간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna2"
                />
                <label htmlFor="">심한</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna2"
                />
                <label htmlFor="">매우 심한</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p className="survey_text">c.쉽게 깬다.</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna3"
                />
                <label htmlFor="">없음</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna3"
                />
                <label htmlFor="">약간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna3"
                />
                <label htmlFor="">중간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna3"
                />
                <label htmlFor="">심한</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna3"
                />
                <label htmlFor="">매우 심한</label>
              </li>
            </ul>
          </li>
        </ul>



      </div>
    </React.Fragment>
  );
};

export default ISISurveyComponent01;
