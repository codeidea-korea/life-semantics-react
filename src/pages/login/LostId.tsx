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
  const [userInfoForTempPass, setUserInfoForTempPass] = useState({
    find_name: "",
    find_phone: "",
  });

  const findUserId = () => {
    const name = document.querySelector("#find_name") as HTMLInputElement;
    const phone = document.querySelector("#find_phone") as HTMLInputElement;
    if (String(name.value).length > 0 && String(phone.value).length > 0) {
      fetch(
        `${import.meta.env.VITE_PUBLIC_API_SERVER_URL}users/find-id?name=${
          name.value
        }&phone=${phone.value.replaceAll("-", "")}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.result == "true") {
            let tid2 = data.body.userId.length;
            let tid3 = Math.floor(tid2 / 2);
            let tid4 = tid2 - tid3;
            let tid = data.body.userId.substring(0, tid4);
            for (let i = 0; i < tid3; i++) {
              tid += "*";
            }
            //handleModal01(name.value, data.body.userId)
            handleModal01(name.value, tid);
          } else {
            handleModal();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      handleModal();
    }
  };

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
          이름 또는 전화번호를
          <br /> 다시 확인해 주세요
        </div>
      ),
      confirmText: "확인",
    });
  };

  const handleModal01 = (userName: string, userId: string) => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      cancelShow: false,
      callBackShow: true,
      content: (
        <div>
          {userName}님의 아이디는 <br />
          {userId}입니다.
          <br />
          <Link
            onClick={() => {
              navigator.clipboard.writeText(userId);
            }}
            to=""
            className="copy"
          >
            아이디 복사
          </Link>
        </div>
      ),
      confirmText: "로그인하러가기",
      onConfirmCallback: () => {
        setModal({ ...modal, show: false })
        navigate("/login");
      },
    });
  };

  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    let reducePhoneNumber = value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    setUserInfoForTempPass({
      ...userInfoForTempPass,
      find_phone: reducePhoneNumber,
    });
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    let reduceUserName = value
      .replace(/[^ㄱ-ㅎ가-힣|a-zA-Z]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    setUserInfoForTempPass({
      ...userInfoForTempPass,
      find_name: reduceUserName,
    });
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
              <input
                id="find_name"
                type="text"
                placeholder="이름 입력"
                value={userInfoForTempPass.find_name}
                onChange={handleName}
              />
              <input
                id="find_phone"
                type="text"
                placeholder="전화번호(숫자만 입력)"
                value={userInfoForTempPass.find_phone}
                maxLength={13}
                pattern="\d*"
                onChange={handlePhoneNumber}
              />
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
