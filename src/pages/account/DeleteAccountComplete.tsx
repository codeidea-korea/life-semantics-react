import React, { useState } from 'react';
import TitleHeadComponent from '@components/head/TitleHeadComponent';
import WebLayout from '@layouts/web/WebLayout';
import CircleComponent from '@components/CircleComponent';
import TermsComponent from '@components/join/TermsComponent';
import LostIdComponent from '@components/join/LostIdComponent';
import MemberComponent from '@components/join/MemberComponent';
import JoinCompleteComponent from '@components/join/JoinCompleteComponent';
import { useNavigate } from 'react-router-dom';

const DeleteAccountComplete = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const handleNavigate = (url: string) => {
        navigate(url);
    }

    return (
        <WebLayout>
            <TitleHeadComponent name="탈퇴완료" targetUrl="/" />
            <div className="Join">
                <div className="complete">
                    <h2>탈퇴 완료됐습니다.</h2>
                    <img src="images/big-check.svg" />
                </div>
                <div className="buttonFix">
                    <button type="button" className="button active" onClick={event => handleNavigate('/')}>
                        홈 화면으로 돌아가기
                    </button>
                    <button type="button" className="button" onClick={() => navigate("/join")}>
                        회원가입 하기
                    </button>
                </div>
            </div>
        </WebLayout>
    );
};

export default DeleteAccountComplete;
