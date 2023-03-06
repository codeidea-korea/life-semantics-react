import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState, useRecoilValue } from "recoil";
import { countState, sampleState } from "@states/sampleState";
import ModalComponent from "@components/modal/ModalComponent";
import ProgressComponent from "@components/ProgressComponent";
import PainComponent from "@components/survey/surveylist/PainComponent";
import MostPainListComponent from "@components/survey/surveylist/MostPainListComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import ToastPopup from "@components/modal/ToastPopup";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import $ from "jquery";
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
  svType2: "ache",
  svStatus: "set",
  svRegDate: getToday(),
  userSurveysAnswersDTO: [
    {
      saSvNo: 0,
      saQst: 0,
      saAnsList: [],
      saAns: 0,
      saEtcAns: "string",
      saRegDate: getToday(),
    },
    {
      saSvNo: 0,
      saQst: 0,
      saAnsList: [],
      saAns: 0,
      saEtcAns: "string",
      saRegDate: getToday(),
    },
    {
      saSvNo: 0,
      saQst: 0,
      saAnsList: [],
      saAns: 0,
      saEtcAns: "string",
      saRegDate: getToday(),
    },
  ],
};
const Pain = () => {
  const user = useRecoilValue(userState);
  reqData.svUserNo = user.userNo;
  const location = useLocation();
  const navigate = useNavigate();
  const [sample, setSample] = useRecoilState(sampleState);
  const [count, setCount] = useRecoilState(countState);
  const [modal, setModal] = useRecoilState(modalState);
  const [toast, setToast] = useState(false);
  const [toast2, setToast2] = useState(false);
  const [toast3, setToast3] = useState(false);
  const [userListError, setUserListError] = useState(true);
  const increase = () => setCount(count + 1);
  const setTitle = () =>
    setSample({
      ...sample,
      title: String(document.querySelector("input")?.value),
    });
  const [step, setStep] = useState(1);

  //url로 전달받은 데이터
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const pgNo = urlParams.get("pgNo");
  const type = urlParams.get("type");
  reqData.svPgNo = Number(pgNo);
  reqData.svType1 = type;

  useEffect(() => {
    const inner = document.querySelector(".next") as HTMLButtonElement;
    if (step === 3) {
      inner.innerText = "작성완료";
    } else if (step !== 3) {
      inner.innerText = "다음";
    }
  }, [step]);

  useEffect(() => {
    const scHeight = $(".Step").prop("scrollHeight");
    console.log(scHeight);

    $(window).on("scroll", function () {
      var height = $(document).scrollTop();
      if (this.scrollY > 300) {
        $(".Step").addClass("fixed");
      } else {
        $(".Step").removeClass("fixed");
      }
    });
  }, []);

  const isVaildAnswer = (step: number) => {
    const selectedElement = document.querySelectorAll(".dot.on")[0];
    if (step === 1) {
      reqData.userSurveysAnswersDTO[0].saQst = 1;
      reqData.userSurveysAnswersDTO[0].saAnsList = [];
      if (selectedElement !== undefined) {
        document.querySelectorAll(".dot.on").forEach((item, idx) => {
          reqData.userSurveysAnswersDTO[0].saAnsList.push(
            Number(item.getAttribute("data-index")) + 1
          );
        });
      } else {
        return false;
      }
    } else if (step === 2) {
      reqData.userSurveysAnswersDTO[1].saQst = 1;
      reqData.userSurveysAnswersDTO[1].saAnsList = [];
      if (selectedElement !== undefined) {
        document.querySelectorAll(".dot.red").forEach((item, idx) => {
          reqData.userSurveysAnswersDTO[1].saAnsList.push(
            Number(item.getAttribute("data-index")) + 1
          );
        });
      } else {
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (isVaildAnswer(step) === true) {
      if (step < 3) {
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
    if (step < 4 && step > 1) {
      setStep(step - 1);
    } else if (step === 1) {
      navigate(-1);
    }
    if (step === 3) {
      savePrev();
    }
    if (step === 2) {
      document.querySelectorAll(".red").forEach((item, idx) => {
        item.classList.remove("red");
      });
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
  const handleDuplicationNotice = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div>
          선택이 불가합니다.
          <br />
          아픈 부위 중에서만
          <br />
          제일 아픈 부위 선택이 <br />
          가능합니다.
        </div>
      ),
      confirmText: "확인",
    });
  };

  function savePrev() {
    setTimeout(() => {
      console.log(reqData);
      document.querySelectorAll(".frontPain span").forEach((item: any, idx) => {
        reqData.userSurveysAnswersDTO[0].saAnsList.forEach(
          (item2: any, idx2) => {
            if (item.getAttribute("data-index") == item2 - 1) {
              item.classList.add("on");
            }
          }
        );
        reqData.userSurveysAnswersDTO[1].saAnsList.forEach(
          (item2: any, idx2) => {
            if (item.getAttribute("data-index") == item2 - 1) {
              item.classList.add("red");
            }
          }
        );
      });
      document.querySelectorAll(".backPain span").forEach((item: any, idx) => {
        reqData.userSurveysAnswersDTO[0].saAnsList.forEach(
          (item2: any, idx2) => {
            if (item.getAttribute("data-index") == item2 - 1) {
              item.classList.add("on");
            }
          }
        );
        reqData.userSurveysAnswersDTO[1].saAnsList.forEach(
          (item2: any, idx2) => {
            if (item.getAttribute("data-index") == item2 - 1) {
              item.classList.add("red");
            }
          }
        );
      });
    }, 500);
  }

  const handlePainSurveyComplete = () => {
    if (
      document.querySelectorAll(".scoreRadio input:checked")[0] !== undefined
    ) {
      if (isFirst == true) {
        setToast3(true);
        setTimeout(() => {
          setToast3(false);
        }, 3000);
        isFirst = false;
      } else {
        reqData.userSurveysAnswersDTO[2].saQst = 3;
        reqData.userSurveysAnswersDTO[2].saAnsList = [];
        const checkedIndex = Array.from(
          document.querySelectorAll(".scoreRadio input")
        ).indexOf(document.querySelectorAll(".scoreRadio input:checked")[0]);
        reqData.userSurveysAnswersDTO[2].saAnsList.push(checkedIndex + 1);

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
                    통증 설문을
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

  const moveSurveyMain = () => {
    setModal({ ...modal, show: false });
    type == "pre" ? navigate("/surveyBefore?pgNo="+pgNo+"&type=goodBye") : navigate("/surveyAfter?pgNo="+pgNo+"&type=goodBye");
  };

  return (
    <React.Fragment>
      <TitleHeadComponent name="통증" targetUrl={"/survey"} />
      <div className="painBox">
        <h2>시작전 설문 - 통증</h2>
        <div className="Step">
          <ul>
            <ProgressComponent active={step >= 1} />
            <ProgressComponent active={step >= 2} />
            <ProgressComponent active={step >= 3} />
          </ul>
        </div>
        {step === 3 ? <MostPainListComponent /> : <PainComponent step={step} />}
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
            onClick={handlePainSurveyComplete}
          >
            작성완료
          </button>
        )}
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
            최종 선택된 한 곳으로만
            <br />
            저장됩니다.
          </span>
        }
        show={toast}
      />
      <ToastPopup
        content={
          <span>
            완료하시면 <b>수정</b>이 <b>불가</b>합니다. <br />
            내용을 확인해주세요.
          </span>
        }
        show={toast3}
      />
      <ModalComponent />
      <ToastPopup content={"모든 필수정보를 입력해주세요."} show={toast2} />
    </React.Fragment>
  );
};

export default Pain;
