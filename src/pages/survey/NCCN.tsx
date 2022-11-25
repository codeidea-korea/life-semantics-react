import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countState, sampleState } from "@states/sampleState";
import ModalComponent from "@components/modal/ModalComponent";
import ProgressComponent from "@components/ProgressComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import $ from "jquery";
import ToastPopup from "@components/modal/ToastPopup";
import NCCNComponent01 from "@components/survey/surveylist/nccn/NCCNComponent01";
import NCCNComponent02 from "@components/survey/surveylist/nccn/NCCNComponent02";


const NCCN = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sample, setSample] = useRecoilState(sampleState);
  const [count, setCount] = useRecoilState(countState);
  const [modal, setModal] = useRecoilState(modalState);
  const [toast, setToast] = useState(false);
  const [userListError, setUserListError] = useState(true);
  const increase = () => setCount(count + 1);
  const [step, setStep] = useState(1);
  const setTitle = () =>
    setSample({
      ...sample,
      title: String(document.querySelector("input")?.value),
    });

  useEffect(() => {
    const inner = document.querySelector(".next") as HTMLButtonElement;
    const text = document.querySelector(".explainText") as HTMLBodyElement;

    console.log(text);
    if (step === 2) {
      inner.innerText = "작성완료";
    } else if (step !== 2) {
      inner.innerText = "다음";
    }
    if (step === 1) {
      text.style.display = "block";
    } else if (step !== 1) {
      text.style.display = "none";
    }
  }, [step]);

  const handleNextStep = () => {
    if (step !== 2) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step < 3 && step > 1) {
      setStep(step - 1);
    }
  };
  const handleModal = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: (
        <div>
          수면(NCCN) 설문을
          <br />
          완료하셨습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  const handleModal01 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,
      cancelText: "이어서 설문할게요",
      content: (
        <div>
          설문을 종료하시겠습니까?
          <br />
          완료한 설문 페이지까지만 저장됩니다.
        </div>
      ),
      confirmText: "네,중단할게요.",
    });
  };
  useEffect(() => {
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

  return (
    <div>
      <TitleHeadComponent name="수면위생(NCCN)" targetUrl= ""/>
      <div className="tired painBox" id="NCCN">
      <ModalComponent/>
        <h2>시작전 설문 - 수면위생(NCCN)</h2>
        <div className="Step">
          <div>
            <ul>
              <ProgressComponent active={step === 1} />
              <ProgressComponent active={step === 2} />
            </ul>
          </div>
        </div>
        <p className="explainText">
          다음은 수면위생에 대한 질문입니다. <br />
          최근 1주일간의 수면위생에 해당되는 선지를 선택해주세요.
        </p>
        {step === 1 && <NCCNComponent01 />}
        {step === 2 && <NCCNComponent02 />}
      </div>
      <div className="fixBtn">
        <button type="button" className="prev" onClick={handlePrevStep}>
          이전
        </button>
        <button type="button" className="next" onClick={handleModal01}>
          다음
        </button>
      </div>
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
  );
};

export default NCCN;
