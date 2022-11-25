import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ModalComponent from "@components/modal/ModalComponent";
import { countState, sampleState } from "@states/sampleState";
import WebLayout from "@layouts/web/WebLayout";
import InputElement from "@components/elements/InputElement";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import ToastPopup from "@components/modal/ToastPopup";
import TitleHeadComponent from "@components/head/TitleHeadComponent";

const LostPassword = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const location = useLocation();
  const navigate = useNavigate();
  const [sample, setSample] = useRecoilState(sampleState);
  const [count, setCount] = useRecoilState(countState);
  const [userListError, setUserListError] = useState(true);
  const [toast, setToast] = useState(false);
  const increase = () => setCount(count + 1);
  const setTitle = () =>
    setSample({
      ...sample,
      title: String(document.querySelector("input")?.value),
    });

  const handleModal = () => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      cancelShow: false,
      content: (
        <div>
          아이디 또는 비밀번호를
          <br /> 다시 확인해 주세요.
        </div>
      ),
      confirmText: "확인",
    });
  };

  const handleModal01 = () => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      cancelShow: false,
      content: (
        <div>
          임시 비밀번호 발급이
          <br />
          완료되었습니다.
        </div>
      ),
      confirmText: "확인",
    });
  };

  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  return (
    <WebLayout>
      <TitleHeadComponent name="비밀번호 찾기" targetUrl= ""/>
      <div className="Login">
        <div className="Temporary">
          <p>임시 비밀번호 발급</p>
          <label>이름</label>
          <InputElement type="text" placeholder="이름 입력" maxLength="10" />
          <label>휴대폰 번호</label>
          <InputElement type="number" placeholder="숫자만 입력" />
          <button className="InnerBtn" onClick={handleModal01}>
            임시 비밀번호 발급
          </button>
        </div>
        <div className="NewPass">
          <p>새 비밀번호 설정</p>
          <label>아이디</label>
          <InputElement type="text" placeholder="아이디 입력" />
          <label>휴대폰 번호</label>
          <div className="CodeCheck">
            <InputElement type="text" placeholder="휴대폰 번호 입력" />
            <button type="button" onClick={handlePopup}>
              인증번호 <br />
              받기
            </button>
            <ToastPopup content={"인증번호를 발송했습니다."} show={toast} />
          </div>
          <InputElement type="number" placeholder="인증번호 입력(10분 안에)" />
          <label>새 비밀번호 설정</label>
          <InputElement type="password" placeholder="새 비밀번호 입력" />
          <label>새 비밀번호 확인</label>
          <InputElement type="password" placeholder="새 비밀번호 확인" />
          <button className="InnerBtn">비밀번호 변경</button>
        </div>

        <button type="button" onClick={handleModal}></button>

        <ModalComponent />
      </div>
    </WebLayout>
  );
};

export default LostPassword;
