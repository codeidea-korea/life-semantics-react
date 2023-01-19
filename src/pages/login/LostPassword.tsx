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
import useAxios from "@/hooks/useAxios";

const LostPassword = () => {
  const api = useAxios();
  const [modal, setModal] = useRecoilState(modalState);
  const location = useLocation();
  const navigate = useNavigate();
  const [sample, setSample] = useRecoilState(sampleState);
  const [count, setCount] = useRecoilState(countState);
  const [userListError, setUserListError] = useState(true);
  const [toast, setToast] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [userInfoForTempPass, setUserInfoForTempPass] = useState({
    userName: '',
    userPhone: ''
  });
  const [userInfoForNewPass, setUserInfoForNewPass] = useState({
    userID: '',
    userPhone: '',
    userCode: '',
    userNewPass: '',
    userNewPassCheck: ''
  });

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

      onConfirmCallback: () => setModal({...modal, show: false})
    });
  };

  const handleModal01 = (content: string[]) => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      cancelShow: false,
      callBackShow: true,
      content: (
        <div>
          {content[0]}
          <br />
          {content[1]}
        </div>
      ),
      confirmText: "확인",

      onConfirmCallback: () => {
        setModal({...modal, show: false})
        navigate('/login');
      },
    });
  };

  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  const handleUserInfoForTempPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUserInfoForTempPass({
      ...userInfoForTempPass,
      [name]: value
    })
  }
  
  const requestTempPass = () => {
    api
      .post(`/users/temporary-password?userName=${userInfoForTempPass.userName}&userPhone=${userInfoForTempPass.userPhone}`, null)
      .then((res) => {
        if (res.data.body.result) handleModal01(['임시 비밀번호 발급이', '완료되었습니다.']);
        else handleModal();
      })
      .catch((err) => {
        console.log(err);
        handleModal();
      })
  }

  const handleUserInfoForNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUserInfoForNewPass({
      ...userInfoForNewPass,
      [name]: value
    })
  }

  const handleRequestAuth = () => {
      handlePopup();

      api
          .post(`/users/auth-number?phone=${userInfoForNewPass.userPhone}`)
          .then((res) => {
              console.log(res)
              if (res.status === 200) {
                console.log(res.data.body.authNumber);
                setAuthCode(res.data.body.authNumber);
              }
          })
          .catch((err) => {
              console.log(err)
          })
  };

  const requestNewPass = () => {
    const {userID, userCode, userPhone, userNewPass, userNewPassCheck} = userInfoForNewPass;
    if (!userID || !userCode || userCode !== authCode || userNewPass !== userNewPassCheck) {
      handleModal();
      return
    }

    api
      .post(`/users/temporary-password?userName=${userID}&userPhone=${userPhone}&userPass=${userNewPass}`, null)
      .then((res) => {
        console.log(res);
        if (res.data.body.result) handleModal01(['새 비밀번호 설정이', '완료되었습니다.']);
        else handleModal();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <WebLayout>
      <TitleHeadComponent name="비밀번호 찾기" targetUrl= ""/>
      <div className="Login">
        <div className="Temporary">
          <p>임시 비밀번호 발급</p>
          <label>이름</label>
          <InputElement type="text" placeholder="이름 입력" maxLength="10" name="userName" value={userInfoForTempPass.userName} onChange={handleUserInfoForTempPass}/>
          <label>휴대폰 번호</label>
          <InputElement type="number" placeholder="숫자만 입력" name="userPhone" value={userInfoForTempPass.userPhone} onChange={handleUserInfoForTempPass} />
          <button className="InnerBtn" onClick={requestTempPass}>
            임시 비밀번호 발급
          </button>
        </div>
        <div className="NewPass">
          <p>새 비밀번호 설정</p>
          <label>아이디</label>
          <InputElement type="text" placeholder="아이디 입력" name="userID" value={userInfoForNewPass.userID} onChange={handleUserInfoForNewPass}/>
          <label>휴대폰 번호</label>
          <div className="CodeCheck">
            <InputElement type="text" placeholder="휴대폰 번호 입력" name="userPhone" value={userInfoForNewPass.userPhone} onChange={handleUserInfoForNewPass}/>
            <button type="button" onClick={handleRequestAuth}>
              인증번호 <br />
              받기
            </button>
            <ToastPopup content={"인증번호를 발송했습니다."} show={toast} />
          </div>
          <InputElement type="number" placeholder="인증번호 입력(10분 안에)" name="userCode" value={userInfoForNewPass.userCode} onChange={handleUserInfoForNewPass}/>
          <label>새 비밀번호 설정</label>
          <InputElement type="password" placeholder="새 비밀번호 입력" name="userNewPass" value={userInfoForNewPass.userNewPass} onChange={handleUserInfoForNewPass}/>
          <label>새 비밀번호 확인</label>
          <InputElement type="password" placeholder="새 비밀번호 확인" name="userNewPassCheck" value={userInfoForNewPass.userNewPassCheck} onChange={handleUserInfoForNewPass}/>
          <button className="InnerBtn" onClick={requestNewPass}>비밀번호 변경</button>
        </div>

        <button type="button" onClick={handleModal}></button>

        <ModalComponent />
      </div>
    </WebLayout>
  );
};

export default LostPassword;
