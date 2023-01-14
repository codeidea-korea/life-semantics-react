import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState } from "recoil";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import { countState, sampleState } from "@states/sampleState";
import WebLayout from "@layouts/web/WebLayout";
import InputElement from "@components/elements/InputElement";
import ModalComponent from "@components/modal/ModalComponent";
import { modalState } from "@states/modalState";
import ToastPopup from "@components/modal/ToastPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";


const IndexPage = () => {
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
      content: <div>이름 또는 전화번호를<br /> 다시 확인해 주세요</div>,
      confirmText: "확인",
    });
  };

  const handleModal01 = () => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      cancelShow: false,
      content:
        <div>
          ***님의 아이디는 <br />
          ___****입니다.<br />
          <Link to="" className="copy">아이디 복사</Link>
        </div>,
      confirmText: "확인",
    });
  };

  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000)
  };

  return (
    <WebLayout>
      <ModalComponent />
      <div className="Login">
        <TitleHeadComponent name="아이디 찾기" targetUrl="" />
        <div className="Container">
          <div className="LostId">
            <h3>회원 정보를 입력해 주세요.</h3>
            <p>
              회원 가입시 입력했던 정보와
              <br />
              동일하게 입력해 주세요.
            </p>
            <div className="loginInput">
              <InputElement type="text" placeholder="이름 입력" />
              <InputElement type="number" placeholder="전화번호(숫자만 입력)" />
            </div>
          </div>
        </div>
        <button className="BtnActive" type="submit" onClick={handleModal01}>
          아이디 찾기
        </button>
      </div>

    </WebLayout>
  );
};

export default IndexPage;
