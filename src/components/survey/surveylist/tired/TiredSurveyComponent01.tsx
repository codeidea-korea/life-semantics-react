import React, { useEffect, useState } from "react";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import $ from "jquery";

const TiredSurveyComponent01 = () => {
  return (
    <React.Fragment>
      <h2>시작전 설문 - 피로</h2>
      <p>
        <strong>현재상태</strong>를 가장 적절하게 설명하고 있는 번호 하나
        선택해주세요.
      </p>
      <p>
        각 질문에 대해 깊이 생각하기 보다는 <strong>첫 느낌을 기준으로</strong>{" "}
        대답하여 주십시오.
      </p>
      <div className="surveyList">
        <ul>
          <li className="surveyContent">
            <p>1. 쉽게 피곤해지십니까?</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna1"
                />
                <label htmlFor="">전혀 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna1"
                />
                <label htmlFor="">거의 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna1"
                />
                <label htmlFor="">약간 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna1"
                />
                <label htmlFor="">상당히 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna1"
                />
                <label htmlFor="">매우 상당히 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>2. 누워있고 싶은 마음이 드십니까?</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna2"
                />
                <label htmlFor="">전혀 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna2"
                />
                <label htmlFor="">거의 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna2"
                />
                <label htmlFor="">약간 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna2"
                />
                <label htmlFor="">상당히 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna2"
                />
                <label htmlFor="">매우 상당히 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>3. 기운이 다 빠진 느낌이 드십니까?</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna3"
                />
                <label htmlFor="">전혀 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna3"
                />
                <label htmlFor="">거의 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna3"
                />
                <label htmlFor="">약간 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna3"
                />
                <label htmlFor="">상당히 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna3"
                />
                <label htmlFor="">매우 상당히 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>4. (매사에) 주의력이 떨어졌다고 느끼십니까?</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna4"
                />
                <label htmlFor="">전혀 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna4"
                />
                <label htmlFor="">거의 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna4"
                />
                <label htmlFor="">약간 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna4"
                />
                <label htmlFor="">상당히 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna4"
                />
                <label htmlFor="">매우 상당히 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>5. 활력이 있습니까?</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna5"
                />
                <label htmlFor="">전혀 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna5"
                />
                <label htmlFor="">거의 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna5"
                />
                <label htmlFor="">약간 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna5"
                />
                <label htmlFor="">상당히 그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna5"
                />
                <label htmlFor="">매우 상당히 그렇다</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TiredSurveyComponent01;
