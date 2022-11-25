import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {countState, sampleState} from "@states/sampleState";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import ProgressComponent from "@components/ProgressComponent";
import PhysicalStressComponent from "@components/survey/surveylist/destress/PhysicalStressComponent";
import SocialStressComponent from "@components/survey/surveylist/destress/SocialStressComponent";
import ReligionStressComponent from "@components/survey/surveylist/destress/ReligionStressComponent";
import ToastPopup from "@components/modal/ToastPopup";
import ModalComponent from "@components/modal/ModalComponent";
import {Link, useLocation, useNavigate} from "react-router-dom";
import $ from "jquery";
import {modalState} from "@states/modalState";


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

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
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
            console.log(height);
            if (this.scrollY > 300) {
                $(".Step").addClass("fixed");
            } else {
                $(".Step").removeClass("fixed");
            }
        });
    }, []);

    const handleDeStressSurveyComplete = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            callBackShow: true,
            content: (
                <div>
                    디스트레스 설문이
                    <br/>
                    완료되었습니다.
                </div>
            ),
            confirmText: "확인",
            onConfirmCallback : moveSurveyMain
        });
    };

    const moveSurveyMain = () => {
        setModal({...modal, show: false});
        navigate('/surveyBefore');
    };

    return (
        <React.Fragment>
            <TitleHeadComponent name="디스트레스" targetUrl= ""/>
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
                        <ProgressComponent active={step >= 1}/>
                        <ProgressComponent active={step >= 2}/>
                        <ProgressComponent active={step >= 3}/>
                    </ul>
                </div>
                {step === 1 && <PhysicalStressComponent/>}
                {step === 2 && <SocialStressComponent/>}
                {step === 3 && <ReligionStressComponent/>}
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
            <ModalComponent/>
        </React.Fragment>
    );
};

export default SurveyDeStress;
