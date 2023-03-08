import React from "react";
import { useEffect, useState } from "react";
import InputElement from "../../elements/InputElement";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { userState } from '@states/userState';
import { useRecoilValue, useRecoilState } from "recoil";
import ToastPopup from "@components/modal/ToastPopup";
import { modalState } from "@states/modalState";

const ModifyCheck01 = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  let [alertState, setAlert] = useState<JSX.Element | null>(null);
  let modifyData = {
    "userPass": "string",
    "userSmsAgree": "string",
    "userEmail": "string",
    "userEmailAgree": "string"
  };



  const handleSubmit = () => {
    fetch(`${import.meta.env.VITE_PUBLIC_API_SERVER_URL}users/view?userNo=${user.userNo}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        modifyData = {
          "userPass": data.body.userPass,
          "userSmsAgree": data.body.userSmsAgree,
          "userEmail": data.body.userEmail,
          "userEmailAgree": data.body.userEmailAgree
        }
        const inputElement1 = document.querySelector('#password_check1') as HTMLInputElement;
        const inputElement2 = document.querySelector('#password_check2') as HTMLInputElement;
        const radioAgree1 = document.querySelector('#agree') as HTMLInputElement;
        const radioAgree2 = document.querySelector('#agree03') as HTMLInputElement;
        const userEmail = document.querySelector('#user_email') as HTMLInputElement;

        if (inputElement1.value.length > 0 && inputElement1.value === inputElement2.value) {
          modifyData.userPass = inputElement1.value;
          radioAgree1.checked == true ? (modifyData.userSmsAgree = "1") : (modifyData.userSmsAgree = "0")
          radioAgree2.checked == true ? (modifyData.userEmailAgree = "1") : (modifyData.userEmailAgree = "0")
          modifyData.userEmail = userEmail.value;
          fetch(`${import.meta.env.VITE_PUBLIC_API_SERVER_URL}users/info`,
            {
              method: 'PUT',
              body: JSON.stringify(modifyData),
              headers: {
                Authorization: 'Bearer ' + user.accessToken,
                "Content-Type": "application/json"
              },
            }).then((response) => {
              return response.json();
            }).then((data) => {
              console.log(data);
              if (data.result == "true") {
                setToast(true);
                setTimeout(() => {
                  setToast(false);
                  navigate(-1);
                }, 3000);
              }
            }).catch((error) => {
              console.log(error)
            });
        } else if (inputElement1.value.length == 0) {
          setAlert(<span className="alert_text">비밀번호를 입력해주세요.</span>)
          const scrolElement = document.querySelectorAll(".alert_text")[0] as any;
          window.scrollTo(0, 0);
        } else {
          setAlert(<span className="alert_text">두 비밀번호가 일치하지 않습니다.</span>)
          const scrolElement = document.querySelectorAll(".alert_text")[0] as any;
          window.scrollTo(0, 0);
        }
      }).catch((error) => {
        console.log(error)
      });


  }


  useEffect(() => {
    setModal({
      ...modal,
      show: false,
      title: "",
      cancelShow: true,
      callBackShow: true,
      content: (
        <div>
          작성을 중단하시겠습니까? <br />
          중단하신 내용은
          <br />
          저장되지 않습니다.
        </div>
      ),
      confirmText: "네",
      cancelText: "아니요",
      onConfirmCallback: () => {

        navigate(-1)
        setModal({ ...modal, show: false })
      }
    });

    document.querySelectorAll('.prev')[0].addEventListener('click', function () {
      setModal({
        ...modal,
        show: true,
        title: "",
        cancelShow: true,
        callBackShow: true,
        content: (
          <div>
            작성을 중단하시겠습니까? <br />
            중단하신 내용은
            <br />
            저장되지 않습니다.
          </div>
        ),
        confirmText: "네",
        cancelText: "아니요",
        onConfirmCallback: () => {
          setModal({ ...modal, show: false })
          navigate(-1)
        }
      });
    });
  }, [])

  return (
    <React.Fragment>
      <div className="modifyCheck">
        <p className="title">회원정보 입력</p>
        <div className="MemberChk MemberChk01">
          <ul>
            <li>
              <label>
                <span>아이디</span>
              </label>
              <span>{user.userID}</span>
            </li>
            <li>
              <label>
                <span>비밀번호</span>
              </label>
              <InputElement
                type="password"
                placeholder="비밀번호"
                id="password_check1"
              />
              {alertState}
            </li>
            <li>
              <label>
                <span>비밀번호 확인</span>
              </label>
              <InputElement
                type="password"
                placeholder="비밀번호 확인"
                id="password_check2"
              />
              {alertState}
            </li>
            <li>
              <label>
                <span>이름</span>
              </label>
              <span>{user.userName}</span>
            </li>
            <li>
              <label>
                <span>생년월일</span>
              </label>
              <span>{user.userBirth}</span>
            </li>
            <li>
              <label>
                <span>휴대폰번호</span>
              </label>
              <span>{user.userPhone}</span>
            </li>
            <li>
              <label>
                <span className="no_dot">문자 수신동의</span>
              </label>
              <div className="radioCheck">
                {user.userSmsAgree == "1" ? <><span>
                  <InputElement checked type="radio" value="동의" name="chk_info" id="agree" />
                  <label htmlFor="agree">동의</label>
                </span><span>
                    <InputElement type="radio" value="미동의" name="chk_info" id="agree01" />
                    <label htmlFor="agree01">미동의</label>
                  </span></> : <><span>
                    <InputElement type="radio" value="동의" name="chk_info" id="agree" />
                    <label htmlFor="agree">동의</label>
                  </span><span>
                    <InputElement checked type="radio" value="미동의" name="chk_info" id="agree01" />
                    <label htmlFor="agree01">미동의</label>
                  </span></>}
              </div>
            </li>
            <li>
              <label>
                <span>성별</span>
              </label>
              <span>{user.userGender === "m" ? "남" : "여"}</span>
            </li>
            <li>
              <label>
                <span className="no_dot">이메일</span>
              </label>
              <span className="">
                <InputElement
                  type="email"
                  placeholder=""
                  id="user_email"
                  value={user.userEmail}
                />
              </span>
            </li>
            <li>
              <label>
                <span className="no_dot">이메일 수신동의</span>
              </label>
              <div className="radioCheck" id="">

                {user.userEmailAgree == "1" ? <><span>
                  <InputElement checked type="radio" value="동의" name="chk_info2" id="agree02" />
                  <label htmlFor="agree02">동의</label>
                </span>
                  <span>
                    <InputElement type="radio" value="미동의" name="chk_info2" id="agree03" />
                    <label htmlFor="agree03">미동의</label>
                  </span></> : <><span>
                    <InputElement type="radio" value="동의" name="chk_info2" id="agree02" />
                    <label htmlFor="agree02">동의</label>
                  </span>
                  <span>
                    <InputElement checked type="radio" value="미동의" name="chk_info2" id="agree03" />
                    <label htmlFor="agree03">미동의</label>
                  </span></>}

              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixBtn ">
        <button type="button" className="prev" >
          이전
        </button>
        <button onClick={handleSubmit} type="button" className="next" >
          수정
        </button>
      </div>
      <ToastPopup content={"입력하신 정보를 수정하였습니다."} show={toast} />

    </React.Fragment>
  );
};

export default ModifyCheck01;
