import React, { useState } from "react";
import InputElement from "../../elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MemberChk03 = ({ nextStep }: { nextStep: Function }) => {
  const [isCustomCancerName, setIsCustomCanerName] = useState(false);

  const handleFocusBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target;
    const cancer = document.getElementById("cancer") as HTMLInputElement;
    const cancer_start = document.getElementById(
      "cancer_start"
    ) as HTMLInputElement;
    const cancer_end = document.getElementById(
      "cancer_end"
    ) as HTMLInputElement;
    const treatmentType = document.querySelectorAll<HTMLInputElement>(
      ".treatment-type input:checked"
    );

    const custom_cancer_name = document.getElementById(
      "custom_cancer_name"
    ) as HTMLInputElement;

    if (isCustomCancerName) {
      if(!custom_cancer_name.value){
        custom_cancer_name.focus();
        return false;
      }
      
    }
    if (!cancer_start.value) {
      cancer_start.focus();
      return false;
    }
    if (!cancer_end.value) {
      cancer_end.focus();
      return false;
    }
    if (!treatmentType.length) {
      return false;
    }

    nextStep(4);
  };

  const handleCancerNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target;
    const selectedOption = target.selectedOptions[0];
    if (selectedOption.textContent === "직접입력") {
      setIsCustomCanerName(true);
    } else {
      setIsCustomCanerName(false);
    }
  };

  return (
    <React.Fragment>
      <p className="title">암 건강정보 입력</p>
      <div className="MemberChk MemberChk02">
        <div className="">
          <label>
            <span>나이</span>
          </label>
          <span className="age">나이</span>
        </div>

        <label>
          <span>암 종(진단명)</span>
        </label>
        <div>
          <div className="selectBox">
            <select onChange={handleCancerNameChange}>
              <option>암 종 선택</option>
              <option>구체적으로 입력</option>
              <option>직접입력</option>
            </select>
          </div>

          {isCustomCancerName && (
            <div className="manualInput">
              <label>직접입력</label>
              <InputElement type="text" placeholder="직접입력" id="custom_cancer_name"/>
            </div>
          )}
        </div>
        
        <label>
          <span>진단시기</span>
        </label>
        <InputElement
          type="text"
          placeholder="예) 2015년 01월"
          id="cancer_start"
        />
        <label>
          <span>치료종료 시기</span>
        </label>
        <InputElement
          type="text"
          placeholder="예) 2015년 01월"
          id="cancer_end"
        />
        <label>
          <span>치료유형(중복선택 가능)</span>
        </label>
        <div className="chk_list treatment-type checkContents">
          <ul>
            <li>
              <InputElement type="checkbox" id="surgery" className="check02" />
              <label htmlFor="surgery">수술</label>
            </li>
            <li>
              <InputElement
                type="checkbox"
                id="cancer_treatment"
                className="check02"
              />
              <label htmlFor="cancer_treatment">항암치료</label>
            </li>
            <li>
              <InputElement
                type="checkbox"
                id="radiation_treatment"
                className="check02"
              />
              <label htmlFor="radiation_treatment">방사선치료</label>
            </li>
            <li>
              <InputElement
                type="checkbox"
                id="hormone_treatment"
                className="check02"
              />
              <label htmlFor="hormone_treatment">호르몬치료</label>
            </li>
            <li>
              <InputElement
                type="checkbox"
                id="etc_treatment"
                className="check02"
              />
              <label htmlFor="etc_treatment">기타</label>
            </li>
          </ul>
          <InputElement
            type="text"
            placeholder="구체적으로 입력"
            id="detail_treatment"
          />
        </div>
        <label>
          <span>현재 건강상태</span>
        </label>
        <div className="radioCheck checkContents">
          <ul>
            <li>
              <InputElement
                type="radio"
                value="매우 건강하지 않다."
                name="chk_info"
                id="radio01"
              />
              <label htmlFor="radio01">매우 건강하지 않다.</label>
            </li>
            <li>
              <InputElement
                type="radio"
                value="건강하지 않다."
                name="chk_info"
                id="radio02"
              />
              <label htmlFor="radio02">건강하지 않다.</label>
            </li>
            <li>
              <InputElement
                type="radio"
                value="건강하다."
                name="chk_info"
                id="radio03"
              />
              <label htmlFor="radio03">건강하다.</label>
            </li>
            <li>
              <InputElement
                type="radio"
                value="매우 건강하다."
                name="chk_info"
                id="radio04"
              />
              <label htmlFor="radio04">매우 건강하다.</label>
            </li>
          </ul>
        </div>
        <label>
          <span>암 종(진단명)</span>
        </label>
        <InputElement
          type="text"
          placeholder="구체적으로 입력"
          id="cancer_type"
        />
        <label htmlFor="cancer_type">
          <span>진단시기</span>
        </label>
        <InputElement
          type="text"
          placeholder="예) 2015년 01월"
          id="cancer_type_start"
        />
        <label htmlFor="cancer_type_start">
          <span>치료종료 시기</span>
        </label>
        <InputElement
          type="text"
          placeholder="예) 2015년 01월"
          id="cancer_type_end"
        />
        <label className="labelType" htmlFor="cancer_type_end">
          <span> 암 이외의 진단받고 치료 중인 질환</span>
          (해당질환 모두 선택)
        </label>
        <div className="chk_list disease checkContents">
          <ul>
            <li>
              <InputElement type="checkbox" value="" className="" id="empty" />
              <label htmlFor="empty">없음</label>
            </li>
            <li>
              <InputElement type="checkbox" value="고혈압" id="hypertension" />
              <label htmlFor="hypertension">고혈압</label>
            </li>
            <li>
              <InputElement type="checkbox" value="당뇨병" id="diabetic" />
              <label htmlFor="diabetic">당뇨병</label>
            </li>
            <li>
              <InputElement
                type="checkbox"
                value="뇌혈관질환"
                id="cerebrovascular"
              />
              <label htmlFor="cerebrovascular">뇌혈관질환</label>
            </li>
            <li>
              <InputElement
                type="checkbox"
                value="호흡기질환"
                id="respiratory"
              />
              <label htmlFor="respiratory">호흡기질환</label>
            </li>
            <li>
              <InputElement type="checkbox" value="심장질환" id="cardiac" />
              <label htmlFor="cardiac">심장질환</label>
            </li>
            <li>
              <InputElement type="checkbox" value="우울증" id="blues" />
              <label htmlFor="blues">우울증</label>
            </li>
            <li>
              <InputElement type="checkbox" value="관련 질환" id="related" />
              <label htmlFor="related">관련 질환</label>
            </li>
            <li>
              <InputElement type="checkbox" value="기타" id="etc" />
              <label htmlFor="etc">기타</label>
            </li>
          </ul>
          <InputElement type="text" placeholder="직접 작성" />
        </div>
      </div>
      <div className="fixBtn ">
        <button type="button" className="prev">
          이전
        </button>
        <button type="button" className="next" onClick={handleFocusBtn}>
          다음
        </button>
      </div>
    </React.Fragment>
  );
};

export default MemberChk03;
