import React, { useEffect, useState } from "react";
import WebLayout from "@layouts/web/WebLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import HeaderComponent from "@components/head/Header";
import { modalState } from "@states/modalState";
import { Link } from "react-router-dom";
import InputElement from "@components/elements/InputElement";
import ModalComponent from "@components/modal/ModalComponent";
import { useNavigate } from "react-router-dom";
import { userState } from "@/states/userState";



const DeleteAccount = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  let [alertText, setAlert] = useState<JSX.Element | null>(null);

  const endUser = () => {

    const inputElement = document.querySelector('#end_user_pass') as HTMLInputElement;
    if (inputElement && inputElement.value.length !== 0) {
      const reqData = {
        "userID": user.userID,
        "userPass": inputElement.value
      }
      fetch(`https://api.life.codeidea.io/users/update/pwd-check`,
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
            fetch(`https://api.life.codeidea.io/users/withdrawal`,
              {
                method: 'POST',
                body: JSON.stringify(reqData),
                headers: {
                  Authorization: 'Bearer ' + user.accessToken,
                  'Content-Type': 'application/json'
                },
              }).then((response) => {
                return response.json();
              }).then((data) => {
                if (data.result === "true") {
                  navigate("/deleteAccountComplete")
                }
              }).catch((error) => {
                console.log(error)
              });

          }

        });
    } else if (inputElement.value.length === 0) {
      setAlert(<span className="alert_text">비밀번호를 입력해주세요.</span>)
    }
  }
  const [modal, setModal] = useRecoilState(modalState);
  const handleModal = () => {
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
      confirmText: "아니요",
      cancelText: "네",
      onCancelCallback: () => {
        navigate(-1)
      }
    });
  };
  const moveMain = () => {
    setModal({ ...modal, show: true });
    navigate('/');
  };
  const handleModal01 = () => {
    setModal({
      ...modal,
      show: true,
      title: "",
      cancelShow: true,
      content: (
        <div>
          정말 탈퇴하시겠습니까?<br />
          탈퇴 후에는 복구가 불가합니다.
        </div>
      ),
      confirmText: "아니요",
      cancelText: "네",
      onCancelCallback: endUser
    });
  };
  return (
    <WebLayout>

      <HeaderComponent />
      <div className="account">
        <h2>회원 탈퇴</h2>
        <div className="delete">
          <p>
            회원 탈퇴 시 모든 정보가 삭제되며, <br />
            <strong>이후 복구가 불가능</strong>합니다.
          </p>
          <table>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>{user.userID}</td>
              </tr>
              <tr>
                <td>최초가입일자</td>
                <td>{user.userRegDate?.split("T")[0]}</td>
              </tr>
            </tbody>
          </table>
          <div className="deletId">
            <p>
              비밀번호 확인 후 아이디는
              <br />
              <strong>즉시 탈퇴</strong>됩니다.
            </p>
            <span className="password">
              <label htmlFor="">비밀번호</label>
              <InputElement id="end_user_pass" type="password" maxLength={16} />
              {alertText}
            </span>
          </div>
        </div>
        <div className="buttonBox">
          <button onClick={handleModal} type="button" className="prevButton">
            취소
          </button>
          <button onClick={handleModal01} type="button" className="nextButton">
            탈퇴
          </button>
        </div>
      </div>
      <ModalComponent id="flexModal" />
    </WebLayout>
  );
};

export default DeleteAccount;
