import React, { useEffect, useState } from "react";
import ImageMapper, { MapAreas } from "@mohamadtsn/react-img-mapper";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";

import $ from "jquery";

const BackPainComponent = () => {
    return (
        <React.Fragment>
            <div className="backPain">
                <img src="images/back.svg" alt="뒷모습" />
                <span data-index={27} className="dot" data-name="backHead" data-title="후두부"></span>
                <span data-index={28} className="dot" data-name="neck" data-title="목"></span>
                <span data-index={30} className="dot" data-name="rightBack" data-title="오른쪽 등"></span>
                <span data-index={29} className="dot" data-name="leftBack" data-title="왼쪽 등"></span>
                <span data-index={32} className="dot" data-name="rightElbow" data-title="오른쪽 팔꿈치"></span>
                <span data-index={31} className="dot" data-name="leftElbow" data-title="왼쪽 팔꿈치"></span>
                <span data-index={33} className="dot" data-name="waist" data-title="허리"></span>
                <span data-index={35} className="dot" data-name="rightHip" data-title="오른쪽 엉덩이"></span>
                <span data-index={34} className="dot" data-name="leftHip" data-title="왼쪽 엉덩이"></span>
                <span data-index={36} className="dot" data-name="tailbone" data-title="꼬리뼈"></span>


                <span data-index={44} className="dot" data-name="rightHeel" data-title="오른쪽 발뒤꿈치"></span>
                <span data-index={43} className="dot" data-name="leftHeel" data-title="왼쪽 발뒤꿈치"></span>

                <span data-index={38} className="dot" data-name="rightThigh" data-title="오른쪽 허벅지 뒤쪽"></span>
                <span data-index={37} className="dot" data-name="leftThigh" data-title="왼쪽 허벅지 뒤쪽"></span>

                <span data-index={41} className="dot" data-name="leftShin" data-title="왼쪽 종아리"></span>
                <span data-index={42} className="dot" data-name="rightShin" data-title="오른쪽 종아리"></span>

                <span data-index={39} className="dot" data-name="leftKnee" data-title="왼쪽 오금"></span>
                <span data-index={40} className="dot" data-name="rightKnee" data-title="오른쪽 오금"></span>
            </div>
        </React.Fragment>
    );
};

export default BackPainComponent;
