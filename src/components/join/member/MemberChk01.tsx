import React from "react";
import InputElement from "../../elements/InputElement";
import { useRecoilState } from "recoil";
import { joinState } from "@states/joinState";
import useAxios from "@hooks/useAxios";

const MemberChk01 = ({ nextStep }: { nextStep: Function }) => {
    const [joinParam, setJoinParam] = useRecoilState(joinState);
    const api = useAxios();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setJoinParam({ ...joinParam, [name]: value });
    };

    const checkUserIdDuplication = async () => {
        await api
            .post(`/users/checkUserDup?userID=${joinParam.userID}`, null)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleFocusBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const password_check = document.getElementById("password_check") as HTMLInputElement;
        const name_check = document.getElementById("name_check") as HTMLInputElement;
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
        nextStep(4); // 가입완료로 넘어가기위해 변경.
    };

    return (
        <React.Fragment>
            <div className="MemberChk MemberChk01">
                <label>
                    <span>아이디</span>
                </label>
                <div className="CodeCheck">
                    <InputElement
                        type="text"
                        placeholder="아이디 확인"
                        name="userID"
                        id="userID"
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="doubleCheck green"
                        onClick={checkUserIdDuplication}
                    >
                        중복확인
                    </button>
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
                <InputElement type="text" placeholder="이름확인" name="userName" id="userName" />
                <label>
                    <span>생년월일</span>
                </label>
                <InputElement
                    type="number"
                    placeholder="생년월일"
                    name="userBirth"
                    id="userBirth"
                />
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
                        <InputElement type="email" placeholder="이메일 확인" id="" />@
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
                {/* MemberChk02.tsx 에서 가져옴 */}
                <div className="input_detail" style={{ display: "block" }}>
                    <span>양</span>
                    <span>
                        <InputElement type="number" id="smoking_rate" />
                        <label>갑/일</label>
                    </span>
                    <span className="term">
                        <span>기간</span>
                        <InputElement type="number" placeholder="시작" id="smoking_start" />
                        <label>년</label>
                        <b>~</b>
                        <InputElement type="number" placeholder="마지막" id="smoking_end" />
                        <label>년</label>
                    </span>
                </div>
                <div className="input_detail" style={{ display: "block" }}>
                    <span>종류</span>
                    <span>
                        <InputElement type="number" id="drinking_rate" />
                        <label>병/일</label>
                    </span>
                    <span className="term">
                        <span>기간</span>
                        <InputElement type="number" placeholder="시작" id="drinking_start" />
                        <label>년</label>
                        <b>~</b>
                        <InputElement type="number" placeholder="마지막" id="drinking_end" />
                        <label>년</label>
                    </span>
                </div>
                {/* MemberChk03.tsx 에서 가져옴 */}
                <label>
                    <span>치료유형(중복선택 가능)</span>
                </label>
                <div className="chk_list treatment-type checkContents">
                    <ul>
                        <li>
                            <InputElement type="checkbox" id="surgery" className="check02" />
                            <label htmlFor="surgery">수술</label>
                        </li>
                        <li>
                            <InputElement
                                type="checkbox"
                                id="cancer_treatment"
                                className="check02"
                            />
                            <label htmlFor="cancer_treatment">항암치료</label>
                        </li>
                        <li>
                            <InputElement
                                type="checkbox"
                                id="radiation_treatment"
                                className="check02"
                            />
                            <label htmlFor="radiation_treatment">방사선치료</label>
                        </li>
                        <li>
                            <InputElement
                                type="checkbox"
                                id="hormone_treatment"
                                className="check02"
                            />
                            <label htmlFor="hormone_treatment">호르몬치료</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" id="etc_treatment" className="check02" />
                            <label htmlFor="etc_treatment">기타</label>
                        </li>
                    </ul>
                    <InputElement type="text" placeholder="구체적으로 입력" id="detail_treatment" />
                </div>
                <label>
                    <span>현재 건강상태</span>
                </label>
                <div className="radioCheck checkContents">
                    <ul>
                        <li>
                            <InputElement
                                type="radio"
                                value="매우 건강하지 않다."
                                name="chk_info"
                                id="radio01"
                            />
                            <label htmlFor="radio01">매우 건강하지 않다.</label>
                        </li>
                        <li>
                            <InputElement
                                type="radio"
                                value="건강하지 않다."
                                name="chk_info"
                                id="radio02"
                            />
                            <label htmlFor="radio02">건강하지 않다.</label>
                        </li>
                        <li>
                            <InputElement
                                type="radio"
                                value="건강하다."
                                name="chk_info"
                                id="radio03"
                            />
                            <label htmlFor="radio03">건강하다.</label>
                        </li>
                        <li>
                            <InputElement
                                type="radio"
                                value="매우 건강하다."
                                name="chk_info"
                                id="radio04"
                            />
                            <label htmlFor="radio04">매우 건강하다.</label>
                        </li>
                    </ul>
                </div>
                <label>
                    <span>암 종(진단명)</span>
                </label>
                <InputElement type="text" placeholder="구체적으로 입력" id="cancer_type" />
                <label htmlFor="cancer_type">
                    <span>진단시기</span>
                </label>
                <InputElement type="text" placeholder="예) 2015년 01월" id="cancer_type_start" />
                <label htmlFor="cancer_type_start">
                    <span>치료종료 시기</span>
                </label>
                <InputElement type="text" placeholder="예) 2015년 01월" id="cancer_type_end" />
                <label className="labelType" htmlFor="cancer_type_end">
                    <span> 암 이외의 진단받고 치료 중인 질환</span>
                    (해당질환 모두 선택)
                </label>
                <div className="chk_list disease checkContents">
                    <ul>
                        <li>
                            <InputElement type="checkbox" value="" className="" id="empty" />
                            <label htmlFor="empty">없음</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="고혈압" id="hypertension" />
                            <label htmlFor="hypertension">고혈압</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="당뇨병" id="diabetic" />
                            <label htmlFor="diabetic">당뇨병</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="뇌혈관질환" id="cerebrovascular" />
                            <label htmlFor="cerebrovascular">뇌혈관질환</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="호흡기질환" id="respiratory" />
                            <label htmlFor="respiratory">호흡기질환</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="심장질환" id="cardiac" />
                            <label htmlFor="cardiac">심장질환</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="우울증" id="blues" />
                            <label htmlFor="blues">우울증</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="관련 질환" id="related" />
                            <label htmlFor="related">관련 질환</label>
                        </li>
                        <li>
                            <InputElement type="checkbox" value="기타" id="etc" />
                            <label htmlFor="etc">기타</label>
                        </li>
                    </ul>
                    <InputElement type="text" placeholder="직접 작성" />
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
