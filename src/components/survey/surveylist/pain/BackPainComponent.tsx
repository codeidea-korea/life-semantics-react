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
                <span data-index={27} className="dot" data-name="backHead"></span>
                <span data-index={28} className="dot" data-name="neck"></span>
                <span data-index={30} className="dot" data-name="rightBack"></span>
                <span data-index={29} className="dot" data-name="leftBack"></span>
                <span data-index={32} className="dot" data-name="rightElbow"></span>
                <span data-index={31} className="dot" data-name="leftElbow"></span>
                <span data-index={33} className="dot" data-name="waist"></span>
                <span data-index={35} className="dot" data-name="rightHip"></span>
                <span data-index={34} className="dot" data-name="leftHip"></span>
                <span data-index={36} className="dot" data-name="tailbone"></span>


                <span data-index={44} className="dot" data-name="rightHeel"></span>
                <span data-index={43} className="dot" data-name="leftHeel"></span>

                <span data-index={38} className="dot" data-name="rightThigh"></span>
                <span data-index={37} className="dot" data-name="leftThigh"></span>

                <span data-index={41} className="dot" data-name="leftShin"></span>
                <span data-index={42} className="dot" data-name="rightShin"></span>

                <span data-index={39} className="dot" data-name="leftKnee"></span>
                <span data-index={40} className="dot" data-name="rightKnee"></span>
            </div>
        </React.Fragment>
    );
};

export default BackPainComponent;
