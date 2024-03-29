import React from "react";
import RangeArrowComponent from "../../todaySurvey/RangeArrowComponent ";
import RangeComponent from "../../todaySurvey/RangeComponent";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";

const PhysicalStressComponent = () => {
    return (
        <React.Fragment>
            <p className="text">
                아래는 디스트레스의 정도를 측정하는 설문입니다. 해당 설문에 답을 해주세요.
            </p>
            <div className="physicalStress">
                <p className="title">
                    오늘을 포함하여 <strong>지난 한 주 </strong>동안을 귀하가 경험한 디스트레스
                    정도를 가장 잘 나타내는 숫자(1~10)에 표시를 해주세요. (0점: 디스트레이 낮음,
                    10점: 디스트레이 높음)
                </p>
                {/* UI변경으로 주석처리. */}
                {/* <div className="subTitle">
          <span>(좌우로 동그라미를 움직여주세요.)</span>
        </div>
        <RangeComponent />
        <RangeArrowComponent left={<span>디스트레스<br/> 낮음</span>} right={<span>디스트레스 <br/>높음</span>} /> */}
                <ul className="scoreRadio">
                    <li>
                        <input type="radio" name="score" id="zero" />
                        <label htmlFor="zero">0점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="one" />
                        <label htmlFor="one">1점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="two" />
                        <label htmlFor="two">2점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="three" />
                        <label htmlFor="three">3점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="four" />
                        <label htmlFor="four">4점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="five" />
                        <label htmlFor="five">5점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="six" />
                        <label htmlFor="six">6점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="seven" />
                        <label htmlFor="seven">7점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="eight" />
                        <label htmlFor="eight">8점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="nine" />
                        <label htmlFor="nine">9점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="ten" />
                        <label htmlFor="ten">10점</label>
                    </li>
                </ul>
                <div className="checkList">
                    <p>
                        지난 일주일 동안 염려되었던 항목이 있습니까?
                        <strong>(해당되는 곳에 모두 체크하세요.)</strong>
                    </p>
                    <span>신체 문제(9)</span>
                    <ul className="py_prob_list">
                        <li>
                            <InputElement type="checkbox" id="pain" className="check02" />
                            <label htmlFor="pain">통증</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="sleep" className="check02" />
                            <label htmlFor="sleep">수면</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="tired" className="check02" />
                            <label htmlFor="tired">피로</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="smoking" className="check02" />
                            <label htmlFor="smoking">흡연</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="drug" className="check02" />
                            <label htmlFor="drug">약물사용</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="memory" className="check02" />
                            <label htmlFor="memory">기억력 또는 집중력</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="sexual" className="check02" />
                            <label htmlFor="sexual">성 건강</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="food" className="check02" />
                            <label htmlFor="food">음식섭취 변화</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="physical" className="check02" />
                            <label htmlFor="physical">신체기능변화/상실</label>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default PhysicalStressComponent;
