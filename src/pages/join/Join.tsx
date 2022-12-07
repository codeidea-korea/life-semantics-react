import React, { useState } from "react";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import CircleComponent from "@components/CircleComponent";
import TermsComponent from "@components/join/TermsComponent";
import LostIdComponent from "@components/join/LostIdComponent";
import MemberComponent from "@components/join/MemberComponent";
import JoinCompleteComponent from "@components/join/JoinCompleteComponent";
import WebLayout from "@layouts/web/WebLayout";
import { useLocation, useNavigate } from "react-router-dom";

const IndexPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step !== 4) {
      setStep(step + 1);
    }
  };

  return (
    <WebLayout>
      <TitleHeadComponent name="회원가입" targetUrl= ""/>
      <div className="Join">
        <div className="Step">
          {step !== 4 && (
            <ul>
              <CircleComponent step="약관동의" active={step === 1} />
              <CircleComponent step="본인인증" active={step === 2} />
              <CircleComponent step="회원정보" active={step === 3} />
              <CircleComponent step="가입완료" active={step === 4} />
            </ul>
          )}
        </div>
        {step === 1 && <TermsComponent />}
        {step === 2 && <LostIdComponent />}
        {step === 3 && <MemberComponent joinLevelStep={handleNextStep} />}
        {step === 4 && <JoinCompleteComponent />}
        {step !== 4 && (
          <button type="button" className="btn-02 fixed active" onClick={handleNextStep}>
            다음
          </button>
        )}
      </div>
    </WebLayout>
  );
};

export default IndexPage;
