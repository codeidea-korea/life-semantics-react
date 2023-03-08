import React from "react";
import { useEffect, useRef, useState } from "react";
import InputElement from "../../elements/InputElement";
import $ from "jquery";
import { userState } from "@/states/userState";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BeforeSurveyInfoInterface } from "@/interfaces/surveyInterface";
import useAxios from "@hooks/useAxios";
import ToastPopup from "@/components/modal/ToastPopup";

const ModifyCheck03 = () => {
  const navigate = useNavigate();

  const api = useAxios();
  const [beforeSurveyInfo, setBeforeSurveyInfo] = useState({
    userDiagnosis: "",
    userDiagName: "",
    userDiagDate: "",
    userCureType: "",
    userCureName: "",
    userCureEndDate: "",
    userDiagEtc: "",
    userDiagEtcName: "",
    userNowHealStat: "",
    userGender: ""
  });
  const { state } = useLocation() as BeforeSurveyInfoInterface;
  const user = useRecoilValue(userState);
  const checkBoxRef = useRef<HTMLInputElement[]>([]);
  const cancerInfoRef = useRef<HTMLSpanElement[]>([]);
  const now = new Date();
  const [isCustomCancerName, setIsCustomCanerName] = useState([false]);
  const handleCancerNameChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const target = event.target;
    const selectedOption = target.selectedOptions[0];
    if (selectedOption.textContent === "직접입력") {
      let newIsCustomCancerName = [...isCustomCancerName];
      newIsCustomCancerName[index] = true;
      setIsCustomCanerName(newIsCustomCancerName);
    } else {
      let newIsCustomCancerName = [...isCustomCancerName];
      newIsCustomCancerName[index] = false;
      let newDiagCancerList = { ...diagCancerList };
      newDiagCancerList.userDiagName[index] = '';
      setIsCustomCanerName(newIsCustomCancerName);
      setDiagCancerList(newDiagCancerList)
    }

    let newDiagCancerList = { ...diagCancerList };
    newDiagCancerList.userDiagnosis[index] = target.value;
    setDiagCancerList(newDiagCancerList);

    setBeforeSurveyInfo({
      ...beforeSurveyInfo,
      [target.name]: newDiagCancerList.userDiagnosis.join(','),
    })
  };
  const moveScroll = (dom: HTMLSpanElement) => {
    dom.scrollIntoView({ behavior: "smooth" });
  }


  const [toast, setToast] = useState(false);

  const requestRegBeforeSurveyInfo = () => {
    // const newUserDiagDate = beforeSurveyInfo.userDiagDate.slice(0, 4) + '-' + beforeSurveyInfo.userDiagDate.slice(6, 8);
    // const newUserCureEndDate = beforeSurveyInfo.userCureEndDate.slice(0, 4) + '-' + beforeSurveyInfo.userCureEndDate.slice(6, 8);

    // let requestBody = {
    //   ...beforeSurveyInfo,
    //   ['userDiagDate']: newUserDiagDate,
    //   ['userCureEndDate']: newUserCureEndDate,
    // };
    let requestBody = {
      ...beforeSurveyInfo,
      ['userDiagName']: diagCancerList.userDiagName.join(','),
    };

    fetch(`${import.meta.env.VITE_PUBLIC_API_SERVER_URL}users/cancer`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.code === 200) {
          setToast(true)
          setTimeout(() => {
            setToast(false);
            navigate(-1)
          }, 3000);
        }
      });
    // api
    //   .post('/users/cancer', requestBody, {
    //     headers: {
    //       Authorization: `Bearer ${user.accessToken}`
    //     },
    //     method: "PUT",
    //   })
    //   .then((res: any) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       setEndPopup(true);
    //       setTimeout(() => {
    //         setEndPopup(false);
    //         state.isBeforeSurveyInfo = true;
    //       }, 3000);
    //     }
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   })
  }

  const handlePopupEnd = () => {
    if (!beforeSurveyInfo.userGender) {
      moveScroll(cancerInfoRef.current[0])
      return
    }
    else if (beforeSurveyInfo.userDiagnosis !== 'etc' && !beforeSurveyInfo.userDiagnosis) {
      moveScroll(cancerInfoRef.current[1])
      return
    }
    else if (beforeSurveyInfo.userDiagnosis === 'etc' && !beforeSurveyInfo.userDiagName) {
      moveScroll(cancerInfoRef.current[1])
      return
    }
    else if (!beforeSurveyInfo.userDiagDate || !beforeSurveyInfo.userCureEndDate) {
      moveScroll(cancerInfoRef.current[1])
      return
    }
    else if (!beforeSurveyInfo.userCureType) {
      moveScroll(cancerInfoRef.current[2])
      return
    }
    else if (!beforeSurveyInfo.userNowHealStat) {
      moveScroll(cancerInfoRef.current[3])
      return
    }
    else if (!beforeSurveyInfo.userDiagEtc) {
      moveScroll(cancerInfoRef.current[4])
      return
    }

    requestRegBeforeSurveyInfo();
  };



  const [endPopup, setEndPopup] = useState(false);
  const [userAge,] = useState(Number(now.getFullYear()) - Number(user.userBirth?.substr(0, 4)) + 1);

  const handleUpdateCancerInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'userCureType') {
      let cureTypeList: string[] = [];

      if (beforeSurveyInfo.userCureType.length) {
        cureTypeList = beforeSurveyInfo.userCureType.split(',');
        const idx = cureTypeList.indexOf(value);
        if (idx !== -1) {
          cureTypeList.splice(idx, 1);
        }
        else cureTypeList.push(value);
      }
      else {
        cureTypeList = beforeSurveyInfo.userCureType.split('');
        cureTypeList.push(value);
      }

      setBeforeSurveyInfo({
        ...beforeSurveyInfo,
        ['userCureType']: cureTypeList.join(','),
      })
    }
    else if (name === 'userDiagEtc') {
      if (value !== "1") {
        checkBoxRef.current[0].checked = false;
        let diagEtcList: string[] = [];

        if (beforeSurveyInfo.userDiagEtc.length) {
          diagEtcList = beforeSurveyInfo.userDiagEtc.split(',');

          const one_idx = diagEtcList.indexOf("1");
          if (one_idx !== -1) {
            diagEtcList.splice(one_idx, 1);
          }

          const idx = diagEtcList.indexOf(value);
          if (idx !== -1) {
            diagEtcList.splice(idx, 1);
          }
          else diagEtcList.push(value);
        }
        else {
          diagEtcList = beforeSurveyInfo.userDiagEtc.split('');
          diagEtcList.push(value);
        }

        setBeforeSurveyInfo({
          ...beforeSurveyInfo,
          ['userDiagEtc']: diagEtcList.join(','),
        })
      }
      else {
        checkBoxRef.current.forEach((elem, idx) => {
          if (idx && elem.checked && checkBoxRef.current[0].checked) elem.checked = false;
        })

        setBeforeSurveyInfo({
          ...beforeSurveyInfo,
          ['userDiagEtc']: '1',
          ['userDiagEtcName']: '',
        })
      }
    }
    else {
      setBeforeSurveyInfo({
        ...beforeSurveyInfo,
        [name]: value,
      })
    }
  }

  //신규추가
  const handleDiagName = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    let newDiagCancerList = { ...diagCancerList };
    newDiagCancerList.userDiagName[index] = value;
    const newValue = newDiagCancerList.userDiagName.join(',');

    setDiagCancerList(newDiagCancerList);
    setBeforeSurveyInfo({
      ...beforeSurveyInfo,
      [name]: newValue
    })
  }
  const addDiag = () => {
    let tmp = { ...diagCancerList };
    tmp.userDiagnosis.push('');
    tmp.userDiagDate.push('');
    tmp.userCureEndDate.push('');
    tmp.userDiagName.push('');
    setDiagCancerList(tmp);
  }

  const [diagCancerList, setDiagCancerList] = useState({
    userDiagnosis: [''],
    userDiagDate: [''],
    userCureEndDate: [''],
    userDiagName: [''],
  });

  const handleCancerDate = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    let newDiagCancerList = { ...diagCancerList };
    let newValue = '';

    if (name === 'userDiagDate') {
      newDiagCancerList.userDiagDate[index] = value;
      newValue = newDiagCancerList.userDiagDate.join(',');
    }
    else {
      newDiagCancerList.userCureEndDate[index] = value;
      newValue = newDiagCancerList.userCureEndDate.join(',');
    }

    setDiagCancerList(newDiagCancerList);
    setBeforeSurveyInfo({
      ...beforeSurveyInfo,
      [name]: newValue
    })
  }

  const updateInfo = () => {
    fetch(`${import.meta.env.VITE_PUBLIC_API_SERVER_URL}users/view?userNo=${user.userNo}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        setBeforeSurveyInfo({
          ...beforeSurveyInfo,
          ['userDiagnosis']: data.body.userDiagnosis,
          ['userDiagName']: data.body.userDiagName,
          ['userDiagDate']: data.body.userDiagDate,
          ['userCureType']: data.body.userCureType,
          ['userCureName']: data.body.userCureName,
          ['userCureEndDate']: data.body.userCureEndDate,
          ['userDiagEtc']: data.body.userDiagEtc,
          ['userDiagEtcName']: data.body.userDiagEtcName,
          ['userNowHealStat']: data.body.userNowHealStat,
          ['userGender']: data.body.userGender
        });

        setDiagCancerList({
          ...diagCancerList,
          ['userDiagnosis']: data.body.userDiagnosis.split(','),
          ['userDiagName']: data.body.userDiagName.split(','),
          ['userDiagDate']: data.body.userDiagDate.split(','),
          ['userCureEndDate']: data.body.userCureEndDate.split(',')
        })

        //성별
        if (data.body.userGender == 'm') {
          (document.getElementById('man') as HTMLInputElement).checked = true;
        } else {
          (document.getElementById('woman') as HTMLInputElement).checked = true;
        }

        //치료유형
        const userCureTypeCheckbox = document.getElementsByName("userCureType") as NodeList;
        const userCureType = data.body.userCureType.split(',');
        userCureTypeCheckbox.forEach((checkbox: any) => {
          userCureType.map((item: number) => {
            if (checkbox.value == item) {
              (document.getElementById(checkbox.id) as HTMLInputElement).checked = true;
            }
          })
        })

        //암 이외의 질환
        const userDiagEtcCheckbox = document.getElementsByName("userDiagEtc") as NodeList;
        const userDiagEtc = data.body.userDiagEtc.split(',');
        userDiagEtcCheckbox.forEach((checkbox: any) => {
          userDiagEtc.map((item: number) => {
            if (checkbox.value == item) {
              (document.getElementById(checkbox.id) as HTMLInputElement).checked = true;
            }
          })
        })

        //현재 건강상태
        const userNowHealStatRadio = document.getElementsByName("userNowHealStat") as NodeList;
        userNowHealStatRadio.forEach((checkbox: any) => {
          if (checkbox.value == data.body.userNowHealStat) {
            (document.getElementById(checkbox.id) as HTMLInputElement).checked = true;
          }
        })
      }).catch((error) => {
        console.log(error)
      });
  }
  useEffect(() => {
    updateInfo();
  }, []);

  return (
    <React.Fragment>
      <div className="surveyBefore_popup">
        <div className="HeaderFix"><button onClick={() => { navigate(-1) }} type="button"><img src="images/arrow.svg" /></button><h2>암 건강정보 수정</h2></div>
        <div className="popupMain">

          <div className="check">
            <p className="title">암 건강정보 수정</p>
            <div className="MemberChk MemberChk02">
              <div className="">
                <label>
                  <span style={{ margin: "50px 0 20px 0" }}>나이</span>
                </label>
                <span className="age">{userAge}</span>
              </div>

              <label>
                <span style={{ margin: "50px 0 20px 0" }} ref={(element) => (cancerInfoRef.current[0] = element as HTMLSpanElement)}>성별</span>
              </label>
              <div className="chk_radio02">
                <span className="isCheck">
                  <InputElement
                    type="radio"
                    value="m"
                    name="userGender"
                    id="man"
                    onChange={handleUpdateCancerInfo}
                  />
                  <label htmlFor="man">남</label>
                </span>
                <span>
                  <InputElement
                    type="radio"
                    value="f"
                    name="userGender"
                    id="woman"
                    onChange={handleUpdateCancerInfo}
                  />
                  <label htmlFor="woman">여</label>
                </span>
              </div>

              {/* 작업중 */}

              {/* 추가되는 영역 : S */}
              {
                diagCancerList.userDiagnosis.map((elem, idx) => (
                  <React.Fragment key={idx}>
                    <label>
                      <span style={{ margin: "50px 0 20px 0" }} ref={(element) => (cancerInfoRef.current[idx + 1] = element as HTMLSpanElement)}>
                        암 종(진단명)
                        {idx === 0 && <i className="plusBtn" onClick={addDiag}>+</i>}
                      </span>
                    </label>
                    <p className="pointGreen">다른 암도 재발되었나요?<br />그러면 해당 암 종도 추가해주세요.</p>
                    <select name="userDiagnosis" onChange={(event) => handleCancerNameChange(event, idx)} value={elem}>
                      <option value="">암 종 선택</option>
                      <option value="1">간암</option>
                      <option value="2">갑상선암</option>
                      <option value="3">담낭암</option>
                      <option value="4">담도암</option>
                      <option value="5">대장암</option>
                      <option value="6">신장암</option>
                      <option value="7">위암</option>
                      <option value="8">유방암</option>
                      <option value="9">전립선암</option>
                      <option value="10">췌장암</option>
                      <option value="11">폐암</option>
                      <option value="etc">직접입력</option>
                    </select>
                    {/* {isCustomCancerName[idx] && (
                      <div className="manualInput">
                        <label>직접입력</label>
                        <InputElement
                          type="text"
                          placeholder="직접입력"
                          id="custom_cancer_name"
                          value=""
                          name="userDiagName"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDiagName(event, idx)}
                        />
                      </div>
                    )} */}

                    {(diagCancerList.userDiagName[idx] || isCustomCancerName[idx]) && (
                      <div className="manualInput">
                        <label>직접입력</label>
                        <InputElement
                          type="text"
                          placeholder="직접입력"
                          id="custom_cancer_name"
                          value={diagCancerList.userDiagName[idx]}
                          name="userDiagName"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDiagName(event, idx)}
                        />
                      </div>
                    )}
                    <div className="plusItem">
                      <label>
                        <span style={{ margin: "50px 0 20px 0" }}>진단시기</span>
                      </label>
                      <InputElement
                        type="text"
                        placeholder="예) 2015년 01월"
                        id="cancer_start"
                        name="userDiagDate"
                        value={diagCancerList.userDiagDate[idx] ? diagCancerList.userDiagDate[idx] : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCancerDate(event, idx)}
                      />
                      <label>
                        <span style={{ margin: "50px 0 20px 0" }}>치료종료 시기</span>
                      </label>
                      <InputElement
                        type="text"
                        placeholder="예) 2015년 01월"
                        id="cancer_end"
                        name="userCureEndDate"
                        value={diagCancerList.userCureEndDate[idx] ? diagCancerList.userCureEndDate[idx] : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCancerDate(event, idx)}
                      />
                    </div>
                  </React.Fragment>
                ))
              }
              {/* 추가되는 영역 : E */}

              <label>
                <span style={{ margin: "50px 0 20px 0" }} ref={(element) => (cancerInfoRef.current[2] = element as HTMLSpanElement)}>치료유형(중복선택 가능)</span>
              </label>
              <div className="chk_list treatment-type checkContents">
                <ul>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="surgery"
                      className="check02"
                      name="userCureType"
                      value="1"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="surgery">수술</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="cancer_treatment"
                      className="check02"
                      name="userCureType"
                      value="2"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="cancer_treatment">항암치료</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="radiation_treatment"
                      className="check02"
                      name="userCureType"
                      value="3"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="radiation_treatment">방사선치료</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="hormone_treatment"
                      className="check02"
                      name="userCureType"
                      value="4"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="hormone_treatment">호르몬치료</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      id="etc_treatment"
                      className="check02"
                      name="userCureType"
                      value="etc"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="etc_treatment">기타</label>
                  </li>
                </ul>
                {/* <InputElement
                            type="text"
                            placeholder="구체적으로 입력"
                            id="detail_treatment"
                        /> */}
              </div>
              <label>
                <span ref={(element) => (cancerInfoRef.current[3] = element as HTMLSpanElement)}>현재 건강상태</span>
              </label>
              <div className="radioCheck checkContents">
                <ul>
                  <li>
                    <InputElement
                      type="radio"
                      value="1"
                      name="userNowHealStat"
                      id="radio01"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="radio01">매우 건강하지 않다.</label>
                  </li>
                  <li>
                    <InputElement
                      type="radio"
                      value="2"
                      name="userNowHealStat"
                      id="radio02"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="radio02">건강하지 않다.</label>
                  </li>
                  <li>
                    <InputElement
                      type="radio"
                      value="3"
                      name="userNowHealStat"
                      id="radio03"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="radio03">건강하다.</label>
                  </li>
                  <li>
                    <InputElement
                      type="radio"
                      value="4"
                      name="userNowHealStat"
                      id="radio04"
                      onChange={handleUpdateCancerInfo}
                    />
                    <label htmlFor="radio04">매우 건강하다.</label>
                  </li>
                </ul>
              </div>

              <label className="labelType" htmlFor="cancer_type_end">
                <span ref={(element) => (cancerInfoRef.current[4] = element as HTMLSpanElement)}>암 이외의 질환</span>
                (해당질환 모두 선택)
              </label>
              <div className="chk_list disease checkContents">
                <ul>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="1"
                      className=""
                      id="empty"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[0] = element as HTMLInputElement}
                    />
                    <label htmlFor="empty">없음</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="2"
                      id="hypertension"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[1] = element as HTMLInputElement}
                    />
                    <label htmlFor="hypertension">고혈압</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="3"
                      id="diabetic"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[2] = element as HTMLInputElement}
                    />
                    <label htmlFor="diabetic">당뇨병</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="4"
                      id="cerebrovascular"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[3] = element as HTMLInputElement}
                    />
                    <label htmlFor="cerebrovascular">뇌혈관질환</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="5"
                      id="respiratory"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[4] = element as HTMLInputElement}
                    />
                    <label htmlFor="respiratory">호흡기질환</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="6"
                      id="cardiac"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[5] = element as HTMLInputElement}
                    />
                    <label htmlFor="cardiac">심장질환</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="7"
                      id="blues"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[6] = element as HTMLInputElement}
                    />
                    <label htmlFor="blues">우울증</label>
                  </li>
                  <li>
                    <InputElement
                      type="checkbox"
                      value="8"
                      id="related"
                      name="userDiagEtc"
                      onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[7] = element as HTMLInputElement}
                    />
                    <label htmlFor="related">관련 질환</label>
                  </li>
                  <li>
                    <InputElement type="checkbox" value="etc" id="etc" name="userDiagEtc" onChange={handleUpdateCancerInfo}
                      ref={(element) => checkBoxRef.current[8] = element as HTMLInputElement}
                    />
                    <label htmlFor="etc">직접 입력</label>
                  </li>
                </ul>
                <InputElement type="text" placeholder="직접 암 이외의 질환(진단명) 입력" name="userDiagEtcName" value={beforeSurveyInfo.userDiagEtcName} ref={(element) => checkBoxRef.current[9] = element as HTMLInputElement} onChange={handleUpdateCancerInfo} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div style={{ zIndex: 100 }} className="fixBtn ">
        <button onClick={() => { navigate(-1) }} type="button" className="prev">
          이전
        </button>
        <button onClick={handlePopupEnd} type="button" className="next">
          수정
        </button>
      </div>
      <ToastPopup content={"입력하신 정보를 수정하였습니다."} show={toast} />
    </React.Fragment>
  );
};

export default ModifyCheck03;
