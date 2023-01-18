import React, { useState } from "react";
import InputElement from "@/components/elements/InputElement";
import ToastPopup from "@components/modal/ToastPopup";

const SocialStressComponent = () => {
  const [toast, setToast] = useState(false);
  const handlePopup = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <div className="checkList checkList02">
        <span>정서 문제(9)</span>
        <ul className="survey_step_2_q_1">
          <li>
            <InputElement type="checkbox" id="worry" className="check02" />
            <label htmlFor="worry">걱정 또는 불안</label>
          </li>
          <li>
            <InputElement type="checkbox" id="sadness" className="check02" />
            <label htmlFor="sadness">슬픔 또는 우울감</label>
          </li>
          <li>
            <InputElement type="checkbox" id="decrease" className="check02" />
            <label htmlFor="decrease">흥미 또는 즐거움 감소</label>
          </li>
          <li>
            <InputElement type="checkbox" id="loss" className="check02" />
            <label htmlFor="loss">비애감 또는 상실감</label>
          </li>
          <li>
            <InputElement type="checkbox" id="fear" className="check02" />
            <label htmlFor="fear">공포</label>
          </li>
          <li>
            <InputElement type="checkbox" id="loneliness" className="check02" />
            <label htmlFor="loneliness">외로움</label>
          </li>
          <li>
            <InputElement type="checkbox" id="anger" className="check02" />
            <label htmlFor="anger">분노</label>
          </li>
          <li>
            <InputElement type="checkbox" id="appearance" className="check02" />
            <label htmlFor="appearance">외모 변화</label>
          </li>
          <li>
            <InputElement type="checkbox" id="hard" className="check02" />
            <label htmlFor="hard">버거움 또는 무가치함 </label>
          </li>
        </ul>
        <span>사회관계 문제(6)</span>
        <ul className="survey_step_2_q_2">
          <li>
            <InputElement type="checkbox" id="spouse" className="check02" />
            <label htmlFor="spouse">배우자와의 관계</label>
          </li>
          <li>
            <InputElement type="checkbox" id="children" className="check02" />
            <label htmlFor="children">자녀와의 관계</label>
          </li>
          <li>
            <InputElement type="checkbox" id="family" className="check02" />
            <label htmlFor="family">가족과의 관계</label>
          </li>
          <li>
            <InputElement type="checkbox" id="friend" className="check02" />
            <label htmlFor="friend">친구 또는 동료와의 관계</label>
          </li>
          <li>
            <InputElement type="checkbox" id="medical" className="check02" />
            <label htmlFor="medical">의료진과의 관계</label>
          </li>
          <li>
            <InputElement type="checkbox" id="raise" className="check02" />
            <label htmlFor="raise">양육 능력</label>
          </li>
        </ul>
        <ToastPopup
          content={
            <div>
              이번 페이지까지는 <br />
              <b>설문</b>을 <b>완료</b>하여주세요.
            </div>
          }
          show={toast}
        />
      </div>
    </React.Fragment>
  );
};

export default SocialStressComponent;
