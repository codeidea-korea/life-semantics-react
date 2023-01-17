import React, { useEffect, useRef, useState } from "react";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
import { useRecoilState } from "recoil";
import useAxios from "@hooks/useAxios";
import { SurveyListInterface } from "@interfaces/surveyListInterface";
import InputElement from "@/components/elements/InputElement";
import { BeforeSurveyInfoInterface } from "@/interfaces/surveyInterface";

const Survey = () => {
    const [modal, setModal] = useRecoilState(modalState);
    const api = useAxios();
    const [isShow, setShow] = useState<boolean>(false);
    const [, setSurvey] = useState<SurveyListInterface[]>();
    const [popup, setPopup] = useState(true);
    const {state} = useLocation() as BeforeSurveyInfoInterface;

    const handleToolTip = () => {
        setShow(!isShow);
    };

    const navigate = useNavigate();
    const handleNavigate = (url: string) => {
        navigate(url);
    };

    const handlePopup = () => {
        setPopup(false);
    };

    const handleNotOpen = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            content: (
                <div>
                    아직 설문이
                    <br />
                    열리지 않았습니다.
                </div>
            ),
            confirmText: "확인",
        });
    };

    const getSurvey = async () => {
        await api
            .post("/surveys/list", { userNo: "1" })
            .then((res) => {
                console.log(res.data.data);
                if (res.data.result === "success") setSurvey(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log(state.isBeforeSurveyInfo);
        (async () => {
            await getSurvey();
        })();
    }, []);

    // 팝업 위한 코드
    const [isSmoke, setIsSmoke] = useState(false);
    const [beforeSmoke, setBeforeSmoke] = useState(false);
    const [isDrink, setIsDrink] = useState(false);
    const [beforeDrink, setBeforeDrink] = useState(false);

    const handleSmoke = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.value === "흡연") {
            setIsSmoke(true);
            handleSetInfo(event);
        } else {
            setIsSmoke(false);
        }
        if (target.value === "금연") {
            setBeforeSmoke(true);
            handleSetInfo(event);
        } else {
            setBeforeSmoke(false);
        }
    };

    const handleDrink = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.value === "음주") {
            setIsDrink(true);
            handleSetInfo(event);
        } else {
            setIsDrink(false);
        }
        if (target.value === "금주") {
            setBeforeDrink(true);
            handleSetInfo(event);
        } else {
            setBeforeDrink(false);
        }
    };
    //팝업 페이지 넘기기위한 코드
    const [popupStep, setPopupStep] = useState(0);
    const [endPopup, setEndPopup] = useState(false);

    const handlePopupStep = () => {
        setPopupStep(1);
    };

    const handlePopupEnd = () => {
        setEndPopup(true);
    };

    const [isCustomCancerName, setIsCustomCanerName] = useState(false);
    const handleCancerNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const target = event.target;
        const selectedOption = target.selectedOptions[0];
        if (selectedOption.textContent === "직접입력") {
            setIsCustomCanerName(true);
        } else {
            setIsCustomCanerName(false);
        }
    };

    const [beforeSurveyInfo, setBeforeSurveyInfo] = useState({
        userIsSmoke: "",
        userWasSmoke: "",
        userSmokeAmt: "",
        userSmokeStartYear: "",
        userSmokeEndYear: "",
        userIsDrink: "",
        userWasDrink: "",
        userDrinkAmt: "",
        userDrinkStartYear: "",
        userDrinkEndYear: "",
        userIsCaffeine: "",
        userDiagnosis: "",
        userDiagName: "",
        userDiagDate: "",
        userCureType: "",
        userCureName: "",
        userCureEndDate: "",
        userDiagEtc: "",
        userDiagEtcName: "",
        userNowHealStat: "",
        userGender: ""
    });
    const handleSetInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(name, value)

        if (name === "userIsSmoke") {
            if (value === "흡연") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
                    ['userWasSmoke']: '',
                });
            }
            else if (value === "금연") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
                    ['userWasSmoke']: '',
                    ['userSmokeAmt']: '',
                    ['userSmokeStartYear']: '',
                    ['userSmokeEndYear']: '',
                });
            }
        }
        else if (name === "userIsSmoke") {
            if (value === "음주") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
                    ['userWasDrink']: '',
                });
            }
            else if (value === "금주") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
                    ['userWasSmoke']: '',
                    ['userDrinkAmt']: '',
                    ['userDrinkStartYear']: '',
                    ['userDrinkEndYear']: '',
                });
            }
        }
        else {
            setBeforeSurveyInfo({
                ...beforeSurveyInfo,
                [name]: value,
            })
        }
    }
    useEffect(()=>{
        console.log(beforeSurveyInfo);
    }, [beforeSurveyInfo]);

    return (
        <React.Fragment>
            <TitleHeadComponent name="설문 작성" targetUrl="/main" />
            <div className="survey">
                <div className="surveyMain">
                    <div className="surveyName">
                        <p>굿바이 피로1기</p>
                        <div className="noticeIco on" onClick={handleToolTip}>
                            <img src="public/images/question.svg" alt="" className="" />
                            {isShow && (
                                <div className="noticeBox">
                                    <ul>
                                        <li>
                                            <span>매일 입력 설문</span>은 8주 간(56일간)매일 간단한
                                            수치를 입력하는 설문입니다.
                                        </li>
                                        <li>
                                            <span>사전/사후 설문</span>은 프로그램 시작전, 종료 후에
                                            선택형 및 서술형으로 작성하는 설문입니다.
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <ul>
                        <li className="" onClick={(event) => handleNavigate("/surveyBefore")}>
                            시작전 설문(2/3)
                        </li>
                        <li className="" onClick={(event) => handleNavigate("/surveyToday")}>
                            일일 설문
                            <br />
                            <span>(최근 5일 이내 미작성 2건)</span>
                        </li>
                        <li className="active" onClick={handleNotOpen}>
                            <Link to="">종료후 설문(0/3)</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <ModalComponent />

            {/* 팝업 추가 - 임시로 이곳에 추가해둠. */}
            {state.isBeforeSurveyInfo && (
                <div className="surveyBefore_popup" style={{ display: popup ? "blocik" : "none" }}>
                    <div className="popupTitle">
                        <h2>설문 전 작성정보</h2>
                        <button type="button" className="close" onClick={handlePopup}></button>
                    </div>
                    <div className="popupMain">
                        <div className="info">
                            앗! 잠깐만요!
                            <br />
                            설문 전, 아래의 사항들을 입력해주셔야 돼요!
                        </div>
                        {popupStep === 0 && (
                            <div className="check">
                                <p className="title">건강정보 입력</p>

                                <div className="MemberChk MemberChk01">
                                    <ul>
                                        <li>
                                            <label>
                                                <span className="title">1) 흡연</span>
                                                <span className="desc">지금도 흡연 하고 계신가요?</span>
                                            </label>
                                            <div className="chk_radio03">
                                                <span className="isCheck">
                                                    <InputElement
                                                        type="radio"
                                                        value="흡연"
                                                        name="userIsSmoke"
                                                        id="smoking"
                                                        onChange={handleSmoke}
                                                    />
                                                    <label htmlFor="smoking">네</label>
                                                </span>
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="금연"
                                                        name="userIsSmoke"
                                                        id="stopSmoking"
                                                        onChange={handleSmoke}
                                                    />
                                                    <label htmlFor="stopSmoking">아니오</label>
                                                </span>
                                            </div>
                                            <div
                                                className="input_detail"
                                                style={{ display: isSmoke ? "block" : "none" }}
                                            >
                                                <span>양</span>
                                                <span className="detail">
                                                    <InputElement type="number" id="drinking_rate" name="userSmokeAmt" value={beforeSurveyInfo.userSmokeAmt}
                                                            onChange={handleSetInfo}/>
                                                    <label>갑/일</label>
                                                </span>
                                                <span className="point">
                                                    보통의 하루 평균적인 흡연 양을 적어주세요.
                                                </span>
                                                <span className="term">
                                                    <span>기간</span>
                                                    <span className="termDate">
                                                        <InputElement
                                                            type="number"
                                                            placeholder="시작"
                                                            id="drinking_start"
                                                            name="userSmokeStartYear"
                                                            value={beforeSurveyInfo.userSmokeStartYear}
                                                            onChange={handleSetInfo}
                                                        />
                                                        <label>년</label>
                                                        <b>~</b>
                                                        <InputElement
                                                            type="number"
                                                            placeholder="마지막"
                                                            id="drinking_end"
                                                            name="userSmokeEndYear"
                                                            value={beforeSurveyInfo.userSmokeEndYear}
                                                            onChange={handleSetInfo}
                                                        />
                                                        <label>년</label>
                                                    </span>
                                                </span>
                                            </div>
                                            <div style={{ display: beforeSmoke ? "block" : "none" }}>
                                                <label>
                                                    <span className="desc">
                                                        그러면 과거에는 흡연하셨나요?
                                                    </span>
                                                </label>
                                                <div className="chk_radio03">
                                                    <span className="isCheck">
                                                        <InputElement
                                                            type="radio"
                                                            value="흡연"
                                                            name="userWasSmoke"
                                                            id="beforesmoking"
                                                            onChange={handleSetInfo}
                                                        />
                                                        <label htmlFor="beforesmoking">네</label>
                                                    </span>
                                                    <span>
                                                        <InputElement
                                                            type="radio"
                                                            value="금연"
                                                            name="userWasSmoke"
                                                            id="beforestopSmoking"
                                                            onChange={handleSetInfo}
                                                        />
                                                        <label htmlFor="beforestopSmoking">
                                                            아니오
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <label>
                                                <span className="title">2) 음주</span>
                                                <span className="desc">지금도 음주 하고 계신가요?</span>
                                            </label>
                                            <div className="chk_radio03">
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="음주"
                                                        name="check_drink"
                                                        id="drink"
                                                        onChange={handleDrink}
                                                    />
                                                    <label htmlFor="drink">네</label>
                                                </span>
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="금주"
                                                        id="stopDrink"
                                                        name="check_drink"
                                                        onChange={handleDrink}
                                                    />
                                                    <label htmlFor="stopDrink">아니오</label>
                                                </span>
                                            </div>

                                            <div
                                                className="input_detail"
                                                id="stopDrink"
                                                style={{ display: isDrink ? "block" : "none" }}
                                            >
                                                <span>종류</span>
                                                <span className="detail">
                                                    <InputElement type="number" id="drinking_rate" />
                                                    <label>병/일</label>
                                                </span>
                                                <span className="point">
                                                    보통의 하루 평균적인 음주 양을 적어주세요.
                                                </span>
                                                <span className="term">
                                                    <span>기간</span>
                                                    <span className="termDate">
                                                        <InputElement
                                                            type="number"
                                                            placeholder="시작"
                                                            id="drinking_start"
                                                        />
                                                        <label>년</label>
                                                        <b>~</b>
                                                        <InputElement
                                                            type="number"
                                                            placeholder="마지막"
                                                            id="drinking_end"
                                                        />
                                                        <label>년</label>
                                                    </span>
                                                </span>
                                            </div>
                                            <div
                                                id="stopDrink"
                                                style={{ display: beforeDrink ? "block" : "none" }}
                                            >
                                                <label>
                                                    <span className="desc">
                                                        그러면 과거에는 음주하셨나요?
                                                    </span>
                                                </label>
                                                <div className="chk_radio03">
                                                    <span className="isCheck">
                                                        <InputElement
                                                            type="radio"
                                                            value="네"
                                                            name="before_check_drink"
                                                            id="before_drink"
                                                        />
                                                        <label htmlFor="before_drink">네</label>
                                                    </span>
                                                    <span>
                                                        <InputElement
                                                            type="radio"
                                                            value="아니오"
                                                            name="before_check_drink"
                                                            id="before_no_drink"
                                                        />
                                                        <label htmlFor="before_no_drink">아니오</label>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <label>
                                                <span className="title">3) 카페인</span>
                                                <span className="desc">
                                                    요새 카페인(커피나 녹차)을 드시곤 하나요?
                                                </span>
                                            </label>
                                            <div className="chk_radio03">
                                                <span className="isCheck">
                                                    <InputElement
                                                        type="radio"
                                                        value="카페인"
                                                        name="checkCaffeine"
                                                        id="Caffeine"
                                                    />
                                                    <label htmlFor="Caffeine">네</label>
                                                </span>
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="디카페인"
                                                        name="checkCaffeine"
                                                        id="stopCaffeine"
                                                    />
                                                    <label htmlFor="stopCaffeine">아니오</label>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <button type="button" className="BtnActive" onClick={handlePopupStep}>
                                    다음
                                </button>
                            </div>
                        )}
                        {popupStep === 1 && (
                            <div className="check">
                                <p className="title">암 건강정보 입력</p>
                                <div className="MemberChk MemberChk02">
                                    <div className="">
                                        <label>
                                            <span>나이</span>
                                        </label>
                                        <span className="age">나이</span>
                                    </div>

                                    <label>
                                        <span>성별</span>
                                    </label>
                                    <div className="chk_radio02">
                                        <span className="isCheck">
                                            <InputElement
                                                type="radio"
                                                value="남"
                                                name="gender"
                                                id="man"
                                            />
                                            <label htmlFor="man">남</label>
                                        </span>
                                        <span>
                                            <InputElement
                                                type="radio"
                                                value="여"
                                                name="gender"
                                                id="woman"
                                            />
                                            <label htmlFor="woman">여</label>
                                        </span>
                                    </div>

                                    <label>
                                        <span>암 종(진단명)</span>
                                        <button type="button" className="plus"></button>
                                    </label>
                                    <div>
                                        <div className="selectBox">
                                            <select onChange={handleCancerNameChange}>
                                                <option>암 종 선택</option>
                                                <option>구체적으로 입력</option>
                                                <option>직접입력</option>
                                            </select>
                                        </div>

                                        {isCustomCancerName && (
                                            <div className="manualInput">
                                                <label>직접입력</label>
                                                <InputElement
                                                    type="text"
                                                    placeholder="직접입력"
                                                    id="custom_cancer_name"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="plusItem">
                                        <label>
                                            <span>진단시기</span>
                                        </label>
                                        <InputElement
                                            type="text"
                                            placeholder="예) 2015년 01월"
                                            id="cancer_start"
                                        />
                                        <label>
                                            <span>치료종료 시기</span>
                                        </label>
                                        <InputElement
                                            type="text"
                                            placeholder="예) 2015년 01월"
                                            id="cancer_end"
                                        />
                                        <label htmlFor="woman">여</label>
                                    </span>
                                </div>

                                <label>
                                    <span>암 종(진단명) <i className="plusBtn">+</i></span>
                                    <button type="button" className="plus"></button>
                                </label>
                                <p className="pointGreen">다른 암도 재발되었나요?<br/>그러면 해당 암 종도 추가해주세요.</p>
                                <div>
                                    <div className="selectBox">
                                        <select onChange={handleCancerNameChange}>
                                            <option>암 종 선택</option>
                                            <option>구체적으로 입력</option>
                                            <option>직접입력</option>
                                        </select>
                                    </div>

                                    <label>
                                        <span>치료유형(중복선택 가능)</span>
                                    </label>
                                    <div className="chk_list treatment-type checkContents">
                                        <ul>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    id="surgery"
                                                    className="check02"
                                                />
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
                                                <InputElement
                                                    type="checkbox"
                                                    id="etc_treatment"
                                                    className="check02"
                                                />
                                                <label htmlFor="etc_treatment">기타</label>
                                            </li>
                                        </ul>
                                        <InputElement
                                            type="text"
                                            placeholder="구체적으로 입력"
                                            id="detail_treatment"
                                        />
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
                                    <InputElement
                                        type="text"
                                        placeholder="구체적으로 입력"
                                        id="cancer_type"
                                    />
                                    <label htmlFor="cancer_type">
                                        <span>진단시기</span>
                                    </label>
                                    <InputElement
                                        type="text"
                                        placeholder="예) 2015년 01월"
                                        id="cancer_type_start"
                                    />
                                    <label htmlFor="cancer_type_start">
                                        <span>치료종료 시기</span>
                                    </label>
                                    <InputElement
                                        type="text"
                                        placeholder="예) 2015년 01월"
                                        id="cancer_type_end"
                                    />
                                    <label className="labelType" htmlFor="cancer_type_end">
                                        <span> 암 이외의 진단받고 치료 중인 질환</span>
                                        (해당질환 모두 선택)
                                    </label>
                                    <div className="chk_list disease checkContents">
                                        <ul>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value=""
                                                    className=""
                                                    id="empty"
                                                />
                                                <label htmlFor="empty">없음</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="고혈압"
                                                    id="hypertension"
                                                />
                                                <label htmlFor="hypertension">고혈압</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="당뇨병"
                                                    id="diabetic"
                                                />
                                                <label htmlFor="diabetic">당뇨병</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="뇌혈관질환"
                                                    id="cerebrovascular"
                                                />
                                                <label htmlFor="cerebrovascular">뇌혈관질환</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="호흡기질환"
                                                    id="respiratory"
                                                />
                                                <label htmlFor="respiratory">호흡기질환</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="심장질환"
                                                    id="cardiac"
                                                />
                                                <label htmlFor="cardiac">심장질환</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="우울증"
                                                    id="blues"
                                                />
                                                <label htmlFor="blues">우울증</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="관련 질환"
                                                    id="related"
                                                />
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
                                {/* 추가되는 영역 : S */}
                                <label>
                                    <span>암 종(진단명)</span>
                                </label>
                                <InputElement
                                    type="text"
                                    placeholder="구체적으로 입력"
                                    id="cancer_type"
                                />
                                <div className="plusItem">
                                    <label htmlFor="cancer_type">
                                        <span>진단시기</span>
                                    </label>
                                    <InputElement
                                        type="text"
                                        placeholder="예) 2015년 01월"
                                        id="cancer_type_start"
                                    />
                                    <label htmlFor="cancer_type_start">
                                        <span>치료종료 시기</span>
                                    </label>
                                    <InputElement
                                        type="text"
                                        placeholder="예) 2015년 01월"
                                        id="cancer_type_end"
                                    />
                                </div>
                                {/* 추가되는 영역 : E */}

                                <label>
                                    <span>치료유형(중복선택 가능)</span>
                                </label>
                                <div className="chk_list treatment-type checkContents">
                                    <ul>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                id="surgery"
                                                className="check02"
                                            />
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
                                            <InputElement
                                                type="checkbox"
                                                id="etc_treatment"
                                                className="check02"
                                            />
                                            <label htmlFor="etc_treatment">기타</label>
                                        </li>
                                    </ul>
                                    <InputElement
                                        type="text"
                                        placeholder="구체적으로 입력"
                                        id="detail_treatment"
                                    />
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
                                
                                <label className="labelType" htmlFor="cancer_type_end">
                                    <span>암 이외의 질환</span>
                                    (해당질환 모두 선택)
                                </label>
                                <div className="chk_list disease checkContents">
                                    <ul>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value=""
                                                className=""
                                                id="empty"
                                            />
                                            <label htmlFor="empty">없음</label>
                                        </li>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value="고혈압"
                                                id="hypertension"
                                            />
                                            <label htmlFor="hypertension">고혈압</label>
                                        </li>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value="당뇨병"
                                                id="diabetic"
                                            />
                                            <label htmlFor="diabetic">당뇨병</label>
                                        </li>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value="뇌혈관질환"
                                                id="cerebrovascular"
                                            />
                                            <label htmlFor="cerebrovascular">뇌혈관질환</label>
                                        </li>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value="호흡기질환"
                                                id="respiratory"
                                            />
                                            <label htmlFor="respiratory">호흡기질환</label>
                                        </li>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value="심장질환"
                                                id="cardiac"
                                            />
                                            <label htmlFor="cardiac">심장질환</label>
                                        </li>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value="우울증"
                                                id="blues"
                                            />
                                            <label htmlFor="blues">우울증</label>
                                        </li>
                                        <li>
                                            <InputElement
                                                type="checkbox"
                                                value="관련 질환"
                                                id="related"
                                            />
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
                            <button type="button" className="BtnActive" onClick={handlePopupEnd}>
                                다음
                            </button>
                            {endPopup && (
                                <>
                                    <div className="fade modal-backdrop show"></div>
                                    <div
                                        role="dialog"
                                        aria-modal="true"
                                        className="fade modal modal show"
                                        style={{ display: "block" }}
                                    >
                                        <div id="" className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <div className="modal-title h4"></div>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        aria-label="Close"
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div>
                                                        해당 정보
                                                        <br />
                                                        작성을 완료했습니다.
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>
                                                            해당 정보
                                                            <br />
                                                            작성을 완료했습니다.
                                                        </div>
                                                    </div>
                                                    <div className="flex modal-footer">
                                                        <button
                                                            type="button"
                                                            className="end_btn"
                                                        ></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Survey;
