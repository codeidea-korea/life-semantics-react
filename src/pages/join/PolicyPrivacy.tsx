import React, { useState } from 'react';
import WebLayout from "@layouts/web/WebLayout";
import { useNavigate } from "react-router-dom";
import InputElement from "@/components/elements/InputElement";
import {joinPolicyState, joinPolicyAllCheck, joinPolicyAllReset} from '@states/joinPolicyState';
import {useRecoilState, useRecoilValue} from "recoil";

const PolicyPrivacy = () => {
    const navigate = useNavigate();
    const [policy, setPolicy] = useRecoilState(joinPolicyState);
    const [agree, setAgree] = useState(policy.privacy);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.currentTarget;
        setAgree(checked);
    }

    const handleConfirm = () => {
        if (policy.privacy !== agree) setPolicy({...policy, privacy: agree});
        navigate(-1)
    }

    return (
        <WebLayout>
            <div className="HeaderFix policyHeader">
                <h2>민감 정보 수집 및 이용 동의</h2>
                <button type="button" onClick={() => navigate(-1)}>
                    <img src="images/close.svg"></img>
                </button>
            </div>
            <div className="headerSpace"></div>
            <div className="policy">
                <h3>민감 정보 수집 및 이용 동의(필수)</h3>
                가천대학교 산학협력단은  Fore:medi(암경험자를 위한 산림치유 프로그램) 서비스 제공을 위하여 아래와 같이 귀하의 민감정보를 수집·이용합니다.
                아래 내용을 확인하신 뒤 동의하여 주시기 바랍니다.
                <table className="policy_table">
                    <colgroup>
                        <col width="25%" />
                        <col width="50%" />
                        <col width="25%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>수집·이용 목적</th>
                            <th>수집 항목</th>
                            <th>보유·이용 기간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>프로필 관리, 설문 조사</td>
                            <td>
                                흡연 정보(흡연 여부, 흡연 양, 흡연 기간), 음주 정보(음주 여부, 음주 종류, 음주 기간), 카페인 섭취 여부, 암 진단명, 진단 시기,
                                치료 종료 시기, 치료 유형, 현재건강상태, 암 이외의 진단받고 치료 중인 질환, 피로도 점수, 수면 만족도 점수, 디스트레스 정도,
                                피로 정도, 통증 정보(통증 부위, 통증 정도) 불면 정도, 수면 위생 정도
                            </td>
                            <td>서비스 이용 동의 철회시 또는 회원 탈퇴시까지(다만, 관련 법률에 따른 보존의무가 발생할 경우에는 그에 따름)</td>
                        </tr>
                    </tbody>
                </table>
                ※ 위의 민감정보 수집 · 이용에 대한 동의를 거부할 권리가 있습니다.
                <br />
                그러나 동의를 거부할 경우 프로필관리 및 설문 조사 서비스 이용에 제한을 받을 수 있습니다.
                <div className="checkBox">
                    <div className="checkAll">
                        <InputElement checked={agree} type="checkbox" className="ck" id="thirdPerson" name="thirdPerson" onChange={handleCheck}/>
                        <label htmlFor={"thirdPerson"}>해당 약관에 확인, 동의합니다.</label>
                    </div>
                </div>
                <button type="button" className="btn-02 active" onClick={handleConfirm}>
                    확인
                </button>
            </div>
        </WebLayout>
    );
};

export default PolicyPrivacy;
