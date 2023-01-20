import React, { useEffect, useState, useRef } from "react";
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
  const inputsRef = useRef<HTMLInputElement[]>([]);
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
  const [sendAuthCode, setSendAuthCode] = useState(false);
  const [alertText, setAlertText] = useState({
    userID: [0, ''],
    userPhone: [0, ''],
    userCode: [0, ''],
    userNewPass: [0, ''],
    userNewPassCheck: [0, ''],
  });

  // 새 비밀번호 설정 - 인증번호 입력창 관련 코드 - start
  /**
     * 카운트다운 시간 설정, 기존 입력 코드 & 입력완료 플래그 초기화
     * @param {number} minute 초기화 시 사용할 숫자타입의 분 값
     * @param {number} second 초기화 시 사용할 숫자타입의 초 값
     * @return 초기화된 state
  */
  const [timePlaceHolder, setTimePlaceHolder] = useState('인증번호 입력(10분 안에)');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [requiredPhoneNumber, setRequiredPhoneNumber] = useState(false);
  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    let reducePhoneNumber = value.replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    if (reducePhoneNumber.length == 13) {
        setRequiredPhoneNumber(true);
        inputsRef.current[1].style.borderColor = "#8f8f8f";
        setAlertText({...alertText, userPhone: [0, '']})
    } else {
        setRequiredPhoneNumber(false);
    }
    setUserInfoForNewPass({
      ...userInfoForNewPass,
      userPhone: reducePhoneNumber
    })
    setAuthCode('');
  };
  useEffect(() => {
    if (seconds > 0 || minutes > 0) {
        const countdown = setInterval(() => {
            if (parseInt(String(seconds)) > 0) {
                setSeconds(parseInt(String(seconds)) - 1);
            }
            if (parseInt(String(seconds)) === 0) {
                if (parseInt(String(minutes)) === 0) {
                    clearInterval(countdown);
                } else {
                    setMinutes(parseInt(String(minutes)) - 1);
                    setSeconds(59);
                }
            }
            setTimePlaceHolder(`${minutes}` + ' : ' + (seconds < 10 ? `0${seconds}` : seconds));
        }, 1000);
        return () => clearInterval(countdown);
    }
  }, [minutes, seconds]);
  const handleCountDownPlaceHolder = (minute: number, second: number) => {
    setUserInfoForNewPass({...userInfoForNewPass, userCode: ''});
    setMinutes(minute);
    setSeconds(second);
  }
  // 새 비밀번호 설정 - 인증번호 입력창 관련 코드 - end

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

  const handleModalFail = (content: string[]) => {
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
      }
    });
  };

  const handleModalSuccess = (content: string[]) => {
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
        navigate('/login');
        setModal({...modal, show: false});
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
        console.log(res)
        if (res.data.body.result) handleModalSuccess(['임시 비밀번호 발급이', '완료되었습니다.']);
        else handleModalFail(['이름 또는 휴대폰 번호를', '다시 확인해 주세요.']);
      })
      .catch((err) => {
        console.log(err);
        handleModalFail(['이름 또는 휴대폰 번호를', '다시 확인해 주세요.']);
      })
  }

  const handleUserInfoForNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    if (name === 'userNewPassCheck') {
      if (value !== userInfoForNewPass.userNewPass) {
        if (value === '') {
          setAlertText({
            ...alertText,
            ["userNewPassCheck"]: [0, '']
          });
          inputsRef.current[4].style.borderColor = "#8f8f8f";
        }
        else {
          setAlertText({
            ...alertText,
            ["userNewPassCheck"]: [1, '비밀번호가 일치하지 않습니다.']
          });
          inputsRef.current[4].style.borderColor = "#f30909";
        }
      }
      else {
        setAlertText({
          ...alertText,
          ["userNewPassCheck"]: [0, '']
        });
        inputsRef.current[4].style.borderColor = "#8f8f8f";
      }
    }
    else {
      setAlertText({
        ...alertText,
        [name]: [0, '']
      });
      if (name === 'userID') inputsRef.current[0].style.borderColor = "#8f8f8f";
      if (name === 'userPhone') inputsRef.current[1].style.borderColor = "#8f8f8f";
      if (name === 'userCode') inputsRef.current[2].style.borderColor = "#8f8f8f";
      if (name === 'userNewPass') inputsRef.current[3].style.borderColor = "#8f8f8f";
    }
    setUserInfoForNewPass({
      ...userInfoForNewPass,
      [name]: value
    })
  }

  const handleRequestAuth = () => {
      handlePopup();
      handleCountDownPlaceHolder(10, 0);
      setSendAuthCode(true);
      
      api
          .post(`/users/auth-number?phone=${userInfoForNewPass.userPhone}`)
          .then((res) => {
              if (res.status === 200) {
                console.log(res.data.body.authNumber);
                setAuthCode(res.data.body.authNumber);
              }
          })
          .catch((err) => {
              console.log(err)
          })
  };

  const checkCondition = () => {
    const {userID, userCode, userPhone, userNewPass, userNewPassCheck} = userInfoForNewPass;
    const idReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const passReg = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).*$/;
    let refreshInfo = {...userInfoForNewPass};
    let flag = true;

    if (!idReg.test(userID) || (userID.length < 6 || userID.length > 18)) {
      refreshInfo.userID = '';
      flag = false;
    }
    if (userPhone.length !== 13) {
      refreshInfo.userPhone = '';
      flag = false;
    }
    if (userCode !== authCode) {
      refreshInfo.userCode = '';
      flag = false;
    }
    if (!passReg.test(userNewPass) || (userNewPass.length < 8 || userNewPassCheck.length >= 16)) {
      refreshInfo.userNewPass = '';
      flag = false;
    }
    if (!passReg.test(userNewPassCheck) || (userNewPassCheck.length < 8 || userNewPassCheck.length >= 16)) {
      refreshInfo.userNewPassCheck = '';
      flag = false;
    }
    if (!flag) {
      setUserInfoForNewPass({...refreshInfo})
      return false
    }
    return true
  }

  const checkInputs = () => {
    const {userID, userCode, userPhone, userNewPass, userNewPassCheck} = userInfoForNewPass;
    if ((userID || userPhone || userCode || userNewPass || userNewPassCheck) && !(userID && userPhone && userCode && userNewPass && userNewPassCheck)) {
      handleModalFail(['미입력한 항목을', '확인해주세요.']);
      return false
    }
    if ((!userID && !userPhone && !userCode && !userNewPass && !userNewPassCheck) || !checkCondition()) {
      handleModalFail(['조건을', '확인해주세요.']);
      return false
    }
    // if (!userID) {
    //   setAlertText({...alertText, userID: [1, '아이디를 입력해주세요.']})
    //   inputsRef.current[0].style.borderColor = "#f30909";
    //   return false
    // }
    // if (!userPhone || !requiredPhoneNumber) {
    //   setAlertText({...alertText, userPhone: [1, '휴대폰 번호를 입력해주세요.']})
    //   inputsRef.current[1].style.borderColor = "#f30909";
    //   return false
    // }
    // if (!userCode) {
    //   setAlertText({...alertText, userCode: [1, '인증번호를 입력해주세요.']})
    //   inputsRef.current[2].style.borderColor = "#f30909";
    //   return false
    // }
    // if (userCode !== authCode) {
    //   setAlertText({...alertText, userCode: [1, '인증번호가 일치하지않습니다.']})
    //   inputsRef.current[2].style.borderColor = "#f30909";
    //   return false
    // }
    // if (!userNewPass) {
    //   setAlertText({...alertText, userNewPass: [1, '비밀번호를 입력해주세요.']})
    //   inputsRef.current[3].style.borderColor = "#f30909";
    //   return false
    // }
    // if (!userNewPassCheck || userNewPass !== userNewPassCheck) {
    //   setAlertText({...alertText, userNewPassCheck: [1, '비밀번호가 일치하지않습니다.']})
    //   inputsRef.current[4].style.borderColor = "#f30909";
    //   return false
    // }
    return true
  }

  const requestNewPass = () => {
    if (!checkInputs()) return;
    const {userID, userCode, userPhone, userNewPass, userNewPassCheck} = userInfoForNewPass;
    // if (!userID || !userCode || userCode !== authCode || userNewPass !== userNewPassCheck) {
    //   handleModal();
    //   return
    // }

    api
      .post(`/users/new-password?userID=${userID}&userPhone=${userPhone}&userPass=${userNewPass}`, null)
      .then((res) => {
        console.log(res)
        if (res.data.result === 'true') handleModalSuccess(['새 비밀번호 설정이', '완료되었습니다.']);
        else handleModalFail(['조건을', '다시 확인해 주세요.']);
      })
      .catch((err) => {
        console.log(err);
        handleModalFail(['조건을', '다시 확인해 주세요.']);
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
          <input type="number" placeholder="숫자만 입력" name="userPhone" value={userInfoForTempPass.userPhone} onChange={handleUserInfoForTempPass} />
          <button className="InnerBtn" onClick={requestTempPass}>
            임시 비밀번호 발급
          </button>
        </div>
        <div className="NewPass">
          <p>새 비밀번호 설정</p>
          <label>아이디</label>
          <input type="text" placeholder="아이디 입력" name="userID" value={userInfoForNewPass.userID} onChange={handleUserInfoForNewPass} ref={(element) => inputsRef.current[0] = element as HTMLInputElement}/>
          {/* <InputElement type="text" placeholder="아이디 입력" name="userID" value={userInfoForNewPass.userID} onChange={handleUserInfoForNewPass} ref={(element) => inputsRef.current[0] = element as HTMLInputElement}/> */}
          {!!alertText.userID[0] && <span className="alert_text">{alertText.userID[1]}</span>}
          <label>휴대폰 번호</label>
          <div className="CodeCheck">
            <input type="text" placeholder="휴대폰 번호 입력" name="userPhone" value={userInfoForNewPass.userPhone} onChange={handlePhoneNumber} maxLength={13} ref={(element) => inputsRef.current[1] = element as HTMLInputElement}/>
            {requiredPhoneNumber ? (
              <button type="button" onClick={handleRequestAuth}>인증번호<br/>받기</button>
            ) : 
              <button type="button" className="doubleCheck">인증번호<br/>받기</button>
            }
            <ToastPopup content={"인증번호를 발송했습니다."} show={toast} />
          </div>
          <input type="number" placeholder={timePlaceHolder} name="userCode" value={userInfoForNewPass.userCode} onChange={handleUserInfoForNewPass} ref={(element) => inputsRef.current[2] = element as HTMLInputElement}/>
          {!!alertText.userPhone[0] && <span className="alert_text">{alertText.userPhone[1]}</span>}
          {!!alertText.userCode[0] && <span className="alert_text">{alertText.userCode[1]}</span>}
          {sendAuthCode && (
          <div style={{color: '#41b946'}}>
          인증번호를 발송했습니다. (유효시간 10분)
          인증번호가 오지 않으면, 입력하신 정보가 정확한
          지 확인해주세요. 이미 가입된 번호이거나 가상 휴
          대폰번호는 인증번호를 받을 수 없습니다.
          </div>)
          }
          <label>새 비밀번호 설정</label>
          <input type="password" placeholder="새 비밀번호 입력" name="userNewPass" value={userInfoForNewPass.userNewPass} onChange={handleUserInfoForNewPass} ref={(element) => inputsRef.current[3] = element as HTMLInputElement}/>
          {!!alertText.userNewPass[0] && <span className="alert_text">{alertText.userNewPass[1]}</span>}
          <label>새 비밀번호 확인</label>
          <input type="password" placeholder="새 비밀번호 확인" name="userNewPassCheck" value={userInfoForNewPass.userNewPassCheck} onChange={handleUserInfoForNewPass} ref={(element) => inputsRef.current[4] = element as HTMLInputElement}/>
          {!!alertText.userNewPassCheck[0] && <span className="alert_text">{alertText.userNewPassCheck[1]}</span>}
          <button className="InnerBtn" onClick={requestNewPass}>비밀번호 변경</button>
        </div>
        <ModalComponent />
      </div>
    </WebLayout>
  );
};

export default LostPassword;
