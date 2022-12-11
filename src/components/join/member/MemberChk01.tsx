import React from "react";
import InputElement from "../../elements/InputElement";
import {useRecoilState} from "recoil";
import {joinState} from "@states/joinState";
import useAxios from "@hooks/useAxios";

const MemberChk01 = ({nextStep}: { nextStep: Function }) => {

    const [joinParam, setJoinParam] = useRecoilState(joinState);
    const api = useAxios();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        setJoinParam({...joinParam, [name]: value});
    }

    const checkUserIdDuplication = async () => {
        await api
            .post(`/users/checkUserDup?userID=${joinParam.userID}`, null)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleFocusBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
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
        if (!password.value) {
            password.focus();
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

    return (
        <React.Fragment>
            <p className="title">회원정보 입력</p>
            <div className="MemberChk MemberChk01">
                <label>
                    <span>아이디</span>
                </label>
                <div className="CodeCheck">
                    <InputElement type="text" placeholder="아이디 확인" name="userID" id="userID" onChange={handleChange}/>
                    <button type="button" className="doubleCheck green" onClick={checkUserIdDuplication}>중복확인</button>
                </div>
                <label>
                    <span>비밀번호</span>
                </label>
                <InputElement
                    type="password"
                    placeholder="영문, 숫자, 특수문자 포함 8~16자리"
                    name="userPass"
                    id="userPass"
                />
                <label>
                    <span>비밀번호 확인</span>
                </label>
                <InputElement
                    type="passwordConfirm"
                    placeholder="비밀번호 확인"
                    id="passwordConfirm"
                />
                <label>
                    <span>이름</span>
                </label>
                <InputElement type="text" placeholder="이름확인" name="userName" id="userName"/>
                <label>
                    <span>생년월일</span>
                </label>
                <InputElement type="number" placeholder="생년월일" name="userBirth" id="userBirth"/>
                <label>
                    <span>문자 수신동의</span>
                </label>
                <div className="chk_radio">
                    <span>
                    <InputElement
                        type="radio"
                        value="동의"
                        name="userSmsAgree"
                        id="userSmsAgree"
                    />
                    <label htmlFor="userSmsAgree">동의</label>
                    </span>
                    <span>
                    <InputElement
                        type="radio"
                        value="미동의"
                        name="userSmsAgree"
                        id="userSmsDisAgree"
                    />
                    <label htmlFor="userSmsDisAgree">미동의</label>
                    </span>
                </div>
                <label>
                    <span>이메일</span>
                </label>
                <div>
                    <span className="flexInput selectBox">
                    <InputElement type="email" placeholder="이메일 확인" id=""/>@
                    <select name="userEmail">
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
                        name="userEmailAgree"
                        id="userEmailAgree"
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
