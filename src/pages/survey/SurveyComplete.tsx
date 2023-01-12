import React from "react";
import TitleHeadComponent from "@/components/head/TitleHeadComponent";
import $ from "jquery";
import { Link } from "react-router-dom";

const SurveyComplete = () => {
    return (
        <React.Fragment>
            <TitleHeadComponent name="일일 설문" targetUrl="" />
            <div className="surveyComplete">
                <div>
                    <p>
                        피로도 입력을
                        <br />
                        <b>모두 완료</b>하셨습니다!
                    </p>
                    <p>
                        그 동안 꾸준히 입력해주셔서 <br />
                        감사합니다.
                    </p>
                    <Link to="/SurveyList">일일 설문 내역 보러가기</Link>
                </div>
            </div>
        </React.Fragment>
    );
};
export default SurveyComplete;
