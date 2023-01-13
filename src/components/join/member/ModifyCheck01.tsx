import React from "react";
import { useEffect } from "react";
import InputElement from "../../elements/InputElement";
import $ from "jquery";
import { userState } from '@states/userState';
import { useRecoilValue } from "recoil";

const ModifyCheck01 = () => {
  const user = useRecoilValue(userState);
  console.log(user);
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
                id="password_check"
              />
            </li>
            <li>
              <label>
                <span>비밀번호 확인</span>
              </label>
              <InputElement
                type="password"
                placeholder="비밀번호 확인"
                id="password_check"
              />
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
                <span>문자 수신동의</span>
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
                <span>이메일</span>
              </label>
              <span className="">
                <InputElement
                  type="email"
                  placeholder=""
                  id=""
                  value={user.userEmail}
                />
              </span>
            </li>
            <li>
              <label>
                <span>이메일 수신동의</span>
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
    </React.Fragment>
  );
};

export default ModifyCheck01;
