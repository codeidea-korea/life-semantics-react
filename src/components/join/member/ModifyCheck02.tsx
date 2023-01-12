import React, { useState } from "react";
import InputElement from "../../elements/InputElement";

const ModifyCheck02 = ({ nextStep }: { nextStep: Function }) => {
    const [isSmoke, setIsSmoke] = useState(false);
    const [beforeSmoke, setBeforeSmoke] = useState(false);
    const [isDrink, setIsDrink] = useState(false);
    const [beforeDrink, setBeforeDrink] = useState(false);

    const handleFocusBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                                    <InputElement type="number" id="drinking_rate" />
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
        </React.Fragment>
    );
};

export default ModifyCheck02;
