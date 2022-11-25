import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState } from "recoil";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import { countState, sampleState } from "@states/sampleState";
import DateComponent from "@components/survey/todaySurvey/DateComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RangeComponent from "@components/survey/todaySurvey/RangeComponent";
import RangeArrowComponent from "@/components/survey/todaySurvey/RangeArrowComponent ";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
import ToastPopup from "@components/modal/ToastPopup";
import $ from "jquery";

const SurveyToday = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const location = useLocation();
  const navigate = useNavigate();
  const [sample, setSample] = useRecoilState(sampleState);
  const [toast, setToast] = useState(false);

  const handleUseNotice = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div className="modalImage">
          초록색 원을
          <br />
          <span>좌우</span>로 움직여주세요!
          <img src="images/modalprogress.svg" />
        </div>
      ),
      confirmText: "확인했어요!",
    });
  };

  const handleModal01 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: <div className="modalImage">아직 설문이 불가합니다.</div>,
      confirmText: "확인",
    });
  };
  /* 조회 불가 모달 */
  const handleModal02 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div>
          수정가능한 날짜만
          <br />
          조회 가능합니다.
          <br />
          (오늘날짜로부터
          <br /> <b>5일 전</b>까지만 수정가능)
        </div>
      ),
      confirmText: "확인",
    });
  };
  /* 미작성 설문 부재 */
  const handleModal03 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div>
          더 이상 해야할
          <br />
          설문이 없습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  /* 설문완료 */
  const handleTodaySurveyComplete = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      callBackShow: true,
      content: <div>설문을 완료했습니다.</div>,
      confirmText: "확인",
      onConfirmCallback : moveSurveyMain
    });
  };



  /* 설문종료 */
  const handleModal05 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: <div>설문이 종료되었습니다.</div>,
      confirmText: "확인",
    });
  };

  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
      handleTodaySurveyComplete();
    }, 3000);
  };

  const moveSurveyMain = () => {
    setModal({...modal, show: false});
    navigate('/survey');
  };

  useEffect(() => {
    handleUseNotice();
  }, []);

  return (
    <React.Fragment>
      <TitleHeadComponent name="일일 설문" targetUrl= ""/>
      <div className="survey surveyToday">
        <div className="dDay">D+16</div>
        <DateComponent />
        <p>
          지난 24시간 동안의 피로를 나타내는 <br />
          숫자에 원을 놓아주세요.
        </p>
        <RangeComponent />
        <RangeArrowComponent left="피로도 낮음" right="피로도 높음"/>
        <ToastPopup content={"수정되었습니다."} show={toast} />
        <ToastPopup content={"저장되었습니다."} show={toast} />
        <button type="button" className="BtnActive02" onClick={handlePopup}>
          저장
        </button>
      </div>

      <ModalComponent />
    </React.Fragment>
  );
};

export default SurveyToday;
