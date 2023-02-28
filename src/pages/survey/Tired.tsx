import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { userState } from "@/states/userState";
let isFirst = true;
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
  svType2: "fatigue",
  svStatus: "set",
  svRegDate: getToday(),
  userSurveysAnswersDTO: [],
};
for (let i = 0; i < 15; i++) {
  reqData.userSurveysAnswersDTO.push({
    saSvNo: 0,
    saQst: 0,
    saAnsList: [],
    saAns: 0,
    saEtcAns: "string",
    saRegDate: getToday(),
  });
}

const Tired = () => {
  const user = useRecoilValue(userState);
  reqData.svUserNo = user.userNo;
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState(modalState);
  const [userListError, setUserListError] = useState(true);
  const [toast, setToast] = useState(false);
  const [toast2, setToast2] = useState(false);
  const [toast3, setToast3] = useState(false);
  const [step, setStep] = useState(1);

  //url로 전달받은 데이터
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const pgNo = urlParams.get("pgNo");
  const type = urlParams.get("type");
  reqData.svPgNo = Number(pgNo);
  reqData.svType1 = type;

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
      if (step < 3) {
        setStep(step + 1);
      }
    } else {
      setToast2(true);
      setTimeout(() => {
        setToast2(false);
      }, 3000);
    }
  };

  const handlePrevStep = () => {
    if (step < 4 && step > 1) {
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

  const moveSurveyMain = () => {
    setModal({ ...modal, show: false });
    type == "pre" ? navigate("/surveyBefore?pgNo="+pgNo+"&type=goodBye") : navigate("/surveyAfter?pgNo="+pgNo+"&type=goodBye");
  };

  const handleTiredSurveyComplete = () => {
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
      if (isFirst == true) {
        setToast3(true);
        setTimeout(() => {
          setToast3(false);
        }, 3000);
        isFirst = false;
      } else {
        dataSet(Number(document.querySelectorAll(".surveyContent").length));
        console.log(reqData);
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
                title: "",
                cancelShow: false,
                callBackShow: true,
                content: (
                  <div>
                    피로 설문을
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
      }
    } else {
      setToast2(true);
      setTimeout(() => {
        setToast2(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const scrollHeight = $(".Step").prop("scrollHeight");
    console.log(scrollHeight);

    $(window).on("scroll", function () {
      const height = $(document).scrollTop();
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

  //뒤로가기시 클릭했던거 유지기능
  function savePrev() {
    setTimeout(() => {
      let stepCount = 0;
      if (step == 1) {
        stepCount = 0;
      } else if (step == 2) {
        stepCount = 5;
      } else if (step == 3) {
        stepCount = 10;
      }
      for (let i = stepCount; i < reqData.userSurveysAnswersDTO.length; i++) {
        console.log(reqData);
        reqData.userSurveysAnswersDTO[i].saAnsList?.forEach(
          (item: any, idx) => {
            const targetElement = document
              .querySelectorAll(".surveyContent")
              [i - stepCount].querySelectorAll("input")[item - 1];
            console.log(targetElement);
            targetElement.checked = true;
          }
        );
      }
    }, 500);
  }
  useEffect(() => {
    savePrev();
  }, [step]);

  return (
    <React.Fragment>
      <TitleHeadComponent name="피로" targetUrl="" />
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
      <ToastPopup
        content="완료하시면 수정이 불가합니다. 내용을 확인해주세요."
        show={toast3}
      />
    </React.Fragment>
  );
};

export default Tired;
