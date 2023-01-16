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
  let [alertState, setAlert] = useState<JSX.Element | null>(null);

  const findUserId = () => {
    const name = document.querySelector('#find_name') as HTMLInputElement;
    const phone = document.querySelector('#find_phone') as HTMLInputElement;
    if (String(name.value).length > 0 && String(phone.value).length > 0) {
      fetch(`https://api.life.codeidea.io/users/find-id?name=${name.value}&phone=${phone.value}`,
        {
          method: 'GET',
        }).then((response) => {
          return response.json();
        }).then((data) => {
          if (data.result == "true") {
            handleModal01(name.value, data.body.userId)
          } else {
            handleModal()
          }
        }).catch((error) => {
          console.log(error)
        });
    } else {
      handleModal()
    }
  }

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

  const handleModal01 = (userName: string, userId: string) => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      cancelShow: false,
      content:
        <div>
          {userName}님의 아이디는 <br />
          {userId}입니다.<br />
          <Link onClick={() => {
            navigator.clipboard.writeText(userId);
          }} to="" className="copy">아이디 복사</Link>
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
              <InputElement id="find_name" type="text" placeholder="이름 입력" />
              <InputElement id="find_phone" type="number" placeholder="전화번호(숫자만 입력)" />
              {alertState}
            </div>
          </div>
        </div>
        <button className="BtnActive" type="submit" onClick={findUserId}>
          아이디 찾기
        </button>
      </div>

    </WebLayout>
  );
};

export default IndexPage;
