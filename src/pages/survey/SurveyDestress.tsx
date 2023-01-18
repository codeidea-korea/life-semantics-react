import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { countState, sampleState } from "@states/sampleState";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import ProgressComponent from "@components/ProgressComponent";
import PhysicalStressComponent from "@components/survey/surveylist/destress/PhysicalStressComponent";
import SocialStressComponent from "@components/survey/surveylist/destress/SocialStressComponent";
import ReligionStressComponent from "@components/survey/surveylist/destress/ReligionStressComponent";
import ToastPopup from "@components/modal/ToastPopup";
import ModalComponent from "@components/modal/ModalComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import { modalState } from "@states/modalState";
import { userState } from "@/states/userState";

function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}
interface reqObj {
    saSvNo: number;
    saQst: number;
    saAnsList: unknown[];
    saAns: unknown;
    saEtcAns: string;
    saRegDate: string;
}
interface ReqData {
    svNo: Number,
    svPgNo: Number,
    svUserNo: unknown,
    svType1: string,
    svType2: string,
    svStatus: string,
    svRegDate: string,
    userSurveysAnswersDTO: reqObj[]
}

const reqData: ReqData = {
    "svNo": 0,
    "svPgNo": 8,
    "svUserNo": 0,
    "svType1": "pre",
    "svType2": "destress",
    "svStatus": "set",
    "svRegDate": getToday(),
    "userSurveysAnswersDTO": [{
        "saSvNo": 0,
        "saQst": 0,
        "saAnsList": [

        ],
        "saAns": 0,
        "saEtcAns": "string",
        "saRegDate": getToday(),
    }, {
        "saSvNo": 0,
        "saQst": 0,
        "saAnsList": [

        ],
        "saAns": 0,
        "saEtcAns": "string",
        "saRegDate": getToday(),
    }, {
        "saSvNo": 0,
        "saQst": 0,
        "saAnsList": [

        ],
        "saAns": 0,
        "saEtcAns": "string",
        "saRegDate": getToday(),
    }, {
        "saSvNo": 0,
        "saQst": 0,
        "saAnsList": [

        ],
        "saAns": 0,
        "saEtcAns": "string",
        "saRegDate": getToday(),
    }, {
        "saSvNo": 0,
        "saQst": 0,
        "saAnsList": [

        ],
        "saAns": 0,
        "saEtcAns": "string",
        "saRegDate": getToday(),
    }, {
        "saSvNo": 0,
        "saQst": 0,
        "saAnsList": [

        ],
        "saAns": 0,
        "saEtcAns": "string",
        "saRegDate": getToday(),
    }, {
        "saSvNo": 0,
        "saQst": 0,
        "saAnsList": [

        ],
        "saAns": 0,
        "saEtcAns": "string",
        "saRegDate": getToday(),
    }]
}


const SurveyDeStress = () => {



    const [modal, setModal] = useRecoilState(modalState);
    const [toast, setToast] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [sample, setSample] = useRecoilState(sampleState);
    const [count, setCount] = useRecoilState(countState);
    const [userListError, setUserListError] = useState(true);
    const [step, setStep] = useState(1);
    const increase = () => setCount(count + 1);
    const userInfo = useRecoilValue(userState);

    useEffect(() => {
        reqData.svUserNo = userInfo.userNo
    }, [])

    const handlePopup = () => {
        setToast(true);
        setTimeout(() => {
            setToast(false);
        }, 3000);
    };



    const setTitle = () =>
        setSample({
            ...sample,
            title: String(document.querySelector("input")?.value),
        });

    useEffect(() => {
        const inner = document.querySelector(".next") as HTMLButtonElement;
        const textBox = document.querySelector(".textBox") as HTMLElement;

        if (step === 3) {
            inner.innerText = "작성완료";
        } else if (step !== 3) {
            inner.innerText = "다음";
        }

        if (step === 1) {
            textBox.style.display = "block";
        } else if (step !== 1) {
            textBox.style.display = "none";
        }
    }, [step]);


    const isVaildAnswer = (step: number) => {
        console.log(reqData);
        if (step === 1) {
            if (document.querySelectorAll('.scoreRadio input:checked')[0] !== undefined && document.querySelectorAll('.py_prob_list input:checked')[0] !== undefined) {
                //1번
                reqData.userSurveysAnswersDTO[0].saQst = 1;
                reqData.userSurveysAnswersDTO[0].saAnsList = [];
                const checkedIndex = Array.from(document.querySelectorAll('.scoreRadio input')).indexOf(document.querySelectorAll('.scoreRadio input:checked')[0])
                reqData.userSurveysAnswersDTO[0].saAnsList.push(checkedIndex)
                //2번
                reqData.userSurveysAnswersDTO[1].saQst = 2;
                reqData.userSurveysAnswersDTO[1].saAnsList = [];
                const scoreElement2 = document.querySelectorAll('.py_prob_list input:checked')[0];
                if (scoreElement2) {
                    Array.from(document.querySelectorAll('.py_prob_list input') as NodeListOf<HTMLInputElement>)
                        .forEach((item: HTMLInputElement, idx: number) => {
                            if (item.checked == true) {
                                reqData.userSurveysAnswersDTO[1].saAnsList.push(idx)
                            }
                        });
                } else {
                    return false
                }
                return true;
            }
        } else if (step === 2) {
            const scoreElement = document.querySelectorAll('.survey_step_2_q_1 input:checked')[0];
            const scoreElement2 = document.querySelectorAll('.survey_step_2_q_2 input:checked')[0];
            if (scoreElement !== undefined && scoreElement2 !== undefined) {
                reqData.userSurveysAnswersDTO[2].saQst = 3;
                reqData.userSurveysAnswersDTO[2].saAnsList = [];

                reqData.userSurveysAnswersDTO[3].saQst = 4;
                reqData.userSurveysAnswersDTO[3].saAnsList = [];

                if (scoreElement) {
                    Array.from(document.querySelectorAll('.survey_step_2_q_1 input') as NodeListOf<HTMLInputElement>)
                        .forEach((item: HTMLInputElement, idx: number) => {
                            if (item.checked == true) {
                                reqData.userSurveysAnswersDTO[2].saAnsList.push(idx)
                            }
                        });

                } else {
                    return false
                }

                if (scoreElement2) {
                    Array.from(document.querySelectorAll('.survey_step_2_q_2 input') as NodeListOf<HTMLInputElement>)
                        .forEach((item: HTMLInputElement, idx: number) => {
                            if (item.checked == true) {
                                reqData.userSurveysAnswersDTO[3].saAnsList.push(idx)
                            }
                        });
                } else {
                    return false
                }
                return true;
            }
        }
        return false;
    }

    const handleSubmit = () => {
        fetch(`https://api.life.codeidea.io/usr/surveys`,
            {
                method: 'POST',
                body: JSON.stringify(reqData),
                headers: {
                    Authorization: 'Bearer ' + userInfo.accessToken,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.result == "true") {
                    setModal({
                        ...modal,
                        show: true,
                        title: "",
                        cancelShow: false,
                        callBackShow: true,
                        content: (
                            <div>
                                디스트레스 설문이
                                <br />
                                완료되었습니다.
                            </div>
                        ),
                        confirmText: "확인",
                        onConfirmCallback: moveSurveyMain
                    });
                }
            }).catch((error) => {
                console.log(error)
            });
    }


    const handleNextStep = () => {
        if (isVaildAnswer(step) === true) {
            if (step < 3) {
                setStep(step + 1);
            }
        } else {
            handlePopup();
        }
    };

    const handlePrevStep = () => {
        if (step < 4 && step > 1) {
            setStep(step - 1);
        }
    };
    useEffect(() => {
        const scHeight = $(".Step").prop("scrollHeight");
        console.log(scHeight);

        $(window).on("scroll", function () {
            var height = $(document).scrollTop();
            if (this.scrollY > 300) {
                $(".Step").addClass("fixed");
            } else {
                $(".Step").removeClass("fixed");
            }
        });
    }, []);

    const handleDeStressSurveyComplete = () => {
        const lastScoreElement = document.querySelectorAll('.survey_step_3_q_1 input:checked')[0]
        const lastScoreElement2 = document.querySelectorAll('.survey_step_3_q_2 input:checked')[0]
        const lastScoreElement3 = document.querySelectorAll('.survey_step_3_q_3')[0] as HTMLTextAreaElement;

        if (lastScoreElement !== undefined && lastScoreElement2 !== undefined) {
            reqData.userSurveysAnswersDTO[4].saQst = 5;
            reqData.userSurveysAnswersDTO[4].saAnsList = [];

            reqData.userSurveysAnswersDTO[5].saQst = 6;
            reqData.userSurveysAnswersDTO[5].saAnsList = [];

            reqData.userSurveysAnswersDTO[6].saQst = 7;
            reqData.userSurveysAnswersDTO[6].saAnsList = [];

            Array.from(document.querySelectorAll('.survey_step_3_q_1 input') as NodeListOf<HTMLInputElement>)
                .forEach((item: HTMLInputElement, idx: number) => {
                    if (item.checked == true) {
                        reqData.userSurveysAnswersDTO[4].saAnsList.push(idx)
                    }
                });
            Array.from(document.querySelectorAll('.survey_step_3_q_2 input') as NodeListOf<HTMLInputElement>)
                .forEach((item: HTMLInputElement, idx: number) => {
                    if (item.checked == true) {
                        reqData.userSurveysAnswersDTO[5].saAnsList.push(idx)
                    }
                });

            reqData.userSurveysAnswersDTO[6].saEtcAns = lastScoreElement3.value;
            handleSubmit();
        } else {
            handlePopup();
        }
    };

    const moveSurveyMain = () => {
        setModal({ ...modal, show: false });
        navigate('/surveyBefore');
    };

    return (
        <React.Fragment>
            <TitleHeadComponent name="디스트레스" targetUrl="" />
            <div className="destress painBox">
                <div>
                    <h2>시작전 설문 - 디스트레스</h2>
                    <div className="textBox">
                        <p>
                            디스트레스는
                            <strong>
                                정신적, 육체적, 사회적 또는 영성본성의 불쾌한 경험
                            </strong>
                            입니다. 그것을 생각하고 느끼고 행동하는 방식에 영향을 미칠 수
                            있습니다.
                        </p>
                        <p>
                            디스트레스는 암, 암의 증상 또는 치료에 대처하는 것을 더 어렵게
                            만들
                        </p>
                    </div>
                </div>

                <div className="Step">
                    <ul>
                        <ProgressComponent active={step >= 1} />
                        <ProgressComponent active={step >= 2} />
                        <ProgressComponent active={step >= 3} />
                    </ul>
                </div>
                {step === 1 && <PhysicalStressComponent />}
                {step === 2 && <SocialStressComponent />}
                {step === 3 && <ReligionStressComponent />}
                <div className="fixBtn">
                    <button type="button" className="prev" onClick={handlePrevStep}>이전</button>
                    {step < 3 &&
                        <button type="button" className="next" onClick={handleNextStep}>다음</button>
                    }
                    {step === 3 &&
                        <button type="button" className="next" onClick={handleDeStressSurveyComplete}>작성완료</button>
                    }
                </div>
            </div>
            <ModalComponent />
            <ToastPopup content={"모든 정보를 입력해주세요."} show={toast} />
        </React.Fragment>
    );
};

export default SurveyDeStress;
