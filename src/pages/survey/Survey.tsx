import React, { useEffect, useRef, useState } from "react";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import useAxios from "@hooks/useAxios";
import { SurveyListInterface } from "@interfaces/surveyListInterface";
import InputElement from "@/components/elements/InputElement";
import { BeforeSurveyInfoInterface } from "@/interfaces/surveyInterface";
import { userState } from "@states/userState";
import imgQuestion from "@public/images/question.svg"

const Survey = () => {
    const [modal, setModal] = useRecoilState(modalState);
    const api = useAxios();
    const [isShow, setShow] = useState<boolean>(false);
    const [, setSurvey] = useState<SurveyListInterface[]>();
    const [popup, setPopup] = useState(true);
    const user = useRecoilValue(userState);
    const [isBeforeSurveyInfo, setIsBeforeSurveyInfo] = useState(true);

    const handleToolTip = (e: any) => {
        // setShow(!isShow);
        e.target.parentNode.classList.toggle('on')
    };

    const navigate = useNavigate();
    const handleNavigate = (e: any, url: string) => {
        if (e.target.classList.contains("active")) {
            setModal({
                ...modal,
                show: true,
                title: "",
                cancelShow: false,
                content: (
                    <div>
                        이미 참여 완료한
                        <br />
                        설문입니다.
                    </div>
                ),
                confirmText: "확인",
            });
        } else {
            navigate(url);
        }

    };

    const handlePopup = () => {
        navigate(-1);
        //setPopup(false);
    };

    const handleNotOpen = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            callBackShow: true,
            content: (
                <div>
                    아직 설문이
                    <br />
                    열리지 않았습니다.
                </div>
            ),
            confirmText: "확인",

            onConfirmCallback: () => {
                setModal({ ...modal, show: false })
                navigate(-1);
            },
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

    // useEffect(() => {
    //     user.accessToken && (
    //         api
    //         .get('/users/health-and-cancer/check', {headers: {Authorization: `Bearer ${user.accessToken}`}})
    //         .then((res) => {
    //             setIsBeforeSurveyInfo(res.data.body.isCreated)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     )
    //     if (isBeforeSurveyInfo && !user.accessToken) navigate('/login');
    // }, []);

    // 팝업 위한 코드
    const [isSmoke, setIsSmoke] = useState(false);
    const [beforeSmoke, setBeforeSmoke] = useState(false);
    const [isDrink, setIsDrink] = useState(false);
    const [beforeDrink, setBeforeDrink] = useState(false);
    const now = new Date();
    const [userAge,] = useState(Number(now.getFullYear()) - Number(user.userBirth?.substr(0, 4)) + 1);

    const handleSmoke = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.value === "1") {
            setIsSmoke(true);
            setBeforeSmoke(false);
            handleUpdateHealthInfo(event);
        } else {
        }
        if (target.value === "0") {
            setIsSmoke(false);
            setBeforeSmoke(true);
            handleUpdateHealthInfo(event);
        }
    };

    const handleDrink = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.value === "1") {
            setIsDrink(true);
            setBeforeDrink(false);
            handleUpdateHealthInfo(event);
        }
        else if (target.value === "0") {
            setIsDrink(false);
            setBeforeDrink(true);
            handleUpdateHealthInfo(event);
        }
    };
    //팝업 페이지 넘기기위한 코드
    const [popupStep, setPopupStep] = useState(0);
    const [endPopup, setEndPopup] = useState(false);
    const healthInfoRef = useRef<HTMLSpanElement[]>([]);
    const cancerInfoRef = useRef<HTMLSpanElement[]>([]);
    const beforeSurveyHeaderRef = useRef<null | HTMLDivElement>(null);
    const checkBoxRef = useRef<HTMLInputElement[]>([]);
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

    const handlePopupStep = () => {

        if (beforeSurveyInfo.userIsSmoke === "") {
            moveScroll(healthInfoRef.current[0])
            return
        }
        else if (beforeSurveyInfo.userIsSmoke === "1") {
            if (beforeSurveyInfo.userSmokeAmt === "") {
                moveScroll(healthInfoRef.current[1])
                return
            }
            else if (beforeSurveyInfo.userSmokeStartYear === "" || beforeSurveyInfo.userSmokeEndYear === "") {
                moveScroll(healthInfoRef.current[2])
                return
            }
        }
        else if (beforeSurveyInfo.userIsSmoke === "0" && beforeSurveyInfo.userWasSmoke === "") {
            moveScroll(healthInfoRef.current[3])
            return
        }

        if (beforeSurveyInfo.userIsDrink === "") {
            moveScroll(healthInfoRef.current[4])
            return
        }
        else if (beforeSurveyInfo.userIsDrink === "1") {
            if (beforeSurveyInfo.userDrinkAmt === "") {
                moveScroll(healthInfoRef.current[5])
                return
            }
            else if (beforeSurveyInfo.userDrinkStartYear === "" || beforeSurveyInfo.userDrinkEndYear === "") {
                moveScroll(healthInfoRef.current[6])
                return
            }
        }
        else if (beforeSurveyInfo.userIsDrink === "0" && beforeSurveyInfo.userWasDrink === "") {
            moveScroll(healthInfoRef.current[7])
            return
        }

        if (beforeSurveyInfo.userIsCaffeine === "") {
            moveScroll(healthInfoRef.current[8])
            return
        }

        moveScroll(beforeSurveyHeaderRef.current as HTMLDivElement);
        setPopupStep(1);
    };

    const handlePopupEnd = () => {
        if (!beforeSurveyInfo.userGender) {
            moveScroll(cancerInfoRef.current[0])
            return
        }
        for (let i = 0; i < diagCancerList.userDiagnosis.length; i++) {
            if (diagCancerList.userDiagnosis[i] !== 'etc' && !diagCancerList.userDiagnosis[i]) {
                moveScroll(cancerInfoRef.current[i + 1])
                return
            }
            if (diagCancerList.userDiagnosis[i] === 'etc' && !diagCancerList.userDiagName[i]) {
                moveScroll(cancerInfoRef.current[i + 1])
                return
            }
            if (!diagCancerList.userDiagDate[i] || !diagCancerList.userCureEndDate[i]) {
                moveScroll(cancerInfoRef.current[i + 1])
                return
            }
        }
        if (!beforeSurveyInfo.userCureType) {
            moveScroll(cancerInfoRef.current[diagCancerList.userDiagnosis.length + 1])
            return
        }
        if (!beforeSurveyInfo.userNowHealStat) {
            moveScroll(cancerInfoRef.current[diagCancerList.userDiagnosis.length + 2])
            return
        }
        if (!beforeSurveyInfo.userDiagEtc) {
            moveScroll(cancerInfoRef.current[diagCancerList.userDiagnosis.length + 3])
            return
        }

        requestRegBeforeSurveyInfo();
    };

    const requestRegBeforeSurveyInfo = () => {
        // const newUserDiagDate = beforeSurveyInfo.userDiagDate.slice(0, 4) + '-' + beforeSurveyInfo.userDiagDate.slice(6, 8);
        // const newUserCureEndDate = beforeSurveyInfo.userCureEndDate.slice(0, 4) + '-' + beforeSurveyInfo.userCureEndDate.slice(6, 8);

        let newUserDiagDate = diagCancerList.userDiagDate.map(elem => elem.slice(0, 4) + '-' + elem.slice(6, 8));
        let newUserCureEndDate = diagCancerList.userCureEndDate.map(elem => elem.slice(0, 4) + '-' + elem.slice(6, 8));
        let newUserDiagName = diagCancerList.userDiagName.filter(elem => elem !== '');

        let requestBody = {
            ...beforeSurveyInfo,
            ['userSmokeAmt']: Number(['userSmokeAmt']) || 0,
            ['userSmokeStartYear']: Number(['userSmokeAmt']) || 0,
            ['userSmokeEndYear']: Number(['userSmokeAmt']) || 0,
            ['userDrinkAmt']: Number(['userSmokeAmt']) || 0,
            ['userDrinkStartYear']: Number(['userSmokeAmt']) || 0,
            ['userDrinkEndYear']: Number(['userSmokeAmt']) || 0,
            ['userDiagDate']: newUserDiagDate.join(','),
            ['userCureEndDate']: newUserCureEndDate.join(','),
            ['userDiagName']: newUserDiagName.join(',')
        };

        api
            .post('/users/health-and-cancer', requestBody, { headers: { Authorization: `Bearer ${user.accessToken}` } })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setEndPopup(true);
                    setTimeout(() => {
                        setEndPopup(false);
                        setIsBeforeSurveyInfo(true);
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const [isCustomCancerName, setIsCustomCanerName] = useState([false]);
    const handleCancerNameChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const target = event.target;
        const selectedOption = target.selectedOptions[0];
        if (selectedOption.textContent === "직접입력") {
            let newIsCustomCancerName = [...isCustomCancerName];
            newIsCustomCancerName[index] = true;
            setIsCustomCanerName(newIsCustomCancerName);
        } else {
            let newIsCustomCancerName = [...isCustomCancerName];
            newIsCustomCancerName[index] = false;
            let newDiagCancerList = { ...diagCancerList };
            newDiagCancerList.userDiagName[index] = '';
            setIsCustomCanerName(newIsCustomCancerName);
            setDiagCancerList(newDiagCancerList)
        }

        let newDiagCancerList = { ...diagCancerList };
        newDiagCancerList.userDiagnosis[index] = target.value;
        setDiagCancerList(newDiagCancerList);

        setBeforeSurveyInfo({
            ...beforeSurveyInfo,
            [target.name]: newDiagCancerList.userDiagnosis.join(','),
        })
    };

    const handleUpdateHealthInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "userIsSmoke") {
            if (value === "1") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
                });
            }
            else if (value === "0") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
                    ['userSmokeAmt']: '',
                    ['userSmokeStartYear']: '',
                    ['userSmokeEndYear']: '',
                });
            }
        }
        else if (name === "userIsDrink") {
            if (value === "1") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
                });
            }
            else if (value === "0") {
                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    [name]: value,
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

    useEffect(() => {
        console.log(beforeSurveyInfo);
        const now = new Date();
        const age = Number(now.getFullYear()) - Number(user.userBirth?.substr(0, 4)) + 1
    }, [beforeSurveyInfo]);

    const moveScroll = (dom: HTMLSpanElement) => {
        dom.scrollIntoView({ behavior: "smooth" });
    }

    const handleUpdateCancerInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'userCureType') {
            let cureTypeList: string[] = [];

            if (beforeSurveyInfo.userCureType.length) {
                cureTypeList = beforeSurveyInfo.userCureType.split(',');
                const idx = cureTypeList.indexOf(value);
                if (idx !== -1) {
                    cureTypeList.splice(idx, 1);
                }
                else cureTypeList.push(value);
            }
            else {
                cureTypeList = beforeSurveyInfo.userCureType.split('');
                cureTypeList.push(value);
            }

            setBeforeSurveyInfo({
                ...beforeSurveyInfo,
                ['userCureType']: cureTypeList.join(','),
            })
        }
        else if (name === 'userDiagEtc') {
            if (value !== "1") {
                checkBoxRef.current[0].checked = false;
                let diagEtcList: string[] = [];

                if (beforeSurveyInfo.userDiagEtc.length) {
                    diagEtcList = beforeSurveyInfo.userDiagEtc.split(',');
                    const idx = diagEtcList.indexOf(value);
                    if (idx !== -1) {
                        diagEtcList.splice(idx, 1);
                    }
                    else diagEtcList.push(value);
                }
                else {
                    diagEtcList = beforeSurveyInfo.userDiagEtc.split('');
                    diagEtcList.push(value);
                }

                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    ['userDiagEtc']: diagEtcList.join(','),
                })
            }
            else {
                checkBoxRef.current.forEach((elem, idx) => {
                    if (idx && elem.checked && checkBoxRef.current[0].checked) elem.checked = false;
                })

                setBeforeSurveyInfo({
                    ...beforeSurveyInfo,
                    ['userDiagEtc']: '1',
                    ['userDiagEtcName']: '',
                })
            }
        }
        else {
            setBeforeSurveyInfo({
                ...beforeSurveyInfo,
                [name]: value,
            })
        }
    }

    const requestIsBeforeSurvey = async () => {
        try {
            const response = await api.get('/users/health-and-cancer/check', { headers: { Authorization: `Bearer ${user.accessToken}` } });
            setIsBeforeSurveyInfo(response.data.body.isCreated);
            return response.data.body.isCreated;
        } catch (err) {
            console.log(err);
        }
    }

    const [resData, setResData] = useState([]);
    const [notData, setNotData] = useState<number[]>([]);
    useEffect(() => {
        if (!user.accessToken) navigate('/login');

        requestIsBeforeSurvey().then((isBeforeSurvey) => {
            fetch(`https://api.life.codeidea.io/usr/programs/myList?paUserNo=${user.userNo}`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.body.length === 0) handleNotOpen();
                    else if (data.result === 'true') {
                        setResData(data.body);
                        data.body.forEach((item: any, idx: number) => {
                            fetch(
                                `https://api.life.codeidea.io/usr/surveys/not-created-ing?pgNo=${item.pgNo}`,
                                {
                                    method: 'GET',
                                    headers: {
                                        Authorization: 'Bearer ' + user.accessToken,
                                        'Content-Type': 'application/json'
                                    },
                                }
                            )
                                .then((response) => response.json())
                                .then((data) => {
                                    document.querySelectorAll('.recent_not_survey')[idx].textContent = `최근 5일 이내 미작성 ${data}건`;
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log(notData);
        });

    }, []);
    function getDayDifference(dateString: string) {
        const today = new Date();
        const targetDate = new Date(dateString);
        const timeDiff = Math.abs(targetDate.getTime() - today.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dayDiff;
    }

    const [diagCancerList, setDiagCancerList] = useState({
        userDiagnosis: [''],
        userDiagDate: [''],
        userCureEndDate: [''],
        userDiagName: [''],
    });

    const addDiag = () => {
        let tmp = { ...diagCancerList };
        tmp.userDiagnosis.push('');
        tmp.userDiagDate.push('');
        tmp.userCureEndDate.push('');
        setDiagCancerList(tmp);
    }

    const handleCancerDate = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        let newDiagCancerList = { ...diagCancerList };
        let newValue = '';

        if (name === 'userDiagDate') {
            newDiagCancerList.userDiagDate[index] = value;
            newValue = newDiagCancerList.userDiagDate.join(',');
        }
        else {
            newDiagCancerList.userCureEndDate[index] = value;
            newValue = newDiagCancerList.userCureEndDate.join(',');
        }
        setDiagCancerList(newDiagCancerList);
        setBeforeSurveyInfo({
            ...beforeSurveyInfo,
            [name]: newValue
        })
    }

    const handleDiagName = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        let newDiagCancerList = { ...diagCancerList };
        newDiagCancerList.userDiagName[index] = value;
        const newValue = newDiagCancerList.userDiagName.join(',');

        setDiagCancerList(newDiagCancerList);
        setBeforeSurveyInfo({
            ...beforeSurveyInfo,
            [name]: newValue
        })
    }

    return (
        <React.Fragment>
            <TitleHeadComponent name="설문 작성" targetUrl="/main" />
            <div className="survey">
                <div className="surveyMain">
                    {
                        resData.map((item: any, index: number) =>
                            <div key={index}>
                                <div className="surveyName">
                                    <p>{item.pgTitle}</p>
                                    <div className="noticeIco" onClick={handleToolTip}>
                                        <img src="/images/question.svg" alt="" className="" />
                                        {/* {isShow && ( */}
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
                                        {/* )} */}
                                    </div>
                                </div>
                                <ul>
                                    <li className={item.surveys.pre.length == 3 ? "active" : ""} onClick={(event) => handleNavigate(event, `/surveyBefore?pgNo=${item.pgNo}&type=${item.pgType}&type2=pre&title=${item.pgTitle}`)}>
                                        시작전 설문({item.surveys.pre.length}/3)
                                    </li>
                                    <li className="" onClick={(event) => handleNavigate(event, `/surveyToday?pgNo=${item.pgNo}`)}>
                                        일일 설문
                                        <br />
                                        <span className="recent_not_survey"></span>
                                    </li>
                                    <li className={item.surveys.end.length == 3 ? "active" : ""} onClick={(event) => handleNavigate(event, `/surveyAfter?pgNo=${item.pgNo}&type=${item.pgType}&type2=end&title=${item.pgTitle}`)}>
                                        <Link to="">종료후 설문({item.surveys.end.length}/3)</Link>
                                    </li>
                                </ul>
                            </div>

                        )

                    }
                </div>
            </div>
            <ModalComponent />

            {/* 팝업 추가 - 임시로 이곳에 추가해둠. */}
            {isBeforeSurveyInfo || (
                <div className="surveyBefore_popup" style={{ display: popup ? "block" : "none" }}>
                    <div className="popupTitle" ref={beforeSurveyHeaderRef}>
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
                                                <span className="title" ref={(element) => (healthInfoRef.current[0] = element as HTMLSpanElement)}>1) 흡연</span>
                                                <span className="desc">지금도 흡연 하고 계신가요?</span>
                                            </label>
                                            <div className="chk_radio03">
                                                <span className="isCheck">
                                                    <InputElement
                                                        type="radio"
                                                        value="1"
                                                        name="userIsSmoke"
                                                        id="smoking"
                                                        onChange={handleSmoke}
                                                    />
                                                    <label htmlFor="smoking">네</label>
                                                </span>
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="0"
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
                                                <span ref={(element) => (healthInfoRef.current[1] = element as HTMLSpanElement)}>양</span>
                                                <span className="detail">
                                                    <InputElement type="number" id="drinking_rate" name="userSmokeAmt" value={beforeSurveyInfo.userSmokeAmt}
                                                        onChange={handleUpdateHealthInfo} />
                                                    <label>갑/일</label>
                                                </span>
                                                <span className="point">
                                                    보통의 하루 평균적인 흡연 양을 적어주세요.
                                                </span>
                                                <span className="term">
                                                    <span ref={(element) => (healthInfoRef.current[2] = element as HTMLSpanElement)}>기간</span>
                                                    <span className="termDate">
                                                        <InputElement
                                                            type="number"
                                                            placeholder="시작"
                                                            id="drinking_start"
                                                            name="userSmokeStartYear"
                                                            value={beforeSurveyInfo.userSmokeStartYear}
                                                            onChange={handleUpdateHealthInfo}
                                                            maxLength={4}
                                                        />
                                                        <label>년</label>
                                                        <b>~</b>
                                                        <InputElement
                                                            type="number"
                                                            placeholder="마지막"
                                                            id="drinking_end"
                                                            name="userSmokeEndYear"
                                                            value={beforeSurveyInfo.userSmokeEndYear}
                                                            onChange={handleUpdateHealthInfo}
                                                        />
                                                        <label>년</label>
                                                    </span>
                                                </span>
                                            </div>
                                            <div style={{ display: beforeSmoke ? "block" : "none" }}>
                                                <label>
                                                    <span className="desc" ref={(element) => (healthInfoRef.current[3] = element as HTMLSpanElement)}>
                                                        그러면 과거에는 흡연하셨나요?
                                                    </span>
                                                </label>
                                                <div className="chk_radio03">
                                                    <span className="isCheck">
                                                        <InputElement
                                                            type="radio"
                                                            value="1"
                                                            name="userWasSmoke"
                                                            id="beforesmoking"
                                                            onChange={handleUpdateHealthInfo}
                                                        />
                                                        <label htmlFor="beforesmoking">네</label>
                                                    </span>
                                                    <span>
                                                        <InputElement
                                                            type="radio"
                                                            value="0"
                                                            name="userWasSmoke"
                                                            id="beforestopSmoking"
                                                            onChange={handleUpdateHealthInfo}
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
                                                <span className="title" ref={(element) => (healthInfoRef.current[4] = element as HTMLSpanElement)}>2) 음주</span>
                                                <span className="desc">지금도 음주 하고 계신가요?</span>
                                            </label>
                                            <div className="chk_radio03">
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="1"
                                                        name="userIsDrink"
                                                        id="drink"
                                                        onChange={handleDrink}
                                                    />
                                                    <label htmlFor="drink">네</label>
                                                </span>
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="0"
                                                        id="stopDrink"
                                                        name="userIsDrink"
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
                                                <span ref={(element) => (healthInfoRef.current[5] = element as HTMLSpanElement)}>종류</span>
                                                <span className="detail">
                                                    <InputElement type="number" id="drinking_rate" name="userDrinkAmt" value={beforeSurveyInfo.userDrinkAmt}
                                                        onChange={handleUpdateHealthInfo} />
                                                    <label>병/일</label>
                                                </span>
                                                <span className="point">
                                                    보통의 하루 평균적인 음주 양을 적어주세요.
                                                </span>
                                                <span className="term">
                                                    <span ref={(element) => (healthInfoRef.current[6] = element as HTMLSpanElement)}>기간</span>
                                                    <span className="termDate">
                                                        <InputElement
                                                            type="number"
                                                            placeholder="시작"
                                                            id="drinking_start"
                                                            name="userDrinkStartYear"
                                                            value={beforeSurveyInfo.userDrinkStartYear}
                                                            onChange={handleUpdateHealthInfo}
                                                        />
                                                        <label>년</label>
                                                        <b>~</b>
                                                        <InputElement
                                                            type="number"
                                                            placeholder="마지막"
                                                            id="drinking_end"
                                                            name="userDrinkEndYear"
                                                            value={beforeSurveyInfo.userDrinkEndYear}
                                                            onChange={handleUpdateHealthInfo}
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
                                                    <span className="desc" ref={(element) => (healthInfoRef.current[7] = element as HTMLSpanElement)}>
                                                        그러면 과거에는 음주하셨나요?
                                                    </span>
                                                </label>
                                                <div className="chk_radio03">
                                                    <span className="isCheck">
                                                        <InputElement
                                                            type="radio"
                                                            value="1"
                                                            name="userWasDrink"
                                                            id="before_drink"
                                                            onChange={handleUpdateHealthInfo}
                                                        />
                                                        <label htmlFor="before_drink">네</label>
                                                    </span>
                                                    <span>
                                                        <InputElement
                                                            type="radio"
                                                            value="0"
                                                            name="userWasDrink"
                                                            id="before_no_drink"
                                                            onChange={handleUpdateHealthInfo}
                                                        />
                                                        <label htmlFor="before_no_drink">아니오</label>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <label>
                                                <span className="title" ref={(element) => (healthInfoRef.current[8] = element as HTMLSpanElement)}>3) 카페인</span>
                                                <span className="desc">
                                                    요새 카페인(커피나 녹차)을 드시곤 하나요?
                                                </span>
                                            </label>
                                            <div className="chk_radio03">
                                                <span className="isCheck">
                                                    <InputElement
                                                        type="radio"
                                                        value="1"
                                                        name="userIsCaffeine"
                                                        id="Caffeine"
                                                        onChange={handleUpdateHealthInfo}
                                                    />
                                                    <label htmlFor="Caffeine">네</label>
                                                </span>
                                                <span>
                                                    <InputElement
                                                        type="radio"
                                                        value="0"
                                                        name="userIsCaffeine"
                                                        id="stopCaffeine"
                                                        onChange={handleUpdateHealthInfo}
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
                                        <span className="age">{userAge}</span>
                                    </div>

                                    <label>
                                        <span ref={(element) => (cancerInfoRef.current[0] = element as HTMLSpanElement)}>성별</span>
                                    </label>
                                    <div className="chk_radio02">
                                        <span className="isCheck">
                                            <InputElement
                                                type="radio"
                                                value="m"
                                                name="userGender"
                                                id="man"
                                                onChange={handleUpdateCancerInfo}
                                            />
                                            <label htmlFor="man">남</label>
                                        </span>
                                        <span>
                                            <InputElement
                                                type="radio"
                                                value="f"
                                                name="userGender"
                                                id="woman"
                                                onChange={handleUpdateCancerInfo}
                                            />
                                            <label htmlFor="woman">여</label>
                                        </span>
                                    </div>
                                    {/* 원본 시작 
                                    <label>
                                        <span ref={(element) => (cancerInfoRef.current[1] = element as HTMLSpanElement)}>암 종(진단명) <i className="plusBtn" onClick={addDiag}>+</i></span>
                                        <button type="button" className="plus"></button>
                                    </label>
                                    <p className="pointGreen">다른 암도 재발되었나요?<br />그러면 해당 암 종도 추가해주세요.</p>
                                    <div>
                                        <div className="selectBox">
                                            <select name="userDiagnosis" value={beforeSurveyInfo.userDiagnosis} onChange={handleCancerNameChange}>
                                                <option value="">암 종 선택</option>
                                                <option value="1">간암</option>
                                                <option value="2">갑상선암</option>
                                                <option value="3">담낭암</option>
                                                <option value="4">담도암</option>
                                                <option value="5">대장암</option>
                                                <option value="6">신장암</option>
                                                <option value="7">위암</option>
                                                <option value="8">유방암</option>
                                                <option value="9">전립선암</option>
                                                <option value="10">췌장암</option>
                                                <option value="11">폐암</option>
                                                <option value="etc">직접입력</option>
                                            </select>
                                        </div>
                                        {isCustomCancerName && (
                                            <div className="manualInput">
                                                <label>직접입력</label>
                                                <InputElement
                                                    type="text"
                                                    placeholder="직접입력"
                                                    id="custom_cancer_name"
                                                    value={beforeSurveyInfo.userDiagName}
                                                    name="userDiagName"
                                                    onChange={handleUpdateCancerInfo}
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
                                            name="userDiagDate"
                                            value=""
                                            onChange={handleUpdateCancerInfo}
                                        />
                                        <label>
                                            <span>치료종료 시기</span>
                                        </label>
                                        <InputElement
                                            type="text"
                                            placeholder="예) 2015년 01월"
                                            id="cancer_end"
                                            name="userCureEndDate"
                                            value=""
                                            onChange={handleUpdateCancerInfo}
                                        />
                                    </div>
                                    원본 끝 */}
                                    {/* 추가되는 영역 : S */}
                                    {
                                        diagCancerList.userDiagnosis.map((elem, idx) => (
                                            <React.Fragment key={idx}>
                                                <label>
                                                    <span ref={(element) => (cancerInfoRef.current[idx + 1] = element as HTMLSpanElement)}>
                                                        암 종(진단명)
                                                        {idx === 0 && <i className="plusBtn" onClick={addDiag}>+</i>}
                                                    </span>
                                                </label>
                                                <select name="userDiagnosis" onChange={(event) => handleCancerNameChange(event, idx)}>
                                                    <option value="">암 종 선택</option>
                                                    <option value="1">간암</option>
                                                    <option value="2">갑상선암</option>
                                                    <option value="3">담낭암</option>
                                                    <option value="4">담도암</option>
                                                    <option value="5">대장암</option>
                                                    <option value="6">신장암</option>
                                                    <option value="7">위암</option>
                                                    <option value="8">유방암</option>
                                                    <option value="9">전립선암</option>
                                                    <option value="10">췌장암</option>
                                                    <option value="11">폐암</option>
                                                    <option value="etc">직접입력</option>
                                                </select>
                                                {isCustomCancerName[idx] && (
                                                    <div className="manualInput">
                                                        <label>직접입력</label>
                                                        <InputElement
                                                            type="text"
                                                            placeholder="직접입력"
                                                            id="custom_cancer_name"
                                                            value={diagCancerList.userDiagName[idx]}
                                                            name="userDiagName"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDiagName(event, idx)}
                                                        />
                                                    </div>
                                                )}
                                                <div className="plusItem">
                                                    <label>
                                                        <span>진단시기</span>
                                                    </label>
                                                    <InputElement
                                                        type="text"
                                                        placeholder="예) 2015년 01월"
                                                        id="cancer_start"
                                                        name="userDiagDate"
                                                        value=""
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCancerDate(event, idx)}
                                                    />
                                                    <label>
                                                        <span>치료종료 시기</span>
                                                    </label>
                                                    <InputElement
                                                        type="text"
                                                        placeholder="예) 2015년 01월"
                                                        id="cancer_end"
                                                        name="userCureEndDate"
                                                        value=""
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCancerDate(event, idx)}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                    {/* 추가되는 영역 : E */}

                                    <label>
                                        <span ref={(element) => (cancerInfoRef.current[diagCancerList.userDiagnosis.length + 1] = element as HTMLSpanElement)}>치료유형(중복선택 가능)</span>
                                    </label>
                                    <div className="chk_list treatment-type checkContents">
                                        <ul>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    id="surgery"
                                                    className="check02"
                                                    name="userCureType"
                                                    value="1"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="surgery">수술</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    id="cancer_treatment"
                                                    className="check02"
                                                    name="userCureType"
                                                    value="2"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="cancer_treatment">항암치료</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    id="radiation_treatment"
                                                    className="check02"
                                                    name="userCureType"
                                                    value="3"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="radiation_treatment">방사선치료</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    id="hormone_treatment"
                                                    className="check02"
                                                    name="userCureType"
                                                    value="4"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="hormone_treatment">호르몬치료</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    id="etc_treatment"
                                                    className="check02"
                                                    name="userCureType"
                                                    value="etc"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="etc_treatment">기타</label>
                                            </li>
                                        </ul>
                                        {/* <InputElement
                                            type="text"
                                            placeholder="구체적으로 입력"
                                            id="detail_treatment"
                                        /> */}
                                    </div>
                                    <label>
                                        <span ref={(element) => (cancerInfoRef.current[diagCancerList.userDiagnosis.length + 2] = element as HTMLSpanElement)}>현재 건강상태</span>
                                    </label>
                                    <div className="radioCheck checkContents">
                                        <ul>
                                            <li>
                                                <InputElement
                                                    type="radio"
                                                    value="1"
                                                    name="userNowHealStat"
                                                    id="radio01"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="radio01">매우 건강하지 않다.</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="radio"
                                                    value="2"
                                                    name="userNowHealStat"
                                                    id="radio02"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="radio02">건강하지 않다.</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="radio"
                                                    value="3"
                                                    name="userNowHealStat"
                                                    id="radio03"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="radio03">건강하다.</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="radio"
                                                    value="4"
                                                    name="userNowHealStat"
                                                    id="radio04"
                                                    onChange={handleUpdateCancerInfo}
                                                />
                                                <label htmlFor="radio04">매우 건강하다.</label>
                                            </li>
                                        </ul>
                                    </div>

                                    <label className="labelType" htmlFor="cancer_type_end">
                                        <span ref={(element) => (cancerInfoRef.current[diagCancerList.userDiagnosis.length + 3] = element as HTMLSpanElement)}>암 이외의 질환</span>
                                        (해당질환 모두 선택)
                                    </label>
                                    <div className="chk_list disease checkContents">
                                        <ul>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="1"
                                                    className=""
                                                    id="empty"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[0] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="empty">없음</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="2"
                                                    id="hypertension"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[1] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="hypertension">고혈압</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="3"
                                                    id="diabetic"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[2] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="diabetic">당뇨병</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="4"
                                                    id="cerebrovascular"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[3] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="cerebrovascular">뇌혈관질환</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="5"
                                                    id="respiratory"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[4] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="respiratory">호흡기질환</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="6"
                                                    id="cardiac"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[5] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="cardiac">심장질환</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="7"
                                                    id="blues"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[6] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="blues">우울증</label>
                                            </li>
                                            <li>
                                                <InputElement
                                                    type="checkbox"
                                                    value="8"
                                                    id="related"
                                                    name="userDiagEtc"
                                                    onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[7] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="related">관련 질환</label>
                                            </li>
                                            <li>
                                                <InputElement type="checkbox" value="etc" id="etc" name="userDiagEtc" onChange={handleUpdateCancerInfo}
                                                    ref={(element) => checkBoxRef.current[8] = element as HTMLInputElement}
                                                />
                                                <label htmlFor="etc">직접 입력</label>
                                            </li>
                                        </ul>
                                        <InputElement type="text" placeholder="직접 암 이외의 질환(진단명) 입력" name="userDiagEtcName" value={beforeSurveyInfo.userDiagEtcName} ref={(element) => checkBoxRef.current[9] = element as HTMLInputElement} onChange={handleUpdateCancerInfo} />
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
