import React, {useEffect, useState} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useRecoilState} from "recoil";
import {countState, sampleState} from "@states/sampleState";
import ModalComponent from "@components/modal/ModalComponent";
import ProgressComponent from "@components/ProgressComponent";
import PainComponent from "@components/survey/surveylist/PainComponent";
import MostPainListComponent from "@components/survey/surveylist/MostPainListComponent";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {modalState} from "@states/modalState";
import ToastPopup from "@components/modal/ToastPopup";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import $ from "jquery";

const Pain = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sample, setSample] = useRecoilState(sampleState);
    const [count, setCount] = useRecoilState(countState);
    const [modal, setModal] = useRecoilState(modalState);
    const [toast, setToast] = useState(false);
    const [userListError, setUserListError] = useState(true);
    const increase = () => setCount(count + 1);
    const setTitle = () =>
        setSample({
            ...sample,
            title: String(document.querySelector("input")?.value),
        });
    const [step, setStep] = useState(1);

    useEffect(() => {
        const inner = document.querySelector(".next") as HTMLButtonElement;
        if (step === 3) {
            inner.innerText = "작성완료";
        } else if (step !== 3) {
            inner.innerText = "다음";
        }
    }, [step]);

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
    const handleDuplicationNotice = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            content: (
                <div>
                    선택이 불가합니다.<br/>
                    아픈 부위 중에서만<br/> 
                    제일 아픈 부위 선택이 <br/>
                    가능합니다.
                </div>
            ),
            confirmText: "확인",
        });
    };
    const handlePainSurveyComplete = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            callBackShow: true,
            content: (
                <div>
                    통증 설문을<br/>
                    완료하셨습니다.
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
            <TitleHeadComponent name="통증" targetUrl={'/survey'}/>
            <div className="painBox">
                <h2>시작전 설문 - 통증</h2>
                <div className="Step">
                    <ul>
                        <ProgressComponent active={step >= 1}/>
                        <ProgressComponent active={step >= 2}/>
                        <ProgressComponent active={step >= 3}/>
                    </ul>
                </div>
                {step === 3 ? <MostPainListComponent/> : <PainComponent step={step}/>}
            </div>
            <div className="fixBtn">
                <button type="button" className="prev" onClick={handlePrevStep}>이전</button>
                {step < 3 &&
                <button type="button" className="next" onClick={handleNextStep}>다음</button>
                }
                {step === 3 &&
                <button type="button" className="next" onClick={handlePainSurveyComplete}>작성완료</button>
                }
            </div>
            <ToastPopup
                content={
                <span>
                이번 페이지까지는 <br/>
                <b>설문</b>을 <b>완료</b>하여주세요.
                </span>}
                show={toast}
            />
            <ToastPopup
                content={
                <span>
                최종 선택된 한 곳으로만<br/>
                저장됩니다.
                </span>}
                show={toast}
            />
            <ModalComponent/>
        </React.Fragment>
    );
};

export default Pain;
