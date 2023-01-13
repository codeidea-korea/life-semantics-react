import React from "react";
import { useEffect, useState } from "react";
import InputElement from "../../elements/InputElement";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { userState } from '@states/userState';
import { useRecoilValue } from "recoil";

const ModifyCheck01 = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  let [alertState, setAlert] = useState<JSX.Element | null>(null);
  let modifyData = {
    "userNo": 0,
    "userID": "string",
    "userPass": "string",
    "userName": "string",
    "userBirth": "string",
    "userPhone": "string",
    "userSmsAgree": "string",
    "userGender": "string",
    "userEmail": "string",
    "userEmailAgree": "string",
    "userRegDate": "2023-01-13T05:43:44.104Z",
    "piNo": 0,
    "userIsSmoke": "string",
    "userSmokeAmt": 0,
    "userSmokeStartYear": 0,
    "userSmokeEndYear": 0,
    "userIsDrink": "string",
    "userDrinkAmt": 0,
    "userDrinkStartYear": 0,
    "userDrinkEndYear": 0,
    "userIsCaffeine": "string",
    "ciNo": 0,
    "userDiagnosis": "string",
    "userDiagName": "string",
    "userDiagDate": "string",
    "userCureType": "string",
    "userCureName": "string",
    "userCureEndDate": "string",
    "userDiagEtc": "string",
    "userDiagEtcName": "string",
    "userNowHealStat": "string"
  };



  const handleSubmit = () => {

    fetch(`https://api.life.codeidea.io/users/view?userNo=${user.userNo}`,
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
          "userNo": data.body.userNo,
          "userID": data.body.userID,
          "userPass": data.body.userPass,
          "userName": data.body.userName,
          "userBirth": data.body.userBirth,
          "userPhone": data.body.userPhone,
          "userSmsAgree": data.body.userSmsAgree,
          "userGender": data.body.userGender,
          "userEmail": data.body.userEmail,
          "userEmailAgree": data.body.userEmailAgree,
          "userRegDate": data.body.userRegDate,
          "piNo": data.body.piNo,
          "userIsSmoke": data.body.userIsSmoke,
          "userSmokeAmt": data.body.userSmokeAmt,
          "userSmokeStartYear": data.body.userSmokeStartYear,
          "userSmokeEndYear": data.body.userSmokeEndYear,
          "userIsDrink": data.body.userIsDrink,
          "userDrinkAmt": data.body.userDrinkAmt,
          "userDrinkStartYear": data.body.userDrinkStartYear,
          "userDrinkEndYear": data.body.userDrinkEndYear,
          "userIsCaffeine": data.body.userIsCaffeine,
          "ciNo": data.body.ciNo,
          "userDiagnosis": data.body.userDiagnosis,
          "userDiagName": data.body.userDiagName,
          "userDiagDate": data.body.userDiagDate,
          "userCureType": data.body.userCureType,
          "userCureName": data.body.userCureName,
          "userCureEndDate": data.body.userCureEndDate,
          "userDiagEtc": data.body.userDiagEtc,
          "userDiagEtcName": data.body.userDiagEtcName,
          "userNowHealStat": data.body.userNowHealStat
        }
        const inputElement1 = document.querySelector('#password_check1') as HTMLInputElement;
        const inputElement2 = document.querySelector('#password_check2') as HTMLInputElement;
        const radioAgree1 = document.querySelector('#agree') as HTMLInputElement;
        const radioAgree2 = document.querySelector('#agree03') as HTMLInputElement;
        const userEmail = document.querySelector('#user_email') as HTMLInputElement;
        if (inputElement1.value === inputElement2.value) {
          modifyData.userPass = inputElement1.value;
          radioAgree1.checked == true ? (modifyData.userSmsAgree = "1") : (modifyData.userSmsAgree = "0")
          radioAgree2.checked == true ? (modifyData.userEmailAgree = "1") : (modifyData.userEmailAgree = "0")
          modifyData.userEmail = userEmail.value;
          fetch(`https://api.life.codeidea.io/users/update`,
            {
              method: 'POST',
              body: JSON.stringify(modifyData),
              headers: {
                Authorization: 'Bearer ' + user.accessToken,
                "Content-Type": "application/json"
              },
            }).then((response) => {
              return response.json();
            }).then((data) => {
              console.log(data);
            }).catch((error) => {
              console.log(error)
            });
        } else {
          setAlert(<span className="alert_text">두 비밀번호가 일치하지 않습니다.</span>)
        }
      }).catch((error) => {
        console.log(error)
      });


  }




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
                  id="user_email"
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
      <div className="fixBtn ">
        <button onClick={() => navigate(-1)} type="button" className="prev" >
          이전
        </button>
        <button onClick={handleSubmit} type="button" className="next" >
          수정
        </button>
      </div>
    </React.Fragment>
  );
};

export default ModifyCheck01;
