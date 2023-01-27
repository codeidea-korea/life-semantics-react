import React, {useEffect, useState} from "react";
import InputElement from "@/components/elements/InputElement";
import ToastPopup from "../../../modal/ToastPopup";
import ModalComponent from "../../../modal/ModalComponent";
import {useRecoilState} from "recoil";
import {modalState} from "../../../../states/modalState";

const TiredSurveyComponent03 = () => {
    const [toast, setToast] = useState(false);
    const [modal, setModal] = useRecoilState(modalState);
    const handleToast = () => {
        setToast(true);
        setTimeout(() => {
            setToast(false);
        }, 3000);
    };

    return (
        <React.Fragment>
            <div className="surveyList">
                <ul>
                    <li className="surveyContent">
                        <p>11. (어떤 것을 할 때)집중할 수 있으십니까?</p>
                        <ul>
                            <li>
                                <InputElement type='radio' className='radioButton' value='1' name='qna11'/>
                                <label htmlFor="">전혀 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='2' name='qna11'/>
                                <label htmlFor="">거의 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='3' name='qna11'/>
                                <label htmlFor="">약간 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='4' name='qna11'/>
                                <label htmlFor="">상당히 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='5' name='qna11'/>
                                <label htmlFor="">매우 상당히 그렇다</label>
                            </li>

                        </ul>
                    </li>
                    <li className="surveyContent">
                        <p>12. (어떤 것을 할 때)주저하게 되거나 귀찮다고 느끼십니까?</p>
                        <ul>
                            <li>
                                <InputElement type='radio' className='radioButton' value='1' name='qna12'/>
                                <label htmlFor="">전혀 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='2' name='qna12'/>
                                <label htmlFor="">거의 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='3' name='qna12'/>
                                <label htmlFor="">약간 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='4' name='qna12'/>
                                <label htmlFor="">상당히 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='5' name='qna12'/>
                                <label htmlFor="">매우 상당히 그렇다</label>
                            </li>

                        </ul>
                    </li>
                    <li className="surveyContent">
                        <p>13. 기운이 다 빠진 느낌이 드십니까?</p>
                        <ul>
                            <li>
                                <InputElement type='radio' className='radioButton' value='1' name='qna13'/>
                                <label htmlFor="">전혀 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='2' name='qna13'/>
                                <label htmlFor="">거의 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='3' name='qna13'/>
                                <label htmlFor="">약간 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='4' name='qna13'/>
                                <label htmlFor="">상당히 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='5' name='qna13'/>
                                <label htmlFor="">매우 상당히 그렇다</label>
                            </li>

                        </ul>
                    </li>
                    <li className="surveyContent">
                        <p>14. 어떤 것을 하기 위해서 스스로 자신을 격려할 수 있습니까?</p>
                        <ul>
                            <li>
                                <InputElement type='radio' className='radioButton' value='1' name='qna14'/>
                                <label htmlFor="">전혀 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='2' name='qna14'/>
                                <label htmlFor="">거의 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='3' name='qna14'/>
                                <label htmlFor="">약간 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='4' name='qna14'/>
                                <label htmlFor="">상당히 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='5' name='qna14'/>
                                <label htmlFor="">매우 상당히 그렇다</label>
                            </li>
                        </ul>
                    </li>
                    <li className="surveyContent">
                        <p>15. 너무 피곤해서 무엇을 해야 할 지 잘 모르겠다고 느끼십니까?</p>
                        <ul>
                            <li>
                                <InputElement type='radio' className='radioButton' value='1' name='qna15'
                                              onClick={handleToast}/>
                                <label htmlFor="">전혀 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='2' name='qna15'
                                              onClick={handleToast}/>
                                <label htmlFor="">거의 그렇지 않다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='3' name='qna15'
                                              onClick={handleToast}/>
                                <label htmlFor="">약간 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='4' name='qna15'
                                              onClick={handleToast}/>
                                <label htmlFor="">상당히 그렇다</label>
                            </li>
                            <li>
                                <InputElement type='radio' className='radioButton' value='5' name='qna15'/>
                                <label htmlFor="">매우 상당히 그렇다</label>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ToastPopup
                content="완료하시면 수정이 불가합니다. 내용을 확인해주세요."
                show={toast}
            />
            <ModalComponent/>
        </React.Fragment>
    );
};

export default TiredSurveyComponent03;
