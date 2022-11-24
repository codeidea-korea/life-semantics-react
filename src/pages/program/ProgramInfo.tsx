import React, { useEffect, useState } from "react";
import HeaderComponent from "@components/head/Header";
import ProgramDetailComponent from "@components/program/programDetail/ProgramDetailComponent";
import ProgramNumberComponent from "@components/program/ProgramNumberComponent";
import DownLoadComponent from "@components/program/programDetail/DownLoadComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ViewInterface } from "@interfaces/viewInterface";
import useAxios from "@hooks/useAxios";
import { ProgramInterface } from "@interfaces/programInterface";
import ToastPopup from "@components/modal/ToastPopup";
import { modalState } from "@states/modalState";
import { useRecoilState } from "recoil";
import ModalComponent from "@components/modal/ModalComponent";

const ProgramInfo = () => {
  const { state } = useLocation() as ViewInterface;
  const [toastCancel, setToastCancel] = useState(false);
  const [toastComplete, setToastComplete] = useState(false);
  const [isReserve, setReserve] = useState(true);
  const [modal, setModal] = useRecoilState(modalState);
  const navigate = useNavigate();
  const api = useAxios();
  const [program, setProgram] = useState<ProgramInterface>();

  const getProgram = async () => {
    await api
      .post("/programs/view", { pgIdx: state.pgIdx })
      .then((res) => {
        if (res.data.result === "success") setProgram(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConfirmLogout = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,
      callBackShow: true,
      content: <div>예약이 완료되었습니다.</div>,
      confirmText: "확인",
      cancelText: "취소",

      onConfirmCallback: handleMoveReservation,
    });
  };

  const handleMoveReservation = () => {
    setModal({ ...modal, show: false });
    navigate("/reservation");
  };

  const handleReserveToast = () => {
    setToastComplete(true);
    setReserve(!isReserve);
    setTimeout(() => {
      setToastComplete(false);
    }, 3000);
  };

  const handleCancelToast = () => {
    setToastCancel(true);
    setReserve(!isReserve);
    setTimeout(() => {
      setToastCancel(false);
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      await getProgram();
      if (state.pgIdx == "6") setReserve(false);
    })();
  }, []);

  return (
    <React.Fragment>
      <HeaderComponent />
      <div className="programInfo" id="programContent">
        <h2>프로그램 정보</h2>
        <p className="programName">{program?.pgTitle}</p>
        <div className="videoWrap">
          <video></video>
        </div>
        <div className="textContents">
          <ul>
            <li>
              <span>회차</span>
              <span>주 1회(월), 총 8회차 </span>
            </li>
            <li>
              <span>예약기간</span>
              <span>
                {program?.pgAppSttDate} ~ {program?.pgAppEndDate}
              </span>
            </li>
            <li>
              <span>주관기관</span>
              <span>{program?.pgOrgan}</span>
            </li>
            <li>
              <span>연락처</span>
              <span>{program?.pgContact}</span>
            </li>
            <li>
              <span>예약대상자</span>
              <span>{program?.pgTarget}</span>
            </li>
            <li>
              <span>진행기간</span>
              <span>
                {program?.pgSttDate} ~ {program?.pgEndDate}
              </span>
            </li>
            <li>
              <span>소요시간</span>
              <span>{program?.pgTakenTimes}분</span>
            </li>
            <li>
              <span>모집인원</span>
              <span>{program?.pgAppNow}명</span>
            </li>
            <li>
              <span>진행장소</span>
              <Link to="/forestView">{program?.pgPlace}</Link>
            </li>
            <li>
              <span>진행방법</span>
              <span>{program?.pgProcWay}</span>
            </li>
            <li>
              <span>주요활동</span>
              <span>{program?.pgMainAct}</span>
            </li>
            <li>
              <span>기대효과</span>
              <span>{program?.pgExpect}</span>
            </li>
          </ul>
        </div>
        {/*<ProgramDetailComponent/>*/}
        <DownLoadComponent />
        <ProgramNumberComponent />
        <div>
          <h3>기타정보</h3>
          <span>• 주의 사항</span>
          <p>
            우천시, 프로그램 참여 인원 5명 이하 시 프로그램이 취소될 수
            있음(사전 연락) 프로그램 전, 후 설문조사 참여(10~15분 소요)
          </p>
          <button
            type="button"
            className="borderButton"
            onClick={() => navigate(-1)}
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>

      {isReserve && (
        <React.Fragment>
          <div className="fixBtn">
            <button
              type="button"
              className="btn-02 active "
              onClick={handleConfirmLogout}
            >
              예약하기
            </button>
          </div>
        </React.Fragment>
      )}
      {!isReserve && (
        <React.Fragment>
          <div className="fixBtn">
            <button
              type="button"
              className="btn-02 active"
              onClick={handleCancelToast}
            >
              <span className="cancel">취소하기</span>
            </button>
          </div>
        </React.Fragment>
      )}
      <ToastPopup
        content={"프로그램 예약이 취소됐습니다."}
        show={toastCancel}
      />
      <ToastPopup
        content={"프로그램 예약이 완료됐습니다."}
        show={toastComplete}
      />
      <ModalComponent id="flexModal"/>
    </React.Fragment>
  );
};

export default ProgramInfo;
