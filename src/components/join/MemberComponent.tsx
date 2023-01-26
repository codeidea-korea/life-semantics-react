import React, { useState } from "react";
import { useEffect } from "react";
import MemberChk01 from "./member/MemberChk01";
import MemberChk02 from "./member/MemberChk02";
import MemberChk03 from "./member/MemberChk03";
import CircleComponent from "../CircleComponent";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const MemberComponent = ({ joinLevelStep, handlePrevStep }: { joinLevelStep: Function, handlePrevStep: Function }) => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        $(window).on("scroll", function () {
            if (this.scrollY > 100) {
                $(".progressWrap").addClass("fixed");
            } else {
                $(".progressWrap").removeClass("fixed");
            }
        });
    }, []);

    const handleStep = (nextStep: number) => {
        if (nextStep) setStep(nextStep);
        if (nextStep === 4) joinLevelStep();
    };

    return (
        <React.Fragment>
            <div className="member">
                <div className="">
                    {step === 1 && <MemberChk01 nextStep={handleStep} prevStep={handlePrevStep}/>}
                    {/* 회원정보 step 하나로 수정. */}
                    {/* {step === 2 && <MemberChk02 nextStep={handleStep} />}
                    {step === 3 && <MemberChk03 nextStep={handleStep} />} */}
                </div>
            </div>
        </React.Fragment>
    );
};

export default MemberComponent;
