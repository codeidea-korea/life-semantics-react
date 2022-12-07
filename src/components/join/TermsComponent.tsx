import React, {useEffect, useState} from "react";
import InputElement from "../elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import {ListInterface} from "@interfaces/listInterface";
import {UserInterface} from "@interfaces/userInterface";
import {Link, useLocation, useNavigate} from "react-router-dom";
import $ from "jquery";

const TermsComponent = () => {

    const [isAllChecked, setIsAllChecked] = useState(false);

    const handlerAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ckArr = Array.from(document.querySelectorAll(".ck")) as Array<HTMLInputElement>;
        const checked = event.target.checked;
        if (checked) {
            ckArr.forEach(ck => {
                ck.checked = true;
            });
        } else {
            ckArr.forEach(ck => {
                ck.checked = false;
            });
        }
        setIsAllChecked(!isAllChecked);
    };

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ckAll = document.querySelector(".ck-all") as HTMLInputElement;
        const ckArr = Array.from(document.querySelectorAll(".ck")) as Array<HTMLInputElement>;
        let cnt = 0;
        ckArr.forEach(ck => {
            if (ck.checked) cnt++
        });
        if (cnt == ckArr.length) ckAll.checked = true;
        if (cnt != ckArr.length) ckAll.checked = false;
    };

    return (
        <React.Fragment>
            <div className="Container">
                <h3>
                    서비스 이용을 위해 <br/>
                    약관에 동의해 주세요.
                </h3>
                <div className="checkBox">
                    <div className="checkAll">
                        <InputElement type="checkbox" className="ck-all" id="chkAll" onChange={handlerAllCheck}/>
                        <label htmlFor={"chkAll"}>모든 약관에 모두확인, 동의합니다.</label>
                    </div>
                    <ul className="inputCheck">
                        <li>
                            <InputElement type="checkbox" className="ck" id="termOfService" onChange={handleCheck}/>
                            <label htmlFor={"termOfService"}>[필수] 서비스 이용 약관</label>
                            <Link to="/policy"></Link>
                        </li>
                        <li>
                            <InputElement type="checkbox" className="ck" id="lifeRecord" onChange={handleCheck}/>
                            <label htmlFor={"lifeRecord"}>[필수] 라이프 레코드 이용 동의</label>
                            <Link to=""></Link>
                        </li>
                        <li>
                            <InputElement type="checkbox" className="ck" id="personalInfo" onChange={handleCheck}/>
                            <label htmlFor={"personalInfo"}>[필수] 개인정보 수집 및 이용 동의</label>
                            <Link to=""></Link>
                        </li>
                        <li>
                            <InputElement type="checkbox" className="ck" id="privacy" onChange={handleCheck}/>
                            <label htmlFor={"privacy"}>[필수] 민감 정보 수집 및 이용 동의</label>
                            <Link to=""></Link>
                        </li>
                        <li>
                            <InputElement type="checkbox" className="ck" id="thirdPerson" onChange={handleCheck}/>
                            <label htmlFor={"thirdPerson"}>[필수] 개인정보 제 3자 제공 동의</label>
                            <Link to=""></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TermsComponent;
