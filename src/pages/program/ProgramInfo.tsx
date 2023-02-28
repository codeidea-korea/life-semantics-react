import React, { useEffect, useState } from "react";
import HeaderComponent from "@components/head/Header";
import ProgramDetailComponent from "@components/program/programDetail/ProgramDetailComponent";
import ProgramNumberComponent from "@components/program/ProgramNumberComponent";
import DownLoadComponent from "@components/program/programDetail/DownLoadComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ViewInterface } from "@interfaces/viewInterface";
import useAxios from "@hooks/useAxios";
import { ProgramInterface } from "@interfaces/programInterface";
import { modalState } from "@states/modalState";
import { userState } from '@states/userState';
import { useRecoilState, useRecoilValue } from "recoil";
import ModalComponent from "@components/modal/ModalComponent";

const ProgramInfo = () => {
  const { state } = useLocation() as ViewInterface;
  const [modal, setModal] = useRecoilState(modalState);
  const navigate = useNavigate();
  const api = useAxios();
  const [program, setProgram] = useState<ProgramInterface>();
  const user = useRecoilValue(userState);


  const getProgram = async () => {
    await api
      .post(`/usr/programs/view?pgNo=${state.pgNo}&userNo=${user.userNo}`)
      .then((res) => {
        console.log(res)
        if (res.status === 200) setProgram(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMakeReservation = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,
      callBackShow: true,
      content: <div>프로그램을 예약하시겠습니까?</div>,
      confirmText: "확인",
      cancelText: "취소",

      onConfirmCallback: requestMakeReservation,
      onCancelCallback: handleCancelModal
    });
  }

  const handleCancelReservation = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,
      callBackShow: true,
      content: <div>프로그램을 취소하시겠습니까?</div>,
      confirmText: "확인",
      cancelText: "취소",

      onConfirmCallback: requestCancelReservation,
      onCancelCallback: handleCancelModal
    });
  }

  const requestMakeReservation = () => {
    api
      .post(`/usr/programs/apply?pgNo=${program?.pgNo}&userNo=${user.userNo}`, null, { headers: { Authorization: `Bearer ${user.accessToken}` } })
      .then((res) => {
        console.log(res);
        setModal({
          ...modal,
          show: true,
          cancelShow: false,
          callBackShow: true,
          content: <div>프로그램 예약이 완료됐습니다.</div>,
          confirmText: "확인",

          onConfirmCallback: handleMoveReservation
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestCancelReservation = () => {
    api
      .patch(`/usr/programs/cancel?pgNoList=${program?.pgNo}`, null, { headers: { Authorization: `Bearer ${user.accessToken}` } })
      .then((res) => {
        console.log(res);
        setModal({
          ...modal,
          show: true,
          cancelShow: false,
          callBackShow: true,
          content: <div>프로그램 취소가 완료됐습니다.</div>,
          confirmText: "확인",

          onConfirmCallback: handleMoveReservation
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleMoveReservation = () => {
    setModal({ ...modal, show: false });
    navigate("/reservation");
  };

  const handleCancelModal = () => {
    setModal({ ...modal, show: false });
  }

  useEffect(() => {
    (async () => {
      await getProgram();
    })();
  }, []);

  return (
    <React.Fragment>
      <HeaderComponent />
      <div className="programInfo" id="programContent">
        <h2>프로그램 정보</h2>
        <p className="programName">{program?.pgTitle}</p>
        {program?.pgVideoSaveName &&
          <div className="videoWrap">
            <video controls muted={true} style={{maxHeight: '100%'}}>
              <source type="video/mp4" src={`${import.meta.env.VITE_PUBLIC_STREAMING_SERVER_URL}${program?.pgVideoSaveName}`} />
            </video>
          </div>
        }
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
              <span>{program?.pgAppAll}명</span>
            </li>
            <li>
              <span>진행장소</span>
              <Link to="/forestView">{program?.pgPlace === "etc" ? program?.pgPlaceText : program?.pgPlace}</Link>
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
        <DownLoadComponent fileList={program?.fileList || []} />
        <ProgramNumberComponent roundList={program?.roundList || []} />
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

      {program?.pgApply === "reservable" && (
        <React.Fragment>
          <div className="fixBtn">
            <button
              type="button"
              className="btn-02 active "
              onClick={handleMakeReservation}
            >
              예약하기
            </button>
          </div>
        </React.Fragment>
      )}
      {program?.pgApply === "cancellable" && (
        <React.Fragment>
          <div className="fixBtn">
            <button
              type="button"
              className="btn-02 active"
              onClick={handleCancelReservation}
            >
              <span className="cancel">취소하기</span>
            </button>
          </div>
        </React.Fragment>
      )}
      {(program?.pgApply === "inOperApplied" || program?.pgApply === "inOperNotApplied") && (
        <React.Fragment>
          <div className="fixBtn">
            <button
              type="button"
              className="btn-02"
            >
              운영중
            </button>
          </div>
        </React.Fragment>
      )}
      {program?.pgApply === "uncancellable" && (
        <React.Fragment>
          <div className="fixBtn">
            <button
              type="button"
              className="btn-02 gray-btn"
            >
              취소불가
            </button>
          </div>
        </React.Fragment>
      )}
      <ModalComponent id="flexModal" />
    </React.Fragment>
  );
};

export default ProgramInfo;
