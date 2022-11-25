import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countState, sampleState } from "@states/sampleState";
import ProgressComponent from "@components/ProgressComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import $ from "jquery";
import ToastPopup from "@components/modal/ToastPopup";
import TiredSurveyComponent01 from "@components/survey/surveylist/tired/TiredSurveyComponent01";
import TiredSurveyComponent02 from "@components/survey/surveylist/tired/TiredSurveyComponent02";
import TiredSurveyComponent03 from "@components/survey/surveylist/tired/TiredSurveyComponent03";
import ModalComponent from "@components/modal/ModalComponent";

const Tired = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState(modalState);
  const [userListError, setUserListError] = useState(true);
  const [toast, setToast] = useState(false);
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step < 4 && step > 1) {
      setStep(step - 1);
    }
  };

  const handleTiredSurveyComplete = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div>
          피로 설문을
          <br />
          완료하셨습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };

  useEffect(() => {
    const scrollHeight = $(".Step").prop("scrollHeight");
    console.log(scrollHeight);

    $(window).on("scroll", function () {
      const height = $(document).scrollTop();
      console.log(height);
      if (this.scrollY > 300) {
        $(".Step").addClass("fixed");
      } else {
        $(".Step").removeClass("fixed");
      }
    });
  }, []);

  useEffect(() => {
    const inner = document.querySelector(".next") as HTMLButtonElement;

    if (step === 3) {
      inner.innerText = "작성완료";
    } else if (step !== 3) {
      inner.innerText = "다음";
    }
  }, [step]);

  return (
    <React.Fragment>
      <TitleHeadComponent name="피로" targetUrl= ""/>
      <div className="tired painBox">
        <div className="Step">
          <ul>
            <ProgressComponent active={step >= 1} />
            <ProgressComponent active={step >= 2} />
            <ProgressComponent active={step >= 3} />
          </ul>
        </div>
        {step === 1 && <TiredSurveyComponent01 />}
        {step === 2 && <TiredSurveyComponent02 />}
        {step === 3 && <TiredSurveyComponent03 />}
        <ToastPopup
        content={
          <span>
            이번 페이지까지는 <br />
            <b>설문</b>을 <b>완료</b>하여주세요.
          </span>
        }
        show={toast}
      />
      <ToastPopup
        content={
          <span>
            완료하시면 <b>수정</b>이 <b>불가</b>합니다.<br />
            내용을 확인해주세요.
          </span>
        }
        show={toast}
      />

      </div>
      <div className="fixBtn">
        <button type="button" className="prev" onClick={handlePrevStep}>
          이전
        </button>
        {step < 3 && (
          <button type="button" className="next" onClick={handleNextStep}>
            다음
          </button>
        )}
        {step === 3 && (
          <button
            type="button"
            className="next"
            onClick={handleTiredSurveyComplete}
          >
            작성완료
          </button>
        )}
      </div>
      
      <ModalComponent />
    </React.Fragment>
  );
};

export default Tired;
