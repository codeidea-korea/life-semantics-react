import React, { useEffect, useState } from "react";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import $ from "jquery";

const ISISurveyComponent02 = () => {
  return (
    <React.Fragment>
      <div className="surveyList p-50">
        <p>
          2. 현재 <span className="line">수면 양상</span>에 관하여 얼마나
          <span className="line">만족하고 있습니까?</span>
        </p>
        <ul>
          <li className="surveyContent labelLine">
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna7"
                />
                <label htmlFor="">매우만족</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna7"
                />
                <label htmlFor="">약간만족</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna7"
                />
                <label htmlFor="">그저그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna7"
                />
                <label htmlFor="">약간불만족</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna7"
                />
                <label htmlFor="">매우불만족</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="surveyList">
        <p>
          3. 당신의 수면 장애가 어느 정도나 당신의 낮 활동을 반해 한다고 생각합니까?
          (예: 낮에 피곤함, 직장이나 가사에 일하는 능력, 집중력, 기억력, 기분 등)
        </p>
        <ul>
          <li className="surveyContent">
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna4"
                />
                <label htmlFor="">전혀 방해되지 않는다.</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna4"
                />
                <label htmlFor="">약간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna4"
                />
                <label htmlFor="">다소</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna4"
                />
                <label htmlFor="">상당히</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna4"
                />
                <label htmlFor="">매우 많이</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="surveyList">
        <p>
          4. 불면증으로 인한 장애가 당신의 삶의 질의 손상정도를 다른 사람에게 어떻게 보인다고 생각합니까?
        </p>
        <ul>
          <li className="surveyContent">
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna5"
                />
                <label htmlFor="">전혀 방해되지 않는다.</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna5"
                />
                <label htmlFor="">약간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna5"
                />
                <label htmlFor="">다소</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna5"
                />
                <label htmlFor="">상당히</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna5"
                />
                <label htmlFor="">매우 많이</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="surveyList">
        <p>
          5.당신은 현재 불면증에 관하여 얼마나 걱정하고 있습니까?
        </p>
        <ul>
          <li className="surveyContent">
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna6"
                />
                <label htmlFor="">전혀 방해되지 않는다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna6"
                />
                <label htmlFor="">약간</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna6"
                />
                <label htmlFor="">다소</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna6"
                />
                <label htmlFor="">상당히</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="5"
                  name="qna6"
                />
                <label htmlFor="">매우 많이</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ISISurveyComponent02;
