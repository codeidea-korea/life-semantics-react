import React, { useEffect, useState } from "react";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import $ from "jquery";

const NCCNComponent01 = () => {
  return (
    <React.Fragment>

      <div className="surveyList">
        <ul>
          <li className="surveyContent">
            <p>1. 매일 규칙적인 취침 시간과 기상 시간을 유지한다.</p>
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
                <label htmlFor="">그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna1"
                />
                <label htmlFor="">그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna1"
                />
                <label htmlFor="">매우 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>2. 오전 및 오후에 정기적인 신체 활동을 한다.</p>
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
                <label htmlFor="">그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna2"
                />
                <label htmlFor="">그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna2"
                />
                <label htmlFor="">매우 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>3. 낮 동안 밝은 빛에 노출을 증가시킨다.</p>
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
                <label htmlFor="">그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna3"
                />
                <label htmlFor="">그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna3"
                />
                <label htmlFor="">매우 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>4. 취침 및 시간 전과 야간에는 밝은 빛(즉, 컴퓨터, 전화 스크린, 눈에 가까운 광원)에 노출되는 것을 줄인다.</p>
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
                <label htmlFor="">그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna4"
                />
                <label htmlFor="">그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna4"
                />
                <label htmlFor="">매우 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>5. 과식을 피하고 취침 후 3시간 이내에 수분 섭취를 제한한다.</p>
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
                <label htmlFor="">그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna5"
                />
                <label htmlFor="">그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna5"
                />
                <label htmlFor="">매우 그렇다</label>
              </li>
            </ul>
          </li>
          <li className="surveyContent">
            <p>6. 취침 시간이 가까워지면 알코올과 흡연을 피한다.</p>
            <ul>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="1"
                  name="qna6"
                />
                <label htmlFor="">전혀 그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="2"
                  name="qna6"
                />
                <label htmlFor="">그렇지 않다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="3"
                  name="qna6"
                />
                <label htmlFor="">그렇다</label>
              </li>
              <li>
                <InputElement
                  type="radio"
                  className="radioButton"
                  value="4"
                  name="qna6"
                />
                <label htmlFor="">매우 그렇다</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NCCNComponent01;
