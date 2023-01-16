import React, { useEffect, useState } from "react";
import { userState } from '@states/userState';
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import ToastPopup from "@components/modal/ToastPopup";

import InputElement from "../../elements/InputElement";

const ModifyCheck02 = ({ nextStep }: { nextStep: Function }) => {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const [toast, setToast] = useState(false);

    const [isSmoke, setIsSmoke] = useState(false);
    const [beforeSmoke, setBeforeSmoke] = useState(false);
    const [isDrink, setIsDrink] = useState(false);
    const [beforeDrink, setBeforeDrink] = useState(false);

    interface reqData {
        userIsSmoke: string;
        userSmokeAmt: number | string;
        userSmokeStartYear: number | string;
        userSmokeEndYear: number | string;
        userIsDrink: string;
        userDrinkAmt: number | string;
        userDrinkStartYear: number | string;
        userDrinkEndYear: number | string;
        userIsCaffeine: number | string;
        userWasSmoke: number | string;
        userWasDrink: number | string;
    }



    const reqData: reqData = {
        "userIsSmoke": "string",
        "userSmokeAmt": 0,
        "userSmokeStartYear": 0,
        "userSmokeEndYear": 0,
        "userIsDrink": "string",
        "userDrinkAmt": 0,
        "userDrinkStartYear": 0,
        "userDrinkEndYear": 0,
        "userIsCaffeine": "string",
        "userWasSmoke": 0,
        "userWasDrink": 0
    };
    const updateInfo = () => {
        fetch(`https://api.life.codeidea.io/users/view?userNo=${user.userNo}`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                //흡연여부
                reqData.userIsSmoke = data.body.userIsSmoke
                if (data.body.userIsSmoke == "1") {
                    setIsSmoke(true)
                    const htmlElement = document.querySelector('#smoking') as HTMLInputElement;
                    htmlElement.checked = true;
                } else {
                    setIsSmoke(false)
                    const htmlElement = document.querySelector('#stopSmoking') as HTMLInputElement;
                    htmlElement.checked = true;
                }
                setTimeout(() => {
                    //흡연량
                    reqData.userSmokeAmt = data.body.userSmokeAmt
                    const smokeAmt = document.querySelector('#smoking_rate') as HTMLInputElement;
                    smokeAmt.value = data.body.userSmokeAmt;

                    //흡연기간
                    reqData.userSmokeStartYear = data.body.userSmokeStartYear
                    reqData.userSmokeEndYear = data.body.userSmokeEndYear
                    const smokingStartYear = document.querySelector('#smoking_start') as HTMLInputElement
                    const smokingEndYear = document.querySelector('#smoking_end') as HTMLInputElement
                    smokingStartYear.value = data.body.userSmokeStartYear;
                    smokingEndYear.value = data.body.userSmokeEndYear;
                }, 100);

                //음주여부
                reqData.userIsDrink = data.body.userIsDrink
                if (data.body.userIsDrink == "1") {
                    setIsDrink(true)
                    const htmlElement = document.querySelector('#drink') as HTMLInputElement;
                    htmlElement.checked = true;
                } else {
                    setIsDrink(false)
                    const htmlElement = document.querySelector('#stopDrink') as HTMLInputElement;
                    htmlElement.checked = true;
                }
                setTimeout(() => {
                    //음주량
                    reqData.userDrinkAmt = data.body.userDrinkAmt
                    const drinkAmt = document.querySelector('#drinking_rate') as HTMLInputElement;
                    drinkAmt.value = data.body.userDrinkAmt;

                    //음주기간
                    reqData.userDrinkStartYear = data.body.userDrinkStartYear
                    reqData.userDrinkEndYear = data.body.userDrinkEndYear
                    const drinkingStartYear = document.querySelector('#drinking_start') as HTMLInputElement
                    const drinkingEndYear = document.querySelector('#drinking_end') as HTMLInputElement
                    drinkingStartYear.value = data.body.userDrinkStartYear;
                    drinkingEndYear.value = data.body.userDrinkEndYear;
                }, 100);


                //카페인섭취
                reqData.userIsCaffeine = data.body.userIsCaffeine
                const caffeineElement = document.querySelector('#Caffeine') as HTMLInputElement
                const caffeineElement2 = document.querySelector('#stopCaffeine') as HTMLInputElement
                if (data.body.userIsCaffeine == "1") {
                    caffeineElement.checked = true;
                } else {
                    caffeineElement2.checked = true;
                }

                //과거흡연
                reqData.userWasSmoke = data.body.userWasSmoke
                const wasSmokeElement = document.querySelector('#beforesmoking') as HTMLInputElement
                const wasSmokeElement2 = document.querySelector('#beforecheckSmoking') as HTMLInputElement
                if (data.body.userWasSmoke == "1") {
                    wasSmokeElement.checked = true;
                } else {
                    wasSmokeElement2.checked = true;
                }

                //과거음주
                reqData.userWasDrink = data.body.userWasDrink
                const wasDrinkElement = document.querySelector('#before_drink') as HTMLInputElement
                const wasDrinkElement2 = document.querySelector('#before_no_drink') as HTMLInputElement
                if (data.body.userWasDrink == "1") {
                    wasDrinkElement.checked = true;
                } else {
                    wasDrinkElement2.checked = true;
                }

            }).catch((error) => {
                console.log(error)
            });
    }
    useEffect(() => {
        updateInfo();
    }, [])

    const handlePopup = () => {
        setToast(true);
        setTimeout(() => {
            setToast(false);
            updateInfo();
        }, 3000);
    };

    const handleSubmit = () => {
        const smokingElement1 = document.querySelector('#smoking') as HTMLInputElement;
        smokingElement1.checked == true ? (reqData.userIsSmoke = "1") : (reqData.userIsSmoke = "0")

        const smokeAmt = document.querySelector('#smoking_rate') as HTMLInputElement;
        reqData.userSmokeAmt = smokeAmt.value;

        const smokingStartYear = document.querySelector('#smoking_start') as HTMLInputElement
        const smokingEndYear = document.querySelector('#smoking_end') as HTMLInputElement
        reqData.userSmokeStartYear = smokingStartYear.value
        reqData.userSmokeEndYear = smokingEndYear.value

        const dringElement1 = document.querySelector('#drink') as HTMLInputElement;
        dringElement1.checked == true ? (reqData.userIsDrink = "1") : (reqData.userIsDrink = "0")

        const drinkAmt = document.querySelector('#drinking_rate') as HTMLInputElement;
        reqData.userDrinkAmt = drinkAmt.value;

        const drinkingStartYear = document.querySelector('#drinking_start') as HTMLInputElement
        const drinkingEndYear = document.querySelector('#drinking_end') as HTMLInputElement
        reqData.userDrinkStartYear = drinkingStartYear.value
        reqData.userDrinkEndYear = drinkingEndYear.value


        const caffeineElement = document.querySelector('#Caffeine') as HTMLInputElement
        caffeineElement.checked == true ? (reqData.userIsCaffeine = "1") : (reqData.userIsCaffeine = "0")


        const wasSmokeElement = document.querySelector('#beforesmoking') as HTMLInputElement
        wasSmokeElement.checked == true ? (reqData.userWasSmoke = "1") : (reqData.userWasSmoke = "0")


        const wasDrinkElement = document.querySelector('#before_drink') as HTMLInputElement
        wasDrinkElement.checked == true ? (reqData.userWasDrink = "1") : (reqData.userWasDrink = "0")


        if (String(smokeAmt.value).length !== 0 && String(smokingStartYear.value.length !== 0 && String(smokingEndYear.value).length !== 0 && drinkAmt.value.length !== 0 && String(drinkingStartYear.value).length !== 0 && String(drinkingEndYear.value).length !== 0)) {
            fetch(`https://api.life.codeidea.io/users/health`,
                {
                    method: 'PUT',
                    body: JSON.stringify(reqData),
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken,
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.result == "true") {
                        handlePopup();

                    }
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            handleFocusBtn()
        }





    }


    const handleFocusBtn = () => {
        const checkSmoking = document.querySelector(
            '[name="checkSmoking"]:checked'
        ) as HTMLInputElement;
        const checkDrink = document.querySelector(
            '[name="check_drink"]:checked'
        ) as HTMLInputElement;
        const checkCaffeine = document.querySelector(
            '[name="check_caffeine"]:checked'
        ) as HTMLInputElement;

        if (!checkSmoking) return false;
        if (checkSmoking && checkSmoking.value === "흡연") return checkSmokingValues();

        if (!checkDrink) return false;
        if (checkDrink && checkDrink.value === "음주") return checkDrinkingValues();

        if (!checkCaffeine) return false;

        nextStep(3);
    };
    const checkSmokingValues = () => {
        const smokingRate = document.getElementById("smoking_rate") as HTMLInputElement;
        const smokingStart = document.getElementById("smoking_start") as HTMLInputElement;
        const smokingEnd = document.getElementById("smoking_end") as HTMLInputElement;

        if (!smokingRate.value) {
            smokingRate.focus();
            return false;
        }
        if (!smokingStart.value) {
            smokingStart.focus();
            return false;
        }
        if (!smokingEnd.value) {
            smokingEnd.focus();
            return false;
        }

        return true;
    };
    const checkDrinkingValues = () => {
        const drinkingRate = document.getElementById("drinking_rate") as HTMLInputElement;
        const drinkingStart = document.getElementById("drinking_start") as HTMLInputElement;
        const drinkingEnd = document.getElementById("drinking_end") as HTMLInputElement;

        if (!drinkingRate.value) {
            drinkingRate.focus();
            return false;
        }
        if (!drinkingStart.value) {
            drinkingStart.focus();
            return false;
        }
        if (!drinkingEnd.value) {
            drinkingEnd.focus();
            return false;
        }

        return true;
    };

    const handleSmoke = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.value === "흡연") {
            setIsSmoke(true);
        } else {
            setIsSmoke(false);
        }
        if (target.value === "금연") {
            setBeforeSmoke(true);
        } else {
            setBeforeSmoke(false);
        }
    };

    const handleDrink = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.value === "음주") {
            setIsDrink(true);
        } else {
            setIsDrink(false);
        }
        if (target.value === "금주") {
            setBeforeDrink(true);
        } else {
            setBeforeDrink(false);
        }
    };

    return (
        <React.Fragment>
            <div className="modifyCheck" id="modify">
                <p className="title">건강정보 입력</p>
                <div className="MemberChk MemberChk01">
                    <ul>
                        <li>
                            <label>
                                <span className="title">1) 흡연</span>
                                <span className="desc">지금도 흡연 하고 계신가요?</span>
                            </label>
                            <div className="chk_radio03">
                                <span className="isCheck">
                                    <InputElement
                                        type="radio"
                                        value="흡연"
                                        name="checkSmoking"
                                        id="smoking"
                                        onChange={handleSmoke}
                                    />
                                    <label htmlFor="smoking">네</label>
                                </span>
                                <span>
                                    <InputElement
                                        type="radio"
                                        value="금연"
                                        name="checkSmoking"
                                        id="stopSmoking"
                                        onChange={handleSmoke}
                                    />
                                    <label htmlFor="stopSmoking">아니오</label>
                                </span>
                            </div>
                            <div
                                className="input_detail"
                                style={{ display: isSmoke ? "block" : "none" }}
                            >
                                <span>양</span>
                                <span className="detail">
                                    <InputElement type="number" id="smoking_rate" />
                                    <label>갑/일</label>
                                </span>
                                <span className="point">
                                    보통의 하루 평균적인 흡연 양을 적어주세요.
                                </span>
                                <span className="term">
                                    <span>기간</span>
                                    <span className="termDate">
                                        <InputElement
                                            type="number"
                                            placeholder="시작"
                                            id="smoking_start"
                                        />
                                        <label>년</label>
                                        <b>~</b>
                                        <InputElement
                                            type="number"
                                            placeholder="마지막"
                                            id="smoking_end"
                                        />
                                        <label>년</label>
                                    </span>
                                </span>
                            </div>
                            <div style={{ display: beforeSmoke ? "block" : "none" }}>
                                <label>
                                    <span className="desc">그러면 과거에는 흡연하셨나요?</span>
                                </label>
                                <div className="chk_radio03">
                                    <span className="isCheck">
                                        <InputElement
                                            type="radio"
                                            value="흡연"
                                            name="beforecheckSmoking"
                                            id="beforesmoking"
                                        />
                                        <label htmlFor="beforesmoking">네</label>
                                    </span>
                                    <span>
                                        <InputElement
                                            type="radio"
                                            value="금연"
                                            name="beforecheckSmoking"
                                            id="beforestopSmoking"
                                        />
                                        <label htmlFor="beforestopSmoking">아니오</label>
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>
                                <span className="title">2) 음주</span>
                                <span className="desc">지금도 음주 하고 계신가요?</span>
                            </label>
                            <div className="chk_radio03">
                                <span>
                                    <InputElement
                                        type="radio"
                                        value="음주"
                                        name="check_drink"
                                        id="drink"
                                        onChange={handleDrink}
                                    />
                                    <label htmlFor="drink">네</label>
                                </span>
                                <span>
                                    <InputElement
                                        type="radio"
                                        value="금주"
                                        id="stopDrink"
                                        name="check_drink"
                                        onChange={handleDrink}
                                    />
                                    <label htmlFor="stopDrink">아니오</label>
                                </span>
                            </div>

                            <div
                                className="input_detail"
                                id="stopDrink"
                                style={{ display: isDrink ? "block" : "none" }}
                            >
                                <span>종류</span>
                                <span className="detail">
                                    <InputElement type="number" id="drinking_rate" />
                                    <label>병/일</label>
                                </span>
                                <span className="point">
                                    보통의 하루 평균적인 음주 양을 적어주세요.
                                </span>
                                <span className="term">
                                    <span>기간</span>
                                    <span className="termDate">
                                        <InputElement
                                            type="number"
                                            placeholder="시작"
                                            id="drinking_start"
                                        />
                                        <label>년</label>
                                        <b>~</b>
                                        <InputElement
                                            type="number"
                                            placeholder="마지막"
                                            id="drinking_end"
                                        />
                                        <label>년</label>
                                    </span>
                                </span>
                            </div>
                            <div id="stopDrink" style={{ display: beforeDrink ? "block" : "none" }}>
                                <label>
                                    <span className="desc">그러면 과거에는 음주하셨나요?</span>
                                </label>
                                <div className="chk_radio03">
                                    <span className="isCheck">
                                        <InputElement
                                            type="radio"
                                            value="네"
                                            name="before_check_drink"
                                            id="before_drink"
                                        />
                                        <label htmlFor="before_drink">네</label>
                                    </span>
                                    <span>
                                        <InputElement
                                            type="radio"
                                            value="아니오"
                                            name="before_check_drink"
                                            id="before_no_drink"
                                        />
                                        <label htmlFor="before_no_drink">아니오</label>
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>
                                <span className="title">3) 카페인</span>
                                <span className="desc">
                                    요새 카페인(커피나 녹차)을 드시곤 하나요?
                                </span>
                            </label>
                            <div className="chk_radio03">
                                <span className="isCheck">
                                    <InputElement
                                        type="radio"
                                        value="카페인"
                                        name="checkCaffeine"
                                        id="Caffeine"
                                    />
                                    <label htmlFor="Caffeine">네</label>
                                </span>
                                <span>
                                    <InputElement
                                        type="radio"
                                        value="디카페인"
                                        name="checkCaffeine"
                                        id="stopCaffeine"
                                    />
                                    <label htmlFor="stopCaffeine">아니오</label>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="fixBtn ">
                <button onClick={() => navigate(-1)} type="button" className="prev" >
                    이전
                </button>
                <button onClick={handleSubmit} type="button" className="next" >
                    수정
                </button>
            </div>
            <ToastPopup content={"입력하신 정보를 수정하였습니다."} show={toast} />
        </React.Fragment>
    );
};

export default ModifyCheck02;
