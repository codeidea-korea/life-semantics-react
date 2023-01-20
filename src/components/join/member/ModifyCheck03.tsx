import React from "react";
import { useEffect } from "react";
import InputElement from "../../elements/InputElement";
import $ from "jquery";
import { userState } from "@/states/userState";
import { useRecoilValue } from "recoil";

const ModifyCheck03 = () => {
  const user = useRecoilValue(userState);
  useEffect(() => {
    console.log(user);
  }, [])
  return (
    <React.Fragment>
      <div className="modifyCheck">
        <p className="title">암 건강정보 입력</p>
        <div className="MemberChk MemberChk02">
          <ul>
            <li>
              <label>
                <span>나이</span>
              </label>
              <span>나이</span>
            </li>
            <li>
              <label>
                <span>성별</span>
              </label>
              <div className="chk_radio02">
                <span className="isCheck">
                  <InputElement
                    type="radio"
                    value="남"
                    name="gender"
                    id="man"
                  />
                  <label htmlFor="man">남</label>
                </span>
                <span>
                  <InputElement
                    type="radio"
                    value="여"
                    name="gender"
                    id="woman"
                  />
                  <label htmlFor="woman">여</label>
                </span>
              </div>
            </li>
            <li>
              <label>
                <span>암 종(진단명) <i className="plusBtn">+</i></span>
              </label>
              <p className="pointGreen">다른 암도 재발되었나요?<br />그러면 해당 암 종도 추가해주세요.</p>
              <div className="selectBox">
                <select name="cancer">
                  <option>암 종 선택</option>
                  <option>간암</option>
                  <option>갑상선암</option>
                  <option>담낭암</option>
                  <option>담도암</option>
                  <option>대장암</option>
                  <option>신장암</option>
                  <option>위암</option>
                  <option>유방암</option>
                  <option>전립선암</option>
                  <option>췌장암</option>
                  <option>폐암</option>
                  <option>직접입력</option>
                </select>
              </div>
            </li>
            <li className="pl-20">
              <label>
                <span>진단시기</span>
              </label>
              <InputElement
                type="text"
                placeholder="예) 2015년 01월"
                id="cancer_start"
              />
            </li>
            <li className="pl-20">
              <label>
                <span>치료종료 시기</span>
              </label>
              <InputElement
                type="text"
                placeholder="예) 2015년 01월"
                id="cancer_end"
              />
            </li>
            {/* +버튼 클릭시 추가되는 곳 : S */}
            <li>
              <label>
                <span>암 종(진단명)</span>
              </label>
              <div className="selectBox">
                <select name="cancer">
                  <option>암 종 선택</option>
                  <option>간암</option>
                  <option>갑상선암</option>
                  <option>담낭암</option>
                  <option>담도암</option>
                  <option>대장암</option>
                  <option>신장암</option>
                  <option>위암</option>
                  <option>유방암</option>
                  <option>전립선암</option>
                  <option>췌장암</option>
                  <option>폐암</option>
                  <option>직접입력</option>
                </select>
              </div>
            </li>
            <li className="pl-20">
              <label>
                <span>진단시기</span>
              </label>
              <InputElement
                type="text"
                placeholder="예) 2015년 01월"
                id="cancer_start"
              />
            </li>
            <li className="pl-20">
              <label>
                <span>치료종료 시기</span>
              </label>
              <InputElement
                type="text"
                placeholder="예) 2015년 01월"
                id="cancer_end"
              />
            </li>
            {/* +버튼 클릭시 추가되는 곳 : E */}
            <li></li>
            <li>
              <label>
                <span>치료유형(중복선택 가능)</span>
              </label>
              <div className="chk_list treatment-type">
                <ul>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="surgery"
                      className="check02"
                    />
                    <label>수술</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="cancer_treatment"
                      className="check02"
                    />
                    <label>항암치료</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="radiation_treatment"
                      className="check02"
                    />
                    <label>방사선치료</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="hormone_treatment"
                      className="check02"
                    />
                    <label>호르몬치료</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="etc_treatment"
                      className="check02"
                    />
                    <label>기타</label>
                  </li>
                </ul>
                <InputElement
                  type="text"
                  placeholder="구체적으로 입력"
                  id="detail_treatment"
                />
              </div>
            </li>
            <li>
              <label>
                <span>현재 건강상태</span>
              </label>
              <div className="radioCheck">
                <ul>
                  <li>
                    <InputElement
                      type="radio"
                      value="매우 건강하지 않다."
                      name="chk_info"
                    />
                    <label>매우 건강하지 않다.</label>
                  </li>
                  <li>
                    <InputElement
                      type="radio"
                      value="건강하지 않다."
                      name="chk_info"
                    />
                    <label>건강하지 않다.</label>
                  </li>
                  <li>
                    <InputElement
                      type="radio"
                      value="건강하다."
                      name="chk_info"
                    />
                    <label>건강하다.</label>
                  </li>
                  <li>
                    <InputElement
                      type="radio"
                      value="매우 건강하다."
                      name="chk_info"
                    />
                    <label>매우 건강하다.</label>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <label className="labelType">
                <span>암 이외의 질환</span>
                (해당질환 모두 선택)
              </label>
              <div className="chk_list disease">
                <ul>
                  <li>
                    <InputElement type="checkbox" value="" className="" />
                    <label>없음</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="고혈압" />
                    <label>고혈압</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="당뇨병" />
                    <label>당뇨병</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="뇌혈관질환" />
                    <label>뇌혈관질환</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="호흡기질환" />
                    <label>호흡기질환</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="심장질환" />
                    <label>심장질환</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="우울증" />
                    <label>우울증</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="관련 질환" />
                    <label>관련 질환</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="기타" />
                    <label>기타</label>
                  </li>
                </ul>
                <InputElement type="text" placeholder="직접 작성" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="fixBtn ">
        <button type="button" className="prev">
          이전
        </button>
        <button type="button" className="next">
          다음
        </button>
      </div>
    </React.Fragment>
  );
};

export default ModifyCheck03;
