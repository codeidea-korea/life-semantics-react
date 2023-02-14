import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState, useRecoilValue } from "recoil";
import { countState, sampleState } from "@states/sampleState";
import ToastPopup from "@components/modal/ToastPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import RangeComponent from "@components/survey/todaySurvey/RangeComponent";
import RangeArrowComponent from "@/components/survey/todaySurvey/RangeArrowComponent ";
import $ from "jquery";
import ISISurveyComponent01 from "@components/survey/surveylist/ISI/ISISurveyComponent01";
import ISISurveyComponent02 from "@components/survey/surveylist/ISI/ISISurveyComponent02";
import ModalComponent from "@components/modal/ModalComponent";
import { userState } from "@/states/userState";
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
  svType2: "ISI",
  svStatus: "set",
  svRegDate: getToday(),
  userSurveysAnswersDTO: [],
};
for (let i = 0; i < 7; i++) {
  reqData.userSurveysAnswersDTO.push({
    saSvNo: 0,
    saQst: 0,
    saAnsList: [],
    saAns: 0,
    saEtcAns: "string",
    saRegDate: getToday(),
  });
}
const ISI = () => {
  const user = useRecoilValue(userState);
  reqData.svUserNo = user.userNo;
  const location = useLocation();
  const navigate = useNavigate();
  const [sample, setSample] = useRecoilState(sampleState);
  const [count, setCount] = useRecoilState(countState);
  const [modal, setModal] = useRecoilState(modalState);
  const [userListError, setUserListError] = useState(true);
  const [toast, setToast] = useState(false);
  const [toast2, setToast2] = useState(false);
  const increase = () => setCount(count + 1);
  const setTitle = () =>
    setSample({
      ...sample,
      title: String(document.querySelector("input")?.value),
    });
  const [step, setStep] = useState(1);
  if (step === 3) {
    const inner = document.querySelector(".next");
  }

  //url로 전달받은 데이터
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const pgNo = urlParams.get("pgNo");
  const type = urlParams.get("type");
  reqData.svPgNo = Number(pgNo);
  reqData.svType1 = type;

  const handleModal = () => {
    if (
      Number(
        document.querySelectorAll(".surveyContent input:checked").length
      ) === Number(document.querySelectorAll(".surveyContent").length)
    ) {
      const qnaLength = Number(
        document.querySelectorAll(".surveyContent").length
      );
      const checkedElementArray = document.querySelectorAll(
        ".surveyContent input:checked"
      );
      for (let i = 0; i < qnaLength; i++) {
        let index: number;
        const splitString = document
          .querySelectorAll(".survey_text")
          [i].textContent?.split(".")[0];
        if (splitString == "a") {
          index = 1;
        } else if (splitString == "b") {
          index = 2;
        } else if (splitString == "c") {
          index = 3;
        } else {
          index =
            Number(
              document
                .querySelectorAll(".survey_text")
                [i].textContent?.split(".")[0]
            ) + 2;
        }
        reqData.userSurveysAnswersDTO[index - 1].saAnsList = [];
        reqData.userSurveysAnswersDTO[index - 1].saQst = index;
        console.log(checkedElementArray + " " + i);
        reqData.userSurveysAnswersDTO[index - 1].saAnsList.push(
          Number(checkedElementArray[i].getAttribute("value"))
        );
      }
      const moveSurveyMain = () => {
        setModal({ ...modal, show: false });
        type == "pre" ? navigate("/surveyBefore") : navigate("/surveyAfter");
      };

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
                  불면<span>(ISI)</span> 설문을
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

  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  const handleNextStep = () => {
    if (step !== 3) {
      setStep(step + 1);
    }
  };
  const handlePrevStep = () => {
    if (step !== 4) {
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

  return (
    <div>
      <ModalComponent />
      <TitleHeadComponent name="불면(ISI)" targetUrl="" />
      <div className="tired painBox " id="ISI">
        <ISISurveyComponent01 />
        <ISISurveyComponent02 />
      </div>
      <div className="fixBtn">
        <button type="button" className="prev" onClick={handlePrevStep}>
          이전
        </button>
        <button type="button" className="next" onClick={handleModal}>
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

export default ISI;
