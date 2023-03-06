import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
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

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

interface reqObj {
  saSvNo: number;
  saQst: number;
  saAnsList: unknown[];
  saAns: unknown;
  saEtcAns: string;
  saRegDate: string;
}
interface ReqData {
  svNo: Number;
  svPgNo: Number;
  svUserNo: unknown;
  svType1: unknown;
  svType2: string;
  svStatus: string;
  svRegDate: string;
  userSurveysAnswersDTO: reqObj[];
}

const reqData: ReqData = {
  svNo: 0,
  svPgNo: 8,
  svUserNo: 0,
  svType1: "pre",
  svType2: "NCCN",
  svStatus: "set",
  svRegDate: getToday(),
  userSurveysAnswersDTO: [],
};
for (let i = 0; i < 11; i++) {
  reqData.userSurveysAnswersDTO.push({
    saSvNo: 0,
    saQst: 0,
    saAnsList: [],
    saAns: 0,
    saEtcAns: "string",
    saRegDate: getToday(),
  });
}

const NCCN = () => {
  const user = useRecoilValue(userState);
  reqData.svUserNo = user.userNo;
  const location = useLocation();
  const navigate = useNavigate();
  const [sample, setSample] = useRecoilState(sampleState);
  const [count, setCount] = useRecoilState(countState);
  const [modal, setModal] = useRecoilState(modalState);
  const [toast, setToast] = useState(false);
  const [toast2, setToast2] = useState(false);
  const [userListError, setUserListError] = useState(true);
  const increase = () => setCount(count + 1);
  const [step, setStep] = useState(1);

  //url로 전달받은 데이터
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const pgNo = urlParams.get("pgNo");
  const type = urlParams.get("type");
  reqData.svPgNo = Number(pgNo);
  reqData.svType1 = type;

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

  const dataSet = (qnaLength: number) => {
    const checkedElementArray = document.querySelectorAll(
      ".surveyList input:checked"
    );
    for (let i = 0; i < qnaLength; i++) {
      const index = Number(
        document
          .querySelectorAll(".surveyContent p")
          [i].textContent?.split(".")[0]
      );
      reqData.userSurveysAnswersDTO[index - 1].saAnsList = [];
      reqData.userSurveysAnswersDTO[index - 1].saQst = index;
      reqData.userSurveysAnswersDTO[index - 1].saAnsList.push(
        Number(checkedElementArray[i].getAttribute("value"))
      );
    }
  };

  const handleNextStep = () => {
    if (
      Number(document.querySelectorAll(".surveyList input:checked").length) ===
      Number(document.querySelectorAll(".surveyContent").length)
    ) {
      dataSet(Number(document.querySelectorAll(".surveyContent").length));
      if (step !== 2) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      }
    } else {
      setToast2(true);
      setTimeout(() => {
        setToast2(false);
      }, 3000);
    }
  };

  const handlePrevStep = () => {
    if (step < 3 && step > 1) {
      setStep(step - 1);
    }
    if (step === 1) {
      setModal({
        ...modal,
        show: true,
        title: "",
        cancelShow: true,
        callBackShow: true,
        content: (
          <div>
            작성을 중단하시겠습니까?
            <br />
            중단하신 내용은
            <br />
            저장되지 않습니다.
          </div>
        ),
        cancelText: <div className="close">이어서 설문할게요</div>,
        confirmText: "네 중단할게요",
        onConfirmCallback: () => {
          navigate(-1);
        },
      });
    }
  };
  const handleModal = () => {
    const dataSet = (qnaLength: number) => {
      const checkedElementArray = document.querySelectorAll(
        ".surveyList input:checked"
      );
      for (let i = 0; i < qnaLength; i++) {
        const index = Number(
          document
            .querySelectorAll(".surveyContent p")
            [i].textContent?.split(".")[0]
        );
        reqData.userSurveysAnswersDTO[index - 1].saAnsList = [];
        reqData.userSurveysAnswersDTO[index - 1].saQst = index;
        reqData.userSurveysAnswersDTO[index - 1].saAnsList.push(
          Number(checkedElementArray[i].getAttribute("value"))
        );
      }
    };
    if (
      Number(document.querySelectorAll(".surveyList input:checked").length) ===
      Number(document.querySelectorAll(".surveyContent").length)
    ) {
      dataSet(Number(document.querySelectorAll(".surveyContent").length));
      fetch(`https://api.life.codeidea.io/usr/surveys`, {
        method: "POST",
        body: JSON.stringify(reqData),
        headers: {
          Authorization: "Bearer " + user.accessToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.result == "true") {
            setModal({
              ...modal,
              show: true,
              cancelShow: false,
              callBackShow: true,
              title: "",
              content: (
                <div>
                  수면(NCCN) 설문을
                  <br />
                  완료하셨습니다.
                </div>
              ),
              confirmText: "확인",
              onConfirmCallback: moveSurveyMain,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setToast2(true);
      setTimeout(() => {
        setToast2(false);
      }, 3000);
    }
  };

  const moveSurveyMain = () => {
    setModal({ ...modal, show: false });
    type == "pre" ? navigate("/surveyBefore?pgNo="+pgNo+"&type=goodNight") : navigate("/surveyAfter?pgNo="+pgNo+"&type=goodNight");
  };

  const handleModal01 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,
      cancelText: "이어서 설문할게요",
      callBackShow: true,
      content: (
        <div>
          설문을 종료하시겠습니까?
          <br />
          완료한 설문 페이지까지만 저장됩니다.
        </div>
      ),
      confirmText: "네,중단할게요.",
      onConfirmCallback: moveSurveyMain,
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
      <TitleHeadComponent name="수면위생(NCCN)" targetUrl="" />
      <div className="tired painBox" id="NCCN">
        <ModalComponent />
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
        {step < 2 && (
          <>
            <button type="button" className="prev" onClick={handleModal01}>
              이전
            </button>
            <button type="button" className="next" onClick={handleNextStep}>
              다음
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <button type="button" className="prev" onClick={handlePrevStep}>
              이전
            </button>
            <button type="button" className="next" onClick={handleModal}>
              작성완료
            </button>
          </>
        )}
      </div>
      <ToastPopup
        content={
          <span>
            이번 페이지까지는 <br />
            <b>설문</b>을 <b>완료</b>하여주세요.
          </span>
        }
        show={toast2}
      />
      <ToastPopup
        content={
          <span>
            완료하시면 <b>수정</b>이 <b>불가</b>합니다.
            <br />
            내용을 확인해주세요.
          </span>
        }
        show={toast}
      />
    </div>
  );
};

export default NCCN;
