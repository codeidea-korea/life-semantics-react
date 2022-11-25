import React, { useEffect, useState } from "react";
import InputElement from "../elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";

const TermsComponent = () => {
  useEffect(() => {
    $('#chkAll').click(function(){
      chkAll(); 
  });

  function chkAll(){
    var chk = $('#chkAll').is(':checked');
    if(chk) { 
        $('.inputCheck input[type=checkbox]').prop('checked', true); // 체크박스 전체 선택
    }else{
        $('.inputCheck input[type=checkbox]').prop('checked', false); // 체크박스 전체 해제
    }    
  }

  }, []);

  return (
    <React.Fragment>
      <div className="Container">
        <h3>
          서비스 이용을 위해 <br />
          약관에 동의해 주세요.
        </h3>
        <div className="checkBox">
          <div className="checkAll">
            <InputElement type="checkbox" className="" id="chkAll" />
            <label htmlFor="chkAll">모든 약관에 모두확인, 동의합니다.</label>
          </div>
          <ul className="inputCheck">
            <li>
              <InputElement type="checkbox" />
              <label>[필수] 서비스 이용 약관</label>
              <Link to="/policy"></Link>
            </li>
            <li>
              <InputElement type="checkbox" />
              <label>[필수] 개인정보 수집 및 이용 동의</label>
              <Link to=""></Link>
            </li>
            <li>
              <InputElement type="checkbox" />
              <label>[선택] 개인정보 수집 및 이용 동의</label>
              <Link to=""></Link>
            </li>
            <li>
              <InputElement type="checkbox" />
              <label>[필수] 민감 정보 수집 및 이용 동의</label>
              <Link to=""></Link>
            </li>
            <li>
              <InputElement type="checkbox" />
              <label>[선택] 민감 정보 수집 및 이용 동의</label>
              <Link to=""></Link>
            </li>
            <li>
              <InputElement type="checkbox" />
              <label>[필수] 개인정보 제 3자 제공 동의</label>
              <Link to=""></Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TermsComponent;
