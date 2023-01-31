import React, { useState } from "react";
import InputElement from "@components/elements/InputElement";
import ToastPopup from "@components/modal/ToastPopup";

const ReligionStressComponent = () => {
  const [toast, setToast] = useState(false);
  const handlePopup = () => {
    // setToast(true);
    // setTimeout(() => {
    //   setToast(false);
    // }, 3000);
  };

  return (
    <React.Fragment>
      <div className="checkList checkList03">
        <p>
          지난 일주일 동안 염려되었던 항목이 있습니까?
          <strong>(해당되는 곳에 모두 체크하세요.)</strong>
        </p>
        <span>실생활 문제(12)</span>
        <ul className="survey_step_3_q_1">
          <li>
            <InputElement type="checkbox" id="oneself" className="check02" />
            <label htmlFor="oneself">자신 돌보기</label>
          </li>
          <li>
            <InputElement type="checkbox" id="others" className="check02" />
            <label htmlFor="others">타인 돌보기</label>
          </li>
          <li>
            <InputElement type="checkbox" id="job" className="check02" />
            <label htmlFor="job">직장</label>
          </li>
          <li>
            <InputElement type="checkbox" id="school" className="check02" />
            <label htmlFor="school">학교</label>
          </li>
          <li>
            <InputElement type="checkbox" id="house" className="check02" />
            <label htmlFor="house">주택</label>
          </li>
          <li>
            <InputElement type="checkbox" id="finance" className="check02" />
            <label htmlFor="finance">금융</label>
          </li>
          <li>
            <InputElement type="checkbox" id="insurance" className="check02" />
            <label htmlFor="insurance">보험</label>
          </li>
          <li>
            <InputElement type="checkbox" id="traffic" className="check02" />
            <label htmlFor="traffic">교통</label>
          </li>
          <li>
            <InputElement type="checkbox" id="infantCare" className="check02" />
            <label htmlFor="infantCare">육아</label>
          </li>
          <li>
            <InputElement type="checkbox" id="food" className="check02" />
            <label htmlFor="food">충분한 음식 섭취</label>
          </li>
          <li>
            <InputElement type="checkbox" id="drug" className="check02" />
            <label htmlFor="drug">약 구하기</label>
          </li>
          <li>
            <InputElement type="checkbox" id="treatment" className="check02" />
            <label htmlFor="treatment">치료 결정</label>
          </li>
        </ul>
        <span>영성/종교 문제(6)</span>
        <ul className="survey_step_3_q_2">
          <li>
            <InputElement type="checkbox" id="life" className="check02" />
            <label htmlFor="life">삶의 의미 또는 목적</label>
          </li>
          <li>
            <InputElement type="checkbox" id="belief" className="check02" />
            <label htmlFor="belief">믿음이나 신념의 변화</label>
          </li>
          <li>
            <InputElement type="checkbox" id="death" className="check02" />
            <label htmlFor="death">죽음, 임종과정, 사후세계</label>
          </li>
          <li>
            <InputElement type="checkbox" id="conflict" className="check02" />
            <label htmlFor="conflict">신념과 항암치료 사이의 갈등</label>
          </li>
          <li>
            <InputElement type="checkbox" id="existence" className="check02" />
            <label htmlFor="existence">신성한 존재와의 관계</label>
          </li>
          <li>
            <InputElement type="checkbox" id="necessity" className="check02" />
            <label htmlFor="necessity">의식 또는 식사의 필요성 </label>
          </li>
        </ul>
        <div className="textareaBox">
          <span>기타문제</span>
          <textarea
            className="survey_step_3_q_3"
            maxLength={500}
            onChange={handlePopup}
            placeholder="그 외의 염려되는 문제들이 있다면, 작성해주세요."
          ></textarea>
        </div>
        <ToastPopup
          content={
            <div>
              완료하시면 <b>수정</b>이 <b>불가</b>합니다. <br />
              내용을 확인하해주세요.
            </div>
          }
          show={toast}
        />
      </div>

    </React.Fragment>
  );
};

export default ReligionStressComponent;
