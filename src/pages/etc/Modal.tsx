import React, { useEffect, useState } from "react";
import WebLayout from "@layouts/web/WebLayout";
import { useRecoilState } from "recoil";
import ModalComponent from "@components/modal/ModalComponent";
import ModalComponent02 from "@components/modal/ToastPopup";
import { ModalInterface } from "@interfaces/modalInterface";
import { modalState } from "@states/modalState";
import $ from "jquery";

const Modal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleModal = () => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      cancelShow: false,
      content: <div>아이디 또는 비밀번호를 다시 확인해 주세요.</div>,
      confirmText: "확인",
    });
  };

  const handleModal01 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "안내",
      content: (
        <div>
          임시 비밀번호 발급이 <br />
          완료되었습니다.{" "}
        </div>
      ),
      confirmText: "확인",
    });
  };

  const handleModal02 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: (
        <div>
          아직 설문이 열리지 <br />
          않았습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  const handleModal03 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div className="">
          <div>
            초록색 원을 <br />
            좌우로 움직여주세요!{" "}
          </div>
        </div>
      ),
      confirmText: "확인했습니다!",
    });
  };
  const handleModal04 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: <div>아직 설문이 불가합니다.</div>,
      confirmText: "확인",
    });
  };

  const handleModal05 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
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
  const handleModal06 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
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
  const handleModal07 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: <div>설문을 완료했습니다.</div>,
      confirmText: "확인",
    });
  };
  const handleModal08 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: <div>설문이 종료되었습니다.</div>,
      confirmText: "확인",
    });
  };
  const handleModal09 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: (
        <div>
          디스트레스 설문을
          <br />
          완료하셨습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  const handleModal10 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: (
        <div>
          선택이 불가합니다.
          <br />
          아픈 부위 중에서만
          <br /> 제일 아픈 부위 선택이 <br />
          가능합니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  const handleModal11 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: (
        <div>
          통증 설문을
          <br />
          완료하셨습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  const handleModal12 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
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
  const handleModal13 = () => {
    setModal({
      ...modal,
      show: true,
      cancelShow: false,
      title: "",
      content: (
        <div>
          수면(ISI) 설문을
          <br />
          완료하셨습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  const handleModal14 = () => {
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
  const handleModal15 = () => {
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
  const handleModal16 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,

      content: (
        <div>
          설문을 종료하시겠습니까?
          <br />
          완료한 설문 페이지까지만 저장됩니다.
        </div>
      ),
      cancelText: "아니요",
      confirmText: "네",
    });
  };

  const handleModal17 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,

      content: (
        <div>
          작성을 중단하시겠습니까?
          <br />
          중단하신 내용은
          <br />
          저장되지 않습니다.
        </div>
      ),
      cancelText: <div className="close">아니요</div>,
      confirmText: "네",
    });
  };

  const handleModal18 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div>
          입력하지 않은
          <br />
          항목이 있습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };
  const handleModal19 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: false,
      content: (
        <div>
          조건에 맞지 않은
          <br />
          항목이 있습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };

  const handleModal20 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,

      content: (
        <div>
          로그아웃 하시겠습니까?
        </div>
      ),
      cancelText: <div className="close">아니요</div>,
      confirmText: "네",
    });
  };
  const handleModal21 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,

      content: (
        <div>
          회원 탈퇴를<br />
          중단하시겠습니까?
        </div>
      ),
      cancelText: <div className="close">아니요</div>,
      confirmText: "네",
    });
  };

  return (
    <WebLayout>
      <ModalComponent />
      <div className="modalButton">
        <button type="button" onClick={handleModal}>
          로그인 아이디확인
        </button>
        <button type="button" onClick={handleModal01}>
          임시비밀번호 발급
        </button>
        <button type="button" onClick={handleModal02}>
          설문확인
        </button>
        <button type="button" onClick={handleModal03}>
          일일설문(확인했어요!)
        </button>
        <button type="button" onClick={handleModal04}>
          설문 불가
        </button>
        <button type="button" onClick={handleModal05}>
          설문 수정불가
        </button>
        <button type="button" onClick={handleModal06}>
          설문이 더없습니다.
        </button>
        <button type="button" onClick={handleModal07}>
          설문을 완료했습니다.
        </button>
        <button type="button" onClick={handleModal08}>
          설문이 종료되었습니다.
        </button>
        <button type="button" onClick={handleModal09}>
          디스트레스 설문을 완료했습니다.
        </button>
        <button type="button" onClick={handleModal10}>
          통증 설문 - 제일아픈부위
        </button>
        <button type="button" onClick={handleModal11}>
          통증 설문 완료
        </button>
        <button type="button" onClick={handleModal12}>
          피로 설문 완료
        </button>
        <button type="button" onClick={handleModal13}>
          수면(ISI) 설문 완료
        </button>
        <button type="button" onClick={handleModal14}>
          수면(NCCN) 설문 완료
        </button>
        <button type="button" onClick={handleModal15}>
          설문종료 하시겠습니까
        </button>
        <button type="button" onClick={handleModal16}>
          선택한 프로그램을 취소하시겠습니까?
        </button>
        <button type="button" onClick={handleModal17}>
          작성을 중단하시겠습니까?
        </button>
        <button type="button" onClick={handleModal18}>
          입력하지 않는 항목
        </button>
        <button type="button" onClick={handleModal19}>
          조건에 맞지않는 항목
        </button>
        <button type="button" onClick={handleModal20}>
          로그아웃 하시겠습니까
        </button>
        <button type="button" onClick={handleModal21}>
          회원탈퇴
        </button>
      </div>
    </WebLayout>
  );
};

export default Modal;
