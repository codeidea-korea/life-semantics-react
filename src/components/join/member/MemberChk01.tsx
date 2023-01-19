import React, { useRef, useState, useEffect } from "react";
import InputElement from "../../elements/InputElement";
import { useRecoilState } from "recoil";
import { joinState } from "@states/joinState";
import useAxios from "@hooks/useAxios";

const MemberChk01 = ({ nextStep }: { nextStep: Function }) => {
    const [joinParam, setJoinParam] = useRecoilState(joinState);
    const api = useAxios();
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const labelsRef = useRef<HTMLLabelElement[]>([]);
    const [isDuplicatedUserID, setIsDuplicatedUserID] = useState(false);
    const [passCheck, setPassCheck] = useState('');
    const [idCheckBorder, setIdCheckBorder] = useState(false);
    const [alertText, setAlertText] = useState({
        userID: [0, ''],
        userPass: [0, ''],
        userPassCheck: [0, ''],
        userEmail: [0, ''],
    })
    const idReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const passReg = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).*$/;
    const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        if (name === 'userID') {
            setIsDuplicatedUserID(false);
            if (value.length < 6 || value.length > 18) {
                setAlertText({...alertText, [name]: [1, '6~18자리 이내로 해주세요.']})
                inputsRef.current[0].style.borderColor = "#f30909";
            }
            else if (!idReg.test(value)) {
                setAlertText({...alertText, [name]: [1, '영문, 숫자를 최소 1자리를 포함해주세요.']})
                inputsRef.current[0].style.borderColor = "#f30909";
            }
            else {
                setAlertText({...alertText, [name]: [0, '']})
                inputsRef.current[0].style.borderColor = "";
            }
        }
        else if (name === 'userPass') {
            if (value.length < 8 || value.length >= 16) {
                setAlertText({...alertText, [name]: [1, '8~16자리 이내로 해주세요.']})
                inputsRef.current[1].style.borderColor = "#f30909";
            }
            else if (!passReg.test(value)) {
                setAlertText({...alertText, [name]: [1, '영문, 숫자, 특수문자를 최소 1자리를 포함해주세요.']})
                inputsRef.current[1].style.borderColor = "#f30909";
            }
            else {
                setAlertText({...alertText, [name]: [0, '']})
                inputsRef.current[1].style.borderColor = "";
            }
        }
        else if (name === 'userEmail') {
            if (!emailReg.test(value)) {
                setAlertText({...alertText, [name]: [1, '이메일 형식이 아닙니다.']})
                inputsRef.current[5].style.borderColor = "#f30909";
            }
            else {
                setAlertText({...alertText, [name]: [0, '']})
                inputsRef.current[5].style.borderColor = "";
            }
        }
        setJoinParam({ ...joinParam, [name]: value });
    };

    const handlePassCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (value !== joinParam.userPass) {
            setAlertText({...alertText, ["userPassCheck"]: [1, '비밀번호가 일치하지 않습니다. ']})
            inputsRef.current[2].style.borderColor = "#f30909";
        }
        else {
            setAlertText({...alertText, ["userPassCheck"]: [0, '']})
            inputsRef.current[2].style.borderColor = "";
        }
        setPassCheck(value);
    }

    const checkUserIdDuplication = async () => {
        if (!joinParam.userID) {
            setAlertText({...alertText, ["userID"]: [1, '6~18자리 이내로 해주세요.']})
            inputsRef.current[0].style.borderColor = "#f30909";
            return
        }

        await api
            .post(`/users/checkUserDup?userID=${joinParam.userID}`, null)
            .then((res) => {
                console.log(res);
                if (!res.data.body.userID) {
                    setIsDuplicatedUserID(true);
                    setIdCheckBorder(false);
                    setAlertText({...alertText, ['userID']: [2, '사용 가능한 아이디입니다.']})
                    inputsRef.current[0].style.borderColor = "";
                }
                else {
                    setIsDuplicatedUserID(false);
                    setIdCheckBorder(true);
                    setAlertText({...alertText, ['userID']: [1, '이미 사용 중인 아이디입니다.']})
                    inputsRef.current[0].style.borderColor = "#f30909";
                }

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const moveScroll = (dom: HTMLLabelElement) => {
        dom!.scrollIntoView({behavior: "smooth"});
    }

    const handleFocusBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        for (let i = 0; i < labelsRef.current.length; i++) {
            if (i === 0) {
                if (inputsRef.current[i].value === "") {
                    inputsRef.current[i].focus();
                    moveScroll(labelsRef.current[i]);
                    return
                }
                else if (!isDuplicatedUserID) {
                    setIdCheckBorder(true);
                    moveScroll(labelsRef.current[0]);
                    setAlertText({...alertText, ["userID"]: [1, '중복확인을 해주세요.']})
                    inputsRef.current[0].style.borderColor = "#f30909";
                    return
                }
            }
            else if (i === 5 && joinParam.userSmsAgree === "") {
                moveScroll(labelsRef.current[i]);
                return
            }
            else if (i === 6 && joinParam.userEmail === "") {
                inputsRef.current[i-1].focus();
                moveScroll(labelsRef.current[i]);
                return
            }
            else if (i === 7 && joinParam.userEmailAgree === "") {
                moveScroll(labelsRef.current[i]);
                return
            }
            else if (i < 5 && inputsRef.current[i].value === "") {
                inputsRef.current[i].focus();
                moveScroll(labelsRef.current[i]);
                return
            }
        }

        requestJoin();
        
    };

    const requestJoin = async () => {
        await api
            .post('/users', joinParam)
            .then((res) => {
                console.log(res);
                nextStep(4); // 가입완료로 넘어가기위해 변경.
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    useEffect(()=>{
        console.log(joinParam)
    },[joinParam])

    return (
        <React.Fragment>
            <div className="MemberChk MemberChk01">
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[0] = element as HTMLLabelElement)}>
                    <span>아이디</span>
                </label>
                <div className="CodeCheck">
                    <InputElement
                        type="text"
                        placeholder="아이디 입력"
                        name="userID"
                        id="userID"
                        value={joinParam.userID}
                        onChange={handleChange}
                        ref={(element: HTMLInputElement) => (inputsRef.current[0] = element as HTMLInputElement)}
                    />
                    <button
                        type="button"
                        className={"doubleCheck " + (idCheckBorder && "green")}
                        onClick={checkUserIdDuplication}
                    >
                        중복확인
                    </button>
                </div>
                {alertText.userID[0] === 1 ? <span className="alert_text">{alertText.userID[1]}</span> : null}
                {alertText.userID[0] === 2 ? <span className="accept_text">{alertText.userID[1]}</span> : null}
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[1] = element as HTMLLabelElement)}>
                    <span>비밀번호</span>
                </label>
                <InputElement
                    type="password"
                    placeholder="영문, 숫자, 특수문자 포함 8~16자리"
                    name="userPass"
                    id="userPass"
                    value={joinParam.userPass}
                    onChange={handleChange}
                    ref={(element: HTMLInputElement) => (inputsRef.current[1] = element as HTMLInputElement)}
                />
                {!!alertText.userPass[0] && <span className="alert_text">{alertText.userPass[1]}</span>}
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[2] = element as HTMLLabelElement)}>
                    <span>비밀번호 확인</span>
                </label>
                <InputElement
                    type="password"
                    placeholder="비밀번호 확인"
                    id="passwordConfirm"
                    name="passCheck"
                    value={passCheck}
                    onChange={handlePassCheckChange}
                    ref={(element: HTMLInputElement) => (inputsRef.current[2] = element as HTMLInputElement)}
                />
                {!!alertText.userPassCheck[0] && <span className="alert_text">{alertText.userPassCheck[1]}</span>}
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[3] = element as HTMLLabelElement)}>
                    <span>이름</span>
                </label>
                <InputElement type="text" placeholder="이름 입력" name="userName" id="userName" 
                        onChange={handleChange}ref={(element: HTMLInputElement) => (inputsRef.current[3] = element as HTMLInputElement)}/>
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[4] = element as HTMLLabelElement)}>
                    <span>생년월일</span>
                </label>
                <InputElement
                    type="number"
                    placeholder="생년월일 ex)20230101"
                    name="userBirth"
                    id="userBirth"
                    value={joinParam.userBirth}
                    onChange={handleChange}
                    ref={(element: HTMLInputElement) => (inputsRef.current[4] = element as HTMLInputElement)}
                />
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[5] = element as HTMLLabelElement)}>
                    <span>문자 수신동의</span>
                </label>
                <div className="chk_radio">
                    <span>
                        <InputElement
                            type="radio"
                            value="1"
                            name="userSmsAgree"
                            id="userSmsAgree"
                            onChange={handleChange}
                        />
                        <label htmlFor="userSmsAgree">동의</label>
                    </span>
                    <span>
                        <InputElement
                            type="radio"
                            value="0"
                            name="userSmsAgree"
                            id="userSmsDisAgree"
                            onChange={handleChange}
                        />
                        <label htmlFor="userSmsDisAgree">미동의</label>
                    </span>
                </div>
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[6] = element as HTMLLabelElement)}>
                    <span>이메일</span>
                </label>
                <div>
                    <span>
                        <InputElement 
                            type="email" 
                            placeholder="이메일 입력" 
                            id="" 
                            value={joinParam.userEmail}
                            name="userEmail"
                            onChange={handleChange}
                            ref={(element: HTMLInputElement) => (inputsRef.current[5] = element as HTMLInputElement)}/>
                    </span>
                    {!!alertText.userEmail[0] && <span className="alert_text">{alertText.userEmail[1]}</span>}
                </div>
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[7] = element as HTMLLabelElement)}>
                    <span>이메일 수신동의</span>
                </label>
                <div className="chk_radio">
                    <span>
                        <InputElement
                            type="radio"
                            value="1"
                            name="userEmailAgree"
                            id="userEmailAgree"
                            onChange={handleChange}
                        />
                        <label htmlFor="userEmailAgree">동의</label>
                    </span>
                    <span>
                        <InputElement
                            type="radio"
                            value="0"
                            name="userEmailAgree"
                            id="userEmailDisAgree"
                            onChange={handleChange}
                        />
                        <label htmlFor="userEmailDisAgree">미동의</label>
                    </span>
                </div>
            </div>
            <div className="fixBtn">
                <button type="button" className="prev">
                    이전
                </button>
                <button type="button" className="next" onClick={handleFocusBtn}>
                    다음
                </button>
            </div>
        </React.Fragment>
    );
};

export default MemberChk01;
