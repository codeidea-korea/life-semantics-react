import React, { useState } from "react";
import WebLayout from "@layouts/web/WebLayout";
import HeaderComponent from "@components/head/Header";
import BookComponent from "@components/program/book/BookComponent";
import GoodByeComponent from "@components/program/GoodByeProgramComponent";
import GoodSleepComponent from "@components/program/GoodSleepProgramComponent";
import BannerComponent from "@components/program/banner/BannerComponent";
import { Link, useNavigate } from "react-router-dom";
import InputElement from "@components/elements/InputElement";
import { userState } from '@states/userState';
import { useRecoilValue } from "recoil";


const Modify = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  let [alertState, setAlert] = useState<JSX.Element | null>(null);


  const checkPassword = () => {
    const inputElement = document.querySelector('#modify_password') as HTMLInputElement;
    if (inputElement && inputElement.value.length !== 0) {
      const reqData = {
        "userID": user.userID,
        "userPass": inputElement.value
      }
      fetch(`${import.meta.env.VITE_PUBLIC_API_SERVER_URL}users/update/pwd-check`,
        {
          method: 'POST',
          body: JSON.stringify(reqData),
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
            "Content-Type": "application/json"
          },
        }).then((response) => {
          return response.json();
        }).then((data) => {
          if (data.body.result === false) {
            setAlert(<span className="alert_text">비밀번호가 일치하지 않습니다.</span>)
          } else if (data.body.result === true) {
            navigate("/mypage")
          }

        });
    } else if (inputElement.value.length === 0) {
      setAlert(<span className="alert_text">비밀번호를 입력해주세요.</span>)
    }



  }

  return (
    <WebLayout>
      <HeaderComponent />
      <div className="account">
        <h2>내 정보 수정</h2>
        <div className="modifyInfomation">
          <p>
            개인정보를 수정하시려면
            <br /> 비밀번호를 입력하셔야 합니다.
            <span>
              회원님의 개인정보 보호를 위한
              <br /> 본인 확인 절차이오니,
              <br /> 회원 로그인 시 사용하시는 비밀번호를 입력해주세요.
            </span>
          </p>

          <div className="deletId">
            <span className="password">
              <label htmlFor="">비밀번호</label>
              <InputElement id="modify_password" type="password" maxLength={16} />
              {alertState}
            </span>
            <Link to="/password">비밀번호가 기억나지 않아요.</Link>
          </div>

        </div>
        <div className="buttonBox">
          <button onClick={checkPassword} type="button" className="prevButton">
            확인
          </button>
          <button onClick={() => { navigate(-1) }} type="button" className="nextButton">
            취소
          </button>
        </div>
      </div>
    </WebLayout>
  );
};

export default Modify;
