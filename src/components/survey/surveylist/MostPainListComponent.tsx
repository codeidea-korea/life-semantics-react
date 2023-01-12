import React, { useEffect, useState } from "react";
import RangeComponent from "../todaySurvey/RangeComponent";
import $ from "jquery";
import RangeArrowComponent from "../todaySurvey/RangeArrowComponent ";

const MostPainListComponent = () => {
    const dots = ["foreHead", ""];
    const [painColor, setPainColor] = useState<number[]>([]);

    useEffect(() => {
        setPainColor(Array.from(Array($(".dot").length)).map((i) => 0));
        $(".pain")
            .off("click")
            .on("click", ".dot", function () {
                console.log($(this).index());
            });
    }, []);

    console.log(painColor);

    return (
        <React.Fragment>
            <p>
                3. <strong>오른쪽 발목</strong>의 통증을 나타내는 숫자 <br />에 표시해주세요 (0점:
                통증 낮음, 10점: 통증 높음)
            </p>
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
            {/* UI변경으로 주석처리. */}
            {/* <div className="subTitle">
        <span>(좌우로 동그라미를 움직여주세요.)</span>
      </div>
      <RangeComponent />
      <RangeArrowComponent left="통증없음" right="극도의통증" /> */}
        </React.Fragment>
    );
};

export default MostPainListComponent;
