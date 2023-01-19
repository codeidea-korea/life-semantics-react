import React, {useEffect, useState} from 'react';
import InputElement from '../elements/InputElement';
import {Link} from 'react-router-dom';
import {joinPolicyState, joinPolicyAllCheck, joinPolicyAllReset} from '@states/joinPolicyState';
import {useRecoilState, useRecoilValue} from "recoil";
import { joinState } from '@/states/joinState';

const TermsComponent = ({next}: { next: Function }) => {

    const [joinParam, setJoinParam] = useRecoilState(joinState);
    const [policy, setPolicy] = useRecoilState(joinPolicyState);
    const policyAllReset = useRecoilValue(joinPolicyAllReset);
    const policyAllCheck = useRecoilValue(joinPolicyAllCheck);
    const [requiredComplete, setRequiredComplete] = useState(false);

    const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ckArr = Array.from(document.querySelectorAll(".ck")) as Array<HTMLInputElement>;
        const checked = event.target.checked;
        if (checked) {
            ckArr.forEach(ck => {
                ck.checked = true;
            });
            setPolicy(policyAllCheck);
            setRequiredComplete(true);
        } else {
            ckArr.forEach(ck => {
                ck.checked = false;
            });
            setPolicy(policyAllReset);
            setRequiredComplete(false);
        }
    };

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.currentTarget;
        setPolicy({...policy, [name]: checked});
        handleCheckAllInput();
    };

    const handleCheckAllInput = () => {
        let cnt = 0;
        const ckAll = document.querySelector(".ck-all") as HTMLInputElement;
        const ckArr = Array.from(document.querySelectorAll(".ck")) as Array<HTMLInputElement>;
        ckArr.forEach(ck => {
            if (ck.checked) cnt++
        });
        if (cnt == ckArr.length) {
            ckAll.checked = true;
            setRequiredComplete(true);
        }
        if (cnt != ckArr.length) {
            ckAll.checked = false;
            setRequiredComplete(false);
        }
    };

    const moveNextStep = () => {
        setJoinParam({
            ...joinParam,
            ['tos1']: policy.personalInfo,
            ['tos2']: policy.thirdPerson,
            ['tos3']: policy.privacy,
        })
        next();
    };

    useEffect(() => {
        handleCheckAllInput();
    }, []);

    return (
        <React.Fragment>
            <div className="Container">
                <h3>
                    서비스 이용을 위해 <br/>
                    약관에 동의해 주세요.
                </h3>
                <div className="checkBox">
                    <div className="checkAll">
                        <InputElement type="checkbox" className="ck-all" id="chkAll" onChange={handleAllCheck}/>
                        <label htmlFor={"chkAll"}>모든 약관에 모두확인, 동의합니다.</label>
                    </div>
                    <ul className="inputCheck">
                        <li>
                            <InputElement type="checkbox" className="ck" id="termOfService" name="termOfService"
                                          checked={policy.termOfService}
                                          onChange={handleCheck}/>
                            <label htmlFor={"termOfService"}>[필수] 서비스 이용 약관</label>
                            <Link to="/policyTermOfService"></Link>
                        </li>
                        <li>
                            <InputElement type="checkbox" className="ck" id="personalInfo" name="personalInfo"
                                          checked={policy.personalInfo}
                                          onChange={handleCheck}/>
                            <label htmlFor={"personalInfo"}>[필수] 개인정보 수집 및 이용 동의</label>
                            <Link to="/policyPersonalInfo"></Link>
                        </li>
                        <li>
                            <InputElement type="checkbox" className="" id="thirdPerson" name="thirdPerson"
                                          checked={policy.thirdPerson}
                                          onChange={handleCheck}/>
                            <label htmlFor={"thirdPerson"}>[선택] 개인정보 수집 및 이용 동의</label>
                            <Link to="/policyThirdPerson"></Link>
                        </li>
                        <li>
                            <InputElement type="checkbox" className="ck" id="privacy" name="privacy"
                                          checked={policy.privacy}
                                          onChange={handleCheck}/>
                            <label htmlFor={"privacy"}>[필수] 민감 정보 수집 및 이용 동의</label>
                            <Link to="/policyPrivacy"></Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
            {requiredComplete &&
                <button type="button" className="btn-02 fixed active" onClick={moveNextStep}>다음</button>
            }
            {!requiredComplete &&
                <button type="button" className="btn-02 fixed">다음</button>
            }
        </React.Fragment>
    );
};

export default TermsComponent;
