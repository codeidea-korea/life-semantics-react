import React, { useState } from 'react';
import WebLayout from "@layouts/web/WebLayout";
import { useNavigate } from "react-router-dom";
import InputElement from "@/components/elements/InputElement";
import {joinPolicyState, joinPolicyAllCheck, joinPolicyAllReset} from '@states/joinPolicyState';
import {useRecoilState, useRecoilValue} from "recoil";

const PolicyThirdPerson = () => {
    const navigate = useNavigate();
    const [policy, setPolicy] = useRecoilState(joinPolicyState);
    const [agree, setAgree] = useState(policy.thirdPerson);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.currentTarget;
        setAgree(checked);
    }

    const handleConfirm = () => {
        if (policy.thirdPerson !== agree) setPolicy({...policy, thirdPerson: agree});
        navigate(-1)
    }

    return (
        <WebLayout>
            <div className="HeaderFix policyHeader">
                <h2>개인정보 수집 및 이용 동의</h2>
                <button type="button" onClick={() => navigate(-1)}>
                    <img src="images/close.svg"></img>
                </button>
            </div>
            <div className="headerSpace"></div>
            <div className="policy">
                <h3>개인정보 수집 및 이용 동의(선택)</h3>
                가천대학교 산학협력단은 Fore:medi(암경험자를 위한 산림치유 프로그램) 서비스 제공을 위하여 아래와 같이 귀하의 개인정보를 수집·이용합니다.
                아래 내용을 확인하신 뒤 동의하여 주시기 바랍니다.
                <table className="policy_table">
                    <colgroup>
                        <col width="20%" />
                        <col width="30%" />
                        <col width="50%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>수집·이용 목적</th>
                            <th>항목</th>
                            <th>보유·이용 기간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>예약 확인 정보 안내</td>
                            <td>이름, 아이디, 성별, 생년월일, 휴대폰번호, 이메일</td>
                            <td>서비스 이용 동의 철회시 또는 회원 탈퇴시까지(다만, 관련 법률에 따른 보존 의무가 발생할 경우에는 그에 따름)</td>
                        </tr>
                    </tbody>
                </table>
                ※ 위의 개인정보 수집 ∙ 이용에 대한 동의를 거부할 권리가 있습니다.
                <br />
                그러나 동의를 거부할 경우 원활한 예약 확인 정보 안내에 제한을 받을 수 있습니다.
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

export default PolicyThirdPerson;
