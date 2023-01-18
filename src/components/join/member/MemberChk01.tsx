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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setJoinParam({ ...joinParam, [name]: value });
    };

    const checkUserIdDuplication = async () => {
        await api
            .post(`/users/checkUserDup?userID=${joinParam.userID}`, null)
            .then((res) => {
                console.log(res);
                if (!res.data.body.userID) setIsDuplicatedUserID(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const moveScroll = (dom: HTMLLabelElement) => {
        dom!.scrollIntoView({behavior: "smooth"});
    }

    const handleFocusBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!joinParam.userID) {
            inputsRef.current[0].focus();
            moveScroll(labelsRef.current[0]);
            return false;
        }
        if (!isDuplicatedUserID){
            moveScroll(labelsRef.current[0]);
            return false;
        }
        if (!joinParam.userPass) {
            inputsRef.current[1].focus();
            moveScroll(labelsRef.current[1]);
            return false;
        }
        if (!passCheck || joinParam.userPass !== passCheck) {
            inputsRef.current[2].focus();
            moveScroll(labelsRef.current[2]);
            if (joinParam.userPass !== passCheck) {
            
            }
            return false;
        }
        if (!joinParam.userName) {
            inputsRef.current[3].focus();
            moveScroll(labelsRef.current[3]);
            return false;
        }
        if (!joinParam.userBirth) {
            inputsRef.current[4].focus();
            moveScroll(labelsRef.current[4]);
            return false;
        }
        if (!joinParam.userSmsAgree) {
            inputsRef.current[5].focus();
            moveScroll(labelsRef.current[5]);
            return false;
        }
        if (!joinParam.userEmail) {
            inputsRef.current[6].focus();
            moveScroll(labelsRef.current[6]);
            return false;
        }
        nextStep(4); // 가입완료로 넘어가기위해 변경.
    };

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
                        className="doubleCheck green"
                        onClick={checkUserIdDuplication}
                    >
                        중복확인
                    </button>
                </div>
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
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[2] = element as HTMLLabelElement)}>
                    <span>비밀번호 확인</span>
                </label>
                <InputElement
                    type="passwordConfirm"
                    placeholder="비밀번호 확인"
                    id="passwordConfirm"
                    name="passCheck"
                    value={passCheck}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassCheck(event.target.value)}
                    ref={(element: HTMLInputElement) => (inputsRef.current[2] = element as HTMLInputElement)}
                />
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
                            value="동의"
                            name="userSmsAgree"
                            id="userSmsAgree"
                            onChange={handleChange}
                            ref={(element: HTMLInputElement) => (inputsRef.current[5] = element as HTMLInputElement)}
                        />
                        <label htmlFor="userSmsAgree">동의</label>
                    </span>
                    <span>
                        <InputElement
                            type="radio"
                            value="미동의"
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
                    <span className="flexInput selectBox">
                        <InputElement type="email" placeholder="이메일 입력" id="" value={joinParam.userEmail}
                            ref={(element: HTMLInputElement) => (inputsRef.current[6] = element as HTMLInputElement)}/>@
                        <select name="userEmail">
                            <option></option>
                            <option></option>
                            <option></option>
                        </select>
                    </span>
                </div>
                <label ref={(element: HTMLLabelElement) => (labelsRef.current[7] = element as HTMLLabelElement)}>
                    <span>이메일 수신동의</span>
                </label>
                <div className="chk_radio">
                    <span>
                        <InputElement
                            type="radio"
                            value="동의"
                            name="userEmailAgree"
                            id="userEmailAgree"
                            ref={(element: HTMLInputElement) => (inputsRef.current[7] = element as HTMLInputElement)}
                        />
                        <label htmlFor="userEmailAgree">동의</label>
                    </span>
                    <span>
                        <InputElement
                            type="radio"
                            value="미동의"
                            name="userEmailAgree"
                            id="userEmailDisAgree"
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
