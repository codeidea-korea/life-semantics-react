import React from "react";
import { useEffect } from "react";
import InputElement from "../../elements/InputElement";
import ModalComponent from "@/components/modal/ModalComponent";
import { useRecoilState } from "recoil";
import $ from "jquery";
import { modalState } from "@/states/modalState";

const MemberChk01 = ({ nextStep }: { nextStep: Function }) => {
  const handleFocusBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const username = document.getElementById("username") as HTMLInputElement;
    const passwrod = document.getElementById("passwrod") as HTMLInputElement;
    const password_check = document.getElementById(
      "password_check"
    ) as HTMLInputElement;
    const name_check = document.getElementById(
      "name_check"
    ) as HTMLInputElement;
    const birth = document.getElementById("birth") as HTMLInputElement;

    if (!username.value) {
      username.focus();
      return false;
    }
    if (!passwrod.value) {
      passwrod.focus();
      return false;
    }
    if (!password_check.value) {
      password_check.focus();
      return false;
    }
    if (!name_check.value) {
      name_check.focus();
      return false;
    }
    if (!birth.value) {
      birth.focus();
      return false;
    }

    nextStep(2);
  };
  const [modal, setModal] = useRecoilState(modalState);
  const handleModal = () => {
    setModal({
      ...modal,
      show: true,
      title: "안내",
      content: "아이디 또는 비밀번호를 다시 확인해 주세요.",
    });
  };

  return (
    <React.Fragment>
      <p className="title">회원정보 입력</p>
      <div className="MemberChk MemberChk01">
        <label>
          <span>아이디</span>
        </label>
        <div className="CodeCheck">
          <InputElement type="text" placeholder="아이디 확인" id="username" />
          <button type="button" className="doubleCheck green">중복확인</button>
        </div>
        <label>
          <span>비밀번호</span>
        </label>
        <InputElement
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 8~16자리"
          id="passwrod"
        />
        <label>
          <span>비밀번호 확인</span>
        </label>
        <InputElement
          type="password"
          placeholder="비밀번호 확인"
          id="password_check"
        />
        <label>
          <span>이름</span>
        </label>
        <InputElement type="text" placeholder="이름확인" id="name_check" />
        <label>
          <span>생년월일</span>
        </label>
        <InputElement type="number" placeholder="생년월일" id="birth" />
        <label>
          <span>문자 수신동의</span>
        </label>
        <div className="chk_radio">
          <span>
            <InputElement
              type="radio"
              value="동의"
              name="chk_info"
              id="agree"
            />
            <label htmlFor="agree">동의</label>
          </span>
          <span>
            <InputElement
              type="radio"
              value="미동의"
              name="chk_info"
              id="agree01"
            />
            <label htmlFor="agree01">미동의</label>
          </span>
        </div>
        <label>
          <span>이메일</span>
        </label>
        <div>
          <span className="flexInput selectBox">
            <InputElement type="email" placeholder="이메일 확인" id="" />@
            <select>
              <option></option>
              <option></option>
              <option></option>
            </select>
          </span>
        </div>
        <label>
          <span>이메일 수신동의</span>
        </label>
        <div className="chk_radio">
          <span>
            <InputElement
              type="radio"
              value="동의"
              name="checkMail"
              id="agree03"
            />
            <label htmlFor="agree03">동의</label>
          </span>
          <span>
            <InputElement
              type="radio"
              value="미동의"
              name="checkMail"
              id="agree04"
            />
            <label htmlFor="agree04">미동의</label>
          </span>
        </div>
      </div>
      <div className="fixBtn ">
        <button type="button" className="prev">
          이전
        </button>
        <button type="button" className="next" onClick={handleFocusBtn}>
          다음
        </button>
      </div>
      <button type="button" onClick={handleModal}></button>
    </React.Fragment>
  );
};

export default MemberChk01;
